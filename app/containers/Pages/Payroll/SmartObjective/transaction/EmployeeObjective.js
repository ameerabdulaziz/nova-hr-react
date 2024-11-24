import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmployeeObjectiveData';
import messages from '../messages';

function EmployeeObjective(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const authState = useSelector((state) => state.authReducer);
  const companyState = useSelector((state) => state.authReducer.companyInfo);
  const { isHR, isManagement, branchId } = authState.user;

  const isNormalEmployee = !isHR && !isManagement;

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    BranchId: branchId,
    OrganizationId: '',
    EmpStatusId: null,

    yearId: null,
    monthId: null,
  });

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const year = getAutoCompleteValue(yearList, formInfo.yearId);
    const month = getAutoCompleteValue(monthsList, formInfo.monthId);
    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.year),
        value: year.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.month),
        value: month.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.employeeName),
        value: employee.name,
      });
    }

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList(formInfo);
      setTableData(response);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const branches = await GeneralListApis(locale).GetBranchList();
      setCompanyList(branches);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchTableData();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

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
      name: 'objectiveDescription',
      label: intl.formatMessage(messages.objective),
    },

    {
      name: 'measurementTool',
      label: intl.formatMessage(messages.measurementTool),
    },

    {
      name: 'dueDate',
      label: intl.formatMessage(messages.dueDate),
    },

    {
      name: 'execution',
      label: intl.formatMessage(messages.achieved),
    },

    {
      name: 'weight',
      label: intl.formatMessage(messages.weight),
    },

    {
      name: 'weightedScore',
      label: intl.formatMessage(messages.weightedScore),
    },

    {
      name: 'evalNotes',
      label: intl.formatMessage(messages.comment),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },

    {
      name: 'staffComment',
      label: intl.formatMessage(messages.employeeComment),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/SmartObjective/EmployeeObjectiveCreate',
      disabled: isNormalEmployee,
    },
    edit: {
      url: '/app/Pages/SmartObjective/EmployeeObjectiveEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    fetchTableData();
  };


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(yearList.length !== 0 && monthsList.length !== 0)
      {
        if(!EmployeeId)
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
        }
        else
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
        }

          setFormInfo((prev) => ({
            ...prev,
            yearId : OpenMonthData ? OpenMonthData.yearId : null,
            monthId: OpenMonthData ? OpenMonthData.monthId : null
          }));
      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if((formInfo.BranchId || formInfo.BranchId !== "") && (!formInfo.EmployeeId ||formInfo.EmployeeId === ""))
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (formInfo.EmployeeId  || formInfo.EmployeeId !== ""))
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (!formInfo.EmployeeId || formInfo.EmployeeId === ""))
    {
      setFormInfo((prev) => ({
        ...prev,
        yearId : null,
        monthId: null
      }));
    }

  },[formInfo.BranchId, formInfo.EmployeeId,yearList,monthsList])

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <Grid container spacing={2} mt={0}>
            <Grid item xs={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                notShowDate
                requireEmployee
                notShowStatus
                company={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.yearId)}
                onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(payrollMessages.year)}
                  />
                )}
              />
            </Grid>

            {companyState?.monthlySmartObjective && (
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={monthsList}
                  value={getAutoCompleteValue(monthsList, formInfo.monthId)}
                  onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id + option.name}>
                      {option.name}
                    </li>
                  )}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(payrollMessages.month)}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button type='submit' variant='contained' color='primary'>
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>
      </form>

      <PayrollTable
        isLoading={isLoading}
        title=''
        filterHighlights={filterHighlights}
        data={tableData}
        columns={columns}
        actions={actions}
      />
    </PayRollLoader>
  );
}

EmployeeObjective.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeObjective);
