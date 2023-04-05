import { FooterContainer } from '@/components/Footer/components';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Typography } from '@mui/material';

const Footer = (): JSX.Element => {
  return (
    <FooterContainer>
      <Typography
        sx={{ display: 'flex', alignItems: 'center', marginRight: 3 }}>
        Created by Manuel Fernandez - 2023
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        component='a'
        href='https://github.com/manuelffernandez/giffy-app'
        target='_blank'
        rel='noreferrer'>
        <GitHubIcon
          fontSize='large'
          sx={{
            color: 'primary.contrastText',
            '&:hover': { color: 'secondary.main' },
          }}
        />
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
