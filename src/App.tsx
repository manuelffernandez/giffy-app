import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import ColorModeProvider from './context/ColorModeProvider';
import { router } from './router';

function App(): JSX.Element {
  return (
    <ColorModeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ColorModeProvider>
  );
}

export default App;
