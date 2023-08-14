/* eslint-disable operator-linebreak */
/* eslint-disable no-debugger */
import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
const CurrencyRateData = (locale) => {
  const CurrencyRateApis = {};
  const [dList, setList] = useState([]);
  CurrencyRateApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`MdCurrencyRate/GetAllData/${locale}`);
    const result = data.data.currencyRateList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      //name: '',
      yearId: obj.yearId,
      monthId: obj.monthId,
      currencyId: obj.currencyId,
      rate: obj.rate,
      currencyName: obj.currencyName,
      yearName: obj.yearName,
      monthName: obj.monthName,
      edited: false,
    }));
    setList(data.data);
    const currencyList = data.data.currencyList.map((obj) => obj.name);
    const monthList = data.data.monthList.map((obj) => obj.name);
    const yearList = data.data.yearList.map((obj) => obj.name);

    anchorTable[1].options = currencyList;
    anchorTable[1].initialValue = currencyList[0];
    anchorTable[2].options = yearList;
    anchorTable[2].initialValue = yearList[0];
    anchorTable[3].options = monthList;
    anchorTable[3].initialValue = monthList[0];
    return { finaldata, anchorTable };
  };

  CurrencyRateApis.Save = async (Item) => {
    debugger;
    const currencyid = dList.currencyList.find(
      (rec) => rec.name === Item.currencyName
    ).id;
    const yearid = dList.yearList.find((rec) => rec.name === Item.yearName).id;
    const monthid = dList.monthList.find(
      (rec) => rec.name === Item.monthName
    ).id;
    const data = {
      id: Item.id,
      yearId: yearid,
      monthId: monthid,
      currencyId: currencyid,
      rate: Item.rate,
      yearName: '',
      monthName: '',
      currencyName: '',
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdCurrencyRate', data)
        : await axiosInstance.put(`MdCurrencyRate/${Item.id}`, data);
    return result;
  };

  CurrencyRateApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`MdCurrencyRate/${Item.id}`);
    return data;
  };

  return CurrencyRateApis;
};

export default CurrencyRateData;
