import {
  Container,
  ImageList,
  ImageListItem,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface Props {
  skeletonsQty?: number;
}

const GifListSkeleton = (props: Props = { skeletonsQty: 4 }): JSX.Element => {
  const { skeletonsQty } = props;
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const auxArray = Array.from(Array(skeletonsQty).keys());

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <ImageList
        variant='masonry'
        cols={matchDownMd ? 2 : 4}
        gap={8}
        sx={{ overflow: 'hidden' }}>
        {auxArray.map((_, index) => (
          <ImageListItem
            key={index}
            sx={{
              lineHeight: 0,
              position: 'relative',
            }}>
            <Skeleton
              variant='rectangular'
              animation='wave'
              width='100%'
              height={Math.floor(Math.random() * 220 + 160)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default GifListSkeleton;