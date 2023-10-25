import axiosInstance from '../../api/axios';
const UpdateInsuranceSalaryData = (locale) => {
  const api = {};

  api.save = async (params, EmployeeIds) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.post(`SInsuranceEmployee/update?${queryString}`, EmployeeIds);

    return data.data;
  };

  return api;
};

export default UpdateInsuranceSalaryData;
