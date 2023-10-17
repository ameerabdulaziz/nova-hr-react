import axiosInstance from '../../api/axios';
const SInsuranceJobData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('SInsuranceJob');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      jobCode: obj.jobCode,
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      jobCode: Item.jobCode,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('SInsuranceJob', data)
      : await axiosInstance.put(`SInsuranceJob/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`SInsuranceJob/${Item.id}`);
    return data;
  };

  return api;
};

export default SInsuranceJobData;
