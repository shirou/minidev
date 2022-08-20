import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        auth: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('white', 'navy.700')(props),
            border: '1px solid',
            borderColor: mode('gray.200', 'transparent')(props),
            _placeholder: { color: mode('gray.300', 'gray.400')(props) },
          },
        }),
        search: (props: StyleFunctionProps) => ({
          field: {
            border: 'none',
            py: '11px',
            borderRadius: 'inherit',
            _placeholder: { color: mode('gray.300', 'gray.400')(props) },
          },
        }),
      },
    },
  },
};
