import axiosInstance from '../../api/axios';
const OfficialVacationsData = (locale) => {
  const OfficialVacationsApis = {};
  OfficialVacationsApis.GetList = async () => {
    const data = await axiosInstance.get(`VacOfficialVacation/GetList/${locale}`);
    const result = data.data;

    return result;
  };


  OfficialVacationsApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`VacOfficialVacation/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  OfficialVacationsApis.Save = async (data) => {
    const result = await axiosInstance.post('VacOfficialVacation/Save', data)
        
    return result;
  };


  OfficialVacationsApis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`VacOfficialVacation/Delete/${Item[0]}`);
    return data;
  };

  return OfficialVacationsApis;
};

export default OfficialVacationsData;
