import { GifItem } from '@/components';
import { type Gif } from '@/interfaces';
import { ImageList, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  gifs: Gif[];
  queryTerm: string;
}

const GifList = (props: Props): JSX.Element => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const { gifs, queryTerm } = props;

  return (
    <>
      {gifs.length !== 0 ? (
        <>
          {queryTerm.length !== 0 ? <h2>Results for {queryTerm}</h2> : null}
          <ImageList variant='masonry' cols={matchDownMd ? 2 : 4} gap={8}>
            {gifs.map(gif => (
              <GifItem key={gif.id} title={gif.title} url={gif.url} />
            ))}
          </ImageList>
        </>
      ) : (
        <h2>No GIFs found for {queryTerm}</h2>
      )}
    </>
  );
};

export default GifList;
