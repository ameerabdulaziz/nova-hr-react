/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.Setting';

export default defineMessages({
  //UserMenu----------------------------------------------------------------------------
  parentName: {
    id: `${scope}.parentName`,
    defaultMessage: 'Parent Name',
  },
  menuName: {
    id: `${scope}.menuName`,
    defaultMessage: 'Menu Name',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: 'Address',
  },
  print: {
    id: `${scope}.print`,
    defaultMessage: 'Print',
  },
  favorites: {
    id: `${scope}.favorites`,
    defaultMessage: 'Favorites',
  },
  chooseEmp: {
    id: `${scope}.chooseEmp`,
    defaultMessage: 'Select Employee',
  },
  chooseMenu: {
    id: `${scope}.chooseMenu`,
    defaultMessage: 'Select Menu',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Reset',
  },
  //MailSetting----------------------------------------------------------------------------
  
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'User Name',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  servername: {
    id: `${scope}.servername`,
    defaultMessage: 'Server Name',
  },
  portallink: {
    id: `${scope}.portallink`,
    defaultMessage: 'Portal Link',
  },
  portno: {
    id: `${scope}.portno`,
    defaultMessage: 'Port No',
  },
  //SMSSetting---------------------------------------------------------------------
 
  sendername: {
    id: `${scope}.sendername`,
    defaultMessage: 'Sender Name',
  },
  //resetPassword------------------------------------------------------------------
  chooseDept: {
    id: `${scope}.chooseDept`,
    defaultMessage: 'Select Department',
  },
  resetallpassword:{
    id: `${scope}.resetallpassword`,
    defaultMessage: 'Reset All',
  },
  resetpassword:{
    id: `${scope}.resetpassword`,
    defaultMessage: 'Reset Password',
  }
});
