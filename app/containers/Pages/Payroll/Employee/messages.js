/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.Employee';

export default defineMessages({
  employeeCode: {
    id: `${scope}.personal.employeeCode`,
    defaultMessage: 'Code',
  },
  employeename: {
    id: `${scope}.personal.employeename`,
    defaultMessage: 'Name',
  },
  status: {
    id: `${scope}.personal.status`,
    defaultMessage: 'Status',
  },
  identitynumber: {
    id: `${scope}.personal.identitynumber`,
    defaultMessage: 'Identity Number',
  },
  organization: {
    id: `${scope}.personal.organization`,
    defaultMessage: 'Organization',
  },
  reportto: {
    id: `${scope}.personal.reportto`,
    defaultMessage: 'Report To',
  },
  jobname: {
    id: `${scope}.personal.jobname`,
    defaultMessage: 'Job',
  },
  isinsured: {
    id: `${scope}.personal.isinsured`,
    defaultMessage: 'Insured',
  },
  chooseEmp: {
    id: `boilerplate.containers.Payroll.Setting.chooseEmp`,
    defaultMessage: 'Select Employee',
  },
});
