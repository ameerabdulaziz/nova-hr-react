import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import Search from '../../Component/Search';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import API from '../api/LeaveReportData';
import messages from '../messages';

function LeaveReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: '',
    OrganizationId: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: 'organizationName',
      label: <FormattedMessage {...messages.organization} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeId',
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
      name: 'hiringDate',
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'annCurrentBa',
      label: <FormattedMessage {...messages.annualBalance} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'postedBal',
      label: <FormattedMessage {...messages.postedBalance} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'annOpen',
      label: <FormattedMessage {...messages.annualOpen} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'annCurrentBa',
      label: <FormattedMessage {...messages.annualBalance} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'postedBal',
      label: <FormattedMessage {...messages.postedBalance} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'annOpen',
      label: <FormattedMessage {...messages.annualOpen} />,
      options: {
        filter: true,
      },
    },
  ]);

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
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

  const formateDate = (date) => format(new Date(date), 'yyyy-MM-dd');

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      if (dataApi?.length > 0) {
        const clonedColumn = [...columns];

        const {
          employeeId, employeeName, annCurrentBa, employeeCode, hiringDate, organizationName, organizationId, annOpen, postedBal, ...reset
        } = dataApi[0];

        Object.keys(reset).forEach(key => {
          clonedColumn.push({
            name: key,
            label: key,
            options: {
              filter: true,
            },
          });
        });

        setColumns(clonedColumn);
      }

      setTableData(dataApi);
    } catch (error) {
      toast.error(JSON.stringify(error));
      console.log(error);
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

  const handleChange = useCallback((name, value) => {
    if (name === 'fromDate') {
      setFormInfo((prev) => ({ ...prev, FromDate: value }));
    } else if (name === 'toDate') {
      setFormInfo((prev) => ({ ...prev, ToDate: value }));
    } else if (name === 'employeeId') {
      setFormInfo((prev) => ({ ...prev, EmployeeId: value }));
    } else if (name === 'organizationId') {
      setFormInfo((prev) => ({ ...prev, OrganizationId: value }));
    } else if (name === 'statusId') {
      setFormInfo((prev) => ({ ...prev, EmpStatusId: value }));
    }
  }, []);

  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: 'primary.main',
            zIndex: 10,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.69)',
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              handleChange={handleChange}
              fromdate={formInfo.FromDate}
              todate={formInfo.ToDate}
            />
          </Grid>

          <Grid item md={3}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...messages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </Box>
  );
}

export default injectIntl(LeaveReport);
