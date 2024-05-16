import axiosInstance from '../../api/axios';

const EmployeeStatusReportData = (locale) => {
  const apis = {};

  apis.GetEmployeeStatus = async (employeeId, params) => {
    const data = await axiosInstance.get(
      `EmpReport/GetEmployeeStatus/${locale}/${employeeId}`,
      {
        params,
      }
    );

    return data.data;
  };

  return apis;
};

export default EmployeeStatusReportData;
