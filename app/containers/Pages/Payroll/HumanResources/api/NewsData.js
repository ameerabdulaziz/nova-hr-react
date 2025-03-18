import axiosInstance from '../../api/axios';


const NewsData = (locale) => {
  const Apis = {};

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HrNews/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`HrNews/Get/${id}/${locale}`);
    
    return data.data;

  };
  
  const getFormData = object => Object.entries(object).reduce((fd, [ key, val ]) => {
    if (Array.isArray(val)) {
      val.forEach(v => fd.append(key, v))
    } else {
      fd.append(key, val)
    }
    return fd
  }, new FormData());
  
  Apis.Save = async (data,EmployeeList) => {
    
    var Emp = EmployeeList.filter((row) => row.isSelected==true).map((obj) => obj.id);
        // test=`,${Emp.join(",")},` ;
    data.emp=Emp;
    data.employees=[];
    const result = await axiosInstance.post("HrNews/Save",getFormData(data));
    return result;
  };
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`HrNews/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`HrNews/DeleteList`,list);
    return result;
  };
  Apis.GetPenaltyTypesListByPenltyId = async (id,employeeId) => {    
    
    const result = await axiosInstance.get(`HrNews/GetPenaltyTypesListByPenltyId/${id}/${employeeId}/${locale}`);   
    return result.data;
  };
  Apis.GetPenaltyDetails = async (id) => {    
    
    const result = await axiosInstance.get(`HrNews/GetPenaltyDetails/${id}`);   
    return result.data;
  };
  Apis.GetEmployeePenalties = async (id) => {    
    
    const result = await axiosInstance.get(`HrNews/GetEmployeePenalties/${id}`);   
    return result.data;
  };
  
  return Apis;
};


export default NewsData;
