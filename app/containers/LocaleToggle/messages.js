/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'English',
  },
  arKsa: {
    id: `${scope}.arKsa`,
    defaultMessage: 'Arabic Ksa',
  },
  ar: {
    id: `${scope}.ar`,
    defaultMessage: 'Arabic Egypt',
  },
});
