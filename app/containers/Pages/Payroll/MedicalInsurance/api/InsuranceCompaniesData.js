import axiosInstance from '../../api/axios';
const InsuranceCompaniesData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('MinsuranceCompany');
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
      ? await axiosInstance.post('MinsuranceCompany', data)
      : await axiosInstance.put(`MinsuranceCompany/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MinsuranceCompany/${Item.id}`);
    return data;
  };

  return api;
};

export default InsuranceCompaniesData;
