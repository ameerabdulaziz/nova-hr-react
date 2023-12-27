import axiosInstance from '../../api/axios';
const API = () => {
  const api = {};

  api.save = async (body) => {
    const result = await axiosInstance.post('UploadAssessmentGuidelines/save', body);

    return result;
  };

  return api;
};

export default API;
