import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`/Pmstage/GetList`);

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `/Pmstage/save`,
      body
    );

    return data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `/Pmstage/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.Delete = async (id) => {
    const data = await axiosInstance.delete(
      `/Pmstage/Delete/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
