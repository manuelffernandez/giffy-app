import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { memo } from 'react';

interface Props {
  src: string;
  alt: string;
}

const GifItemImg = (props: Props): ReactJSXElement => {
  const { src, alt } = props;
  return <img width='100%' height='100%' src={src} alt={alt} />;
};

export default memo(GifItemImg, (prevProps, currentProps) => {
  return !!(prevProps.src === currentProps.src);
});
