import { type AdaptedResponse, type TrendingTerms } from '@/interfaces';
import { getTrendingTerms } from '@/services';
import { CustomRouterLink } from '@/styledComponents';
import { randomColorGenerator } from '@/utils';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TrendingSkeleton from './TrendingSkeleton';

const TrendingSearches = (): JSX.Element => {
  const [trends, setTrends] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResponse = (response: AdaptedResponse<TrendingTerms>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setTrends(response.trendingTerms);
    } else {
      console.log('oh oh');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    void getTrendingTerms().then(handleResponse);
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        component='h3'
        variant='h4'
        sx={{ color: 'primary.main', textAlign: 'center', marginBottom: 3 }}>
        TRENDING
      </Typography>
      {isLoading ? (
        <TrendingSkeleton />
      ) : (
        <Container
          component='ul'
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {trends.map((trend, index) => {
            const { color, colorLight, colorContrast } = randomColorGenerator();

            return (
              <Box key={index} component='li' sx={{ marginRight: 2 }}>
                <CustomRouterLink to={`/search/${trend}`}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.3rem',
                      marginBottom: 1,
                      paddingX: 1,
                      backgroundColor: color,
                      color: colorContrast,
                      '&:hover': {
                        backgroundColor: colorLight,
                      },
                    }}>
                    {trend}
                  </Typography>
                </CustomRouterLink>
              </Box>
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default TrendingSearches;
