import { useColorMode } from '@/hooks/useColorMode';
import { CustomRouterLink } from '@/styledComponents/CustomRouterLink';
import GifIcon from '@mui/icons-material/Gif';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = (): JSX.Element => {
  const { colorMode, actualMode } = useColorMode();

  const handleClick = (): void => {
    colorMode.toggleColorMode();
  };

  return (
    <AppBar position='sticky' sx={{ mb: 5, backgroundColor: 'primary.main' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomRouterLink to='/'>
          <GifIcon fontSize='large' />
        </CustomRouterLink>
        <IconButton
          onClick={handleClick}
          sx={{ color: 'primary.contrastText' }}>
          {actualMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
