import { GifResults, SearchBar } from '@/components';
import { useGifs } from '@/hooks';
import { GifListSkeleton } from '@/styledComponents';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams() as { queryTerm: string };
  const { gifs, isLoading } = useGifs({ queryTerm });

  return (
    <>
      <h1>Search</h1>
      <SearchBar queryTerm={queryTerm} />
      {isLoading ? (
        <GifListSkeleton skeletonsQty={8} />
      ) : (
        <>
          <GifResults gifs={gifs} queryTerm={queryTerm} />
          <div id='visor'></div>
        </>
      )}
    </>
  );
};

export default SearchPage;
