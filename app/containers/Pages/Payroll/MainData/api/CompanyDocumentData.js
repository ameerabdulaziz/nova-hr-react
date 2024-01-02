import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`MdCompanyDocument/GetList/${locale}`);

    return data.data;
  };

  api.GetEmployeeList = async () => {
    const data = await axiosInstance.get(`MdCompanyDocument/GetEmployeeList/${locale}`);

    return data.data;
  };

  api.MdDocumentCategory = async () => {
    const data = await axiosInstance.get(`MdDocumentCategory/GetListModel/${locale}`);

    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`MdCompanyDocument/Get/${id}/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('MdCompanyDocument/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`MdCompanyDocument/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
