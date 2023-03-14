import { GifList, SearchBar } from '@/components';
import { useGifs } from '@/hooks';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams() as { queryTerm: string };
  const { gifs, isLoading } = useGifs({ queryTerm });

  return (
    <>
      <h1>Search</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchBar queryTerm={queryTerm} />
          <GifList gifs={gifs} queryTerm={queryTerm} />
        </>
      )}
    </>
  );
};

export default SearchPage;
