import axiosInstance from '../../api/axios';
const EmployeeReportsApiData = (locale) => {
  const EmployeeReportsApi = {};
  EmployeeReportsApi.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `EmpReport/GetEmployeeContract/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  EmployeeReportsApi.GetEmploymentDocsDetailsReport = async (params,bodyData) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.post(
      `EmpReport/GetEmployeeDocDetails/${locale}?${queryString}`
    , bodyData);
    const result = data.data;

    return result;
  };

  EmployeeReportsApi.GetEmploymentDocsReport = async (params,bodyData) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.post(
      `EmpReport/GetEmployeeDoc/${locale}?${queryString}`
    , bodyData);
    const result = data.data;

    return result;
  };

  return EmployeeReportsApi;
};

export default EmployeeReportsApiData;
