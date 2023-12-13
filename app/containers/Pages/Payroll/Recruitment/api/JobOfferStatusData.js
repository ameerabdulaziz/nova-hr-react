import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobOffer/GetPindingStatusList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.Save = async (body) => {
    const data = await axiosInstance.post(
      `RecJobOffer/SaveStatus/${body.status}?CallNote=${body.notes}`,
      body.ids
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
