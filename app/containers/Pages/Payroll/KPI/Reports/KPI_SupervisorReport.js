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
import API from '../api/KPI_Reports_Data';
import messages from '../messages';
import { toast } from "react-hot-toast";
import Payrollmessages from "../../messages";

function KPI_SupervisorReport(props) {
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

  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
    {
        name: 'supervisor',
        label: 'Supervisor',
    },
    {
        name: 'qA_Score',
        label: 'QA Score',
    },

    {
        name: 'audits',
        label: 'Audits',
    },
    {
        name: 'csaT_Score',
        label: 'CSAT Score',
    },
    {
        name: 'surveys',
        label: 'Surveys',
    },
    {
        name: 'aht',
        label: 'AHT',
    },
    {
        name: 'acw',
        label: 'ACW',
    },
    {
        name: 'chats',
        label: 'Chats',
    },
    {
        name: 'absenteeism_Hours',
        label: 'Absenteeism',
    },
    {
        name: 'utilization',
        label: 'Utilizationa',
    },
    {
        name: 'ahT1',
        label: 'AHT1',
    },
    {
        name: 'qa',
        label: 'QA',
    },
    {
        name: 'csat',
        label: 'CSAT',
    },
    {
        name: 'utilization1',
        label: 'Utilization',
    },
    {
        name: 'Total',
        label: 'Total',
    },
    {
        name: 'kpi',
        label: 'KPIs',
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
        FromDate: formInfo.FromDate ? formateDate(formInfo.FromDate) : "",
          ToDate: formInfo.ToDate ? formateDate(formInfo.ToDate) : "",
      };
      const dataApi = await API(locale).GetSupervisorReport(formData);
      // add Total into data
      dataApi.map((item)=>{
        item.Total = item.qa + item.ahT1 + item.csat + item.utilization1
      })
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
               notShowEmployeeName={true}
               notShowStatus={true}
               notShowOrganization={true}
               notShowCompany={true}
            />
          </Grid>

          <Grid item md={3}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...Payrollmessages.search} />
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

KPI_SupervisorReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(KPI_SupervisorReport);
