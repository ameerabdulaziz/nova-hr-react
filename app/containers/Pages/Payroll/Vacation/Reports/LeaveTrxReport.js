import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  TextField
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
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import API from '../api/LeaveTrxReportData';
import messages from '../messages';

function LeaveTrxReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [VacationsList, setVacationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: '',
    OrganizationId: '',
    VacationId: [],
    InsertDate: false,
  });

  const columns = [
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
      name: 'vacationName',
      label: <FormattedMessage {...messages.vacationName} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'fromDate',
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: 'daysCount',
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'dayEqual',
      label: <FormattedMessage {...messages.dayDeducedBy} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'trxDate',
      label: <FormattedMessage {...messages.registrationDate} />,
      options: {
        filter: true,
      },
    },
  ];

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

  async function fetchData() {
    try {
      const Vacations = await GeneralListApis(locale).GetVacList();
      setVacationsList(Vacations);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  }

  const formateDate = (date) => format(new Date(date), 'yyyy-MM-dd');

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.VacationId = formData.VacationId.map((item) => item.id);
      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Backdrop
          sx={{
            color: 'primary.main',
            zIndex: 10,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.69)',
          }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              handleChange={handleChange}
              fromdate={formInfo.FromDate}
              todate={formInfo.ToDate}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              id='vacationId'
              options={VacationsList}
              multiple
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  VacationId: value,
                }));
              }}
              sx={{
                '.MuiInputBase-root': {
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  name='VacationId'
                  required
                  label={intl.formatMessage(messages.vacationType)}
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => setFormInfo((prev) => ({
                  ...prev,
                  InsertDate: evt.target.checked,
                }))
                }
                checked={formInfo.InsertDate}
                label={intl.formatMessage(messages.filterOnRegistrationHistory)}
              />

              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={onSearchBtnClick}
              >
                <FormattedMessage {...messages.search} />
              </Button>
            </Stack>
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
    </Box>
  );
}

export default injectIntl(LeaveTrxReport);
