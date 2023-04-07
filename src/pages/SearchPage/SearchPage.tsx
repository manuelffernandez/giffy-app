import { GifResults, SearchBar } from '@/components';
import { useParams } from 'react-router-dom';
import { RATINGS } from '@/helpers/ratings';

const SearchPage = (): JSX.Element => {
  const params = useParams() as {
    term: string;
    rating?: string;
  };

  return (
    <>
      <h1>Search</h1>
      <SearchBar queryTerm={params.term} />
      <GifResults
        query={{
          term: params.term,
          rating: params.rating ?? RATINGS[0],
        }}
      />
    </>
  );
};

export default SearchPage;
