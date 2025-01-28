import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formateDate } from '../../helpers';
import InsuranceReportForm6 from '../../reports-templates/InsuranceReportForm6';
import api from '../api/Form2InsuranceData';

function Form6InsuranceReview() {
  const [data, setData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const locale = useSelector((state) => state.language.locale);

  const fetchNeededData = async () => {
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

      const response = await api(locale).GetList(formData);

      if (sessionData.SelectedRows.length !== 0) {
        // used to review just selected rows in table
        const filteredArray = response.list.filter((_, index) => sessionData.SelectedRows.includes(index)
        );

        setData(filteredArray);
      } else {
        setData(response.list);
      }
    } catch (err) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    if (sessionData.length !== 0) {
      fetchNeededData();
    }
  }, [sessionData]);

  useEffect(() => {
    try {
      const sessionDataFromStorage = JSON.parse(
        sessionStorage.getItem('Review')
      );

      if (sessionDataFromStorage && sessionDataFromStorage.length !== 0) {
        setSessionData(sessionDataFromStorage);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Box
      sx={{
        fontSize: '14px',
        backgroundColor: '#ffffff',
        padding: '25px',
        marginBottom: '50px',
        ...(locale === 'en' ? { textAlign: 'right', direction: 'rtl' } : {}),
      }}
    >
      {data.map((employee) => (
        <InsuranceReportForm6 key={employee.id} employee={employee} />
      ))}
    </Box>
  );
}

export default Form6InsuranceReview;
