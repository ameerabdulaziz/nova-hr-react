import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/PositionOfGuaranteesAndContradictionsData';
import messages from '../messages';

function PositionOfGuaranteesAndContradictions(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const ageList = [
    {
      name: intl.formatMessage(messages.all),
      id: null,
    },
    {
      name: intl.formatMessage(messages.lessThan60),
      id: 2,
    },
    {
      name: intl.formatMessage(messages['60AndUp']),
      id: 1,
    },
  ];

  const pageTitle = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,
    BranchId: '',

    InsOffice: '',
    YearId: '',
    YearName: '',
    MonthId: '',
    age: null,

    ThreeMonths: false,
    IsInsured: false,
  });

  const columns = [
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organizationName),
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
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
    },
    {
      name: 'staffAge',
      label: intl.formatMessage(messages.employeeAgeAtEndOfMonth),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
    },
    {
      name: 'insuOffice',
      label: intl.formatMessage(messages.insuranceOffice),
    },
    {
      name: 'socialInsuranceID',
      label: intl.formatMessage(messages.socialInsuranceID),
    },
    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
    },
    {
      name: 'insuJobName',
      label: intl.formatMessage(messages.insuranceJob),
    },
    {
      name: 'srcNotes',
      label: intl.formatMessage(messages.hrNotes),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'c1inNo',
      label: intl.formatMessage(messages.c1IncomingNumber),
    },
    {
      name: 'c1inDate',
      label: intl.formatMessage(messages.c1DeliverDate),
    },
    {
      name: 'c6inNo',
      label: intl.formatMessage(messages.c6IncomingNumber),
    },
    {
      name: 'c6inDate',
      label: intl.formatMessage(messages.c6DeliverDate),
    },
    {
      name: 'ka3bDate',
      label: intl.formatMessage(messages.workLetterDate),
    },
    {
      name: 'ka3bNo',
      label: intl.formatMessage(messages.workLetterNumber),
    },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const office = getAutoCompleteValue(officeList, formInfo.InsOffice);
    const age = getAutoCompleteValue(ageList, formInfo.age);
    const year = getAutoCompleteValue(yearList, formInfo.YearId);
    const month = getAutoCompleteValue(monthsList, formInfo.MonthId);

    if (year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: year.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: month.name,
      });
    }

    if (age) {
      highlights.push({
        label: intl.formatMessage(messages.age),
        value: age.name,
      });
    }

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.organizationName),
        value: organization.name,
      });
    }

    if (office) {
      highlights.push({
        label: intl.formatMessage(messages.insuranceOffice),
        value: office.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.Company),
        value: company.name,
      });
    }

    highlights.push({
      label: intl.formatMessage(messages.hiredFromAtLeast3Months),
      value: formInfo.ThreeMonths
        ? intl.formatMessage(payrollMessages.yes)
        : intl.formatMessage(payrollMessages.no),
    });

    highlights.push({
      label: intl.formatMessage(messages.onlyInsured),
      value: formInfo.IsInsured
        ? intl.formatMessage(payrollMessages.yes)
        : intl.formatMessage(payrollMessages.no),
    });

    setFilterHighlights(highlights);
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

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
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

      const dataApi = await api(locale).GetReport(formInfo);

      setTableData(dataApi);

      getFilterHighlights();
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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
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
                value={getAutoCompleteValue(officeList, formInfo.InsOffice)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'InsOffice')
                }
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
                value={getAutoCompleteValue(yearList, formInfo.YearId)}
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

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={monthsList}
                value={getAutoCompleteValue(monthsList, formInfo.MonthId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'MonthId')}
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
                value={getAutoCompleteValue(ageList, formInfo.age)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'age')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.age)}
                  />
                )}
              />
            </Grid>

            <Grid item>
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

            <Grid item>
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

            <Grid item md={12}>
              <Button variant='contained' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PayrollTable
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

PositionOfGuaranteesAndContradictions.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PositionOfGuaranteesAndContradictions);
