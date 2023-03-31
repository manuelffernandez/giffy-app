import { useGif } from '@/hooks';
import { CircularProgress, Container } from '@mui/material';

interface Props {
  gifId: string;
}

const GifDetail = (props: Props): JSX.Element => {
  const { gifId } = props;
  const { isLoading, gif } = useGif({ gifId });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <h2>{gif.title}</h2>
          <img src={gif.url} alt={gif.title} />
        </>
      )}
    </Container>
  );
};

export default GifDetail;
