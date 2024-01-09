import axiosInstance from '../../api/axios';

const MonthlyVariablesReportData = (locale) => {
  const api = {};

  api.GetList = async (params = {}, body = []) => {
    const data = await axiosInstance.post(
      `PayrollReport/GetMonthlyVariablesReport/${locale}`,
      body,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default MonthlyVariablesReportData;
