import axiosInstance from "../api/axios";

const dashboardData = (locale) => {
  const api = {};

  api.getNotifications = async () => {
    const data = await axiosInstance.get(
      `Notification/GetNotification/${locale}`
    );

    return data.data;
  };

  api.getAgeDemographics = async () => {
    const data = await axiosInstance.get(`Dashboard/GetAgeDemographics`);

    return data.data;
  };

  api.getGenderRatio = async () => {
    const data = await axiosInstance.get(`Dashboard/GetGenderRatio`);
    return data.data;
  };

  api.getEmpWithBestAtt = async () => {
    const data = await axiosInstance.get(`Dashboard/GetEmpWithBestAtt`);

    return data.data;
  };

  api.getBarData = async () => {
    const data = await axiosInstance.get(`Dashboard/GetBarData`);
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
  api.getMonthlySalary = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlySalary/${locale}`);
    return data.data;
  };
  api.getSalaryYearly = async () => {
    const data = await axiosInstance.get(`Dashboard/GetSalaryYearly`);
    return data.data;
  };
  api.getMonthlyOvertime = async () => {
    const data = await axiosInstance.get(`Dashboard/GetMonthlyOvertime/${locale}`);
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
  

  
  

  return api;
};

export default dashboardData;
