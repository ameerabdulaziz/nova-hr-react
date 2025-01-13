
import React, { useEffect, useState } from "react";
import {
    Box,
  } from '@mui/material';
import { useSelector } from 'react-redux';
import api from "../api/Form2InsuranceData";
import { injectIntl } from 'react-intl';
// import messages from "../messages";
import { formateDate } from '../../helpers';
import InsuranceReportForm1Template from '../../reports-templates/InsuranceReportForm1/InsuranceReportForm1Template';


const Form1InsuranceReview = (props) => {

    const [data, setData] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const locale = useSelector((state) => state.language.locale);
    const { intl } = props;
    

 

    const reviewDataFun = async () => {

        try {

            const formData = { ...sessionData.formInfo };

            formData.ToDate = formateDate(sessionData.formInfo.ToDate);
      
            if (sessionData.formInfo.InsDate === 'true') {
              formData.HiringDate = 'false';
            } else {
              formData.HiringDate = 'true';
            }
      
            Object.keys(formData).forEach((key) => {
              formData[key] = formData[key] === null ? '' : formData[key];
            });
            

            const { list, ...response } = await api(locale).GetList(formData);


            if(sessionData.SelectedRows.length !== 0)
                {
                  // used to review just selected rows in table
                  const filteredArray = list.filter((_, index) => sessionData.SelectedRows.includes(index))
      
                  setData(filteredArray)
                  
                }
                else
                {
                  setData(list)
                }

        } catch (err) {                        
        } finally {
        }
      };


      useEffect(()=>{
        if(sessionData.length !== 0)
        {
          reviewDataFun()
        }
      },[sessionData])


      useEffect(()=>{

        if(sessionData.length === 0)
        {
          setSessionData(JSON.parse(sessionStorage.getItem("Review")))
        }

      },[JSON.parse(sessionStorage.getItem("Review"))])


      
    return (
        <>
        
        {data.map((item,index)=>{
          
           return <Box
                  key={index}
                  sx={{
                    fontSize:"14px",
                    backgroundColor:"#ffffff",
                    padding:"25px",
                    marginBottom:"50px",
                    ...(locale === 'en' ? { textAlign: 'right', direction: 'rtl', } : {}),
                  }}
                >
                    <InsuranceReportForm1Template
                      data={item}
                    />
                </Box>
            })}

      </>
    )
}



export default injectIntl(Form1InsuranceReview);