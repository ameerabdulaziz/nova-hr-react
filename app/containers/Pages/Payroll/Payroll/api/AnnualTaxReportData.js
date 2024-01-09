import axiosInstance from '../../api/axios';

const AnnualTaxReportData = (locale) => {
  const api = {};

  api.GetList = async (params = {}) => {
    const data = await axiosInstance.get(
      `PayrollReport/GetAnnualTaxReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default AnnualTaxReportData;
