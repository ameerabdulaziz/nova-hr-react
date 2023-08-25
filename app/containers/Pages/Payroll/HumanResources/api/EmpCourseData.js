import axiosInstance from '../../api/axios';


const ResignTrxData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,Course,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HrEmployeeCourse/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&CourseId=${Course!=null?Course:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrEmployeeCourse/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrEmployeeCourse/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "id":data.id,
    "date": data.date,    
    "employeeId":data.employeeId,    
    "resignReasonId":data.resignReasonId,
    "note":data.note,
    "payTemplateId": data.payTemplateId,
    "settlElementId":data.settlElementId,
    "vacElementId": data.vacElementId,
    "settlementV":data.settlementV,
    "vacSettlValue": data.vacSettlValue,
    "lworkingDay": data.lworkingDay,
    "isStop": data.isStop,
    }
    const result = await axiosInstance.post("HrEmployeeCourse/Save",requestData);
    return result;
  };


  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrEmployeeCourse/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrEmployeeCourse/DeleteList`,list);
    return result;
  };

  

  return Apis;
};

export default ResignTrxData;
