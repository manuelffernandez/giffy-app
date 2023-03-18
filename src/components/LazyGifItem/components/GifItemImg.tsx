import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  src: string;
}

const GifItemImg = (props: Props): ReactJSXElement => {
  const { src } = props;
  return <img width='100%' height='100%' src={src} />;
};

export default GifItemImg;
