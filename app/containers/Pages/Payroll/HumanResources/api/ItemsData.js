import axiosInstance from '../../api/axios';
const ItemsData = () => {
  const ItemsApis = {};

  ItemsApis.GetList = async () => {
    // 
    const data = await axiosInstance.get('HrItems');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      sellPrice: obj.sellPrice,
      notes: obj.notes,
      edited: false,
    }));

    return finaldata;
  };

  ItemsApis.Save = async (Item) => {
    // 
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      sellPrice: Item.sellPrice,
      notes: Item.notes,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrItems', data)
        : await axiosInstance.put(`HrItems/${Item.id}`, data);
    return result;
  };

  ItemsApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`HrItems/${Item.id}`);
    return data;
  };

  return ItemsApis;
};

export default ItemsData;
