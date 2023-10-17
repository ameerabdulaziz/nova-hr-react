import axiosInstance from '../../api/axios';
const EmployeeDataReportData = (locale) => {
  const EmployeeDocumentsApis = {};
  EmployeeDocumentsApis.GetList = async () => {
    const data = await axiosInstance.get(`EmpReport/GetEmployeeList/${locale}`);
    const result = data.data;

    return result;
  };

  return EmployeeDocumentsApis;
};

export default EmployeeDataReportData;
