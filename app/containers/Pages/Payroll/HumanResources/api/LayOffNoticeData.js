import axiosInstance from '../../api/axios';


const LayOffNoticeData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HrLayoffNotice/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}`);
    const result = data.data;
    
    return result;
  };


  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrLayoffNotice/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrLayoffNotice/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "noticeDate": data.noticeDate,
    "employeeId":data.employeeId,
    "id":data.id,
    "reason":data.reason,
    }
    const result = await axiosInstance.post("HrLayoffNotice/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrLayoffNotice/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrLayoffNotice/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default LayOffNoticeData;
