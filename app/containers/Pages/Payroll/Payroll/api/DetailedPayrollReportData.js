import axiosInstance from '../../api/axios';

const DetailedPayrollReportData = (locale) => {
  const api = {};

  api.GetList = async (params = {}) => {
    var body=params.TemplateId;
    const data = await axiosInstance.post(
      `PayrollReport/GetDetailedPayrollReport/${locale}?EmployeeId=${params.EmployeeId}&BranchId=${params.BranchId}&YearId=${params.YearId}&MonthId=${params.MonthId}&isBankTransfere=${params.isBankTransfere}&isInsured=${params.isInsured}&CurrencyId=${params.CurrencyId}&JobLevelId=${params.JobLevelId}`,
      
        body
    );

    return data.data;
  };

  return api;
};

export default DetailedPayrollReportData;
