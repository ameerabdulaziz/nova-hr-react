/* eslint-disable operator-linebreak */
/* eslint-disable no-debugger */
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';

const CityData = (locale) => {
  const CityApis = {};
  const [gList, setList] = useState([]);
  CityApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`MdCity/GetAllData/${locale}`);
    const result = data.data.cityList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      govName: obj.govName,
      governmentId: obj.governmentId,
      edited: false,
    }));

    setList(data.data.governmentList);
    const govList = data.data.governmentList.map((obj) => obj.name);
    console.log(govList);
    anchorTable[3].options = govList;
    anchorTable[3].initialValue = govList[0];

    return { finaldata, anchorTable };
  };

  CityApis.Save = async (Item) => {
    debugger;
    const govid = gList.find((ele) => ele.name === Item.govName).id;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      governmentId: govid,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdCity', data)
        : await axiosInstance.put(`MdCity/${Item.id}`, data);
    return result;
  };

  CityApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`MdCity/${Item.id}`);
    return data;
  };

  return CityApis;
};

export default CityData;
