import axiosInstance from '../../api/axios';
const AttendanceReportsData = (locale) => {
  const api = {};

  api.GetMissionReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttMissionTrx/GetMissionReport/${locale}?${queryString}`);

    return data.data;
  };


  api.GetEmployeeShiftReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`/AttReport/GetEmployeeShiftReport/${locale}?${queryString}`);

    return data.data;
  };

  api.GetDetailedReportAbsences = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetDetailsAbsenceReport/${locale}?${queryString}`);

    return data.data;
  };

  api.EmployeesWithoutShiftsReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetEmployeeWithoutShiftReport/${locale}?${queryString}`);

    return data.data;
  };

  api.OverTimeDetailsReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetOverTimeDetailsReport/${locale}?${queryString}`);

    return data.data;
  };

  api.AbsenceReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetAbsenceReport/${locale}?${queryString}`);

    return data.data;
  };

  api.EarlyAttendanceReport = async (params, bodyData) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.post(`AttReport/GetEarlyAttendanceReport/${locale}?${queryString}`, bodyData);

    return data.data;
  };

  api.EarlyLeavingReport = async (params, bodyData) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.post(`AttReport/GetEarlyLeaveReport/${locale}?${queryString}`, bodyData);

    return data.data;
  };

  api.EmployeeLessTimeReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetLessTimeReport/${locale}?${queryString}`);

    return data.data;
  };

  api.EmployeeAttendanceTemplateReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetEmployeeParamReport/${locale}?${queryString}`);

    return data.data;
  };

  api.ManHoursReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetManHourReport/${locale}?${queryString}`);

    return data.data;
  };

  api.AttendanceRatioReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetManPowerReport/${locale}?${queryString}`);

    return data.data;
  };

  api.MonthlyAttendanceReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetMonthlyAttendanceReport/${locale}?${queryString}`);

    return data.data;
  };


  api.AttendanceDeviceReportApi = async (params, bodyData) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.post(`AttReport/GetAttendanceDeviceReport/${locale}?${queryString}`, bodyData);

    return data.data;
  };

  api.ContinuousAbsenceReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetContinuousAbsenceReport/${locale}?${queryString}`);

    return data.data;
  };

  api.RegisterInAndOutReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetRegisterInOutReport/${locale}?${queryString}`);

    return data.data;
  };

  api.ManualAttendanceReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetManualAttendanceReport/${locale}?${queryString}`);

    return data.data;
  };

  api.BreakTimeReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetBreakTimeReport/${locale}?${queryString}`);

    return data.data;
  };

  api.StatisticalReport2Api = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetStatisticalReport2/${locale}?${queryString}`);

    return data.data;
  };

  api.WorkinHoursByTimeReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetWorkinHoursByTimeReport/${locale}?${queryString}`);

    return data.data;
  };

  api.OverTimeReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetOverTimeReport/${locale}?${queryString}`);

    return data.data;
  };

  api.WorkinLeavesDetailsReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetWorkinLeavesDetailsReport/${locale}?${queryString}`);

    return data.data;
  };

  api.OverTimeDayNightReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/OverTimeDayNightReport/${locale}?${queryString}`);

    return data.data;
  };


  api.WorkinLeavesReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetWorkinLeaveReport/${locale}?${queryString}`);

    return data.data;
  };

  api.LateAttendanceReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetLateAttendanceReport/${locale}?${queryString}`);

    return data.data;
  };
  

  api.DetailedAttendanceReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetTimeTableDetailsReport/${locale}?${queryString}`);

    return data.data;
  };


  api.MonthlyAttendanceSummaryReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetMonthlyAttReport/${locale}?${queryString}`);

    return data.data;
  };

  api.MonthlyStatisticsReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetMonthlyStatistics/${locale}?${queryString}`);

    return data.data;
  };

  api.DeviceLogReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetAttLogReport/${locale}?${queryString}`);

    return data.data;
  };

  api.AttendanceRatiosStatementsReportApi = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetTimeAttendRatio/${locale}?${queryString}`);

    return data.data;
  };

  api.getAttByDate = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetAttByDate/${locale}?${queryString}`);

    return data.data;
  };

  api.getShiftManPower = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttReport/GetShiftManPower/${locale}?${queryString}`);

    return data.data;
  };


  return api;
};



export default AttendanceReportsData;
