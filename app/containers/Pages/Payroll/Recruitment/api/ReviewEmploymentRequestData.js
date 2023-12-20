import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/GetPindingList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `RecEmploymentRequest/SaveHrStatus/${body.id}?comment=${body.comments}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
