/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.errMes';

export default defineMessages({
      // ReplaceAnnualLeaveBalance
      EmpVacBalRepMoney_ErrorBalanceMsg: {
        id: `${scope}.code.EmpVacBalRepMoney_ErrorBalanceMsg`,
        defaultMessage: 'Error.. Replaced Balance is greater than current balance',
      },
      EmpVacBalRepMoney_ErrorOpenMonthMsg: {
        id: `${scope}.code.EmpVacBalRepMoney_ErrorOpenMonthMsg`,
        defaultMessage: 'This month is closed',
      },
      VacMonthOpenClose_ErrorYearAlreadyOpen: {
        id: `${scope}.code.VacMonthOpenClose_ErrorYearAlreadyOpen`,
        defaultMessage: 'Year Already Opened',
      },
      VacMonthOpenClose_ErrorPreviousyearnotclosed: {
        id: `${scope}.code.VacMonthOpenClose_ErrorPreviousyearnotclosed`,
        defaultMessage: 'Previous year was not closed ...cannot open new year',
      },
});
