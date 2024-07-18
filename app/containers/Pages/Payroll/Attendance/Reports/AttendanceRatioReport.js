import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../api/GeneralListApis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PayrollTable from "../../Component/PayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";

function AttendanceRatioReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [FromDate, setFromDate] = useState(null);
  const [Shift, setShift] = useState("");
  const [ShiftList, setShiftList] = useState([]);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: '',
  });


  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const selectedShift = getAutoCompleteValue(ShiftList, Shift);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (selectedShift) {
      highlights.push({
        label: intl.formatMessage(messages.shift),
        value: selectedShift.name,
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
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (FromDate) {
      highlights.push({
        label: intl.formatMessage(messages.fromDate),
        value: formateDate(FromDate),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {


    	// used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }

    if(FromDate !== null )
    {

    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(FromDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        shiftcode: Shift,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).AttendanceRatioReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  }
  else
  {
      toast.error(intl.formatMessage(messages.fromDateErrorMes));
  }
  };

  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(shift);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
    {
        name: "totalEmp",
        label: intl.formatMessage(messages.totalWorking),
      },
      {
        name: "workingEmp",
        label: intl.formatMessage(messages.currentAttendance),
      },
    {
      name: "diff",
      label: intl.formatMessage(messages.diff),
    },

  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>

                  <Grid item xs={12} md={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(payrollMessages.fromdate)}
                        value={FromDate  ? dayjs(FromDate) : FromDate}
                        className={classes.field}
                          onChange={(date) => {
                            setFromDate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: false
                            }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

          <Grid item xs={12} md={10}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               notShowDate={true}
               DateError={DateError}
               setDateError={setDateError}
            ></Search>
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="shift"
              name="shift"
              options={ShiftList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setShift(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="shift"
                  label={intl.formatMessage(messages.shift)}
                />
              )}
            />
          </Grid>

          
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

        <PayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />

    </PayRollLoader>
  );
}

AttendanceRatioReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceRatioReport);
