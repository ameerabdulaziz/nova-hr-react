/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.KPI';

export default defineMessages({
  //KpiData----------------------------------------------------------------------------
  uploadErrorMess: {
    id: `${scope}.uploadErrorMess`,
    defaultMessage: 'This data has not been preserved due to incompleteness',
  },
});
