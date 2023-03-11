import { type SearchFormValues } from '@/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { type FormikHelpers } from 'formik/dist/types';
import * as Yup from 'yup';
import { SearchTextField } from './components';

interface Props {
  handleSubmit: (
    values: SearchFormValues,
    formikHelpers: FormikHelpers<SearchFormValues>
  ) => void;
}

const SearchBar = (props: Props): JSX.Element => {
  const { handleSubmit } = props;
  const initialValues: SearchFormValues = { queryTerm: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        queryTerm: Yup.string().required('You have to search for something'),
      })}
      onSubmit={handleSubmit}>
      {({ isSubmitting, errors, touched }) => {
        console.log(isSubmitting);
        return (
          <Form>
            <Stack direction='row'>
              <Box sx={{ mb: 5, flexGrow: 1 }}>
                <Field
                  name='queryTerm'
                  label='Search'
                  placeholder='Search for gifs'
                  variant='standard'
                  required
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
                  type='submit'
                  disabled={isSubmitting}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchBar;
