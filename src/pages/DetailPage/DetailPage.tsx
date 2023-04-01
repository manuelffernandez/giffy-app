import { GifDetail } from '@/components';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPage = (): JSX.Element => {
  const { gifId } = useParams() as { gifId: string };
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant='outlined'
        onClick={() => {
          navigate(-1);
        }}>
        Go back
      </Button>
      <GifDetail gifId={gifId} />
    </>
  );
};

export default DetailPage;
