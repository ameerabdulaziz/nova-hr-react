import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async (surveyTemplateId,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(`Survey/GetSurveyReport/${locale}/${surveyTemplateId}?${queryString.toString()}`);

    return data.data;
  };

  api.getSurveyStatisticList = async (surveyTemplateId,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(`Survey/GetStatisticReport/${locale}/${surveyTemplateId}?${queryString.toString()}`);

    return data.data;
  };


  return api;
};

export default API;
