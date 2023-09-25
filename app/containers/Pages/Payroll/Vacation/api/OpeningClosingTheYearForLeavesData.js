import axiosInstance from '../../api/axios';
const OpeningClosingTheYearForLeavesData = (locale) => {
  const OpeningClosingTheYearForLeavesApis = {};
//   OpeningClosingTheYearForLeavesApis.GetList = async () => {
//     const data = await axiosInstance.get(`VacVacation/GetList/${locale}`);
//     const result = data.data;

//     return result;
//   };


  OpeningClosingTheYearForLeavesApis.GetDataById = async (orgId,yearId) => {
    const data = await axiosInstance.get(`VacMonthOpenClose/Get/${yearId}/${orgId}`);
    const result = data.data;

    return result;
  };

  OpeningClosingTheYearForLeavesApis.SaveOpenYear = async (data) => {
    const result = await axiosInstance.post('VacMonthOpenClose/OpenYear', data)
        
    return result;
  };

  OpeningClosingTheYearForLeavesApis.SaveCloseYear = async (data) => {
    const result = await axiosInstance.post('VacMonthOpenClose/CloseYear', data)
        
    return result;
  };


  // OpeningClosingTheYearForLeavesApis.Delete = async (Item) => {
  //   const data = await axiosInstance.delete(`VacVacation/Delete/${Item[0]}`);
  //   return data;
  // };

  return OpeningClosingTheYearForLeavesApis;
};

export default OpeningClosingTheYearForLeavesData;
