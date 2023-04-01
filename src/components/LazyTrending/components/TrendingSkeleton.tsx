import { Skeleton } from '@mui/material';
import Container from '@mui/material/Container';

const TrendingSkeleton = (): JSX.Element => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Skeleton width='100%' />
      <Skeleton width='75%' />
      <Skeleton width='50%' />
    </Container>
  );
};

export default TrendingSkeleton;
