import { type AdaptedResponse, type Gif, type VariousGif } from '@/interfaces';
import { getGifs } from '@/services';
import { useEffect, useState } from 'react';

interface Params {
  queryTerm: string;
}

const useGifs = (params: Params): { isLoading: boolean; gifs: Gif[] } => {
  const { queryTerm } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleResponse = (response: AdaptedResponse<VariousGif>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setGifs(response.gifs);
    } else {
      console.log('oh oh');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    // avoid no-floating-promises error
    void getGifs(queryTerm).then(res => {
      handleResponse(res);
    });
  }, [queryTerm]);

  return { isLoading, gifs };
};

export default useGifs;
