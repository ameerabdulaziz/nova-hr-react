import axiosInstance from '../../api/axios';

const InsuranceFormStatusData = (locale) => {
  const api = {};

  api.GetReport = async (params) => {
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuFormReport/${locale}}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default InsuranceFormStatusData;
