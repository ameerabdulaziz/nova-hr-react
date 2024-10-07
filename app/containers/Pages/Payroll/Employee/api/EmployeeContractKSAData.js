import axiosInstance from '../../api/axios';
const EmployeeContractData = (locale) => {
  
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpContractDataSA/GetAllModel/${employeeId}/${locale}`
    );
    const result = data.data;
    return result;
  };

  Apis.Save = async (data) => {

    const result = await axiosInstance.post('EmpContractDataSA', data)

    return result;
  };
  Apis.Delete = async (id) => {
    

    const data = await axiosInstance.delete(`EmpContractDataSA/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeContractData;
