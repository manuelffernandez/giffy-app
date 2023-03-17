import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useGifList = () => {
  const containerRef = useRef(null);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [colsQty, setColsQty] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [displayGifList, setDisplayGifList] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setContainerWidth(containerRef.current?.offsetWidth);
    };
    window.addEventListener('resize', handleResize);

    setContainerWidth(containerRef.current?.offsetWidth);
    setDisplayGifList(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setColsQty(matchDownMd ? 2 : 4);
  }, [matchDownMd]);

  return { displayGifList, colsQty, containerRef, containerWidth };
};

export default useGifList;
