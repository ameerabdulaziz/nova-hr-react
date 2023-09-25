import axiosInstance from '../../api/axios';
const EmployeeCarData = (locale) => {
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpCar/GetAllModel/${employeeId}/${locale}`
    );
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
        ? await axiosInstance.post('EmpCar', data)
        : await axiosInstance.put(`EmpCar/${data.id}`, data);
    return result;
  };

  Apis.Delete = async (id) => {
    // 

    const data = await axiosInstance.delete(`EmpCar/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeCarData;
