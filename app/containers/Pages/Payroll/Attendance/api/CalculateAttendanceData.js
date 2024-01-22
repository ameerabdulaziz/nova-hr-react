import axiosInstance from '../../api/axios';

const CalculateAttendanceData = (locale) => {
  const Apis = {};

  Apis.GetList = async (body = {}, params = {}) => {
    const result = await axiosInstance.get(
      `AttendanceCalculationDll/GetEmpAttendance/${locale}/${body.companyId}`,
      {
        params,
      }
    );

    return result.data;
  };

  return Apis;
};

export default CalculateAttendanceData;
