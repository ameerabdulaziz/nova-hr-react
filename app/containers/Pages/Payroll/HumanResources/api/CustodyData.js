/* eslint-disable operator-linebreak */
/* eslint-disable no-debugger */
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';

const CustodyData = (locale) => {
  const CustodyApis = {};
  const [categoryList, setList] = useState([]);

  CustodyApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`HrCustody/GetList/${locale}`);
    const finaldata = data.data.list.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      enName: obj.enName,
      categoryName: obj.categoryName,
      custodyCategoryId: obj.custodyCategoryId,
      edited: false,
    }));
   
    setList(data.data.categories);
    var categories = data.data.categories.map((obj) => obj.name)
    anchorTable[3].options = categories;
    anchorTable[3].initialValue = categories[0];

    return { finaldata, anchorTable };
  };

  CustodyApis.Save = async (Item) => {
    
    const cid = categoryList.find((ele) => ele.name === Item.categoryName).id;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.enName,
      custodyCategoryId: cid,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrCustody', data)
        : await axiosInstance.put(`HrCustody/${Item.id}`, data);
    return result;
  };

  CustodyApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`HrCustody/${Item.id}`);
    return data;
  };

  return CustodyApis;
};

export default CustodyData;
