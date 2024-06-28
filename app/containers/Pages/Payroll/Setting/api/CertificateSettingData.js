import axiosInstance from '../../api/axios';
import { getFormData } from '../../helpers';

const API = () => {
  const api = {};

  api.getCertificateInfo = async () => {
    const data = await axiosInstance.get('/SettingCertificate/Get');

    return data.data;
  };

  api.save = async (body) => {
    const formData = getFormData(body);

    const data = await axiosInstance.post('/SettingCertificate/Save', formData);

    return data.data;
  };

  return api;
};

export default API;
