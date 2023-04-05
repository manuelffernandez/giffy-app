import { useGif } from '@/hooks';
import { Container, Skeleton, Typography } from '@mui/material';

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
        justifyContent: 'center',
        maxHeight: '700px',
      }}>
      {isLoading ? (
        <>
          <Skeleton
            variant='text'
            sx={{ width: 400, fontSize: '1.5rem', mb: 1 }}
          />
          <Skeleton variant='rectangular' sx={{ width: 400, height: 200 }} />
        </>
      ) : (
        <>
          <Typography
            component='h2'
            variant='h4'
            sx={{ color: 'primary.main', textAlign: 'center', mt: 2, mb: 2 }}>
            {gif.title}
          </Typography>
          <img
            src={gif.url}
            alt={gif.title}
            style={{ backgroundColor: 'gray' }}
            height='100%'
          />
        </>
      )}
    </Container>
  );
};

export default GifDetail;
