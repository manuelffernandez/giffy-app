import { useNearScreen } from '@/hooks';
import { CustomRouterLink } from '@/styledComponents';
import { Box, ImageListItem, Typography } from '@mui/material';
import { lazy, Suspense } from 'react';

interface Props {
  title: string;
  url: string;
  id: string;
  height: number;
}

const GifItemImg = lazy(async () => await import('./components/GifItemImg'));

const LazyGifItem = (props: Props): JSX.Element => {
  const { isNear, fromRef } = useNearScreen({ distance: '0px' });
  const { title, url, id, height } = props;

  return (
    <ImageListItem
      sx={{
        lineHeight: 0,
        position: 'relative',
      }}>
      <CustomRouterLink to={`/gif/${id}`}>
        <Box
          ref={fromRef}
          sx={{ width: '100%', height, backgroundColor: 'grey.400' }}>
          <Suspense>{isNear ? <GifItemImg src={url} /> : null}</Suspense>
        </Box>
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

export default LazyGifItem;
