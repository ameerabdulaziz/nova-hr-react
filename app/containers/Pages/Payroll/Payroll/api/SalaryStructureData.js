import axiosInstance from '../../api/axios';


const SalaryStructureData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`PayrollSalaryStructure/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`PayrollSalaryStructure/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("PayrollSalaryStructure/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`PayrollSalaryStructure/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`PayrollSalaryStructure/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default SalaryStructureData;
