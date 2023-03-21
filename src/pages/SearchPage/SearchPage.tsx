import { GifResults, SearchBar } from '@/components';
import { useGifs, useNearScreen } from '@/hooks';
import { GifListSkeleton } from '@/styledComponents';
import { Box, LinearProgress, Typography } from '@mui/material';
import debounce from 'just-debounce-it';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams() as { queryTerm: string };
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
    console.log(isLoadingPage);
    if (isNear) {
      if (!noMoreResults && gifs.length > 0) {
        loadMoreGifs();
      }
    }
  }, [isNear]);

  return (
    <>
      <h1>Search</h1>
      <SearchBar queryTerm={queryTerm} />
      {isLoading ? (
        <GifListSkeleton skeletonsQty={8} />
      ) : (
        <>
          <GifResults minHeight='1000px' gifs={gifs} queryTerm={queryTerm} />
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
      )}
    </>
  );
};

export default SearchPage;
