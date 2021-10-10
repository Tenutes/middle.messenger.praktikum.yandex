import { InputProps } from '../../components/Input';

const searchInputProps: InputProps = {
  type: 'search',
  name: 'search',
  required: false,
  id: 'search',
  classes: 'block w-full py-2 px-3 bg-white rounded-1 text-lg text-blue-dark',
};

export default {
  input: searchInputProps,
};
