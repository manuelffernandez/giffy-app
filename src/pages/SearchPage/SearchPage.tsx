import { GifList, SearchBar } from '@/components';
import { useSearchBar } from '@/hooks';
import { type AdaptedResponse, type Gif } from '@/interfaces';
import { getGifs } from '@/services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
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
    void getGifs(queryTerm as string).then(res => {
      handleResponse(res);
    });
  }, [queryTerm]);

  return (
    <>
      <h1>Search</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchBar onSearch={handleSearch} queryTerm={queryTerm as string} />
          <GifList gifs={gifs} queryTerm={queryTerm as string} />
        </>
      )}
    </>
  );
};

export default SearchPage;
