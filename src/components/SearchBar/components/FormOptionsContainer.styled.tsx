import { Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const FormOptionsContainer = styled(Box)(({ theme }) => {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    position: 'relative',
    display: 'flex',
    flex: 1,
    marginBottom: matchSm ? theme.spacing(3) : 0,
  };
});

export default FormOptionsContainer;
