import { createBrowserRouter } from 'react-router-dom';
import { Search } from '@/pages';
import { ErrorPage, Home, RootPage } from './pages';

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
        path: 'search/:queryTerm',
        element: <Search />,
      },
    ],
  },
]);
