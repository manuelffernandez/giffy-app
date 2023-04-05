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
  const auxArray = Array.from(Array(skeletonsQty).keys());
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const defineColsQty = (): number => {
    if (matchDownSm) {
      return 1;
    } else if (matchDownMd) {
      return 2;
    } else {
      return 4;
    }
  };

  const MIN_HEIGHT = 160;
  const MAX_HEIGHT = 220;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <ImageList
        variant='masonry'
        cols={defineColsQty()}
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
              height={Math.floor(Math.random() * MAX_HEIGHT + MIN_HEIGHT)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default GifListSkeleton;
