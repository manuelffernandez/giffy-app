import { GifList, SearchBar } from '@/components';
import { useSearchBar } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams();
  const location = useLocation();
  const { gifs } = location.state;
  const { handleSearch, isLoading } = useSearchBar();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <SearchBar onSearch={handleSearch} queryTerm={queryTerm as string} />
      <GifList gifs={gifs} queryTerm={queryTerm as string} />
    </>
  );
};

export default SearchPage;
