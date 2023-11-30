import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/GetCallList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.Save = async (body) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/SaveCallStatus/${body.appFirstStatus}?CallNote=${body.notes}&interviewTime=${body.interviewTime}`,
      body.ids
    );

    const result = data.data;

    return result;
  };

  api.SendInterviewTimeMail = async (id) => {
    const data = await axiosInstance.post(
      `RecJobApplicationEvaluation/SendInterviewTimeMail/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
