import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import HttpBackend from 'i18next-http-backend';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

const config = {
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  defaultLocale: 'en',
  locales: ['en', 'ja'],
  detection: {
    order: ['querystring', 'navigator', 'cookie', 'localStorage', 'sessionStorage'],
  },
  ns: ['common', 'RandomString'],
  backend: {
    backends: [LocalStorageBackend, HttpBackend],
    backendOptions: [
      { expirationTime: 60 * 60 * 1000 }, // for LocalStorageBackend, 1 hour
      { loadPath: '/locales/{{ns}}/{{lng}}.json' },
    ],
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(ChainedBackend)
  .init(config as any); // FIXME: backendOptions type error

export default i18n;
