import { useNavigate } from 'react-router-dom';

interface ReturnType {
  handleSearch: (keyword: string) => void;
}

const useSearchBar = (): ReturnType => {
  const navigate = useNavigate();

  const handleSearch = (keyword: string): void => {
    navigate(`/search/${keyword}`);
  };

  return { handleSearch };
};

export default useSearchBar;
