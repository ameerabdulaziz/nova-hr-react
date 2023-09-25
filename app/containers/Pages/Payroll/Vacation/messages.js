/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.vac';

export default defineMessages({
      // Official Vacations
      OfficialVacations: {
        id: `${scope}.code.OfficialVacations`,
        defaultMessage: 'Official Vacations',
      },
      date: {
        id: `${scope}.code.date`,
        defaultMessage: 'Date',
      },
      EditOfficialVacation: {
        id: `${scope}.code.EditOfficialVacation`,
        defaultMessage: 'Edit Official Vacation',
      },
      CreateOfficialVacation: {
        id: `${scope}.code.CreateOfficialVacation`,
        defaultMessage: 'Create Official Vacation',
      },
      vacationDescriptionEN: {
        id: `${scope}.code.vacationDescriptionEN`,
        defaultMessage: 'Vacation description EN',
      },
      vacationDescriptionAr: {
        id: `${scope}.code.vacationDescriptionAr`,
        defaultMessage: 'Vacation description AR',
      },
      Elements: {
        id: `${scope}.code.Elements`,
        defaultMessage: 'Elements',
      },
      actions: {
        id: `${scope}.code.actions`,
        defaultMessage: 'Actions',
      },
      // Vacations Types
      enName: {
        id: `${scope}.code.enName`,
        defaultMessage: 'EN Name',
      },
      arName: {
        id: `${scope}.code.arName`,
        defaultMessage: 'AR Name',
      },
      deducted: {
        id: `${scope}.code.deducted`,
        defaultMessage: 'Deducted',
      },
      hasBalance: {
        id: `${scope}.code.hasBalance`,
        defaultMessage: 'Has balance',
      },
      isYearBalance: {
        id: `${scope}.code.isYearBalance`,
        defaultMessage: 'Annual vacation deduction',
      },
      shortcut: {
        id: `${scope}.code.shortcut`,
        defaultMessage: 'Shortcut',
      },
      halfDay: {
        id: `${scope}.code.halfDay`,
        defaultMessage: 'Half day',
      },
      vacationsTypes: {
        id: `${scope}.code.vacationsTypes`,
        defaultMessage: 'Vacations Types',
      },
      CreateVacationType: {
        id: `${scope}.code.CreateVacationType`,
        defaultMessage: 'Create Vacation Type',
      },
      EditVacationType: {
        id: `${scope}.code.EditVacationType`,
        defaultMessage: 'Edit Vacation Type',
      },
      vacationName: {
        id: `${scope}.code.vacationName`,
        defaultMessage: 'Vacation name',
      },
      element: {
        id: `${scope}.code.element`,
        defaultMessage: 'Element',
      },
      DayValue: {
        id: `${scope}.code.DayValue`,
        defaultMessage: 'Day value',
      },
      SalaryDeduction: {
        id: `${scope}.code.SalaryDeduction`,
        defaultMessage: 'Salary deduction',
      },
      Maximum: {
        id: `${scope}.code.Maximum`,
        defaultMessage: 'Maximum',
      },
      AnnualVacationDeduction: {
        id: `${scope}.code.AnnualVacationDeduction`,
        defaultMessage: 'Annual Vacation Deduction',
      },
      HalfDay: {
        id: `${scope}.code.HalfDay`,
        defaultMessage: 'Half day',
      },
      GovernmentSickVacation: {
        id: `${scope}.code.GovernmentSickVacation`,
        defaultMessage: 'Government sick Vacation',
      },
      HasBalance: {
        id: `${scope}.code.HasBalance`,
        defaultMessage: 'Has balance',
      },
      TransferToTheNextYear: {
        id: `${scope}.code.TransferToTheNextYear`,
        defaultMessage: 'Has balance',
      },
      MaternityVacation: {
        id: `${scope}.code.MaternityVacation`,
        defaultMessage: 'Maternity Vacation',
      },
      CalculatedAsAWorkingDay: {
        id: `${scope}.code.CalculatedAsAWorkingDay`,
        defaultMessage: 'Calculated as a working day',
      },
      HideItForTheEmployee: {
        id: `${scope}.code.HideItForTheEmployee`,
        defaultMessage: 'Hide it for the employee',
      },
      DonotApplyOfficialHolidaysRules: {
        id: `${scope}.code.DonotApplyOfficialHolidaysRules`,
        defaultMessage: 'Don\'t apply  official holidays rules',
      },
      AffectsTheIncentiveCalculation: {
        id: `${scope}.code.AffectsTheIncentiveCalculation`,
        defaultMessage: 'Affects the incentive calculation',
      },
      DoesnotTakeAWeekOff: {
        id: `${scope}.code.DoesnotTakeAWeekOff`,
        defaultMessage: 'Doesn\'t take a week off',
      },
      AnnualInAdvance: {
        id: `${scope}.code.AnnualInAdvance`,
        defaultMessage: 'Annual in advance',
      },
      MustAttachFile: {
        id: `${scope}.code.MustAttachFile`,
        defaultMessage: 'Must attach file',
      },
      // Government Sick Leave Setting
      GovernmentSickLeaveSetting: {
        id: `${scope}.code.GovernmentSickLeaveSetting`,
        defaultMessage: 'Government sick leave setting',
      },
      VacationType: {
        id: `${scope}.code.VacationType`,
        defaultMessage: 'Vacation type',
      },
      Yearly: {
        id: `${scope}.code.Yearly`,
        defaultMessage: 'Yearly',
      },
      Every3Years: {
        id: `${scope}.code.Every3Years`,
        defaultMessage: 'Every3Years',
      },
      DaysNumber: {
        id: `${scope}.code.DaysNumber`,
        defaultMessage: 'Days number',
      },
      CountValueDay: {
        id: `${scope}.code.CountValueDay`,
        defaultMessage: 'Count/Value(Day)',
      },
      EmployeeDeduction: {
        id: `${scope}.code.EmployeeDeduction`,
        defaultMessage: 'Employee deduction',
      },
      // Leaves Open Balance
      LeavesOpenBalanceTitle: {
        id: `${scope}.code.LeavesOpenBalanceTitle`,
        defaultMessage: 'Leaves open balance',
      },
      EmployeeName: {
        id: `${scope}.code.EmployeeName`,
        defaultMessage: 'Employee name',
      },
      LeaveType: {
        id: `${scope}.code.LeaveType`,
        defaultMessage: 'Leave type',
      },
      usedLeaves: {
        id: `${scope}.code.usedLeaves`,
        defaultMessage: 'Used leaves',
      },
      OpenBalance: {
        id: `${scope}.code.OpenBalance`,
        defaultMessage: 'Open balance',
      },
      Balance: {
        id: `${scope}.code.Balance`,
        defaultMessage: 'Balance',
      },
      PostedBalance: {
        id: `${scope}.code.PostedBalance`,
        defaultMessage: 'Posted balance',
      },
      UpdateCurrentBalance: {
        id: `${scope}.code.UpdateCurrentBalance`,
        defaultMessage: 'Update current balance',
      },
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
      TrxSerial: {
        id: `${scope}.code.TrxSerial`,
        defaultMessage: 'Trx serial',
      },
      EmployeeName: {
        id: `${scope}.code.EmployeeName`,
        defaultMessage: 'Employee name',
      },
      Template: {
        id: `${scope}.code.Template`,
        defaultMessage: 'Template',
      },
      Element: {
        id: `${scope}.code.Element`,
        defaultMessage: 'Element',
      },
      year: {
        id: `${scope}.code.year`,
        defaultMessage: 'Year',
      },
      Month: {
        id: `${scope}.code.Month`,
        defaultMessage: 'Month',
      },
      BalanceToReplace: {
        id: `${scope}.code.BalanceToReplace`,
        defaultMessage: 'Balance To Replace',
      },
      ReplaceAnnualLeaveBalance: {
        id: `${scope}.code.ReplaceAnnualLeaveBalance`,
        defaultMessage: 'Replace Annual Leave Balance',
      },
      EditReplaceAnnualLeaveBalance: {
        id: `${scope}.code.EditReplaceAnnualLeaveBalance`,
        defaultMessage: 'Edit Replace Annual Leave Balance',
      },
      CreateReplaceAnnualLeaveBalance: {
        id: `${scope}.code.CreateReplaceAnnualLeaveBalance`,
        defaultMessage: 'Create Replace Annual Leave Balance',
      },
      Job: {
        id: `${scope}.code.Job`,
        defaultMessage: 'Job',
      },
      Department: {
        id: `${scope}.code.Department`,
        defaultMessage: 'Department',
      },
      hiringDate: {
        id: `${scope}.code.hiringDate`,
        defaultMessage: 'hiringDate',
      },
      CurrentBalance: {
        id: `${scope}.code.CurrentBalance`,
        defaultMessage: 'Current balance',
      },
      caluValue: {
        id: `${scope}.code.caluValue`,
        defaultMessage: 'Calu Value',
      },
      Value: {
        id: `${scope}.code.Value`,
        defaultMessage: 'Value',
      },
            // Opening Closing Year For Leaves
      OpeningClosingYearForLeaves: {
        id: `${scope}.code.OpeningClosingYearForLeaves`,
        defaultMessage: 'Opening \ Closing Year For Leaves',
      },
      Organization: {
        id: `${scope}.code.Organization`,
        defaultMessage: 'Organization',
      },
      Year: {
        id: `${scope}.code.Year`,
        defaultMessage: 'Year',
      },
      StartDate: {
        id: `${scope}.code.StartDate`,
        defaultMessage: 'Start date',
      },
      EndDate: {
        id: `${scope}.code.EndDate`,
        defaultMessage: 'End date',
      },
      OpenYear: {
        id: `${scope}.code.OpenYear`,
        defaultMessage: 'Open Year',
      },
      CloseYear: {
        id: `${scope}.code.CloseYear`,
        defaultMessage: 'Close Year',
      },
      dateErrorMes: {
        id: `${scope}.code.dateErrorMes`,
        defaultMessage: 'End date precedes the start date',
      },
            // Opening Closing Year For Leaves
      OpeningClosingYearForLeaves: {
        id: `${scope}.code.OpeningClosingYearForLeaves`,
        defaultMessage: 'Opening \ Closing Year For Leaves',
      },
      Organization: {
        id: `${scope}.code.Organization`,
        defaultMessage: 'Organization',
      },
      Year: {
        id: `${scope}.code.Year`,
        defaultMessage: 'Year',
      },
      StartDate: {
        id: `${scope}.code.StartDate`,
        defaultMessage: 'Start date',
      },
      EndDate: {
        id: `${scope}.code.EndDate`,
        defaultMessage: 'End date',
      },
      OpenYear: {
        id: `${scope}.code.OpenYear`,
        defaultMessage: 'Open Year',
      },
      CloseYear: {
        id: `${scope}.code.CloseYear`,
        defaultMessage: 'Close Year',
      },
      dateErrorMes: {
        id: `${scope}.code.dateErrorMes`,
        defaultMessage: 'End date precedes the start date',
      },
      // Opening Closing Year For Leaves
      OpeningClosingYearForLeaves: {
        id: `${scope}.code.OpeningClosingYearForLeaves`,
        defaultMessage: 'Opening \ Closing Year For Leaves',
      },
      Organization: {
        id: `${scope}.code.Organization`,
        defaultMessage: 'Organization',
      },
      Year: {
        id: `${scope}.code.Year`,
        defaultMessage: 'Year',
      },
      StartDate: {
        id: `${scope}.code.StartDate`,
        defaultMessage: 'Start date',
      },
      EndDate: {
        id: `${scope}.code.EndDate`,
        defaultMessage: 'End date',
      },
      OpenYear: {
        id: `${scope}.code.OpenYear`,
        defaultMessage: 'Open Year',
      },
      CloseYear: {
        id: `${scope}.code.CloseYear`,
        defaultMessage: 'Close Year',
      },
      dateErrorMes: {
        id: `${scope}.code.dateErrorMes`,
        defaultMessage: 'End date precedes the start date',
      },      
});
