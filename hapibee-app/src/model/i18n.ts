import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { safeLanguage, userLangFromStorage } from './languageHelper';

i18n
  // Enables the i18next backend
  .use(Backend)
  // Enables the hook initialization module
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // Standard language used
    fallbackLng: safeLanguage(),
    lng: userLangFromStorage(),
    saveMissing: true,
    missingKeyHandler: () => true, // Do nothing because we don't have a translation database to save
    keySeparator: false, // we do not use keys in form messages.welcome
    //  Detects and caches a cookie from the language provided
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: process.env.NODE_ENV === 'production' ? false : false, // Prints on the console the debug results
  });

export default i18n;
