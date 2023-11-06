import axiosInstance from '../../api/axios';
const MedicalInsuranceReportsData = (locale) => {
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
  


  return api;
};



export default MedicalInsuranceReportsData;
