import { type AdaptedResponse, type Gif, type OneGif } from '@/interfaces';
import { getGif } from '@/services';
import { useEffect, useState } from 'react';

interface Params {
  gifId: string;
}

const useGif = (params: Params): { isLoading: boolean; gif: Gif } => {
  const { gifId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gif, setGif] = useState<Gif>({ title: '', id: '', url: '' });

  const handleResponse = (response: AdaptedResponse<OneGif>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setGif(response.gif);
    } else {
      console.log('oh oh');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    // avoid no-floating-promises error
    void getGif(gifId).then(res => {
      handleResponse(res);
    });
  }, []);

  return { isLoading, gif };
};

export default useGif;
