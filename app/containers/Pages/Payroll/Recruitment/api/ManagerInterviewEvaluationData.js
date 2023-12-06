import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobApplicationInterview/GetTechList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobApplicationInterview/GetTechData/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      'RecJobApplicationInterview/Save',
      body
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
