import axiosInstance from '../../api/axios';

const HrEmployeeDocumentTrxData = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`HrEmployeeDocumentTrx/GetList/${locale}`);

    return data.data;
  };

  api.getDocList = async () => {
    const data = await axiosInstance.get(`HrEmployeeDocumentTrx/GetDocList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`HrEmployeeDocumentTrx/Get/${id}/${locale}`);

    return data.data;
  };

  api.getUserInfo = async () => {
    const data = await axiosInstance.get(`EmpProfile/GetInfo/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('HrEmployeeDocumentTrx/Save', body);

    return data;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`HrEmployeeDocumentTrx/Delete/${id}`);
    return data;
  };

  return api;
};

export default HrEmployeeDocumentTrxData;
