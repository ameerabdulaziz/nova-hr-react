import axiosInstance from '../../api/axios';
const RecHrTestData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('RecHrTest');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      arDesc: obj.arDesc,
      enDesc: obj.enDesc,
      finalGrad: obj.finalGrad,
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      arDesc: Item.arDesc,
      enDesc: Item.enDesc,
      finalGrad: Item.finalGrad,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('RecHrTest', data)
      : await axiosInstance.put(`RecHrTest/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`RecHrTest/${Item.id}`);
    return data;
  };

  return api;
};

export default RecHrTestData;
