import axiosInstance from '../../api/axios';
const ContractTypeData = () => {
  const ContractTypeApis = {};

  ContractTypeApis.GetList = async () => {
    // debugger;
    const data = await axiosInstance.get('MdContractType');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      contractPeriod: obj.contractPeriod,
      edited: false,
    }));

    return finaldata;
  };

  ContractTypeApis.Save = async (Item) => {
    // debugger;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      contractPeriod: Item.contractPeriod,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdContractType', data)
        : await axiosInstance.put(`MdContractType/${Item.id}`, data);
    return result;
  };

  ContractTypeApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`MdContractType/${Item.id}`);
    return data;
  };

  return ContractTypeApis;
};

export default ContractTypeData;
