import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `EmpEmployee/SaveList/${body.modifyExistEmployee}`,
      body.rows
    );

    return result.data;
  };

  api.GetExcelFieldList = async () => {
    const result = await axiosInstance.get(
      `EmpEmployee/GetExcellFieldList/${locale}`
    );

    return result.data;
  };

  api.UpdateField = async (fieldId, rows) => {
    const result = await axiosInstance.post(
      `EmpEmployee/UpdateField/${fieldId}`, rows
    );

    return result.data;
  };

  return api;
};

export default API;
