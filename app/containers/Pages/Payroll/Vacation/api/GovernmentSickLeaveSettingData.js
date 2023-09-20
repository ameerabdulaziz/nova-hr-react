import axiosInstance from '../../api/axios';
const GovernmentSickLeaveSettingData = (locale) => {
  const GovernmentSickLeaveSettingApis = {};

  GovernmentSickLeaveSettingApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`VacGovernmentSickVacSetting/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  GovernmentSickLeaveSettingApis.Save = async (data) => {
    const result = await axiosInstance.post('VacGovernmentSickVacSetting/Save', data)
        
    return result;
  };


  return GovernmentSickLeaveSettingApis;
};

export default GovernmentSickLeaveSettingData;
