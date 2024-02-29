import axiosInstance from '../../api/axios';

const RecHrTestData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('RecHrTest');
    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`RecHrTest/${id}`);
    return data.data;
  };

  api.save = async (body) => {
    const result = body.id === 0
      ? await axiosInstance.post('RecHrTest', body)
      : await axiosInstance.put(`RecHrTest/${body.id}`, body);
    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`RecHrTest/${id}`);

    return data;
  };

  return api;
};

export default RecHrTestData;
