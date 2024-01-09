import axiosInstance from '../../api/axios';


const PayrollReportsData = (locale) => {
  const Apis = {};


  Apis.GetReport = async (Year,Elements,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetElementReport/${locale}/${Year.id}/${Elements}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.GetSalaryComparisonReport = async (Year1,Month1,Year2,Month2,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetSalaryComparison/${locale}/${Year1.id}/${Month1.id}/${Year2.id}/${Month2.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.FollowEmployeeReport = async (EmployeeId,Element,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetFollowEmployee/${locale}/${EmployeeId}/${Element.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };


  Apis.TaxReportReport = async (Year,Month,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetTaxReport/${locale}/${Year.id}/${Month.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.TotalDeptSalaryReport = async (Year,Month,TemplateId,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetTotalDeptSalary/${locale}/${Year.id}/${Month.id}/${TemplateId.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.SalaryYearReport = async (Year,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetSalaryYearReport/${locale}/${Year.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.SalarySigningListReportApi = async (Year,Month,TemplateId,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetSalarySigningList/${locale}/${Year.id}/${Month.id}/${TemplateId.id}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  return Apis;
};

export default PayrollReportsData;
