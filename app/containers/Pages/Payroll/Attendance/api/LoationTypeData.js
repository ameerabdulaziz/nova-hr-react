import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
const GeneralData = (probs) => {
  const Api = {};
  
  Api.GetList = async () => {
    
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

  Api.Save = async (Item) => {
    
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

  Api.Delete = async (Item) => {


    const data = await axiosInstance.delete(`${probs}/${Item.id}`);
    return data;
  };


  return Api;

}

export default GeneralData
