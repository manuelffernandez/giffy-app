import { type Gif } from '@/interfaces';
import { GifItem } from '@/components';

interface Props {
  gifs: Gif[];
  queryTerm?: string;
}

const GifList = (props: Props): JSX.Element => {
  const { gifs, queryTerm } = props;

  return (
    <>
      {gifs.length !== 0 ? (
        <>
          {/* Should it care the verification order? */}
          {queryTerm === undefined || queryTerm.length !== 0 ? (
            <h2>Results for {queryTerm}</h2>
          ) : null}
          {gifs.map(gif => (
            <GifItem key={gif.id} title={gif.title} url={gif.url} />
          ))}
        </>
      ) : (
        <h2>No GIFs found for {queryTerm}</h2>
      )}
    </>
  );
};

export default GifList;
