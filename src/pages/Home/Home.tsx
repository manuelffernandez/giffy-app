import { SearchBar } from '@/components';
import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  const trending = ['panda', 'cat', 'matrix'];

  return (
    <>
      <h1>Home</h1>
      <SearchBar queryTerm='' />
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
