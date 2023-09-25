import axiosInstance from '../../api/axios';


const PromotionsData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,fromdate,todate) => {
    
    const data = await axiosInstance.get(`HrPromotions/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HrPromotions/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`HrPromotions/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    
  var requestData={
    "date": data.date,
    "employeeId":data.employeeId,
    "id":data.id,
    "reason":data.reason,
    "jobId":data.jobId,
    "newJobId":data.newJobId,
    "oldElemVal":data.oldElemVal,
    "elemVal":data.elemVal,
    }    
    const result = await axiosInstance.post("HrPromotions/Save",requestData);
    return result;
  };

  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`HrPromotions/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`HrPromotions/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default PromotionsData;
