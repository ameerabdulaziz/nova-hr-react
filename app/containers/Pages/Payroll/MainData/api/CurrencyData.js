import axiosInstance from '../../api/axios';
const CurrencyData = () => {
  const CurrencyApis = {};

  CurrencyApis.GetList = async () => {
    // debugger;
    const data = await axiosInstance.get('MdCurrency');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      symbol: obj.symbol,
      edited: false,
    }));

    return finaldata;
  };

  CurrencyApis.Save = async (Item) => {
    // debugger;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      symbol: Item.symbol,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdCurrency', data)
        : await axiosInstance.put(`MdCurrency/${Item.id}`, data);
    return result;
  };

  CurrencyApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`MdCurrency/${Item.id}`);
    return data;
  };

  return CurrencyApis;
};

export default CurrencyData;
