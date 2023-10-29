import {
  Autocomplete, Button, Checkbox, FormControlLabel, Grid, TextField
} from '@mui/material';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import Search from '../../Component/Search';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/PositionOfGuaranteesAndContradictionsData';
import messages from '../messages';

function PositionOfGuaranteesAndContradictions(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [officeList, setOfficeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const ageList = [
    {
      label: intl.formatMessage(messages.all),
      value: null,
    },
    {
      label: intl.formatMessage(messages.lessThan60),
      value: 2,
    },
    {
      label: intl.formatMessage(messages['60AndUp']),
      value: 1,
    },
  ];

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,

    InsOffice: '',
    YearId: '',
    YearName: '',
    MonthId: '',
    age: null,

    ThreeMonths: false,
    IsInsured: false
  });

  const columns = [
    {
      name: 'organizationName',
      label: <FormattedMessage {...messages.organizationName} />,
      options: {
        filter: true,
      },
    },
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
      name: 'birthDate',
      label: <FormattedMessage {...messages.birthDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'staffAge',
      label: <FormattedMessage {...messages.employeeAgeAtEndOfMonth} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'hiringDate',
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'insuOffice',
      label: <FormattedMessage {...messages.insuranceOffice} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'socialInsuranceID',
      label: <FormattedMessage {...messages.socialInsuranceID} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'insuranceDate',
      label: <FormattedMessage {...messages.insuranceDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'insuJobName',
      label: <FormattedMessage {...messages.insuranceJob} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'srcNotes',
      label: <FormattedMessage {...messages.hrNotes} />,
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
    {
      name: 'ka3bDate',
      label: <FormattedMessage {...messages.workLetterDate} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'ka3bNo',
      label: <FormattedMessage {...messages.workLetterNumber} />,
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

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const office = await api(locale).GetSInsuranceOffices();
      setOfficeList(office);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
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

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                notShowDate={true}
                setIsLoading={setIsLoading}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={officeList}
                value={
                  officeList.find((item) => item.id === formInfo.InsOffice) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    InsOffice: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.insuranceOffice)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={
                  yearList.find((item) => item.id === formInfo.YearId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    YearId: value !== null ? value.id : null,
                    YearName: value !== null ? value.name : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Autocomplete
                options={monthsList}
                value={
                  monthsList.find((item) => item.id === formInfo.MonthId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    MonthId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.month)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={ageList}
                value={
                  ageList.find((item) => item.value === formInfo.age) ?? null
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => (option ? option.label : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    age: value?.value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.age)}
                  />
                )}
              />
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={2} >

                <Grid item md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formInfo.IsInsured}
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            IsInsured: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.onlyInsured)}
                  />
                </Grid>

                <Grid item md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formInfo.ThreeMonths}
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            ThreeMonths: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.hiredFromAtLeast3Months)}
                  />
                </Grid>

              </Grid>
            </Grid>

            <Grid item md={12}>
              <Button variant='contained' type='submit'>
                <FormattedMessage {...payrollMessages.search} />
              </Button>
            </Grid>
          </Grid>
        </form>
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

export default injectIntl(PositionOfGuaranteesAndContradictions);
