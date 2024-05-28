import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/GetList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetLanguageLevelList = async () => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/GetLanguageLevelList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetJobList = async () => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/GetJobList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetPositionTypeList = async () => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/GetPositionTypeList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecEmploymentRequest/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('RecEmploymentRequest/Save', body);

    const result = data.data;

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(
      `RecEmploymentRequest/Delete/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
