import axiosInstance from '../../api/axios';
const VacationsTypesData = (locale) => {
  const VacationsTypesApis = {};
  VacationsTypesApis.GetList = async () => {
    const data = await axiosInstance.get(`VacVacation/GetList/${locale}`);
    const result = data.data;

    return result;
  };


  VacationsTypesApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`VacVacation/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  VacationsTypesApis.Save = async (data) => {
    const result = await axiosInstance.post('VacVacation/Save', data)
        
    return result;
  };


  VacationsTypesApis.Delete = async (id) => {
    const data = await axiosInstance.delete(`VacVacation/Delete/${id}`);
    return data;
  };

  return VacationsTypesApis;
};

export default VacationsTypesData;
