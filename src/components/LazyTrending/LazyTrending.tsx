import { useLazyLoad } from '@/hooks';
import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';

const TrendingSearches = lazy(
  async () => await import('./components/TrendingSearches')
);

const LazyTrending = (): JSX.Element => {
  const { isNear, fromRef } = useLazyLoad();

  return (
    <Box ref={fromRef}>
      <Suspense fallback={'cargando...'}>
        {isNear ? <TrendingSearches /> : null}
      </Suspense>
    </Box>
  );
};

export default LazyTrending;
