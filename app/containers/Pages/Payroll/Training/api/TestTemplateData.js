import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`TestTemplate/GetList/${locale}`);

    return data.data;
  };

  api.getTrainingList = async (isEdit) => {
    const data = await axiosInstance.get(
      `TestTemplate/GetTrainingList/${locale}/${isEdit}`
    );

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`TestTemplate/Get/${locale}/${id}`);

    return data.data;
  };

  api.getQuestionList = async (params) => {
    const data = await axiosInstance.get(
      `TestTemplate/GetQuestionList/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('TestTemplate/save', body);

    return result;
  };

  api.toggleTestStatus = async (testId, isOpen) => {
    const result = await axiosInstance.get(`TestTemplate/CloseTest/${testId}/${isOpen}`);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`TestTemplate/delete/${id}`);

    return data;
  };

  return api;
};

export default API;
