import { type Gif } from '@/interfaces';
import { getGifs } from '@/services';
import { useEffect, useState } from 'react';

interface Params {
  queryTerm: string;
}

const INITIAL_PAGE_NUMBER = 0;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useGifs = (params: Params) => {
  const { queryTerm } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER);

  const pageForward = (): void => {
    setPageNumber(prevPage => prevPage + 1);
  };

  const pageBack = (): void => {
    setPageNumber(prevPage => prevPage - 1);
  };

  useEffect(() => {
    // avoid no-floating-promises error
    void getGifs({ queryTerm }).then(res => {
      setIsLoading(false);
      if (res.isOk) {
        setGifs(res.gifs);
      } else {
        console.log('oh oh');
      }
    });
  }, [queryTerm]);

  useEffect(() => {
    setIsLoadingPage(true);
    if (pageNumber === INITIAL_PAGE_NUMBER) return;
    // avoid no-floating-promises error
    void getGifs({ queryTerm, pageNumber }).then(res => {
      setIsLoadingPage(false);
      if (res.isOk) {
        setGifs(prevGifs => {
          // sometimes the API returns repeated gifs when the offset is setted on the call
          // this functionality may causes to not render all the requested gifs
          const filteredGifs = res.gifs.filter(
            gif => prevGifs.find(prevGif => prevGif.id === gif.id) === undefined
          );
          return prevGifs.concat(filteredGifs);
        });
      } else {
        console.log('oh oh');
      }
    });
  }, [pageNumber]);

  return { isLoading, isLoadingPage, gifs, pageNumber, pageForward, pageBack };
};

export default useGifs;
