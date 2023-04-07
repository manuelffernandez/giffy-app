import { RATINGS } from '@/helpers/ratings';
import { type SearchFormValues } from '@/interfaces';
import {
  Button,
  Container,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormContainer,
  FormOptionsContainer,
  SearchTextField,
} from './components';

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
        queryTerm: Yup.string().required('Write something'),
      })}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => {
        const isError =
          !(errors.queryTerm == null) && (touched.queryTerm ?? false);

        return (
          <Form>
            <FormContainer>
              <FormOptionsContainer>
                <Field name='rating'>
                  {({ field, form }) => {
                    return (
                      <Select
                        name='rating'
                        value={field.value}
                        onChange={event => {
                          form.setFieldValue(field.name, event.target.value);
                        }}
                        sx={{
                          width: '15%',
                          maxWidth: '100px',
                          minWidth: '90px',
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
                <Container
                  disableGutters
                  sx={{
                    position: 'relative',
                    ...(matchSm ? { marginLeft: 2 } : { marginX: 2 }),
                  }}>
                  <Field
                    name='queryTerm'
                    placeholder='Search for gifs'
                    required
                    autoComplete='off'
                    error={isError}
                    as={SearchTextField}
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      display: isError ? 'block' : 'hidden',
                      color: 'error.main',
                    }}>
                    {errors.queryTerm}
                  </Typography>
                </Container>
              </FormOptionsContainer>
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
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(SearchBar);
