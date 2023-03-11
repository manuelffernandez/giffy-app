import { type SearchFormValues } from '@/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import {
  ErrorMessage,
  Field,
  Form,
  type FormikErrors,
  type FormikTouched,
} from 'formik';
import { SearchTextField } from './components';

interface Props {
  errors: FormikErrors<SearchFormValues>;
  touched: FormikTouched<SearchFormValues>;
}

const SearchBar = (props: Props): JSX.Element => {
  const { errors, touched } = props;

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
            autoComplete='off'
            error={!(errors.queryTerm == null) && (touched.queryTerm ?? false)}
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
  );
};

export default SearchBar;
