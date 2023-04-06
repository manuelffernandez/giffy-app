import { createBrowserRouter } from 'react-router-dom';
import { SearchPage } from '@/pages';
import { ErrorPage, Home, RootPage, DetailPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search/:term/:rating?',
        element: <SearchPage />,
      },
      {
        path: 'gif/:gifId',
        element: <DetailPage />,
      },
    ],
  },
]);
