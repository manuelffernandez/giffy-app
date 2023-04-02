import { BackButton, GifDetail } from '@/components';
import { useParams } from 'react-router-dom';

const DetailPage = (): JSX.Element => {
  const { gifId } = useParams() as { gifId: string };

  return (
    <>
      <BackButton />
      <GifDetail gifId={gifId} />
    </>
  );
};

export default DetailPage;
