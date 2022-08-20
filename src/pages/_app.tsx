import Head, { AppProps } from 'next/app';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from 'theme/theme';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
