import axiosInstance from '../../api/axios';


const AttentionData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HrAttention/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}`);
    const result = data.data;
    
    return result;
  };


  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrAttention/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrAttention/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "attentionDate": data.attentionDate,
    "employeeId":data.employeeId,
    "id":data.id,
    "reason":data.reason,
    }
    const result = await axiosInstance.post("HrAttention/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrAttention/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrAttention/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default AttentionData;
