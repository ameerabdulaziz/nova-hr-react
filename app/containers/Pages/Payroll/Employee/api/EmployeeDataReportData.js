import axiosInstance from '../../api/axios';
const EmployeeDataReportData = (locale) => {
  const api = {};
  api.GetList = async () => {
    const data = await axiosInstance.get(`EmpReport/GetEmployeeList/${locale}`);
    const result = data.data;

    return result;
  };

  api.exportEmployeeList = async (payload) => {
    const data = await axiosInstance.post(
      'EmpReport/GetEmployeeList/Export-Excel',
      payload,
      {
        responseType: 'blob',
      }
    );

    return data.data;
  };

  return api;
};

export default EmployeeDataReportData;
