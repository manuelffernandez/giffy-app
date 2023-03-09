import { createBrowserRouter } from 'react-router-dom';
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
    ],
  },
]);
