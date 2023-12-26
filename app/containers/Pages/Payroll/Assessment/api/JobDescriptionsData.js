import axiosInstance from '../../api/axios';

const JobDescriptions = (jobId) => {
  const api = {};

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`JobDescription/${jobId}`);

    const finaldata = data.data.map((item) => ({
      id: item.id,
      arJobDesc: item.arJobDesc,
      enJobDesc: item.enJobDesc,
      edited: false,
    }));

    return { finaldata, anchorTable };
  };

  api.Save = async (item) => {
    const data = {
      id: item.id,
      jobId,
      arJobDesc: item.arJobDesc,
      enJobDesc: item.enJobDesc,
    };

    const result = item.id === 0
      ? await axiosInstance.post('JobDescription', data)
      : await axiosInstance.put(`JobDescription/${item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`JobDescription/${Item.id}`);
    return data;
  };

  return api;
};

export default JobDescriptions;
