import axiosInstance from '../../api/axios';
const MinsuranceCategoryData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('MinsuranceCategory');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      cmpShare: obj.cmpShare,
      registrationPrice: obj.registrationPrice,
      familyMemberValue: obj.familyMemberValue,
      employeeShare: obj.employeeShare,
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      cmpShare: Item.cmpShare,
      registrationPrice: Item.registrationPrice,
      employeeShare: Item.employeeShare,
      familyMemberValue: Item.familyMemberValue,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('MinsuranceCategory', data)
      : await axiosInstance.put(`MinsuranceCategory/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MinsuranceCategory/${Item.id}`);
    return data;
  };

  return api;
};

export default MinsuranceCategoryData;
