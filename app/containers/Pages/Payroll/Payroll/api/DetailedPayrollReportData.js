import axiosInstance from '../../api/axios';

const DetailedPayrollReportData = (locale) => {
  const api = {};

  api.GetList = async (params = {}) => {
    const data = await axiosInstance.get(
      `PayrollReport/GetDetailedPayrollReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default DetailedPayrollReportData;
