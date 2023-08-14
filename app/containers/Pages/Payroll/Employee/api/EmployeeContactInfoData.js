import axiosInstance from '../../api/axios';
const EmployeeContactInfoData = () => {
  const Apis = {};

  Apis.GetList = async () => {
    const data = await axiosInstance.get('MdEmployeeContactInfo');
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
        ? await axiosInstance.post('MdEmployeeContactInfo', data)
        : await axiosInstance.put(`MdEmployeeContactInfo/${data.id}`, data);
    return result;
  };

  return Apis;
};

export default EmployeeContactInfoData;
