import axiosInstance from '../../api/axios';


const WorkFlowData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,Mission,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`WorkFlow/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&MissionId=${Mission!=null?Mission:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`WorkFlow/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`WorkFlow/Get/${id}/${locale}`);
    
    return data.data;

  };
  
  
  Apis.Save = async (data) => {
    debugger;

    const result = await axiosInstance.post("WorkFlow/Save",data);
    return result;
  };
 
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`WorkFlow/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`WorkFlow/DeleteList`,list);
    return result;
  };
  

  return Apis;
};

export default WorkFlowData;
