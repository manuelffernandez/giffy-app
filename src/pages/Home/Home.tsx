import { GifList, SearchBar } from '@/components';
import {
  type AdaptedResponse,
  type Gif,
  type SearchFormValues,
} from '@/interfaces';
import { getGifs } from '@/services/gifs';
import { useEffect, useState } from 'react';

interface States {
  isLoading: boolean;
  gifs: Gif[];
  queryTerm: string;
}

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<States['isLoading']>(false);
  const [gifs, setGifs] = useState<States['gifs']>([]);
  const [queryTerm, setQueryTerm] = useState<States['queryTerm']>('');

  const handleResponse = (response: AdaptedResponse<any>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setGifs(response.gifs);
    } else {
      console.log('oh oh');
    }
  };

  const handleSearch = (keyword: string): void => {
    setIsLoading(true);

    // avoid no-floating-promises error
    void getGifs(keyword).then(res => {
      handleResponse(res);
    });
  };

  const handleSearchBarSubmit = (values: SearchFormValues): void => {
    // handleSearch(values.queryTerm);
    setQueryTerm(values.queryTerm);
  };

  useEffect(() => {
    if (queryTerm !== '') {
      handleSearch(queryTerm);
    } else {
      handleSearch('panda');
    }
  }, [queryTerm]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <SearchBar handleSubmit={handleSearchBarSubmit} />
      <GifList gifs={gifs} queryTerm={queryTerm} />
    </>
  );
};

export default Home;
