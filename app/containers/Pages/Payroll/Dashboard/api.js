import axiosInstance from "../api/axios";

const dashboardData = (locale) => {
  const api = {};

  api.getNotifications = async () => {
    const data = await axiosInstance.get(
      `Notification/GetNotification/${locale}`
    );

    return data.data;
  };


  api.SaveNotification = async (id) => {
    const data = await axiosInstance.post(
      `Notification/SaveNotification?Id=${id?id:0}`
    );

    return data.data;
  };

  api.getAllNews = async () => {
    const data = await axiosInstance.get(
      `HrNews/GetEmployeeNewsList/en`
    );

    return data.data;
  }

 api.getLastNews = async () => {
   const data = await axiosInstance.get(
     `HrNews/GetEmployeeNewsList/en?latest=true`
   );

    return data.data;
  };

  api.getNewsById = async (id) => {
    const data = await axiosInstance.get(
      `HrNews/GetEmployeeNewsList/en?latest=true&id=${id}`
    );

    return data.data;
  };

  api.RemoveSelectedNewsById = async (id) => {
    const data = await axiosInstance.get(
      `HrNews/GetEmployeeNewsList/en?id=${id}`
    );

    return data.data;
  };

  api.UseChatGPT = async (question) => {
    const data = await axiosInstance.post(
      `Chat/UseChatGPT`,question
    );

    return data.data;
  };
  

  api.getAgeDemographics = async () => {
    const data = await axiosInstance.get(`Dashboard/GetAgeDemographics`);

    return data.data;
  };

  api.GetCalendarData = async () => {
    const data = await axiosInstance.get(
      `Dashboard/GetCalendarData/${locale}`
    );

    return data.data;
  };

  api.getGenderRatio = async () => {
    const data = await axiosInstance.get(`Dashboard/GetGenderRatio`);
    return data.data;
  };

  api.getEmpWithBestAtt = async (isWorest) => {
    const data = await axiosInstance.get(`Dashboard/GetEmpWithBestAtt?isWorest=${isWorest?isWorest:false}`);
    if(data.status == 200 && data.data.length > 0 ){
      return data.data;
    }else{
      return false;
    }

  };

  api.getBarData = async (isnotCalcPermission) => {
    const data = await axiosInstance.get(`Dashboard/GetBarData?isnotCalcPermission=${isnotCalcPermission?isnotCalcPermission:false}`);
    return data.data;
  };

  api.getNationalty = async () => {
    const data = await axiosInstance.get(`Dashboard/GetNationalty/${locale}`);
    return data.data;
  };

  api.getServicePeriod = async () => {
    const data = await axiosInstance.get(`Dashboard/GetServicePeriod`);
    return data.data;
  };
  api.getMainBarData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMainBarData`);
    return data.data;
  };
  api.getSocialStatus = async () => {
    const data = await axiosInstance.get(`Dashboard/GetSocialStatus/${locale}`);
    return data.data;
  };
  api.getEmpWithHighestAbscence = async () => {
    const data = await axiosInstance.get(`Dashboard/GetEmpWithHighestAbscence/${locale}`);
    return data.data;
  };
  api.getOrgLevel = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOrgLevel`);
    return data.data;
  };
  api.getMonthlySalary = async (isCurrentUser) => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlySalary/${locale}?isCurrentUser=${isCurrentUser?isCurrentUser:false}`);
    return data.data;
  };
  api.getSalaryYearly = async () => {
    const data = await axiosInstance.get(`Dashboard/GetSalaryYearly`);
    return data.data;
  };
  api.getMonthlyOvertime = async (isCurrentUser) => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyOvertime/${locale}?isCurrentUser=${isCurrentUser?isCurrentUser:false}`);
    return data.data;
  };
  api.getMonthlyAbscence = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyAbscence/${locale}`);
    return data.data;
  };
  api.getMonthlyTaxIns = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyTaxIns/${locale}`);
    return data.data;
  };
  api.getMonthlyVac = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyVac/${locale}`);
    return data.data;
  };
  api.getGrossSalary = async () => {
    const data = await axiosInstance.get(`Dashboard/GetGrossSalary`);
    return data.data;
  };
  api.getGenderSalary = async () => {
    const data = await axiosInstance.get(`Dashboard/GetGenderSalary/${locale}`);
    return data.data;
  };
  api.getMonthlyPyarollData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyPyarollData`);
    return data.data;
  };
  api.getPyarollData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetPyarollData`);
    return data.data;
  };

  api.getMonthlyAttData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyAttData`);
    return data.data;
  };
  
  api.getAttData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetAttData/${locale}`);
    return data.data;
  };

  api.getMonthlyWorkHours = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyWorkHours/${locale}`);
    return data.data;
  };
  api.getVacationsPercentage = async () => {
    const data = await axiosInstance.get(`Dashboard/GetVacationsPercentage/${locale}`);
    return data.data;
  };
  api.getMonthlyLate = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyLate/${locale}`);
    return data.data;
  };
  api.getAttAbscence = async () => {
    const data = await axiosInstance.get(`Dashboard/GetAttAbscence`);
    return data.data;
  };
  api.getRewardPenalty = async () => {
    const data = await axiosInstance.get(`Dashboard/GetRewardPenalty`);
    return data.data;
  };
  api.getOvertimeVSLate = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOvertimeVSLate`);
    return data.data;
  };

  api.getMonthlyOvertimeAndLate = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyOvertimeAndLate`);
    return data.data;
  };

  api.getOtherYearlyData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherYearlyData`);
    return data.data;
  };
  api.getOtherWorkHours = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherWorkHours`);
    return data.data;
  };

  api.getOtherVacations = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherVacations`);
    return data.data;
  };

  api.getOtherPermession = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherPermession`);
    return data.data;
  };
  api.getOtherMession = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherMession`);
    return data.data;
  };
  api.getOtherActualAtt = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherActualAtt`);
    return data.data;
  };
  api.getOtherActualHoursBi = async () => {
    const data = await axiosInstance.get(`Dashboard/GetOtherActualHoursBi`);
    return data.data;
  };
  
  
  return api;
};

export default dashboardData;
