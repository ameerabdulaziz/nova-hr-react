import axiosInstance from '../../api/axios';
const ContractTypeData = () => {
  const ContractTypeApis = {};

  ContractTypeApis.GetList = async () => {
    // 
    const data = await axiosInstance.get('MdContractType');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      enName: obj.enName,
      contractPeriod: obj.contractPeriod,
      edited: false,
    }));

    return finaldata;
  };

  ContractTypeApis.Save = async (Item) => {
    // 
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
    // 

    const data = await axiosInstance.delete(`MdContractType/${Item.id}`);
    return data;
  };

  return ContractTypeApis;
};

export default ContractTypeData;
