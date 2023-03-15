import { useGif } from '@/hooks';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const DetailPage = (): JSX.Element => {
  // ts assertion
  const { gifId } = useParams() as { gifId: string };
  const { isLoading, gif } = useGif({ gifId });

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h2>{gif.title}</h2>
          <img src={gif.url} alt={gif.title} />
        </Container>
      )}
    </>
  );
};

export default DetailPage;
