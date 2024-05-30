import axios from 'axios';
import axiosInstance from '../../api/axios';

const TrainingCenterData = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`HrTrainingCenter/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`HrTrainingCenter/Get/${id}/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('HrTrainingCenter/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`HrTrainingCenter/Delete/${id}`);

    return data;
  };

  api.GoogleMapsGetData = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc`;

    const data = await axios.get(url);
    return data.data;
  };

  return api;
};

export default TrainingCenterData;
