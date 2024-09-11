import axiosInstance from '../../api/axios';
const GuaranterData = (locale) => {
  const GuaranterApis = {};
  GuaranterApis.GetList = async () => {
    const data = await axiosInstance.get(`EmpGuarantor/GetList/${locale}`);
    const result = data.data;

    return result;
  };

  GuaranterApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`EmpGuarantor/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

GuaranterApis.Save = async (data) => {
    const result = await axiosInstance.post('EmpGuarantor/Save', data);
        
    return result;
  };

  GuaranterApis.Delete = async (id) => {
    const data = await axiosInstance.delete(`EmpGuarantor/Delete/${id}`);
    return data;
  };

  return GuaranterApis;
};

export default GuaranterData;
