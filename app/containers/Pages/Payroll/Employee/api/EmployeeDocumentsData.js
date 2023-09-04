import axiosInstance from '../../api/axios';
const EmployeeDocumentsData = (locale) => {
  const EmployeeDocumentsApis = {};
  EmployeeDocumentsApis.GetList = async (id,locale) => {
    const data = await axiosInstance.get(`EmpDocuments/GetModel/${id}/${locale}`);
    const result = data.data;

    return result;
  };




  EmployeeDocumentsApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`EmpDocuments/${id}/${locale}`);
    const result = data.data;

    return result;
  };


  const getFormData = object => Object.entries(object).reduce((fd, [ key, val ]) => {
    if (Array.isArray(val)) {
      val.forEach(v => fd.append(key, v))
    } else {
      fd.append(key, val)
    }
    return fd
  }, new FormData());

  EmployeeDocumentsApis.Save = async (data) => {
    const result =
         await axiosInstance.post('EmpDocuments/save', getFormData(data))

    return result;
  };



  EmployeeDocumentsApis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`EmpDocuments/${Item[0]}`);
    return data;
  };

  return EmployeeDocumentsApis;
};

export default EmployeeDocumentsData;
