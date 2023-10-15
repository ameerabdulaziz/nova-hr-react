import axiosInstance from '../../api/axios';


const GroupLeavesData = (locale) => {
  const Apis = {};
  
  Apis.getVacations = async (data) => {
    
    const result = await axiosInstance.get(`VacVacationTrx/getVacations/${locale}?VacationId=${data.VacCode}&Date=${data.TrxDate}&FromDate=${data.fromdate}&ToDate=${data.Todate}`);
    let finaldata = {}
    let employeesIds = []
    result.data.employees.map((item)=>{
      employeesIds.push(item.id)
    })
    Object.keys(result.data).forEach(function(key, index) {
      
      finaldata =  {
        employees: result.data.employees,
        vacation: result.data.vacation ? {
          TrxDate: result.data.vacation?.trxDate,
          VacCode: result.data.vacation?.vacCode,
          employeesId: employeesIds,
          fromdate: result.data.vacation?.fromDate,
          Todate: result.data.vacation?.toDate,
          daysCount: result.data.vacation?.daysCount,
          vacReson: result.data.vacation?.vacReson
        } : null,
      }
    });


    return finaldata;
  };
  

  Apis.SaveAll = async (data) => {
    
    const result = await axiosInstance.post("VacVacationTrx/SaveAll",data);
    return result;
  };

  Apis.DeleteAll = async (data) => {
    
    const result = await axiosInstance.post("VacVacationTrx/DeleteAll",data);
    return result;
  };

  return Apis;
};

export default GroupLeavesData;
