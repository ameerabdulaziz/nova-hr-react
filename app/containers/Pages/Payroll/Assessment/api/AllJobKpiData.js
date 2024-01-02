import axiosInstance from '../../api/axios';

const JobKPIData = (jobId) => {
  const api = {};

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`JobKPI/${jobId}`);

    const finaldata = data.data.map((item) => ({
      id: item.id,
      enJobKpi: item.enJobKpi,
      arJobKpi: item.arJobKpi,
      edited: false,
    }));

    return { finaldata, anchorTable };
  };

  api.Save = async (item) => {
    const data = {
      id: item.id,
      jobId,
      enJobKpi: item.enJobKpi,
      arJobKpi: item.arJobKpi,
    };

    const result = item.id === 0
      ? await axiosInstance.post('JobKPI', data)
      : await axiosInstance.put(`JobKPI/${item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`JobKPI/${Item.id}`);
    return data;
  };

  return api;
};

export default JobKPIData;
