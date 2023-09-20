import axiosInstance from '../../api/axios';


const RewardTransData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,rewards,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`HrRewardsTransaction/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&RewardsId=${rewards!=null?rewards:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrRewardsTransaction/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrRewardsTransaction/Get/${id}/${locale}`);
    
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
    "payTemplateId": data.payTemplateId,
    "rewardsId":data.rewardsId,
    "superEmployeeId": data.superEmployeeId,
    "value":data.value,
    "yearId": data.yearId,
    } */
    const result = await axiosInstance.post("HrRewardsTransaction/Save",getFormData(data));
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrRewardsTransaction/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrRewardsTransaction/DeleteList`,list);
    return result;
  };

  
Apis.GetRewardData = async (id) => {    
  debugger;
  const result = await axiosInstance.get(`HrRewardsTransaction/GetRewardData/${id}/${locale}`);   
  return result.data;
};

  return Apis;
};

export default RewardTransData;
