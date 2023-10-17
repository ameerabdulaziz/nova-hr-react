import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `SInsuranceOrgnization/GetAllData/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `SInsuranceOrgnization/GetAllData/${locale}?id=${id}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('SInsuranceOrgnization', body);

    return result;
  };

  api.update = async (id, body) => {
    const result = await axiosInstance.put(
      `SInsuranceOrgnization/${id}`,
      body
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SInsuranceOrgnization/${id}`);
    return data;
  };

  api.GetSinsuranceRegion = async () => {
    const data = await axiosInstance.get(
      `SinsuranceRegion/GetListModel/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetSinsuranceOffices = async () => {
    const data = await axiosInstance.get(
      `SinsuranceOffices/GetListModel/${locale}`
    );
    const result = data.data;

    return result;
  };

  return api;
};

export default API;
