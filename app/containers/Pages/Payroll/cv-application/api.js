import axiosInstance from '../api/axios';

const API = (locale) => {
  const api = {};

  api.GetJobApplicationList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetList/${locale}`
    );

    return response.data;
  };

  api.GetCompanyData = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetCompanyData/${locale}`
    );

    return response.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('RecJobApplication/save', body);

    return result;
  };

  api.GetMilitaryStatusList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetMilitaryStatusList/${locale}`
    );

    return response.data;
  };

  api.GetJobList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetJobList/${locale}`
    );

    return response.data;
  };

  api.GetGenderList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetGenderList/${locale}`
    );

    return response.data;
  };

  api.GetSocialStatusList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetSocialStatusList/${locale}`
    );

    return response.data;
  };

  api.GetGradeList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetGradeList/${locale}`
    );

    return response.data;
  };

  api.GetQualificationsList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetQualificationsList/${locale}`
    );

    return response.data;
  };

  api.GetIdentityTypeList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetIdentityTypeList/${locale}`
    );

    return response.data;
  };

  api.GetHiringSourceList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetHiringSourceList/${locale}`
    );

    return response.data;
  };


  api.JobAdvertisementList = async (id) => {
    const response = await axiosInstance.get(
      `RecJobAdvertisement/Get/${id}/${locale}`
    );

    return response.data;
  };

  return api;
};

export default API;
