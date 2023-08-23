import axiosInstance from '../../api/axios';
const EmployeeData = (locale) => {
  debugger;
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpEmployee/GetModel/${employeeId}/${locale}`
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
        ? await axiosInstance.post('EmpEmployee', data)
        : await axiosInstance.put(`EmpEmployee/${data.id}`, data);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;

    const data = await axiosInstance.delete(`EmpEmployee/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeData;
