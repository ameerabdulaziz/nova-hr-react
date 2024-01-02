import axiosInstance from "../../api/axios";

const EmployeeAssessmentData = (locale) => {
  const Apis = {};


  Apis.Get = async () => {
    const data = await axiosInstance.get(`Assessment/GetEmployeeAssessment/${locale}`);

    return data.data;
  };

  Apis.Save = async (data) => {

      const result = await axiosInstance.post("Assessment/Save", data);
      return result;
  };

  
  return Apis;
};

export default EmployeeAssessmentData;
