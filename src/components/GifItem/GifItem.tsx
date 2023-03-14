import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  url: string;
}

const GifItem = (props: Props): JSX.Element => {
  const { title, url } = props;
  return (
    <Box
      sx={{
        lineHeight: 0,
        position: 'relative',
      }}>
      <Box component='img' src={url}></Box>
      <Typography
        fontSize='small'
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
        }}>
        {title}
      </Typography>
    </Box>
  );
};

export default GifItem;
