import axiosInstance from '../../api/axios';

const NewEmployeeReportData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`EmpReport/GetNewEmployee/${locale}?${queryString.toString()}`);

    return data.data;
  };

  return Apis;
};

export default NewEmployeeReportData;
