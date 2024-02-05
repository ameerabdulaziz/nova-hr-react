
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';

const UniformData = (locale) => {
  const UniformApis = {};
  
  UniformApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`HrUniform`);
    const finaldata = data.data.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      enName: obj.enName,
      defualtPrice:obj.defualtPrice,
      depreciationPeriod:obj.depreciationPeriod,
      edited: false,
    }));
   

    return finaldata;
  };

  UniformApis.Save = async (Item) => {
    
    
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.enName,
      defualtPrice: Item.defualtPrice,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrUniform', data)
        : await axiosInstance.put(`HrUniform/${Item.id}`, data);
    return result;
  };

  UniformApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`HrUniform/${Item.id}`);
    return data;
  };

  return UniformApis;
};

export default UniformData;
