import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get('SurveyChoiceGroup/GetList');

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`SurveyChoiceGroup/Get/${id}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('SurveyChoiceGroup/save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SurveyChoiceGroup/delete/${id}`);

    return data;
  };

  return api;
};

export default API;
