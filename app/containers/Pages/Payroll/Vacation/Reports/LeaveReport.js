import { Button, Grid } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import { formateDate } from '../../helpers';
import API from '../api/LeaveReportData';
import messages from '../messages';

import { format } from "date-fns";
import { toast } from "react-hot-toast";
import Payrollmessages from "../../messages";

function LeaveReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
  });

  const [DateError, setDateError] = useState({});


  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
   }



  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(messages.employeeId),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'annCurrentBa',
      label: intl.formatMessage(messages.annualBalance),
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
    },
    {
      name: 'annOpen',
      label: intl.formatMessage(messages.annualOpen),
    },
  ]);

  const fetchTableData = async () => {

     // used to stop call api if user select wrong date
     if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
        // FromDate: dateFormatFun(formInfo.FromDate),
        // ToDate: dateFormatFun(formInfo.ToDate),
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
      };

      const dataApi = await API(locale).GetReport(formData);

      if (dataApi?.length > 0) {
        const clonedColumn = [...columns];

        const {
          employeeId,
          employeeName,
          annCurrentBa,
          employeeCode,
          hiringDate,
          organizationName,
          organizationId,
          annOpen,
          postedBal,
          ...reset
        } = dataApi[0];

        Object.keys(reset).forEach((key) => {
          clonedColumn.push({
            name: key,
            label: key,
          });
        });

        setColumns(clonedColumn);
      }

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchBtnClick = () => {
    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={DateError}
               setDateError={setDateError}
            />
          </Grid>

          <Grid item md={3}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...messages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

LeaveReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveReport);
