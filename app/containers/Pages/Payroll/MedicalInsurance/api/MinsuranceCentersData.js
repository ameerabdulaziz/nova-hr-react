import axiosInstance from '../../api/axios';
const MinsuranceCentersData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('MinsuranceCenters');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      phone: obj.phone,
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
      phone: Item.phone,
      address: Item.address,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('MinsuranceCenters', data)
      : await axiosInstance.put(`MinsuranceCenters/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MinsuranceCenters/${Item.id}`);
    return data;
  };

  return api;
};

export default MinsuranceCentersData;
