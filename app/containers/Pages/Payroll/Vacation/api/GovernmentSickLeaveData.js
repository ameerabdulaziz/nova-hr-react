import axiosInstance from '../../api/axios';
import { getFormData } from '../../helpers';
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

  api.save = async (body) => {
    const result = await axiosInstance.post('VacVacationTrx/SaveVacGovSick', getFormData(body));

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`VacVacationTrx/DeleteVacGovSick/${id}`);
    return data;
  };

  return api;
};

export default API;
