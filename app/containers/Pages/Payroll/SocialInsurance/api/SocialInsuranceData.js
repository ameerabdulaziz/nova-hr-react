import axiosInstance from '../../api/axios';
const SocialInsuranceData = (locale) => {
  const api = {};

  api.GetSInsuranceEmployeeInfo = async (id) => {
    const data = await axiosInstance.get(`SInsuranceEmployee/Get/${id}/${locale}`);

    return data.data;
  };

  api.GetSInsuranceOffices = async () => {
    const data = await axiosInstance.get(`SinsuranceOffices/GetListModel/${locale}`);

    return data.data;
  };

  api.GetSInsuranceJob = async () => {
    const data = await axiosInstance.get(`SinsuranceJob/GetListModel/${locale}`);

    return data.data;
  };

  api.GetSInsuranceOrgnization = async () => {
    const data = await axiosInstance.get(`SinsuranceOrgnization/GetListModel/${locale}`);

    return data.data;
  };

  api.SinsuranceCalculationTemplate = async () => {
    const data = await axiosInstance.get(`SinsuranceCalculationTemplate/GetListModel/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('SInsuranceEmployee/Save', body);

    return data.data;
  };

  return api;
};

export default SocialInsuranceData;
