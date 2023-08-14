import axiosInstance from '../../api/axios';
const MailSMSSettingData = () => {
  const Apis = {};

 Apis.GetSetting = async (Type) => {
     debugger;
    const data = await axiosInstance.get(`SettingMailSMS/GetSetting/${Type}`);
   
    return data.data;
  };

  Apis.SaveSetting = async (data) => {
  
    const result = await axiosInstance.post(`SettingMailSMS/SaveSetting`, data);
    debugger;
    return result;
  };


  return  Apis;
};

export default MailSMSSettingData;

