import { CustomRouterLink } from '@/styledComponents/CustomRouterLink';
import GifIcon from '@mui/icons-material/Gif';
import { AppBar, Toolbar } from '@mui/material';

const Header = (): JSX.Element => {
  return (
    <AppBar position='sticky' sx={{ mb: 5 }}>
      <Toolbar>
        <CustomRouterLink to='/'>
          <GifIcon fontSize='large' />
        </CustomRouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
