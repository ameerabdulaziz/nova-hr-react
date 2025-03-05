import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
const AsCategoryData = () => {
  const api = {};
  
  api.GetList = async () => {
    const data = await axiosInstance.get(
      'AsCategory'
    );

    return data.data;
  };

  api.Delete = async (id) => {
    const data = await axiosInstance.delete(`AsCategory/${id}`);
    return data;
  };



  return api;
};

export default AsCategoryData;
