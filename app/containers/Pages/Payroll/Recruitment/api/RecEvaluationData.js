import axiosInstance from '../../api/axios';

const RecEvaluationData = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`RecEvaluation/GetAllData/${locale}`);

    return data.data.recEvaluationList;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`RecEvaluation/${id}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = body.id === 0
      ? await axiosInstance.post('RecEvaluation', body)
      : await axiosInstance.put(`RecEvaluation/${body.id}`, body);
    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`RecEvaluation/${id}`);
    return data;
  };

  return api;
};

export default RecEvaluationData;
