
import axiosInstance from '../../api/axios';
import React, {useState } from 'react';

const RewardsData = (locale) => {
  const RewardsApis = {};
  const [elementList, setelementList] = useState([]);
  const [payTemplate, setpayTemplate] = useState([]);
  
  RewardsApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`HrRewards/GetAllData/${locale}`);
    const result = data.data.rewards;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      enName: obj.enName,
      elementName: obj.elementName,
      payTemplateName: obj.payTemplateName,
      elementId: obj.elementId,
      payTemplateId: obj.payTemplateId,
      value: obj.value,
      edited: false,
    }));
    

    setelementList(data.data.elements);    
    setpayTemplate(data.data.payTemplate);
    const ElementNameList = data.data.elements.map((obj) => obj.name);
    const TemplateNameList = data.data.payTemplate.map((obj) => obj.name);
    
    anchorTable[3].options = TemplateNameList;
    anchorTable[3].initialValue = '';//TemplateNameList[0];
    anchorTable[3].orignaldata=data.data.payTemplate;

    anchorTable[5].options = ElementNameList;
    anchorTable[5].initialValue = '';//ElementNameList[0];
    anchorTable[5].orignaldata=data.data.elements;
    
console.log(ElementNameList);
    return { finaldata, anchorTable };
  };

  RewardsApis.Save = async (Item) => {
    
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
        ? await axiosInstance.post('HrRewards', data)
        : await axiosInstance.put(`HrRewards/${Item.id}`, data);
    return result;
  };

  RewardsApis.Delete = async (Item) => {
    
    const data = await axiosInstance.delete(`HrRewards/${Item.id}`);
    return data;
  };

  return RewardsApis;
};

export default RewardsData;
