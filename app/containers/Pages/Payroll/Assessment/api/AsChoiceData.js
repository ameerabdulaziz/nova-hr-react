import axiosInstance from '../../api/axios';
const AsChoiceData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('AsChoice');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      choiceGrade: obj.choiceGrade,
      toPer: obj.toPer,
      fromPer: obj.fromPer,
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      choiceGrade: Item.choiceGrade,
      toPer: Item.toPer,
      fromPer: Item.fromPer,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('AsChoice', data)
      : await axiosInstance.put(`AsChoice/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`AsChoice/${Item.id}`);
    return data;
  };

  return api;
};

export default AsChoiceData;
