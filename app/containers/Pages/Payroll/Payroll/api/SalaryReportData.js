import axiosInstance from '../../api/axios';

const SalaryReportData = (locale) => {
  const api = {};

  api.GetList = async (params = {}) => {
    debugger;
    const data = await axiosInstance.get(
      `PayrollReport/GetSalaryReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default SalaryReportData;
