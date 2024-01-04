import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async (params, reportCriteria) => {
    const data = await axiosInstance.get(
      `PayrollReport/GetSummaryPaySlip/${locale}/${reportCriteria.year}/${reportCriteria.month}`,
      {
        params,
      }
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
