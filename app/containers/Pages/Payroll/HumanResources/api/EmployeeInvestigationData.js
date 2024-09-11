import axiosInstance from '../../api/axios';

const EmployeeInvestigationData = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`HRInvestigation/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`HRInvestigation/Get/${id}/${locale}`);

    return data.data;
  };


  api.save = async (data) => {
    
    const result = await axiosInstance.post('HRInvestigation/save', data);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`HRInvestigation/Delete/${id}`);

    return data;
  };



  return api;
};

export default EmployeeInvestigationData;
