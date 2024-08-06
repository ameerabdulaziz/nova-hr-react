import axiosInstance from '../../api/axios';
const IdentityTypeData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('MdIdentityType');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      arName: obj.arName,
      enName: obj.enName,
      expiredPeriod: obj.expiredPeriod,
      validLength: obj.validLength,
      isCharcter: obj.isCharcter,
      edited: false,
    }));

    return finaldata;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.arName,
      enName: Item.enName,
      validLength: Item.validLength,
      isCharcter:Item.isCharcter,
      expiredPeriod: Item.expiredPeriod,
    };

    const result = Item.id === 0
        ? await axiosInstance.post('MdIdentityType', data)
        : await axiosInstance.put(`MdIdentityType/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MdIdentityType/${Item.id}`);
    return data;
  };

  return api;
};

export default IdentityTypeData;
