import { LazyGifItem } from '@/components/LazyGifItem';
import { type Gif } from '@/interfaces';
import Masonry from '@mui/lab/Masonry';

interface Props {
  gifs: Gif[];
  containerWidth: number;
  colsQty: number;
}

const GifList = (props: Props): JSX.Element => {
  const { gifs, containerWidth, colsQty } = props;
  const gapSize = 2;
  const gapsBetweenCols = colsQty - 1;
  const currentColWidth =
    (containerWidth - gapSize * gapsBetweenCols) / colsQty;

  return (
    <Masonry columns={colsQty} spacing={gapSize} sx={{ overflow: 'hidden' }}>
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
    </Masonry>
  );
};

export default GifList;
