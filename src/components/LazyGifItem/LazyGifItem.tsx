import { useNearScreen } from '@/hooks';
import { CustomRouterLink } from '@/styledComponents';
import { Box, Typography } from '@mui/material';
import { Suspense, lazy, memo } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  title: string;
  url: string;
  id: string;
  height: number;
  masonryClass: string;
}

const GifItemImg = lazy(async () => await import('./components/GifItemImg'));

const LazyGifItem = (props: Props): JSX.Element => {
  const { isNear, fromRef } = useNearScreen({ distance: '0px' });
  const { title, url, id, height, masonryClass } = props;
  const navigation = useLocation();

  return (
    <Box
      className={`${masonryClass}`}
      sx={{
        position: 'relative',
        '&:hover': {
          boxShadow: 10,
        },
      }}>
      <CustomRouterLink
        to={`/gif/${id}`}
        state={{ prevPath: navigation.pathname }}>
        <Box
          ref={fromRef}
          sx={{
            width: '100%',
            height,
            backgroundColor: 'grey.400',
            marginBottom: 0,
          }}>
          <Suspense>
            {isNear ? <GifItemImg src={url} alt={title} /> : null}
          </Suspense>
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
    </Box>
  );
};

export default memo(LazyGifItem, (prevProps, currentProps) => {
  return !!(
    prevProps.id === currentProps.id && prevProps.height === currentProps.height
  );
});
