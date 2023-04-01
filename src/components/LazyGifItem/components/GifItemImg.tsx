import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  src: string;
  alt: string;
}

const GifItemImg = (props: Props): ReactJSXElement => {
  const { src, alt } = props;
  return <img width='100%' height='100%' src={src} alt={alt} />;
};

export default GifItemImg;
