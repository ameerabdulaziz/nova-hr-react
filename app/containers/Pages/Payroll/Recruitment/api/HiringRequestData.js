import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecHiringRequest/GetHRList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetApplicantList = async (addNew = false) => {
    const data = await axiosInstance.get(
      `RecHiringRequest/GetApplicantList?addNew=${addNew}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecHiringRequest/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      'RecHiringRequest/SaveHr',
      body
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
