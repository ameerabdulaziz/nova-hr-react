import axiosInstance from "../../api/axios";

const AssessmentReviewData = (locale) => {
  const Apis = {};


  Apis.Get = async (Employee,Month,Year) => {
    const data = await axiosInstance.get(`Assessment/GetReviewAssessmentList/${locale}?EmployeeId=${Employee ? Employee.id : ""}&yearid=${Year.id}&monthid=${Month.id}`);

    return data.data;
  };


  Apis.GetDataById = async (id) => {
    const data = await axiosInstance.get(`Assessment/GetAssessment/${id}/${locale}`);

    return data.data;
  };

  Apis.Save = async (data) => {

      const result = await axiosInstance.post("Assessment/SaveMgrAssessment", data);
      return result;
  };

  
  return Apis;
};

export default AssessmentReviewData;
