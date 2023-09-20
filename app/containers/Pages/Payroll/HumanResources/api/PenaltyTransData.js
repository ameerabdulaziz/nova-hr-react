import axiosInstance from '../../api/axios';


const PenaltyTransData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (employee,penalty,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HRPenaltyTransaction/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&PenaltyId=${penalty!=null?penalty:""}`);
    const result = data.data;
    
    return result;
  };
  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HRPenaltyTransaction/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HRPenaltyTransaction/Get/${id}/${locale}`);
    
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
  
  Apis.Save = async (data) => {
    debugger;
  /* var requestData={
  "date": data.date,
  "docName": data.docName,
  "elementId":data.elementId,
  "employeeId":data.employeeId,
  "id":data.id,
  "monthId":data.monthId,
  "note":data.note,
  "penaltyTypeId": data.penaltyTypeId,
  "penaltyDetailId": data.penaltyDetailId,
  "penaltyId":data.penaltyId,
  "superEmployeeId": data.superEmployeeId,
  "value":data.value,
  "yearId": data.yearId,
  } */

    const result = await axiosInstance.post("HRPenaltyTransaction/Save",getFormData(data));
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HRPenaltyTransaction/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HRPenaltyTransaction/DeleteList`,list);
    return result;
  };
  Apis.GetPenaltyTypesListByPenltyId = async (id,employeeId) => {    
    debugger;
    const result = await axiosInstance.get(`HRPenaltyTransaction/GetPenaltyTypesListByPenltyId/${id}/${employeeId}/${locale}`);   
    return result.data;
  };
  Apis.GetPenaltyDetails = async (id) => {    
    debugger;
    const result = await axiosInstance.get(`HRPenaltyTransaction/GetPenaltyDetails/${id}`);   
    return result.data;
  };
  
  return Apis;
};


export default PenaltyTransData;
