
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

  PenaltyDetailApis.Save = async (Item) => {
    
    const ElementId = elementList.find((ele) => ele.name === Item.elementName).id;
    const PayTemplateId = payTemplate.find((ele) => ele.name === Item.payTemplateName).id;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.enName,
      ElementId: ElementId,
      PayTemplateId: PayTemplateId,
      value:Item.value
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrPenaltyDetail', data)
        : await axiosInstance.put(`HrPenaltyDetail/${Item.id}`, data);
    return result;
  };

  PenaltyDetailApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`HrPenaltyDetail/${Item.id}`);
    return data;
  };

  return PenaltyDetailApis;
};

export default PenaltyDetailData;
