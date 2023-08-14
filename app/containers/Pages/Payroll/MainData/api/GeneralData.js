import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
const GeneralData = (probs) => {
  const generalApis = {};
  
  generalApis.GetList = async () => {
    
    const data = await axiosInstance.get(probs);
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      edited: false,
    }));

    return finaldata;
  };

  generalApis.Save = async (Item) => {
    
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post(probs, data)
        : await axiosInstance.put(`${probs}/${Item.id}`, data);
    return result;
  };

  generalApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`${probs}/${Item.id}`);
    return data;
  };

  return generalApis;
};

export default GeneralData;
