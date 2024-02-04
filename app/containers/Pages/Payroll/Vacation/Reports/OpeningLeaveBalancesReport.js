import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import API from '../api/OpeningLeaveBalancesData';
import messages from '../messages';

function OpeningLeaveBalancesReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [yearsList, setYearsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    OrganizationId: '',
    yearId: null,
    // departmentId: ''
  });

  const columns = [
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
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'vacationName',
      label: intl.formatMessage(messages.vacationName),
    },
    {
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
    },
  ];

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      setIsLoading(true);

      const yearResponse = await GeneralListApis(locale).GetYears();
      setYearsList(yearResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  }

  useEffect(() => {
    fetchData();
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
              setIsLoading={setIsLoading}
              notShowDate={true}
            ></Search>
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              value={
                yearsList.find((year) => year.id === formInfo.yearId) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              options={yearsList}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  yearId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.year)}
                />
              )}
            />
          </Grid>

          <Grid item md={2}>
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

OpeningLeaveBalancesReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpeningLeaveBalancesReport);
