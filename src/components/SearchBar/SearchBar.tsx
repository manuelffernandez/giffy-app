import { RATINGS } from '@/helpers/ratings';
import { type SearchFormValues } from '@/interfaces';
import {
  Box,
  Button,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SearchTextField } from './components';

interface Props {
  queryTerm: string;
}

const SearchBar = (props: Props): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

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
            <Box
              id='formBox'
              sx={
                matchSm
                  ? {
                      display: 'flex',
                      flexDirection: 'column',
                    }
                  : {
                      display: 'flex',
                      flexDirection: 'row',
                    }
              }>
              <Box
                id='searchBox'
                sx={
                  matchSm
                    ? {
                        display: 'flex',
                        flex: 1,
                        marginBottom: 2,
                      }
                    : {
                        display: 'flex',
                        flex: 1,
                        marginBottom: 0,
                      }
                }>
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
                  name='queryTerm'
                  placeholder='Search for gifs'
                  required
                  autoComplete='off'
                  error={isError}
                  as={SearchTextField}
                  sx={matchSm ? { marginLeft: 2 } : { marginX: 2 }}
                />
              </Box>
              <Button
                sx={{
                  flex: 0.2,
                  minWidth: '120px',
                  boxShadow: 0,
                  letterSpacing: 4,
                  '&:hover': {
                    backgroundColor: isError ? 'error.light' : 'primary.light',
                    boxShadow: 0,
                  },
                }}
                variant='contained'
                color={isError ? 'error' : 'primary'}
                aria-label='search gifs'
                type='submit'>
                Search
              </Button>
              {/* <Typography
                sx={{
                  display: isError ? 'hidden' : 'inherit',
                }}
                color='error.main'
                fontSize='medium'>
                <ErrorMessage name='queryTerm' />
              </Typography> */}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(SearchBar);
