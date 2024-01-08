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

  return Apis;
};

export default PayrollReportsData;
