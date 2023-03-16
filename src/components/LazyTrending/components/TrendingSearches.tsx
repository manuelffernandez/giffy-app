import { type AdaptedResponse, type TrendingTerms } from '@/interfaces';
import { getTrendingTerms } from '@/services';
import { CustomRouterLink } from '@/styledComponents';
import { randomColorGenerator } from '@/utils';
import { Box, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

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
        sx={{ color: 'primary.dark', textAlign: 'center', marginBottom: 3 }}>
        TRENDING
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Container
          component='ul'
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {trends.map((trend, index) => {
            const itemColor = randomColorGenerator();

            return (
              <Box key={index} component='li' sx={{ marginRight: 2 }}>
                <CustomRouterLink to={`/search/${trend}`}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      color: itemColor,
                      '&:hover': {
                        textDecoration: 'underline',
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
