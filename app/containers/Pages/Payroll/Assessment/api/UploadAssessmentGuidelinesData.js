import axiosInstance from '../../api/axios';
const API = () => {
  const api = {};

  api.save = async (body) => {
    const result = await axiosInstance.post('AssessmentGuidelines/Save', body);

    return result.data;
  };

  api.CheckFileExists = async () => {
    const result = await axiosInstance.get(
      'AssessmentGuidelines/CheckFileExists'
    );

    return result.data;
  };

  return api;
};

export default API;
