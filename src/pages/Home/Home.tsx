import { LazyTrending, SearchBar } from '@/components';
import { Typography } from '@mui/material';
const Home = (): JSX.Element => {
  return (
    <>
      <Typography component='h1' variant='h2'>
        Home
      </Typography>
      <SearchBar queryTerm='' />
      <LazyTrending />
    </>
  );
};

export default Home;
