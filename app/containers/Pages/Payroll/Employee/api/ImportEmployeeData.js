import axiosInstance from '../../api/axios';

const API = () => {
  const api = {};

  api.save = async (body = {}) => {
    const result = await axiosInstance.post(
      `EmpEmployee/SaveList/${body.modifyExistEmployee}`,
      body.rows
    );

    return result.data;
  };

  return api;
};

export default API;
