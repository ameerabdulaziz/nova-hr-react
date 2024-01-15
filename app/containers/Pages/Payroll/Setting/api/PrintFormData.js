import axiosInstance from '../../api/axios';

const PrintFormData = (lang) => {
  const api = {};

  api.GetPrintForm = async (employeeId, printFormId) => {
    const data = await axiosInstance.get(
      `SettingFormPrint/GetPrintForm/${printFormId}/${employeeId}/${lang}`
    );

    return data.data;
  };

  api.GetForm = async () => {
    const data = await axiosInstance.get('/SettingFormPrint/GetForm/');

    return data.data;
  };

  return api;
};

export default PrintFormData;
