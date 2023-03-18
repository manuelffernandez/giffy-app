import { type AdaptedResponse, type Gif, type OneGif } from '@/interfaces';
import { getGif } from '@/services';
import { useEffect, useState } from 'react';

interface Params {
  gifId: string;
}

const useGif = (params: Params): { isLoading: boolean; gif: Gif } => {
  const { gifId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gif, setGif] = useState<Gif>({
    title: '',
    id: '',
    url: '',
    size: { width: 0, height: 0 },
  });

  const handleResponse = (response: AdaptedResponse<OneGif>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setGif(response.gif);
    } else {
      console.log('oh oh');
    }
  };

  useEffect(() => {
    // avoid no-floating-promises error
    void getGif(gifId).then(res => {
      handleResponse(res);
    });
  }, []);

  return { isLoading, gif };
};

export default useGif;
