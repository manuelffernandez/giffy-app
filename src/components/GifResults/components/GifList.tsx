import { ScrollTopButton } from '@/components';
import { LazyGifItem } from '@/components/LazyGifItem';
import { useGifList } from '@/hooks';
import { type Gif } from '@/interfaces';
import { GifListSkeleton } from '@/styledComponents';
import { Container, Typography } from '@mui/material';
import { Suspense } from 'react';
import Masonry from 'react-masonry-css';
import './GifList.css';

interface Props {
  gifs: Gif[];
  queryTerm: string;
  minHeight: string;
}

const GifList = (props: Props): JSX.Element => {
  const { displayGifList, colsQty, containerRef, containerWidth } =
    useGifList();
  const { gifs, queryTerm, minHeight } = props;

  const gapSize = 8;
  const gapsBetweenCols = colsQty - 1;
  const currentColWidth =
    (containerWidth - gapSize * gapsBetweenCols) / colsQty;

  return (
    <Container
      ref={containerRef}
      // 'disableGutters' prop is required to layout the image containers, remove it will cause unexpected errors
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: minHeight ?? '0px',
      }}>
      {gifs.length !== 0 ? (
        <>
          <Typography
            component='h2'
            variant='h4'
            color='success.main'
            id='gif-list-title'>
            Results for {queryTerm}
          </Typography>
          <Suspense fallback={<GifListSkeleton />}>
            {displayGifList ? (
              <Masonry
                breakpointCols={4}
                className='masonry'
                columnClassName='masonryColumn'>
                {gifs.map(gif => {
                  const proportionalHeight =
                    (currentColWidth / gif.size.width) * gif.size.height;
                  return (
                    <LazyGifItem
                      masonryClass='masonryItem'
                      key={gif.id}
                      id={gif.id}
                      title={gif.title}
                      url={gif.url}
                      height={proportionalHeight}
                    />
                  );
                })}
              </Masonry>
            ) : null}
          </Suspense>
          <ScrollTopButton />
        </>
      ) : (
        <h2>No GIFs found for {queryTerm}</h2>
      )}
    </Container>
  );
};

export default GifList;
