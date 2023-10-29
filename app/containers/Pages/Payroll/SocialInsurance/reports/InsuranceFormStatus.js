import { Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import Search from '../../Component/Search';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/InsuranceFormStatusData';
import messages from '../messages';

function InsuranceFormStatus(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,
  });

  const columns = [
    {
      name: 'employeeCode',
      label: <FormattedMessage {...messages.employeeId} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: <FormattedMessage {...messages.employeeName} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'c1inNo',
      label: <FormattedMessage {...messages.c1IncomingNumber} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'c1inDate',
      label: <FormattedMessage {...messages.c1DeliverDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'c6inNo',
      label: <FormattedMessage {...messages.c6IncomingNumber} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'c6inDate',
      label: <FormattedMessage {...messages.c6DeliverDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: false,
    selectableRows: 'none',
    serverSide: true,
    onSearchClose: () => {
      // some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
        StatusId: formInfo.EmpStatusId,
      };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await api(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

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
              notShowDate={true}
              setIsLoading={setIsLoading}
            />
          </Grid>

          <Grid item md={2}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

export default injectIntl(InsuranceFormStatus);
