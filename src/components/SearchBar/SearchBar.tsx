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
      {({ errors, touched }) => (
        <Form>
          <Stack direction='row'>
            <Box sx={{ mb: 5, flexGrow: 1 }}>
              <Field
                name='queryTerm'
                label='Search'
                placeholder='Search for gifs'
                variant='standard'
                required
                autoComplete='off'
                error={
                  !(errors.queryTerm == null) && (touched.queryTerm ?? false)
                }
                as={SearchTextField}
              />
              <Typography color='error.main' fontSize='medium'>
                <ErrorMessage name='queryTerm' />
              </Typography>
            </Box>
            <Box>
              <IconButton
                color={
                  !(errors.queryTerm == null) && (touched.queryTerm ?? false)
                    ? 'error'
                    : 'primary'
                }
                aria-label='search gifs'
                component='button'
                type='submit'>
                <SearchIcon />
              </IconButton>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
