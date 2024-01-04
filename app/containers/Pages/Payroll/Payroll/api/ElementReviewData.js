import axiosInstance from '../../api/axios';


const ElementReviewData = (locale) => {
  const Apis = {};


  Apis.GetReport = async (Year,Elements,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetElementReport/${locale}/${Year.id}/${Elements}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  return Apis;
};

export default ElementReviewData;
