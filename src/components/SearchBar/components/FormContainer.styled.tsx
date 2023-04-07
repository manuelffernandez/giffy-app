import { Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)(({ theme }) => {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    display: 'flex',
    flexDirection: matchSm ? 'column' : 'row',
    marginBottom: matchSm ? theme.spacing(2) : theme.spacing(4),
  };
});

export default FormContainer;
