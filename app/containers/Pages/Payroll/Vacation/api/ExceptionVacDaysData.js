import { useState } from 'react';
import axiosInstance from '../../api/axios';

const ExceptionVacDaysData = (locale) => {
  const api = {};
  const [branchList, setBranchList] = useState([]);

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`VacExpVacDays/GetAllData/${locale}`);
    const result = data.data.expVacDaysList;

    const finaldata = result.map((item) => ({
      id: item.id,
      arName: item.arName,
      enName: item.enName,
      expDate: item.expDate,
      branchName: item.branchName,
      edited: false,
    }));

    setBranchList(data.data.branchList);

    const branches = data.data.branchList.map((obj) => obj.name);

    anchorTable[4].options = branches;
    anchorTable[4].initialValue = branches[0];

    return { finaldata, anchorTable };
  };

  api.Save = async (item) => {
    const branchId = branchList.find(
      (branch) => branch.name === item.branchName
    ).id;

    const body = {
      id: item.id,
      arName: item.arName,
      enName: item.enName,
      expDate: item.expDate,
      branchName: item.branchName,
      branchId,
    };

    const result = item.id === 0
      ? await axiosInstance.post('VacExpVacDays', body)
      : await axiosInstance.put(`VacExpVacDays/${item.id}`, body);
    return result;
  };

  api.Delete = async (item) => {
    const data = await axiosInstance.delete(`VacExpVacDays/${item.id}`);

    return data;
  };

  return api;
};

export default ExceptionVacDaysData;
