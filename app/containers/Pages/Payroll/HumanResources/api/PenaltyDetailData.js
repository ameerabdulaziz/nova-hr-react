
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';

const PenaltyDetailData = (locale,id) => {
  const PenaltyDetailApis = {};

  PenaltyDetailApis.GetList = async (anchorTable) => {
    
    const data = await axiosInstance.get(`HrPenalties/GetPenaltyDetail/${id??0}/${locale}`);
    const PenaltyDetailsList = data.data.penaltyDetailsList;
    const finaldata = PenaltyDetailsList.map((obj) => ({
      id: obj.id,
      name: '',
      PenaltyTypeName:obj.penaltyTypeName,
      PenaltyTypeId: obj.penaltyTypeId,
      PenaltyValue: obj.penaltyValue,
      index:obj.sort,
      edited: false,
    }));

    var PenaltyTypeList = data.data.penaltyTypeList.map((obj) => obj.name);
    
    anchorTable[2].options =PenaltyTypeList;
    anchorTable[2].initialValue = '';
    return { finaldata, anchorTable };

  };

  return PenaltyDetailApis;
};

export default PenaltyDetailData;
