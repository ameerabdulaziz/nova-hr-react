import axiosInstance from '../../api/axios';


const LayOffNoticeData = (locale) => {
  const Apis = {};
  

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `HrLayoffNotice/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HrLayoffNotice/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`HrLayoffNotice/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    
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
    
    const result = await axiosInstance.delete(`HrLayoffNotice/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`HrLayoffNotice/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default LayOffNoticeData;
