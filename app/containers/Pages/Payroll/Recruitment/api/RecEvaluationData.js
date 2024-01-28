import { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axios';

const RecEvaluationData = () => {
  const lang = useSelector((state) => state.language.locale);
  const api = {};
  const [jobList, setJobList] = useState([]);

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`RecEvaluation/GetAllData/${lang}`);
    const result = data.data;

    const finaldata = result.recEvaluationList.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      arDesc: obj.arDesc,
      enDesc: obj.enDesc,
      elFinGrad: obj.elFinGrad,
      elPercent: obj.elPercent,
      elJob: obj.jobName,
      edited: false,
    }));

    const jobs = result.jobList.map((obj) => obj.name);

    setJobList(result.jobList);

    anchorTable[7].options = jobs;
    anchorTable[7].initialValue = jobs[0];

    return { finaldata, anchorTable };
  };

  api.Save = async (Item) => {
    const elJob = jobList.find((ele) => ele.name === Item.elJob)?.id;

    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      arDesc: Item.arDesc,
      enDesc: Item.enDesc,
      elJob,
      elPercent: Item.elPercent,
      elFinGrad: Item.elFinGrad,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('RecEvaluation', data)
      : await axiosInstance.put(`RecEvaluation/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`RecEvaluation/${Item.id}`);
    return data;
  };

  return api;
};

export default RecEvaluationData;
