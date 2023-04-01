import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState, type RefObject } from 'react';

// ******** EXPLANATION ******** //
// The idea of this custom hook is to be able to get by implementing a reference ('useRef')
// and a resize/window.eventListener, the dynamic width of the 'GifList' component's container.
// With this dynamic width and the respective sizes of the gif (obtained via 'getGifs'), it is
// that a proportional 'height' can be calculated to be able to layout its container.
// Namely, it will achieve that the 'img' element's container has the same ratio as the resource
// itself(i.e. gif).
// This is made to generate a containers layout (proportionally equal in size to the gifs) in
// screen, before they send the resource request to the url passed in the 'src' attribute.
// This layout is what allows to generate, while the user scrolls down, a correct lazy-loading of the images.

// ******** EXPLICACIÓN ******** //
// La idea de este custom hook es poder obtener mediante la implementacion de una referencia ('useRef')
// y un resize/window.eventListener, el ancho dinámico del contenedor del componente 'GifList'.
// Con este ancho dinámico y las respectivas medidas del gif (obtenidas a traves de 'getGifs'), es
// que se puede calcular un 'height' proporcional para poder maquetar el contenedor de este mismo.
// Es decir, lograr que el contenedor del elemento 'img' tenga la misma proporción que el
// recurso buscado (i.e. gif).
// Esto se hace para generar una maquetacion de contenedores (proporcionalmente igual a los gifs) en
// pantalla antes de que los mismos manden la solicitud del recurso a la url pasada en su atributo 'src'.
// Este maquetado es lo que permite generar, mientras el usuario escrolea hacia abajo, un correcto
// lazy-load de las imagenes.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useGifList = () => {
  const containerRef = useRef(null) as RefObject<HTMLDivElement>;
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [colsQty, setColsQty] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [displayGifList, setDisplayGifList] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setContainerWidth(containerRef.current?.offsetWidth as number);
    };
    window.addEventListener('resize', handleResize);

    setContainerWidth(containerRef.current?.offsetWidth as number);
    setDisplayGifList(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (matchDownSm) {
      setColsQty(1);
    } else if (matchDownMd) {
      setColsQty(2);
    } else {
      setColsQty(4);
    }
  }, [matchDownMd, matchDownSm]);

  return { displayGifList, colsQty, containerRef, containerWidth };
};

export default useGifList;
