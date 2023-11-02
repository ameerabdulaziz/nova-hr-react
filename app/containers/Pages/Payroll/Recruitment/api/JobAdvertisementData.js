import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/GetList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `RecJobAdvertisement/save/`,
      body
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(
      `RecJobAdvertisement/Delete/${id}`
    );
    return data;
  };

  return api;
};

export default API;
