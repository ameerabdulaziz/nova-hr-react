import axiosInstance from '../../api/axios';
const JobData = (locale) => {
  const jobApis = {};
console.log("locale22 =",locale);
  jobApis.GetList = async () => {
    // debugger;
    const data = await axiosInstance.get(`MdJobs/GetAllJob/${locale}`);
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      edited: false,
    }));

    return result;
    // return finaldata;
  };

  jobApis.GetAllDataList = async () => {
    // debugger;
    const data = await axiosInstance.get(`MdJobs/GetAllData/${locale}`);
    const result = data.data;
    // const finaldata = result.map((obj) => ({
    //   id: obj.id,
    //   name: obj.arName,
    //   EnName: obj.enName,
    //   edited: false,
    // }));

    return result;
    // return finaldata;
  };


  jobApis.GetDataById = async (id) => {
    // debugger;
    const data = await axiosInstance.get(`MdJobs/${id}`);
    const result = data.data;

    return result;
  };

  jobApis.Save = async (data) => {
    // debugger;
    // const data = {
    //   id: Item.id,
    //   arName: Item.name,
    //   enName: Item.EnName,
    // };

    const result =
      data.id === 0
        ? await axiosInstance.post('MdJobs', data)
        : ""
        // await axiosInstance.put(`MdGender/${Item.id}`, data);
    return result;
  };

  jobApis.Delete = async (Item) => {
    // debugger;

    // const data = await axiosInstance.delete(`MdGender/${Item.id}`);
    return data;
  };

  return jobApis;
};

export default JobData;
