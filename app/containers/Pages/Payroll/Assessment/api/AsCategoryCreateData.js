import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
const AsCategoryCreateData = (loacal) => {
  const api = {};

  api.getList = async (id)=>{
    const data = await axiosInstance.get(`AsCategory/${id}`)
    return data.data
  }
  
  api.save = async (data) => {
    if(data.id==0){
    const dataa = await axiosInstance.post(`AsCategory`,data);
    return dataa.data;
    }else{
    const dataa = await axiosInstance.put(`AsCategory/${data.id}`,data);
    return dataa.data;
    }
 
  };

  api.ListJop = async () => {
 
    const data = await axiosInstance.get(`MdJobs/GetListModel/${loacal}`);
    return data.data;
 
  };

  return api;
};

export default AsCategoryCreateData;