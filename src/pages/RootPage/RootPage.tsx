import { Footer, Header } from '@/components';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { RootContainer } from './components';

const RootPage = (): JSX.Element => {
  return (
    <RootContainer>
      <Header />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </RootContainer>
  );
};

export default RootPage;
