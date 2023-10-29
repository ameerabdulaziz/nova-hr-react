import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmergencyBenefitListData';
import messages from '../messages';

function EmergencyBenefitList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    organizationId: [],
    InsOffice: '',
    YearId: '',
    MonthId: '',
    IsInsured: false,
  });

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const { organizationId, ...formData } = { ...formInfo };

      const organizations = formInfo.organizationId.map((item) => item.id);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const response = await api(locale).GetList(
        organizations,
        formData
      );
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const organizations = await api(locale).GetSInsuranceOrgnization();
      setOrganizationList(organizations);

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

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
      },
    },
    {
      name: 'insOrganizationName',
      label: intl.formatMessage(messages.organizationName),
      options: {
        filter: true,
      },
    },

    {
      name: 'orgInsuranceNo',
      label: intl.formatMessage(messages.insuranceNumber),
      options: {
        filter: true,
      },
    },

    {
      name: 'govname',
      label: intl.formatMessage(messages.government),
      options: {
        filter: true,
      },
    },

    {
      name: 'empCount',
      label: intl.formatMessage(messages.employeeNumber),
      options: {
        filter: true,
      },
    },

    {
      name: 'totVal',
      label: intl.formatMessage(messages.basicSalary),
      options: {
        filter: true,
      },
    },

    {
      name: 'totPerc',
      label: intl.formatMessage(messages.percent1),
      options: {
        filter: true,
      },
    },

    {
      name: 'insuOfficeName',
      label: intl.formatMessage(messages.insuranceOffice),
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
    selectableRows: 'none',
    searchOpen: false,
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

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={organizationList}
                value={formInfo.organizationId}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    organizationId: value !== null ? value : null,
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
                    {...params}
                    label={intl.formatMessage(messages.organizationName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={officeList}
                value={
                  officeList.find((item) => item.id === formInfo.InsOffice)
									?? null
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

            <Grid item xs={12} md={2}>
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
                  monthsList.find((item) => item.id === formInfo.MonthId)
									?? null
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

            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' type='submit'>
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

export default injectIntl(EmergencyBenefitList);
