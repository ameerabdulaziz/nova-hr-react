import axiosInstance from '../../api/axios';
const GovernmentData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('MdGovernment');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      arName: obj.arName,
      enName: obj.enName,
      generalCode: obj.generalCode,
      edited: false,
    }));

    return finaldata;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.arName,
      enName: Item.enName,
      generalCode: Item.generalCode,
    };

    const result = Item.id === 0
        ? await axiosInstance.post('MdGovernment', data)
        : await axiosInstance.put(`MdGovernment/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MdGovernment/${Item.id}`);
    return data;
  };

  return api;
};

export default GovernmentData;
