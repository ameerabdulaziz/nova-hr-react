import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `MinsuranceTrx/GetList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `MinsuranceTrx/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `MinsuranceTrx/Save/${locale}`,
      body
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(
      `MinsuranceTrx/Delete/${id}`
    );
    return data;
  };

  return api;
};

export default API;
