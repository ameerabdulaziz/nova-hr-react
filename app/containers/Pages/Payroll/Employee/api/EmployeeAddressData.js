import axiosInstance from '../../api/axios';

const EmployeeAddressData = (lang) => {
  const api = {};

  api.getList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpAddress/GetAllData/${lang}/${employeeId}`
    );

    return data.data.empAddressList;
  };

  api.save = async (body) => {
    const result = body.id === 0
      ? await axiosInstance.post('EmpAddress', body)
      : await axiosInstance.put(`EmpAddress/${body.id}`, body);
    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`EmpAddress/${id}`);
    return data;
  };

  return api;
};

export default EmployeeAddressData;
