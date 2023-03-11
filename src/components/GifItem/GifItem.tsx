interface Props {
  title: string;
  url: string;
}

const GifItem = (props: Props): JSX.Element => {
  const { title, url } = props;
  return (
    <div>
      <p>{title}</p>
      <img src={url} />
    </div>
  );
};

export default GifItem;
