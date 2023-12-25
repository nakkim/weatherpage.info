/* eslint-disable @typescript-eslint/no-floating-promises */
import {changeLanguage, use} from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import fi from './translations/fi.json';

export const supportedLanguages = ['en', 'fi'];

use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: 'en',
  resources: {
    en,
    fi,
  },
  supportedLngs: supportedLanguages,
});

changeLanguage();
