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


    const result = await axiosInstance.get(
      `AttendanceCalculation/CalculateAttendance/${locale}/${body.companyId}`,
      {
        params,
      }
    );

    return result;
  };

  Apis.PostToPayroll = async (body = {}, params = {}) => {


    const result = await axiosInstance.get(
      `AttendanceCalculation/PostToPayroll/${locale}/${body.companyId}`,
      {
        params,
      }
    );

    return result.data;
  };

  Apis.RollBackAttendance = async (body = {}, params = {}) => {


    const result = await axiosInstance.get(
      `AttendanceCalculation/RollBackAttendance/${body.companyId}`,
      {
        params,
      }
    );

    return result;
  };

  Apis.Save = async (data) => {
    
        const result = await axiosInstance.post(`AttEmployeeAttendance/Save/${locale}`,data);
        return result;
      };

  return Apis;
};

export default CalculateAttendanceData;
