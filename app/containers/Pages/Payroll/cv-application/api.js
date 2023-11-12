import axiosInstance from '../api/axios';

const getFormData = object => Object.entries(object).reduce((fd, [key, val]) => {
  if (Array.isArray(val)) {
    val.forEach(v => fd.append(key, v));
  } else {
    fd.append(key, val);
  }
  return fd;
}, new FormData());

const API = (locale) => {
  const api = {};

  api.GetJobList = async () => {
    const response = await axiosInstance.get(
      `RecJobApplication/GetList/${locale}`
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
