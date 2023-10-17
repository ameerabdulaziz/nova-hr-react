import axiosInstance from '../../api/axios';


const PenaltyTransData = (locale) => {
  const Apis = {};

  
  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `HRPenaltyTransaction/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HRPenaltyTransaction/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
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
    
    const result = await axiosInstance.delete(`HRPenaltyTransaction/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`HRPenaltyTransaction/DeleteList`,list);
    return result;
  };
  Apis.GetPenaltyTypesListByPenltyId = async (id,employeeId) => {    
    
    const result = await axiosInstance.get(`HRPenaltyTransaction/GetPenaltyTypesListByPenltyId/${id}/${employeeId}/${locale}`);   
    return result.data;
  };
  Apis.GetPenaltyDetails = async (id) => {    
    
    const result = await axiosInstance.get(`HRPenaltyTransaction/GetPenaltyDetails/${id}`);   
    return result.data;
  };
  
  return Apis;
};


export default PenaltyTransData;
