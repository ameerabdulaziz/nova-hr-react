import axiosInstance from '../../api/axios';


const MissionTrxData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,Mission,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`AttMissionTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&MissionId=${Mission!=null?Mission:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`AttMissionTrx/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`AttMissionTrx/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.getMissions = async (data) => {
    debugger;
    const result = await axiosInstance.get(`AttMissionTrx/getMissions/${locale}?MissionId=${data.missionId}&Fromdate=${data.fromDate}&Todate=${data.toDate}&StartTime=${data.startTime}&EndTime=${data.endTime}`);
    
    return result.data;

  };
  
  Apis.Save = async (data) => {
    debugger;

    const result = await axiosInstance.post("AttMissionTrx/Save",data);
    return result;
  };
  Apis.SaveAll = async (data) => {
    debugger;
    const result = await axiosInstance.post("AttMissionTrx/SaveAll",data);
    return result;
  };
  Apis.SaveList = async (data) => {
    debugger;
    const result = await axiosInstance.post("AttMissionTrx/SaveList",data);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`AttMissionTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`AttMissionTrx/DeleteList`,list);
    return result;
  };
  Apis.DeleteAll = async (data) => {
    debugger;
    const result = await axiosInstance.post("AttMissionTrx/DeleteAll",data);
    return result;
  };
  Apis.getRepeatedNo = async (MissionId , date,employeeId) => {
    debugger;
    const data = await axiosInstance.get(`AttMissionTrx/getRepeatedNo?MissionId=${MissionId}&date=${date}&EmployeeId=${employeeId}`);
    
    return data.data;

  };
  


  return Apis;
};

export default MissionTrxData;
