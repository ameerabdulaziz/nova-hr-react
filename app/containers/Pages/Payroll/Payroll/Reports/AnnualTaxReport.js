import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formatNumber, formateDate, getCheckboxIcon } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/AnnualTaxReportData';
import messages from '../messages';

function AnnualTaxReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const Title = localStorage.getItem('MenuName');

  const [companyList, setCompanyList] = useState([]);
  const [yearList, setYearList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: branchId,
    YearId: null,
    IsStopped: null,

    EmpStatusId: 1,
    OrganizationId: null,
  });

  const isStoppedList = [
    {
      id: 1,
      name: intl.formatMessage(messages.stopped),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.notStopped),
    },
  ];

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setFormInfo((prev) => ({
          ...prev,
          YearId: response.yearId,
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        print: false,
        display: false,
      },
    },

    {
      name: 'branchName',
      label: intl.formatMessage(messages.company),
    },

    {
      name: 'organizationName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.job),
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'taxable',
      label: intl.formatMessage(messages.taxable),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: 'isConsultant',
      label: intl.formatMessage(messages.consultant),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: 'isSpecialNeeds',
      label: intl.formatMessage(messages.specialNeeds),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: 'oldTaxBool',
      label: intl.formatMessage(messages.oldTaxBool),
      options: {
        filter: false,
        customBodyRender: (value) => formatNumber(value),
      },
    },

    {
      name: 'oldTaxValue',
      label: intl.formatMessage(messages.oldTaxValue),
      options: {
        filter: false,
        customBodyRender: (value) => formatNumber(value),
      },
    },

    {
      name: 'newTaxBool',
      label: intl.formatMessage(messages.newTaxBool),
      options: {
        filter: false,
        customBodyRender: (value) => formatNumber(value),
      },
    },

    {
      name: 'newTaxValue',
      label: intl.formatMessage(messages.newTaxValue),
      options: {
        filter: false,
        customBodyRender: (value) => formatNumber(value),
      },
    },
  ];

  const fetchTableData = async () => {
    setIsLoading(true);

    const formData = {
      ...formInfo,
      IsStopped: formInfo.IsStopped === null ? null : Boolean(formInfo.IsStopped),
    };

    try {
      const response = await api(locale).GetList(formData);
      setTableData(response);
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

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const handleEmpChange = useCallback(async (id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prev) => ({
        ...prev,
        EmployeeId: id,
      }));
    }
  }, []);

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  useEffect(() => {
    fetchNeededData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} spacing={3}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={companyList}
                value={getAutoCompleteValue(companyList, formInfo.BranchId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'BranchId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.company)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.YearId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'YearId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={isStoppedList}
                value={getAutoCompleteValue(isStoppedList, formInfo.IsStopped)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'IsStopped')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.isStopped)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.EmployeeId}
                required={false}
                branchId={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PayrollTable title='' data={tableData} columns={columns} />
    </PayRollLoader>
  );
}

AnnualTaxReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AnnualTaxReport);
