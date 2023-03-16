import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';
import { RootContainer, MainContainer } from './components';

const RootPage = (): JSX.Element => {
  return (
    <RootContainer>
      <Header />
      <MainContainer maxWidth='xl' component='main'>
        <Outlet />
      </MainContainer>
      <Footer />
    </RootContainer>
  );
};

export default RootPage;
