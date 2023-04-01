import { GifResults, SearchBar } from '@/components';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams() as { queryTerm: string };

  return (
    <>
      <h1>Search</h1>
      <SearchBar queryTerm={queryTerm} />
      <GifResults queryTerm={queryTerm} />
    </>
  );
};

export default SearchPage;
