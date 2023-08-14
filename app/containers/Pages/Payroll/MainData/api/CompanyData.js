import axiosInstance from '../../api/axios';
const CompanyData = () => {
  const Apis = {};
  
  Apis.GetList = async () => {
    
    const data = await axiosInstance.get('MdCompany');
    const result = data.data;
    return result;
  };

  Apis.Save = async (data) => {
    

    // const data = {
    //   id: Item.id,
    //   arName: Item.name,
    //   enName: Item.EnName,
    //   address: Item.address,
    //   accNo: Item.accNo,
    //   note: Item.note,
    // };

    const result =
      data.id === 0
        ? await axiosInstance.post('MdCompany', data)
        : await axiosInstance.put(`MdCompany/${data.id}`, data);
    return result;
  };

  return Apis;
};

export default CompanyData;
