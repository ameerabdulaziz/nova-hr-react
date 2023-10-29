import axiosInstance from '../../api/axios';
const InsuranceFormStatusData = (locale) => {
  const api = {};

  api.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`SInsuranceReport/GetInsuFormReport/${locale}?${queryString}`);

    return data.data;
  };

  return api;
};

export default InsuranceFormStatusData;
