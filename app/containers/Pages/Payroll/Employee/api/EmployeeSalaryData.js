import axiosInstance from '../../api/axios';
const EmployeeSalaryData = (locale) => {
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpSalaryData/GetAllModel/${employeeId}/${locale}`
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
        ? await axiosInstance.post('EmpSalaryData', data)
        : await axiosInstance.put(`EmpSalaryData/${data.id}`, data);
    return result;
  };
  Apis.Delete = async (id) => {
   
    const data = await axiosInstance.delete(`EmpSalaryData/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeSalaryData;
