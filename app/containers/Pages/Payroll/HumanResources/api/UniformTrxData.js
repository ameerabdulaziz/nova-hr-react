import axiosInstance from '../../api/axios';


const UniformTrxData = (locale) => {
  const Apis = {};
  
  
 
  Apis.GetReport = async (employee,Uniform,type,fromdate,todate) => {
    debugger;
    
      const data = await axiosInstance.get(`HrUniformTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&UniformId=${Uniform!=null?Uniform:""}&TrxType=${type}`);
      const result = data.data;
   
    return result;
  };

  Apis.GetList = async (type) => {
    debugger;
    const data = await axiosInstance.get(`HrUniformTrx/GetList/${type}/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id,type) => {
    debugger;
    const data = await axiosInstance.get(`HrUniformTrx/Get/${id}/${type}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "id":data.id,
    "date": data.date,
    "trxType": data.trxType,
    "uniformId":data.uniformId,
    "employeeId":data.employeeId,    
    "notes":data.notes,
    "quantity": data.quantity,
    "uniformPrice":data.uniformPrice,
    }
    const result = await axiosInstance.post("HrUniformTrx/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrUniformTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrUniformTrx/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default UniformTrxData;
