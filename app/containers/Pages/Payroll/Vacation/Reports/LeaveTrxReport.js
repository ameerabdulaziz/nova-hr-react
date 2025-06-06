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
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/LeaveTrxReportData';
import messages from '../messages';
import { useLocation } from 'react-router-dom';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

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

   const [printFilterData, setPrintFilterData] = useState({
        FromDate: null,
        ToDate: null,
        Employee: '',
        EmpStatus: "",
        Organization: '',
        Branch: "",
        Vacation: [],
        InsertDate: false,
      });

  const [dateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.Organization),
        value: printFilterData.Organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (printFilterData.InsertDate) {
      highlights.push({
        label: intl.formatMessage(messages.filterOnRegistrationHistory),
        value: printFilterData.InsertDate
          ? intl.formatMessage(payrollMessages.yes)
          : intl.formatMessage(payrollMessages.no),
      });
    }

    if (printFilterData.Vacation.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.vacationName),
        value: printFilterData.Vacation.map((item) => item.name).join(' , '),
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
      label: intl.formatMessage(payrollMessages.fromdate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.fromdate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.todate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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

      setPrintFilterData((prev)=>({
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

       setPrintFilterData((prev)=>({
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

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId,todayDateKey])   

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9} xl={7}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={dateError}
              setDateError={setDateError}
              company={formInfo.BranchId}
              setPrintFilterData={setPrintFilterData}
            />
          </Grid>

          <Grid item xs={6} lg={4.5} xl={3.5}>
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

                setPrintFilterData((prev)=>({
                  ...prev,
                  Vacation: value,
                }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.vacationType)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item >
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => {
                  setFormInfo((prev) => ({
                  ...prev,
                  InsertDate: evt.target.checked,
                  }))

                  setPrintFilterData((prev) => ({
                    ...prev,
                    InsertDate: evt.target.checked,
                    }))
                }
                }
                checked={formInfo.InsertDate}
                label={intl.formatMessage(messages.filterOnRegistrationHistory)}
              />

              </Grid>

              <Grid item >
              <Button
                variant='contained'
                color='primary'
                onClick={onSearchBtnClick}
              >
                {intl.formatMessage(messages.search)}
              </Button>                
              </Grid>
            </Grid>
         </Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

LeaveTrxReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveTrxReport);
