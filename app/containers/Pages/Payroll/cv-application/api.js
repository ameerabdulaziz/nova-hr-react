import axiosInstance from '../api/axios';

function getFormData(fdObject = {}) {
  return Object.entries(fdObject).reduce((fdInstance, [fdObjectKey, fdObjectValue]) => {
    if (Array.isArray(fdObjectValue)) {
      fdObjectValue.forEach((arrayItem, index) => {
        Object.keys(arrayItem).forEach(key => {
          fdInstance.append(`${fdObjectKey}[${index}].${key}`, arrayItem[key]);
        });
      });
    } else {
      fdInstance.append(fdObjectKey, fdObjectValue);
    }
    return fdInstance;
  }, new FormData());
}

const API = (locale) => {
  const api = {};

  api.GetJobList = async () => {
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
    const result = await axiosInstance.post('RecJobApplication/save', getFormData(body));

    return result;
  };

  return api;
};

export default API;
