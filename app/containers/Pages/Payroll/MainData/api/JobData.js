import axiosInstance from '../../api/axios';
const JobData = (locale) => {
  const jobApis = {};
  jobApis.GetList = async () => {
    const data = await axiosInstance.get(`MdJobs/GetAllJob/${locale}`);
    const result = data.data;

    return result;
  };

  jobApis.GetAllDataList = async () => {
    const data = await axiosInstance.get(`MdJobs/GetAllData/${locale}`);
    const result = data.data;

    return result;
  };


  jobApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`MdJobs/GetAllJob/${locale}?id=${id}`);
    const result = data.data;

    return result;
  };

  jobApis.Save = async (data) => {
    const result =
      data.id === 0
        ? await axiosInstance.post('MdJobs', data)
        : await axiosInstance.put(`MdJobs/${data.id}`, data);
        
    return result;
  };

  jobApis.SaveJobDetails = async (URLType , data) => {
    const result =  await axiosInstance.post(URLType, data)
    return result;
  }

  jobApis.Delete = async (id) => {
    const data = await axiosInstance.delete(`MdJobs/${id}`);
    return data;
  };

  return jobApis;
};

export default JobData;
