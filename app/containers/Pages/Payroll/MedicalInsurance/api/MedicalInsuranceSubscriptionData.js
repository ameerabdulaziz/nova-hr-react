import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `MinsuranceSubscription/GetList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `MinsuranceSubscription/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.MinsuranceCategory = async (id) => {
    const data = await axiosInstance.get(`MinsuranceCategory/${id}`);
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `MinsuranceSubscription/Save/${locale}`,
      body
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(
      `MinsuranceSubscription/Delete/${id}`
    );
    return data;
  };

  return api;
};

export default API;
