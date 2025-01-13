import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const CreateVacationType = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/VacationTypeCreate'),
  {
    fallback: <Loading />,
  }
);

const EditVacationType = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/VacationTypeCreate'),
  {
    fallback: <Loading />,
  }
);

const ExceptionVacDays = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/ExceptionVacDays'),
  {
    fallback: <Loading />,
  }
);

const VacationsTypes = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/VacationsTypes'),
  {
    fallback: <Loading />,
  }
);

const CreateOfficialVacation = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/OfficialVacationCreate'),
  {
    fallback: <Loading />,
  }
);

const EditOfficialVacation = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/OfficialVacationCreate'),
  {
    fallback: <Loading />,
  }
);

const OfficialVacations = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/OfficialVacations'),
  {
    fallback: <Loading />,
  }
);

const LeaveTrxReport = loadable(
  () => import('../../../Pages/Payroll/Vacation/Reports/LeaveTrxReport'),
  {
    fallback: <Loading />,
  }
);

const OpeningLeaveBalancesReport = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Reports/OpeningLeaveBalancesReport'
  ),
  {
    fallback: <Loading />,
  }
);

const LeaveReport = loadable(
  () => import('../../../Pages/Payroll/Vacation/Reports/LeaveReport'),
  {
    fallback: <Loading />,
  }
);

const BalanceUpdateLog = loadable(
  () => import('../../../Pages/Payroll/Vacation/Reports/BalanceUpdateLog'),
  {
    fallback: <Loading />,
  }
);

const LeaveTrx = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/LeaveTrx'),
  {
    fallback: <Loading />,
  }
);

const GovernmentSickLeave = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/GovernmentSickLeave'),
  {
    fallback: <Loading />,
  }
);

const GovernmentSickLeaveCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Transaction/GovernmentSickLeaveCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const LeaveTrxCreate = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/LeaveTrxCreate'),
  {
    fallback: <Loading />,
  }
);

const GovernmentSickLeaveSetting = loadable(
  () => import('../../../Pages/Payroll/Vacation/Code/GovernmentSickLeaveSetting'),
  {
    fallback: <Loading />,
  }
);

const LeaveOpenBalance = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/LeaveOpenBalance'),
  {
    fallback: <Loading />,
  }
);

const CreateReplaceAnnualLeaveBalance = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalanceCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const EditReplaceAnnualLeaveBalance = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalanceCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ReplaceAnnualLeaveBalance = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalance'
  ),
  {
    fallback: <Loading />,
  }
);

const OpeningClosingTheYearForLeaves = loadable(
  () => import(
    '../../../Pages/Payroll/Vacation/Transaction/OpeningClosingTheYearForLeaves'
  ),
  {
    fallback: <Loading />,
  }
);

const LeavesBalance = loadable(
  () => import('../../../Pages/Payroll/Vacation/Reports/LeavesBalance'),
  {
    fallback: <Loading />,
  }
);

const ImportVacations = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/ImportVacations'),
  {
    fallback: <Loading />,
  }
);

const GroupLeaves = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/GroupLeaves'),
  {
    fallback: <Loading />,
  }
);

const ImportLeaveBalance = loadable(
  () => import('../../../Pages/Payroll/Vacation/Transaction/ImportLeaveBalance'),
  {
    fallback: <Loading />,
  }
);

const vacation = {
  CreateVacationType,
  EditVacationType,
  ExceptionVacDays,
  VacationsTypes,
  CreateOfficialVacation,
  EditOfficialVacation,
  OfficialVacations,
  LeaveTrxReport,
  OpeningLeaveBalancesReport,
  LeaveReport,
  BalanceUpdateLog,
  LeaveTrx,
  GovernmentSickLeave,
  GovernmentSickLeaveCreate,
  LeaveTrxCreate,
  GovernmentSickLeaveSetting,
  LeaveOpenBalance,
  CreateReplaceAnnualLeaveBalance,
  EditReplaceAnnualLeaveBalance,
  ReplaceAnnualLeaveBalance,
  OpeningClosingTheYearForLeaves,
  LeavesBalance,
  ImportVacations,
  GroupLeaves,
  ImportLeaveBalance,
};

export default vacation;
