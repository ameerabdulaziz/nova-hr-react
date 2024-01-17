import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `getWorkSheetList/save/${locale}`,
      body
    );

    return result.data;
  };

  api.getWorkSheetList = async () => {
    const result = await axiosInstance.get(`getWorkSheetList/list/${locale}`);

    return result.data;
  };

  return api;
};

export default API;
