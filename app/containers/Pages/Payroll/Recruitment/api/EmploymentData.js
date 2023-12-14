import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`RecEmployment/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `RecEmployment/Save?hiringdate=${body.date}`,
      body.ids
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
