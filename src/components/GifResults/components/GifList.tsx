import { LazyGifItem } from '@/components/LazyGifItem';
import { useGifList } from '@/hooks';
import { type Gif } from '@/interfaces';
import { GifListSkeleton } from '@/styledComponents';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, Container, ImageList, Typography } from '@mui/material';
import { Suspense } from 'react';

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
              <ImageList
                variant='masonry'
                cols={colsQty}
                gap={gapSize}
                sx={{ overflow: 'hidden' }}>
                {gifs.map(gif => {
                  const proportionalHeight =
                    (currentColWidth / gif.size.width) * gif.size.height;
                  return (
                    <LazyGifItem
                      key={gif.id}
                      id={gif.id}
                      title={gif.title}
                      url={gif.url}
                      height={proportionalHeight}
                    />
                  );
                })}
              </ImageList>
            ) : null}
          </Suspense>
          <Button
            variant='contained'
            sx={{ position: 'fixed', bottom: '10%', right: '5%' }}
            href='#gif-list-title'>
            <ExpandLessIcon />
          </Button>
        </>
      ) : (
        <h2>No GIFs found for {queryTerm}</h2>
      )}
    </Container>
  );
};

export default GifList;
