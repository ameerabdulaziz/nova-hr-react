import axiosInstance from '../../api/axios';
const SInsuranceJobDataData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('SInsuranceJobData');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      address: obj.address,
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      address: Item.address,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('SInsuranceJobData', data)
      : await axiosInstance.put(`SInsuranceJobData/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`SInsuranceJobData/${Item.id}`);
    return data;
  };

  return api;
};

export default SInsuranceJobDataData;
