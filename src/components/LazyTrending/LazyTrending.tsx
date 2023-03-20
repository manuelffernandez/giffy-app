import { useNearScreen } from '@/hooks';
import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';
import { TrendingSkeleton } from './components';

const TrendingSearches = lazy(
  async () => await import('./components/TrendingSearches')
);

const LazyTrending = (): JSX.Element => {
  const { isNear, fromRef } = useNearScreen();

  return (
    <Box ref={fromRef}>
      <Suspense fallback={<TrendingSkeleton />}>
        {isNear ? <TrendingSearches /> : null}
      </Suspense>
    </Box>
  );
};

export default LazyTrending;
