import axiosInstance from '../../api/axios';
import { getFormData } from '../../helpers';
const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`TrTrainingTrx/GetList/${locale}`);

    return data.data;
  };

  api.getCertificateInfo = async () => {
    const data = await axiosInstance.get('SettingCertificate/Get');

    return data.data;
  };

  api.saveCertificate = async (id, body) => {
    const formData = getFormData(body);

    const data = await axiosInstance.post(`TrTrainingTrx/SaveCertificate/${id}`, formData);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`TrTrainingTrx/Get/${id}/${locale}`);

    return data.data;
  };

  api.getByExecutionId = async (id) => {
    const data = await axiosInstance.get(`TrTrainingTrx/GetByExecution/${id}/${locale}`);

    return data.data;
  };

  api.repeatTest = async (trainingId, employeeId) => {
    const data = await axiosInstance.post(`TestTemplate/RepeateTest/${locale}/${trainingId}/${employeeId}`);

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('TrTrainingTrx/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`TrTrainingTrx/Delete/${id}`);

    return data;
  };

  api.getTrainingByTrainerId = async () => {
    const result = await axiosInstance.get(
      `TrTrainingTrx/GetByTrainer/${locale}`
    );
    return result.data;
  };

  api.AddEmployeeToTraining = async (params) => {
    const result = await axiosInstance.post(`TrTrainingTrx/AddEmployeeToTraining?TrainingId=${params.trainingId}&EmployeeId=${params.employeeId}`);

    return result;
  };
  api.GetTrainingEmployee = async (TrainingId) => {
    const result = await axiosInstance.get(
      `TrTrainingTrx/GetTrainingEmployee/${locale}/${TrainingId}`
    );
    return result.data;
  };
  
  api.GetTrainingList = async () => {
    const result = await axiosInstance.get(
      `TrTrainingTrx/GetTrainingList/${locale}`
    );
    return result.data;
  };
  
  
  return api;
};

export default API;
