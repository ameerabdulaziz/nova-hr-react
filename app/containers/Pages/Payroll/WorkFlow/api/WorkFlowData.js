import axiosInstance from '../../api/axios';


const WorkFlowData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,Mission,fromdate,todate) => {
    
    const data = await axiosInstance.get(`WorkFlow/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&MissionId=${Mission!=null?Mission:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`WorkFlow/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };


  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`WorkFlow/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Getrequests = async (documentid,employee,fromdate,todate) => {
    
    const data = await axiosInstance.get(`WorkFlow/Getrequests/${locale}?DocumentId=${documentid}&FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}`);
    
    return data.data;

  };
  
  
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("WorkFlow/Save",data);
    return result;
  };
  Apis.ExecuteWorkFlow = async (executionId,actionTypeId,note) => {
    

    const result = await axiosInstance.post("WorkFlow/ExecuteWorkFlow",{"executionId":executionId,"actionTypeId":actionTypeId,"note":note});
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`WorkFlow/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`WorkFlow/DeleteList`,list);
    return result;
  };
  

  return Apis;
};

export default WorkFlowData;
