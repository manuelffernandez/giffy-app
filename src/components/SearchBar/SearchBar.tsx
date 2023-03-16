import { type SearchFormValues } from '@/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SearchTextField } from './components';

interface Props {
  queryTerm: string;
}

const SearchBar = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const { queryTerm } = props;

  const handleSubmit = (values: SearchFormValues): void => {
    navigate(`/search/${values.queryTerm}`);
  };

  return (
    <Formik
      initialValues={{ queryTerm }}
      validationSchema={Yup.object({
        queryTerm: Yup.string().required('You have to search for something'),
      })}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => {
        const isError =
          !(errors.queryTerm == null) && (touched.queryTerm ?? false);

        return (
          <Form>
            <Stack direction='column' sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Field
                  sx={{ flex: 1 }}
                  name='queryTerm'
                  placeholder='Search for gifs'
                  required
                  autoComplete='off'
                  error={isError}
                  as={SearchTextField}
                />
                <IconButton
                  color={isError ? 'error' : 'primary'}
                  aria-label='search gifs'
                  component='button'
                  type='submit'>
                  <SearchIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography color='error.main' fontSize='medium'>
                  <ErrorMessage name='queryTerm' />
                </Typography>
              </Box>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchBar;
