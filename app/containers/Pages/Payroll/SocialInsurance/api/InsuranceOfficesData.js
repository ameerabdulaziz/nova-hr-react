import axiosInstance from '../../api/axios';
const InsuranceOfficesData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('SinsuranceOffices');
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
      ? await axiosInstance.post('SinsuranceOffices', data)
      : await axiosInstance.put(`SinsuranceOffices/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`SinsuranceOffices/${Item.id}`);
    return data;
  };

  return api;
};

export default InsuranceOfficesData;
