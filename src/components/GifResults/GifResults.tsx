import { useGifList } from '@/hooks';
import { type Gif } from '@/interfaces';
import { GifListSkeleton } from '@/styledComponents';
import { Container } from '@mui/material';
import { lazy, Suspense } from 'react';

interface Props {
  gifs: Gif[];
  queryTerm: string;
  // minHeight prop was createad to separate the 'visor' div defined in Searchfrom from the viewport when gifs are loading and the height is 0.
  // This avoids the observer of useNearScreen to detects it before the gifs are loaded.
  minHeight?: string;
}

const GifList = lazy(async () => await import('./components/GifList'));

const GifResults = (props: Props): JSX.Element => {
  const { gifs, queryTerm, minHeight } = props;
  const { displayGifList, colsQty, containerRef, containerWidth } =
    useGifList();

  return (
    <Container
      ref={containerRef}
      // 'disableGutters'prop is required to layout the image containers, remove it will cause unexpected errors
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: minHeight ?? '0px',
      }}>
      {gifs.length !== 0 ? (
        <>
          {queryTerm.length !== 0 ? <h2>Results for {queryTerm}</h2> : null}
          <Suspense fallback={<GifListSkeleton />}>
            {displayGifList ? (
              <GifList
                gifs={gifs}
                colsQty={colsQty}
                containerWidth={containerWidth}
              />
            ) : null}
          </Suspense>
        </>
      ) : (
        <h2>No GIFs found for {queryTerm}</h2>
      )}
    </Container>
  );
};

export default GifResults;
