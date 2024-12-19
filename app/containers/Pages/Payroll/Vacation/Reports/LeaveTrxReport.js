import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/LeaveTrxReportData';
import messages from '../messages';
import { useLocation } from 'react-router-dom';

function LeaveTrxReport(props) {
  const { intl } = props;
  const location = useLocation();
  const { todayDateKey } = location.state ?? 0;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [tableData, setTableData] = useState([]);
  const [vacationsList, setVacationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterHighlights, setFilterHighlights] = useState([]);

  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const pageTitle = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
    VacationId: [],
    InsertDate: false,
    BranchId: branchId,
  });

  const [dateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.Organization),
        value: organization.name,
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
        label: intl.formatMessage(messages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    if (formInfo.InsertDate) {
      highlights.push({
        label: intl.formatMessage(messages.filterOnRegistrationHistory),
        value: formInfo.InsertDate
          ? intl.formatMessage(payrollMessages.yes)
          : intl.formatMessage(payrollMessages.no),
      });
    }

    if (formInfo.VacationId.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.vacationName),
        value: formInfo.VacationId.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
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
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeId),
      options: {
        filter: false,
        display: false,
        download: false,
        print: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
    },
    {
      name: 'vacationName',
      label: intl.formatMessage(messages.vacationName),
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(messages.fromDate),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(messages.toDate),
    },
    {
      name: 'daysCount',
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: 'dayEqual',
      label: intl.formatMessage(messages.dayDeducedBy),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(messages.registrationDate),
    },
  ];

  const fetchTableData = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    if(!formInfo.FromDate || !formInfo.ToDate)
    {
      toast.error(intl.formatMessage(payrollMessages.dateErrorMes));
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,

        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
        VacationId: formInfo.VacationId.map((item) => item.id),
      };

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const Vacations = await GeneralListApis(locale).GetVacList();
      setVacationsList(Vacations);

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

  const onSearchBtnClick = () => {
    fetchTableData();
  };


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setFormInfo((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    // used if i redirect from dashboard page
    if(todayDateKey)
      {
        setFormInfo((prev)=>({
         ...prev,
         FromDate: new Date(),
         ToDate: new Date(),
       }))
      }
      else
      {
        if(formInfo.BranchId !== "" && formInfo.EmployeeId === "")
        {      
          openMonthDateWithCompanyChangeFun(formInfo.BranchId)
        }

        if(formInfo.BranchId === "" && formInfo.EmployeeId !== "")
        {
          openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
        }
      }

    if(formInfo.BranchId === "" && formInfo.EmployeeId === "")
    {
      setFormInfo((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId,todayDateKey])   

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={dateError}
              setDateError={setDateError}
              company={formInfo.BranchId}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              options={vacationsList}
              multiple
              disableCloseOnSelect
              className={`${style.AutocompleteMulSty} ${
                locale === 'ar' ? style.AutocompleteMulStyAR : null
              }`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formInfo.VacationId}
              renderOption={(optionProps, option, { selected }) => (
                <li {...optionProps} key={optionProps.id}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  VacationId: value,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
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
                color='primary'
                onClick={onSearchBtnClick}
              >
                {intl.formatMessage(messages.search)}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoader>
  );
}

LeaveTrxReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveTrxReport);
