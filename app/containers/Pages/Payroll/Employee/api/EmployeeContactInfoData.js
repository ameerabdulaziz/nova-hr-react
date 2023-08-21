import axiosInstance from '../../api/axios';
const EmployeeContactInfoData = () => {
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    debugger;
    const data = await axiosInstance.get(`EmpContactInfo/GetAll/${employeeId}`);
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
        ? await axiosInstance.post('EmpContactInfo', data)
        : await axiosInstance.put(`EmpContactInfo/${data.id}`, data);
    return result;
  };

  return Apis;
};

export default EmployeeContactInfoData;
