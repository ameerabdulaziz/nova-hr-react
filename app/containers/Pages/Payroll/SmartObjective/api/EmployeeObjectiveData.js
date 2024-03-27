import axiosInstance from '../../api/axios';

const EmployeeObjectiveData = (locale) => {
  const api = {};

  api.getList = async (params) => {
    const data = await axiosInstance.get(
      `SmartObjectiveTrx/GetList/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(
      `SmartObjectiveTrx/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('SmartObjectiveTrx/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SmartObjectiveTrx/Delete/${id}`);
    return data;
  };

  return api;
};

export default EmployeeObjectiveData;
