import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

const ScrollTopButton = (): JSX.Element => {
  const [display, setDisplay] = useState<'' | 'none'>('none');

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 300) {
        setDisplay('');
      } else {
        setDisplay('none');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IconButton
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        padding: 0,
        margin: 0,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        display,
        '&:hover': {
          backgroundColor: 'primary.main',
        },
      }}
      onClick={handleClick}>
      <ExpandLessIcon />
    </IconButton>
  );
};

export default ScrollTopButton;
