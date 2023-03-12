import { type AdaptedResponse } from '@/interfaces';
import { getGifs } from '@/services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface States {
  isLoading: boolean;
}

interface ReturnType {
  handleSearch: (keyword: string) => void;
  isLoading: boolean;
}

const useSearchBar = (): ReturnType => {
  const [isLoading, setIsLoading] = useState<States['isLoading']>(false);
  const navigate = useNavigate();

  const handleResponse = ({
    response,
    keyword,
  }: {
    response: AdaptedResponse<any>;
    keyword: string;
  }): void => {
    setIsLoading(false);

    if (response.isOk) {
      navigate(`/search/${keyword}`, { state: { gifs: response.gifs } });
    } else {
      console.log('oh oh');
    }
  };

  const handleSearch = (keyword: string): void => {
    setIsLoading(true);

    // avoid no-floating-promises error
    void getGifs(keyword).then(response => {
      handleResponse({ response, keyword });
    });
  };

  return { handleSearch, isLoading };
};

export default useSearchBar;
