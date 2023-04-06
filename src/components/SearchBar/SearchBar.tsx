import { RATINGS } from '@/helpers/ratings';
import { type SearchFormValues } from '@/interfaces';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SearchTextField } from './components';

interface Props {
  queryTerm: string;
}

const SearchBar = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const { queryTerm } = props;

  const initialValues: SearchFormValues = {
    queryTerm,
    rating: 'g',
  };

  const handleSubmit = (values: SearchFormValues): void => {
    navigate(`/search/${values.queryTerm}/${values.rating}`);
  };

  return (
    <Formik
      initialValues={initialValues}
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
              <Box sx={{ display: 'flex' }}>
                <Field name='rating'>
                  {({ field, form }) => {
                    return (
                      <Select
                        sx={{
                          width: '15%',
                          maxWidth: '100px',
                          minWidth: '90px',
                        }}
                        name='rating'
                        value={field.value}
                        onChange={event => {
                          form.setFieldValue(field.name, event.target.value);
                        }}>
                        <MenuItem disabled>Rating</MenuItem>
                        {RATINGS.map(rating => (
                          <MenuItem key={rating} value={rating}>
                            {rating}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                </Field>
                <Field
                  sx={{ marginX: 2 }}
                  name='queryTerm'
                  placeholder='Search for gifs'
                  required
                  autoComplete='off'
                  error={isError}
                  as={SearchTextField}
                />
                <Button
                  sx={{
                    width: '15%',
                    minWidth: '120px',
                    boxShadow: 0,
                    letterSpacing: 4,
                    '&:hover': {
                      backgroundColor: isError
                        ? 'error.light'
                        : 'primary.light',
                      boxShadow: 0,
                    },
                  }}
                  variant='contained'
                  color={isError ? 'error' : 'primary'}
                  aria-label='search gifs'
                  type='submit'>
                  Search
                </Button>
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

export default memo(SearchBar);
