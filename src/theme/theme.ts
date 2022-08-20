import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { buttonStyles } from './components/button';
import { linkStyles } from './components/link';
import { inputStyles } from './components/input';

// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
  globalStyles,
  buttonStyles, // Button styles
  linkStyles, // Link styles
  inputStyles, // Input styles
);
