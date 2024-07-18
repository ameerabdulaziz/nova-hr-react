import axiosInstance from '../../api/axios';

const NewEmployeeReportData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const data = await axiosInstance.get(`EmpReport/GetNewEmployee/${locale}`, {
      params,
    });

    return data.data;
  };

  return Apis;
};

export default NewEmployeeReportData;
