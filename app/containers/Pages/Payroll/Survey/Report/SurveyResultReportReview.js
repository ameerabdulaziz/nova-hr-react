import React, { useEffect, useState } from 'react'
import messages from '../messages';
import toast from 'react-hot-toast';
import API from '../api/SurveyResultReportData';
import { useSelector } from 'react-redux';
import SurveyResultReportPrint from '../report-tamplate/SurveyResultReportPrint';

export default function SurveyResultReportReview() {
    const id = sessionStorage.idPrviewSurvay
    const [data , setData ] = useState(null)
    const locale = useSelector((state) => state.language.locale);

    const getReportData = async () =>{
        if(id !== null){
            try{
            const data1 = await API(locale).getDataPrint(id)
            setData(data1)
            if(data == null){
              toast.error(intl.formatMessage(messages.nofound))
              id = null
            }            
            }catch(err){
               //
            }
        }
    }

    useEffect(()=>{
        getReportData()
    },[])

  return (
  <div>
    <SurveyResultReportPrint data={data} />
  </div>
  )
}
