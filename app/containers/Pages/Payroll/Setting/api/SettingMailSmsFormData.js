import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `SettingMailSmsform/GetList/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `SettingMailSmsform/Get/${locale}/${id}`
    );
    const result = data.data;

    return result;
  };

  api.GetType = async () => {
    const data = await axiosInstance.get(
      `SettingMailSmsform/GetType/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('SettingMailSmsform/Save', body);

    const result = data.data;

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SettingMailSmsform/Delete/${id}`);
    const result = data.data;

    return result;
  };

  return api;
};

export default API;
