import { useGifs, useNearScreen } from '@/hooks';
import { GifListSkeleton } from '@/styledComponents';
import { Box, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import debounce from 'just-debounce-it';
import { lazy, useCallback, useEffect, useRef } from 'react';

interface Props {
  queryTerm: string;
}

const GifList = lazy(async () => await import('./components/GifList'));

const GifResults = (props: Props): JSX.Element => {
  const { queryTerm } = props;
  const { gifs, isLoading, noMoreResults, isLoadingPage, pageForward } =
    useGifs({
      queryTerm,
    });
  const visorRef = useRef<HTMLDivElement>(null);
  const { isNear } = useNearScreen({
    distance: '150px',
    externalRef: isLoading ? undefined : visorRef,
    once: false,
  });

  const loadMoreGifs = useCallback(
    debounce(() => {
      pageForward();
    }, 200),
    []
  );

  useEffect(() => {
    if (isNear) {
      if (!noMoreResults && gifs.length > 0) {
        loadMoreGifs();
      }
    }
  }, [isNear]);

  return isLoading ? (
    <GifListSkeleton skeletonsQty={8} />
  ) : (
    <>
      <GifList gifs={gifs} queryTerm={queryTerm} minHeight='1000px' />
      {isLoadingPage ? (
        <Box sx={{ width: '50%', marginX: 'auto', marginTop: 3 }}>
          <LinearProgress sx={{ height: 10 }} />
        </Box>
      ) : null}
      {noMoreResults && gifs.length > 0 ? (
        <Typography
          component='p'
          variant='h5'
          sx={{ color: 'primary.main', textAlign: 'center' }}>
          No more results for {queryTerm}
        </Typography>
      ) : null}
      <div id='visor' ref={visorRef}></div>
    </>
  );
};

export default GifResults;
