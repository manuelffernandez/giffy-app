import { GifList, SearchBar } from '@/components';
import { useSearchBar } from '@/hooks';
import { type AdaptedResponse, type Gif } from '@/interfaces';
import { getGifs } from '@/services';
import { useEffect, useState } from 'react';

interface States {
  isLoading: boolean;
  gifs: Gif[];
}

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<States['isLoading']>(false);
  const [gifs, setGifs] = useState<States['gifs']>([]);
  const { handleSearch } = useSearchBar();

  const handleResponse = (response: AdaptedResponse<any>): void => {
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
    void getGifs('panda').then(res => {
      handleResponse(res);
    });
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <SearchBar onSearch={handleSearch} />
      <GifList gifs={gifs} />
    </>
  );
};

export default Home;
