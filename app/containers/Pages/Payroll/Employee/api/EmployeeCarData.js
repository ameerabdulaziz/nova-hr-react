import axiosInstance from '../../api/axios';
const EmployeeCarData = () => {
  const Apis = {};

  Apis.GetList = async () => {
    const data = await axiosInstance.get('MdEmployeeCar');
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
        ? await axiosInstance.post('MdEmployeeCar', data)
        : await axiosInstance.put(`MdEmployeeCar/${data.id}`, data);
    return result;
  };

  return Apis;
};

export default EmployeeCarData;
