import { SearchBar } from '@/components';
import { useSearchBar } from '@/hooks';
import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  const { handleSearch } = useSearchBar();

  const trending = ['panda', 'cat', 'matrix'];

  return (
    <>
      <h1>Home</h1>
      <SearchBar onSearch={handleSearch} queryTerm='' />
      <h2>Popular gifs</h2>
      <ul>
        {trending.map(word => (
          <li key={word}>
            <Link to={`/search/${word}`}>{`${word} gifs`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
