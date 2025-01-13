import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const PermissionTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxList'
  ),
  {
    fallback: <Loading />,
  }
);
const PermissionTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const PermissionTrxReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/PermissionTrxReport'),
  {
    fallback: <Loading />,
  }
);

const MissionTransportaion = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Mission/MissionTransportaion'
  ),
  {
    fallback: <Loading />,
  }
);

const PermissionList = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Permission/PermissionList'),
  {
    fallback: <Loading />,
  }
);
const PermissionCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Code/Permission/PermissionCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const PermissionTrxImport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxImport'
  ),
  {
    fallback: <Loading />,
  }
);
const CollectedPermission = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Permission/CollectedPermission'
  ),
  {
    fallback: <Loading />,
  }
);
const MissionType = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Mission/MissionType'),
  {
    fallback: <Loading />,
  }
);

const MissionTypeCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Mission/MissionTypeCreate'),
  {
    fallback: <Loading />,
  }
);

const MissionTypeEdit = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Mission/MissionTypeCreate'),
  {
    fallback: <Loading />,
  }
);

const ShiftList = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftList'),
  {
    fallback: <Loading />,
  }
);
const ShiftManPower = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftManPower'),
  {
    fallback: <Loading />,
  }
);

const ShiftCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftCreate'),
  {
    fallback: <Loading />,
  }
);

const ShiftEmployeeList = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftEmployeeList'),
  {
    fallback: <Loading />,
  }
);
const ShiftEmployeeCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftEmployeeCreate'),
  {
    fallback: <Loading />,
  }
);

const ShiftOrgnization = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftOrgnization'),
  {
    fallback: <Loading />,
  }
);
const ShiftTransfere = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftTransfere'),
  {
    fallback: <Loading />,
  }
);
const ShiftReview = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftReview'),
  {
    fallback: <Loading />,
  }
);
const ShiftImport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Shift/ShiftImport'),
  {
    fallback: <Loading />,
  }
);

const MissionTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Mission/MissionTrxList'
  ),
  {
    fallback: <Loading />,
  }
);
const MissionTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Mission/MissionTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const SwapShiftTrx = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/SwapShiftTrx'),
  {
    fallback: <Loading />,
  }
);
const SwapShiftTrxCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/SwapShiftTrxCreate'),
  {
    fallback: <Loading />,
  }
);

const CalculateAttendance = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/CalculateAttendance'),
  {
    fallback: <Loading />,
  }
);

const MissionTrxReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/MissionTrxReport'),
  {
    fallback: <Loading />,
  }
);
const MissionTrxImport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Mission/MissionTrxImport'
  ),
  {
    fallback: <Loading />,
  }
);
const CollectedMission = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Mission/CollectedMission'
  ),
  {
    fallback: <Loading />,
  }
);

const RulesList = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/AttRules/AttRulesList'),
  {
    fallback: <Loading />,
  }
);
const RulesCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/AttRules/AttRulesCreate'),
  {
    fallback: <Loading />,
  }
);
const DeviceList = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Device/DeviceList'),
  {
    fallback: <Loading />,
  }
);
const DeviceCreate = loadable(
  () => import('../../../Pages/Payroll/Attendance/Code/Device/DeviceCreate'),
  {
    fallback: <Loading />,
  }
);
const MissionReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/MissionReport'),
  {
    fallback: <Loading />,
  }
);

const EmployeeShiftReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/EmployeeShiftReport'),
  {
    fallback: <Loading />,
  }
);

const DetailedReportAbsences = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/DetailedReportAbsences'),
  {
    fallback: <Loading />,
  }
);

const EmployeesWithoutShiftsReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/EmployeesWithoutShiftsReport'
  ),
  {
    fallback: <Loading />,
  }
);

const OverTimeDetailsReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/OverTimeDetailsReport'),
  {
    fallback: <Loading />,
  }
);

const AbsenceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/AbsenceReport'),
  {
    fallback: <Loading />,
  }
);

const EarlyAttendanceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/EarlyAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

const EarlyLeavingReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/EarlyLeavingReport'),
  {
    fallback: <Loading />,
  }
);

const OvertimeHoursRequest = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Overtime/OvertimeHoursRequest'
  ),
  {
    fallback: <Loading />,
  }
);

const OvertimeHoursRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Overtime/OvertimeHoursRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const EmployeeLessTimeReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/EmployeeLessTimeReport'),
  {
    fallback: <Loading />,
  }
);

const ReviewOvertime = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/Overtime/ReviewOvertime'
  ),
  {
    fallback: <Loading />,
  }
);
const RemoveEmployeeSign = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/RemoveEmployeeSign'),
  {
    fallback: <Loading />,
  }
);
const EmployeeAttendance = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/EmployeeAttendance'),
  {
    fallback: <Loading />,
  }
);
const EmployeeLocation = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/EmployeeLocation'),
  {
    fallback: <Loading />,
  }
);
const DataFromAllDevices = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/DataFromAllDevices'),
  {
    fallback: <Loading />,
  }
);
const GetAttLog = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/GetAttLog'),
  {
    fallback: <Loading />,
  }
);
const EmployeeAttendanceTemplateReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/EmployeeAttendanceTemplateReport'
  ),
  {
    fallback: <Loading />,
  }
);

const ManHoursReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/ManHoursReport'),
  {
    fallback: <Loading />,
  }
);

const AttendanceRatioReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/AttendanceRatioReport'),
  {
    fallback: <Loading />,
  }
);

const MonthlyAttendanceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/MonthlyAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

const AttendanceDeviceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/AttendanceDeviceReport'),
  {
    fallback: <Loading />,
  }
);

const ContinuousAbsenceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/ContinuousAbsenceReport'),
  {
    fallback: <Loading />,
  }
);

const RegisterInAndOutReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/RegisterInAndOutReport'),
  {
    fallback: <Loading />,
  }
);

const ManualAttendanceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/ManualAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

const BreakTimeReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/BreakTimeReport'),
  {
    fallback: <Loading />,
  }
);

const StatisticalReport2 = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/StatisticalReport2'),
  {
    fallback: <Loading />,
  }
);

const WorkinHoursByTimeReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/WorkinHoursByTimeReport'),
  {
    fallback: <Loading />,
  }
);

const OverTimeReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/OverTimeReport'),
  {
    fallback: <Loading />,
  }
);

const WorkinLeavesDetailsReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/WorkinLeavesDetailsReport'
  ),
  {
    fallback: <Loading />,
  }
);

const OverTimeDayNightReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/OverTimeDayNightReport'),
  {
    fallback: <Loading />,
  }
);

const WorkinLeavesReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/WorkinLeavesReport'),
  {
    fallback: <Loading />,
  }
);

const LateAttendanceReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/LateAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

const DetailedAttendanceReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/DetailedAttendanceReport'
  ),
  {
    fallback: <Loading />,
  }
);

const DetailedAttendanceReview = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/DetailedAttendanceReview'
  ),
  {
    fallback: <Loading />,
  }
);

const MonthlyAttendanceSummaryReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/MonthlyAttendanceSummaryReport'
  ),
  {
    fallback: <Loading />,
  }
);

const MonthlyStatisticsReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/MonthlyStatisticsReport'),
  {
    fallback: <Loading />,
  }
);

const DeviceLogReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/DeviceLogReport'),
  {
    fallback: <Loading />,
  }
);

const AttendanceRatiosStatementsReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/AttendanceRatiosStatementsReport'
  ),
  {
    fallback: <Loading />,
  }
);

const RegisterLocationCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocationCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const RegisterLocationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocationCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const RegisterLocation = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocation'
  ),
  {
    fallback: <Loading />,
  }
);

const ShiftManPowerReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/ShiftManPowerReport'),
  {
    fallback: <Loading />,
  }
);

const GPSAttendance = loadable(
  () => import('../../../Pages/Payroll/Attendance/Transaction/GPS-Attendance'),
  {
    fallback: <Loading />,
  }
);

const LocationAttendanceReport = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Reports/LocationAttendanceReport'
  ),
  {
    fallback: <Loading />,
  }
);

const EmployeeLocationReport = loadable(
  () => import('../../../Pages/Payroll/Attendance/Reports/EmployeeLocationReport'),
  {
    fallback: <Loading />,
  }
);

const ForgotFingerprintRequest = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequest'
  ),
  {
    fallback: <Loading />,
  }
);

const ForgotFingerprintRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ForgotFingerprintRequestEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const EmployeeSchedule = loadable(
  () => import(
    '../../../Pages/Payroll/Attendance/Code/EmployeeSchedule/EmployeeSchedule'
  ),
  {
    fallback: <Loading />,
  }
);

const attendance = {
  PermissionTrxList,
  PermissionTrxCreate,
  PermissionTrxReport,
  MissionTransportaion,
  PermissionList,
  PermissionCreate,
  PermissionTrxImport,
  CollectedPermission,
  MissionType,
  MissionTypeCreate,
  MissionTypeEdit,
  ShiftList,
  ShiftManPower,
  ShiftCreate,
  ShiftEmployeeList,
  ShiftEmployeeCreate,
  ShiftOrgnization,
  ShiftTransfere,
  ShiftReview,
  ShiftImport,
  MissionTrxList,
  MissionTrxCreate,
  SwapShiftTrx,
  SwapShiftTrxCreate,
  CalculateAttendance,
  MissionTrxReport,
  MissionTrxImport,
  CollectedMission,
  RulesList,
  RulesCreate,
  DeviceList,
  DeviceCreate,
  MissionReport,
  EmployeeShiftReport,
  DetailedReportAbsences,
  EmployeesWithoutShiftsReport,
  OverTimeDetailsReport,
  AbsenceReport,
  EarlyAttendanceReport,
  EarlyLeavingReport,
  OvertimeHoursRequest,
  OvertimeHoursRequestCreate,
  EmployeeLessTimeReport,
  ReviewOvertime,
  RemoveEmployeeSign,
  EmployeeAttendance,
  EmployeeLocation,
  DataFromAllDevices,
  GetAttLog,
  EmployeeAttendanceTemplateReport,
  ManHoursReport,
  AttendanceRatioReport,
  MonthlyAttendanceReport,
  AttendanceDeviceReport,
  ContinuousAbsenceReport,
  RegisterInAndOutReport,
  ManualAttendanceReport,
  BreakTimeReport,
  StatisticalReport2,
  WorkinHoursByTimeReport,
  OverTimeReport,
  WorkinLeavesDetailsReport,
  OverTimeDayNightReport,
  WorkinLeavesReport,
  LateAttendanceReport,
  DetailedAttendanceReport,
  DetailedAttendanceReview,
  MonthlyAttendanceSummaryReport,
  MonthlyStatisticsReport,
  DeviceLogReport,
  AttendanceRatiosStatementsReport,
  RegisterLocationCreate,
  RegisterLocationEdit,
  RegisterLocation,
  ShiftManPowerReport,
  GPSAttendance,
  LocationAttendanceReport,
  EmployeeLocationReport,
  ForgotFingerprintRequest,
  ForgotFingerprintRequestCreate,
  ForgotFingerprintRequestEdit,
  EmployeeSchedule,
};

export default attendance;
