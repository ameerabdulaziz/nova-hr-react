import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async (params) => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/GetHRList/${locale}`,
      {
        params,
      }
    );

    const result = data.data;

    return result;
  };

  api.CheckIfExistEmp = async (cardNumber, email) => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/CheckIfExistEmp/${cardNumber}/${email}/${locale}`);

    return data.data;
  };

  api.SaveHR = async (body) => {
    const data = await axiosInstance.post(
      'RecJobApplicationEvaluation/SaveHR',
      body
    );

    const result = data.data;

    return result;
  };

  api.SendRejectionMail = async (id) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/SendRejectionMail/${id}`
    );

    const result = data.data;

    return result;
  };

  api.EvaluateJobApplication = async (id,isNewEvaluation) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/EvaluateJobApplication/${id}/${locale}?isNewEvaluation=${isNewEvaluation}`
    );

    const result = data.data;

    return result;
  };

  api.HoldingApp = async (id, isClosed) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/HoldingApp/${id}/${isClosed}`
    );

    return data.data;
  };

  api.SaveAiEvaluation = async (body) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/SaveAiEvaluation`,
      body
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
