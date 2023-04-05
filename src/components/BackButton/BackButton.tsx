import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const handleClick = (): void => {
    if (state !== null) {
      navigate(state.prevPath);
    } else {
      navigate('/');
    }
  };

  return (
    <Button variant='outlined' onClick={handleClick}>
      {state !== null ? 'Back' : 'Home'}
    </Button>
  );
};

export default BackButton;
