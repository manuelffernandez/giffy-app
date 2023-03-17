import { GifItem } from '@/components/GifItem';
import { type Gif } from '@/interfaces';
import { ImageList } from '@mui/material';

interface Props {
  gifs: Gif[];
  containerWidth: number;
  colsQty: number;
}

const GifList = (props: Props): JSX.Element => {
  const { gifs, containerWidth, colsQty } = props;
  const gapSize = 8;
  const gapsBetweenCols = colsQty - 1;
  const currentColWidth =
    (containerWidth - gapSize * gapsBetweenCols) / colsQty;

  return (
    <ImageList
      variant='masonry'
      cols={colsQty}
      gap={gapSize}
      sx={{ overflow: 'hidden' }}>
      {gifs.map(gif => (
        <GifItem
          key={gif.id}
          id={gif.id}
          title={gif.title}
          url={gif.url}
          height={(currentColWidth / gif.measures.width) * gif.measures.height}
        />
      ))}
    </ImageList>
  );
};

export default GifList;
