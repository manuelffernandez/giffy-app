import { GifList, SearchBar } from '@/components';
import {
  type AdaptedResponse,
  type Gif,
  type SearchFormValues,
} from '@/interfaces';
import { getGifs } from '@/services/gifs';
import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

interface States {
  isLoading: boolean;
  gifs: Gif[];
  queryTerm: string;
}

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<States['isLoading']>(false);
  const [gifs, setGifs] = useState<States['gifs']>([]);
  const [queryTerm, setQueryTerm] = useState<States['queryTerm']>('');
  const lastQueryTerm = useMemo(() => queryTerm, [queryTerm]);

  const handleResponse = (response: AdaptedResponse<any>): void => {
    setIsLoading(false);

    if (response.isOk) {
      setGifs(response.gifs);
    } else {
      console.log('oh oh');
    }
  };

  const handleSearch = (keyword: string): void => {
    setIsLoading(true);

    // avoid no-floating-promises error
    void getGifs(keyword).then(res => {
      handleResponse(res);
    });
  };

  const handleSearchBarSubmit = async (
    values: SearchFormValues
  ): Promise<void> => {
    setQueryTerm(values.queryTerm);
    handleSearch(values.queryTerm);
  };

  useEffect(() => {
    handleSearch('panda');
  }, []);

  const initialValues: SearchFormValues = { queryTerm: lastQueryTerm };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          queryTerm: Yup.string().required('You have to search for something'),
        })}
        onSubmit={handleSearchBarSubmit}>
        {({ errors, touched }) => (
          <SearchBar errors={errors} touched={touched} />
        )}
      </Formik>
      <GifList gifs={gifs} queryTerm={lastQueryTerm} />
    </>
  );
};

export default Home;
