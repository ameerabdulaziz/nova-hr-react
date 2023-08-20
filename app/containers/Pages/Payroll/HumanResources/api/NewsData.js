import axiosInstance from '../../api/axios';


const NewsData = (locale) => {
  const Apis = {};

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrNews/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrNews/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data,EmployeeList) => {
    debugger;
  var requestData={
  "id": data.id,
  "header": data.header,
  "details":data.details,
  "newsTypeId":data.newsTypeId,
  "fromDate":data.fromDate,
  "toDate":data.toDate,
  "employees":EmployeeList.filter((row) => row.isSelected==true).map((obj) => ({
    id: obj.id,
    name: obj.name,
  }))
  }
    const result = await axiosInstance.post("HrNews/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrNews/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrNews/DeleteList`,list);
    return result;
  };
  Apis.GetPenaltyTypesListByPenltyId = async (id,employeeId) => {    
    debugger;
    const result = await axiosInstance.get(`HrNews/GetPenaltyTypesListByPenltyId/${id}/${employeeId}/${locale}`);   
    return result.data;
  };
  Apis.GetPenaltyDetails = async (id) => {    
    debugger;
    const result = await axiosInstance.get(`HrNews/GetPenaltyDetails/${id}`);   
    return result.data;
  };
  Apis.GetEmployeePenalties = async (id) => {    
    debugger;
    const result = await axiosInstance.get(`HrNews/GetEmployeePenalties/${id}`);   
    return result.data;
  };
  
  return Apis;
};


export default NewsData;
