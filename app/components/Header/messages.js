/*
 * Header Component
 *
 * This contains all the text for the Header Componen.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  fullScreen: {
    id: `${scope}.action.fullScreen`,
    defaultMessage: 'Full Screen',
  },
  exitFullScreen: {
    id: `${scope}.action.exitFullScreen`,
    defaultMessage: 'Exit Full Screen',
  },
  askNova: {
    id: `${scope}.action.askNova`,
    defaultMessage: 'Ask Nova',
  },
  lamp: {
    id: `${scope}.action.lamp`,
    defaultMessage: 'Turn Dark/Light',
  },
  guide: {
    id: `${scope}.action.guide`,
    defaultMessage: 'Show Guide',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search Ui',
  },
  profile: {
    id: `${scope}.user.profile`,
    defaultMessage: 'My Profile',
  },
  task: {
    id: `${scope}.user.task`,
    defaultMessage: 'My Task',
  },
  email: {
    id: `${scope}.user.email`,
    defaultMessage: 'My Inbox',
  },
  logout: {
    id: `${scope}.user.logout`,
    defaultMessage: 'Log Out',
  },
  login: {
    id: `${scope}.user.login`,
    defaultMessage: 'Log In',
  },
  noNotification: {
    id: `${scope}.noNotification`,
    defaultMessage: 'noNotification',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'changePassword',
  },
  noNews: {
    id: `${scope}.noNews`,
    defaultMessage: 'No News',
  },
  seeAll: {
    id: `${scope}.seeAll`,
    defaultMessage: 'See All',
  },
});
