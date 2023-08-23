import axiosInstance from '../../api/axios';


const CustodyTrxData = (locale) => {
  const Apis = {};
  
  
 
  Apis.GetReport = async (employee,custody,type,fromdate,todate) => {
    debugger;
    
      const data = await axiosInstance.get(`HrCustodyTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&CustodyId=${custody!=null?custody:""}&TrxType=${type}`);
      const result = data.data;
   
    return result;
  };

  Apis.GetList = async (type) => {
    debugger;
    const data = await axiosInstance.get(`HrCustodyTrx/GetList/${type}/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id,type) => {
    debugger;
    const data = await axiosInstance.get(`HrCustodyTrx/Get/${id}/${type}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "id":data.id,
    "date": data.date,
    "trxType": data.trxType,
    "custodyId":data.custodyId,
    "employeeId":data.employeeId,    
    "notes":data.notes,
    "itemSerial":data.itemSerial,
    "custCount": data.custCount,
    "custodyPrice":data.custodyPrice,
    }
    const result = await axiosInstance.post("HrCustodyTrx/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrCustodyTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrCustodyTrx/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default CustodyTrxData;
