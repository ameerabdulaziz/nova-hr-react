import axiosInstance from '../../api/axios';
const EmployeeData = (locale) => {
  
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpEmployee/GetModel/${employeeId}/${locale}`
    );
    const result = data.data;
    return result;
  };

  Apis.checkEmpCodeExist = async (code) => {
    const data = await axiosInstance.get(
      `EmpEmployee/checkEmpCodeExist?empcode=${code}`
    );

    return data.data;
  };

  Apis.GetBranchList = async () => {
    const data = await axiosInstance.get(`EmpEmployee/GetBranchList/${locale}`);
    const result = data.data;
    return result;
  };

  const getFormData = (object) =>
    Object.entries(object).reduce((fd, [key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, val);
      }
      return fd;
    }, new FormData());

  Apis.Saveform = async (data) => {
    const result = await axiosInstance.post(
      'EmpEmployee/Save',
      getFormData(data)
    );
    return result;
  };

  Apis.Save = async (data) => {
    const result =
      data.id === 0
        ? await axiosInstance.post('EmpEmployee', data)
        : await axiosInstance.put(`EmpEmployee/${data.id}`, data);
    return result;
  };
  Apis.Delete = async (id) => {
    

    const data = await axiosInstance.delete(`EmpEmployee/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeData;
