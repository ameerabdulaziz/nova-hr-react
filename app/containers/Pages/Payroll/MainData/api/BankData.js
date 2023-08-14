import axiosInstance from '../../api/axios';
const BankData = () => {
  const BanksApis = {};

  BanksApis.GetList = async () => {
    // debugger;
    const data = await axiosInstance.get('MdBanks');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      address: obj.address,
      accNo: obj.accNo,
      note: obj.note,
      edited: false,
    }));

    return finaldata;
  };

  BanksApis.Save = async (Item) => {
    // debugger;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      address: Item.address,
      accNo: Item.accNo,
      note: Item.note,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdBanks', data)
        : await axiosInstance.put(`MdBanks/${Item.id}`, data);
    return result;
  };

  BanksApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`MdBanks/${Item.id}`);
    return data;
  };

  return BanksApis;
};

export default BankData;
