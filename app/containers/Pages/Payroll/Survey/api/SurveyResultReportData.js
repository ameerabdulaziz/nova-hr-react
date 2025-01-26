import axiosInstance from "../../api/axios";


const API = (locale) => {
  const api = {};



  api.getDataList = async ()=>{
    const Data = await axiosInstance.get(`GeneralList/GetSurveyTemplateList/${locale}`)
 
    return Data.data
  }
  
  api.getDataPrint = async (id)=>{
    const Data = await axiosInstance.get(`Survey/GetQuestionStatisticReport/${locale}/${id}`)
    if (Data.status === 200) {
      return Data.data
    } else {
       return null;  
    }
  
  }

  return api

}

export default API