import { AppProps } from 'next/app';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import theme from 'theme/theme';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </I18nextProvider>
  );
};

export default MyApp;
