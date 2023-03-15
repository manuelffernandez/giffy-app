import { CustomRouterLink } from '@/styledComponents';
import { Box, ImageListItem, Typography } from '@mui/material';

interface Props {
  title: string;
  url: string;
  id: string;
}

const GifItem = (props: Props): JSX.Element => {
  const { title, url, id } = props;
  return (
    <ImageListItem
      sx={{
        lineHeight: 0,
        position: 'relative',
      }}>
      <CustomRouterLink to={`/gif/${id}`}>
        <Box component='img' src={url} loading='lazy' width='100%'></Box>
        <Typography
          sx={{
            fontSize: 'small',
            paddingLeft: 1,
            paddingRight: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
          }}>
          {title}
        </Typography>
      </CustomRouterLink>
    </ImageListItem>
  );
};

export default GifItem;
