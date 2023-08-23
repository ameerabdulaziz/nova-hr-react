import axiosInstance from '../../api/axios';


const ResignTrxData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,ResignReason,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HrResignTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&ResignReasonId=${ResignReason!=null?ResignReason:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrResignTrx/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrResignTrx/Get/${id}/${locale}`);
    
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
    const result = await axiosInstance.post("HrResignTrx/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrResignTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrResignTrx/DeleteList`,list);
    return result;
  };

  

  return Apis;
};

export default ResignTrxData;
