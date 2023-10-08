import axiosInstance from '../../api/axios';
const LeaveTrxData = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`VacVacationTrx/GetList/${locale}`);
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`VacVacationTrx/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  api.GetVacationType = async () => {
    const data = await axiosInstance.get(
      `VacVacationTrx/GetVacationType/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetAlternativeEmployeeList = async (employeeId) => {
    const result = await axiosInstance.get(
      `GeneralList/GetAlternativeEmployeeList/${locale}?EmployeeId=${employeeId}`
    );

    return result.data;
  };

  api.GetEmpVacBalance = async (id) => {
    const data = await axiosInstance.get(
      `VacVacationTrx/GetEmpVacBalance/${locale}/${id}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('VacVacationTrx/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`VacVacationTrx/Delete/${id}`);
    return data;
  };

  return api;
};

export default LeaveTrxData;
