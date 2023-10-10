import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`VacVacationTrx/GetVacGovSickList/${locale}`);
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`VacVacationTrx/GetVacGovSick/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  const getFormData = object => Object.entries(object).reduce((fd, [key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => fd.append(key, v));
    } else {
      fd.append(key, val);
    }
    return fd;
  }, new FormData());

  api.save = async (body) => {
    const result = await axiosInstance.post('VacVacationTrx/SaveVacGovSick', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`VacVacationTrx/DeleteVacGovSick/${id}`);
    return data;
  };

  return api;
};

export default API;
