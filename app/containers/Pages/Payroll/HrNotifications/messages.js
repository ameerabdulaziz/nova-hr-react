/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.HrNotifications';

export default defineMessages({
    jobName: {
      id: `${scope}.jobName`,
      defaultMessage: 'Job Name',
    },
    txDate: {
      id: `${scope}.txDate`,
      defaultMessage: 'Date',
    },
    trxReason: {
      id: `${scope}.trxReason`,
      defaultMessage: 'Reason',
    },
    adminNotes: {
      id: `${scope}.adminNotes`,
      defaultMessage: 'Admin Notes',
    },
    birthDate: {
      id: `${scope}.birthDate`,
      defaultMessage: 'Birth Date',
    },
    workEmail: {
      id: `${scope}.workEmail`,
      defaultMessage: 'Work Email',
    },
    mobile: {
      id: `${scope}.mobile`,
      defaultMessage: 'Mobile',
    },
    template: {
      id: `${scope}.template`,
      defaultMessage: 'Template',
    },
    docname: {
      id: `${scope}.docname`,
      defaultMessage: 'Doc name',
    },
});
