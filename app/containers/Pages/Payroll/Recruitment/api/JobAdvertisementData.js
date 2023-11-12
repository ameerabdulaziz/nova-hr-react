import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetJobList = async () => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/GetJobList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.CheckManPower = async (organizationId, jobId) => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/CheckManPower/${organizationId}/${jobId}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/GetList/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('RecJobAdvertisement/save/', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`RecJobAdvertisement/Delete/${id}`);
    return data;
  };

  return api;
};

const tableData = (str) => {
  const api = {};

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(
      `RecJobAdvertisement/GetRecJobRequirement/${str}`
    );
    const finaldata = data.data.map((obj) => ({
      id: obj.id,
      jobAdvertisementId: obj.jobAdvertisementId,
      description: obj.description,
      edited: false,
    }));

    return { finaldata, anchorTable };
  };

  return api;
};

export default API;
export { tableData };
