import { Box, styled } from '@mui/system';

const RootContainer = styled(Box)(() => ({
  height: '100vh',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default RootContainer;
