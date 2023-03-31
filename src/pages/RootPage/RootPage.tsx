import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';
import { MainContainer, RootContainer } from './components';

const RootPage = (): JSX.Element => {
  return (
    <RootContainer>
      <Header />
      <MainContainer maxWidth='xl'>
        <Outlet />
      </MainContainer>
      <Footer />
    </RootContainer>
  );
};

export default RootPage;
