import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.getTrainingEmployee = async (params) => {
    const data = await axiosInstance.get(
      `TrainingReport/GetTrainingEmployee/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.changeEmployeeStatus = async (employeeId, statusId) => {
    const data = await axiosInstance.post(
      `TrTrainingTrx/ChangeEmployeeStatus/${employeeId}/${statusId}`
    );

    return data.data;
  };

  api.printSurvey = async (surveyId) => {
    const data = await axiosInstance.get(
      `Survey/GetPrint/${locale}/${surveyId}`
    );

    return data.data;
  };

  api.printTest = async (testId) => {
    const data = await axiosInstance.get(`Test/GetPrint/${locale}/${testId}`);

    return data.data;
  };

  return api;
};

export default API;
