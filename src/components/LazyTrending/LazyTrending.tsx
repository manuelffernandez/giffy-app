import { useLazyLoad } from '@/hooks';
import { Box } from '@mui/material';
import { TrendingSearches } from './components';

const LazyTrending = (): JSX.Element => {
  const { isNear, fromRef } = useLazyLoad();

  return <Box ref={fromRef}>{isNear ? <TrendingSearches /> : null}</Box>;
};

export default LazyTrending;
