import axiosInstance from '../../api/axios';
const SocialInsuranceData = (locale) => {
  const api = {};

  api.GetSInsuranceOffices = async () => {
    const data = await axiosInstance.get(`SinsuranceOffices/GetListModel/${locale}`);

    return data.data;
  };

  api.GetSInsuranceOrgnization = async () => {
    const data = await axiosInstance.get(`SinsuranceOrgnization/GetListModel/${locale}`);

    return data.data;
  };

  api.GetList = async (body, params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.post(`SInsuranceReport/GetEmergencyInsReport/${locale}?${queryString}`, body);

    return data.data;
  };

  return api;
};

export default SocialInsuranceData;
