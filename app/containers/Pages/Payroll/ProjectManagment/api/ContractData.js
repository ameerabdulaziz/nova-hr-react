import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`/PmContract/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `PmContract/save`,
      body
    );

    // const result = data.data;

    return data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `PmContract/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.Delete = async (id) => {
    const data = await axiosInstance.delete(
      `/PmContract/delete/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
