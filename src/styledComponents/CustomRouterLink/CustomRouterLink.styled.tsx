import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const CustomRouterLink = styled(Link)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
}));

export default CustomRouterLink;
