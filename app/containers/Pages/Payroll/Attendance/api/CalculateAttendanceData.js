import axiosInstance from "../../api/axios";

const CalculateAttendanceData = (locale) => {
  const Apis = {};

  Apis.GetList = async (body = {}, params = {}) => {
    const result = await axiosInstance.get(
      `AttendanceCalculation/GetEmpAttendance/${locale}/${body.companyId}`,
      {
        params,
      }
    );

    return result.data;
  };

  Apis.CalculateAttendance = async (body = {}, params = {}) => {
    debugger;

    const result = await axiosInstance.get(
      `AttendanceCalculation/CalculateAttendance/${locale}/${body.companyId}`,
      {
        params,
      }
    );

    return result;
  };

  Apis.RollBackAttendance = async (body = {}, params = {}) => {
    debugger;

    const result = await axiosInstance.get(
      `AttendanceCalculation/RollBackAttendance/${body.companyId}`,
      {
        params,
      }
    );

    return result;
  };

  return Apis;
};

export default CalculateAttendanceData;
