import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecHiringRequest/GetAssignList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecHiringRequest/GetAssignData/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `RecHiringRequest/Save?id=${body.id}&statusid=${body.status}&comment=${body.comment}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
