import { GifResults, SearchBar } from '@/components';
import { useGifs, useNearScreen } from '@/hooks';
import { GifListSkeleton } from '@/styledComponents';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SearchPage = (): JSX.Element => {
  const { queryTerm } = useParams() as { queryTerm: string };
  const { gifs, isLoading } = useGifs({ queryTerm });
  const visorRef = useRef<HTMLDivElement>(null);
  const { isNear } = useNearScreen({
    externalRef: isLoading ? undefined : visorRef,
    once: false,
  });

  useEffect(() => {
    console.log(isNear);
  }, [isNear]);

  return (
    <>
      <h1>Search</h1>
      <SearchBar queryTerm={queryTerm} />
      {isLoading ? (
        <GifListSkeleton skeletonsQty={8} />
      ) : (
        <>
          <GifResults minHeight='1000px' gifs={gifs} queryTerm={queryTerm} />
          <div id='visor' ref={visorRef}></div>
        </>
      )}
    </>
  );
};

export default SearchPage;
