import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`SurveyTemplate/GetList/${locale}`);

    return data.data;
  };

  api.getQuestionList = async () => {
    const data = await axiosInstance.get(`SurveyTemplate/GetQuestionList/${locale}`);

    return data.data;
  };

  api.getSurveyQuestionGroup = async () => {
    const data = await axiosInstance.get(`SurveyQuestionGroup/GetListModel/${locale}`);

    return data.data;
  };

  api.getSurveyChoiceGroup = async () => {
    const data = await axiosInstance.get(`SurveyChoiceGroup/GetChoiceList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`SurveyTemplate/Get/${locale}/${id}`);

    return data.data;
  };

  api.print = async (templateId) => {
    const data = await axiosInstance.get(`SurveyTemplate/PrintTemplate/${locale}/${templateId}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('SurveyTemplate/save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SurveyTemplate/delete/${id}`);

    return data;
  };

  return api;
};

export default API;
