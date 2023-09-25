
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';

const CustodyCategory = (locale) => {
  const CustodyApis = {};
  const [jobsList, setjobsList] = useState([]);

  CustodyApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`HrCustodyCategory/GetList/${locale}`);
  
    const finaldata = data.data.list.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      enName: obj.enName,
      jobName: obj.jobName,
      jobId: obj.jobId,
      edited: false,
    }));
   
    setjobsList(data.data.jobs);
    var jobs = data.data.jobs.map((obj) => obj.name);
    anchorTable[3].options = jobs;
    anchorTable[3].initialValue = jobs[0];

    return { finaldata, anchorTable };
  };

  CustodyApis.Save = async (Item) => {
    
    const jid = jobsList.find((ele) => ele.name === Item.jobName).id;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.enName,
      jobId: jid,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrCustodyCategory', data)
        : await axiosInstance.put(`HrCustodyCategory/${Item.id}`, data);
    return result;
  };

  CustodyApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`HrCustodyCategory/${Item.id}`);
    return data;
  };

  return CustodyApis;
};

export default CustodyCategory;
