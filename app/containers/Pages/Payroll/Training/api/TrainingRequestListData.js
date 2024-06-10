import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`TrTrainingRequest/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(
      `TrTrainingRequest/Get/${id}/${locale}`
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('TrTrainingRequest/Save', body);

    return result;
  };

  api.getTrainingByCourseId = async (courseId) => {
    const result = await axiosInstance.get(
      `TrTrainingTrx/GetByCourse/${courseId}/${locale}`
    );

    return result.data;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`TrTrainingRequest/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
