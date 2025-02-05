import React, { useEffect, useState } from "react";
import ApiData from "../api/MedicalInsuranceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import  InsuranceFormPopUp  from '../../Component/InsuranceFormPopUp';
import notif from 'enl-api/ui/notifMessage';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import GeneralListApis from "../../api/GeneralListApis";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function MedicalInsuranceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [ToDate, setToDate] = useState(null);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [hrNotes, setHrNotes] = useState(false);
  const [rowIndexVal, setRowIndexVal] = useState("");

  const handleClickOpen = (key) => {
    setHrNotes(true)
   };
   
   const handleClose = (key) => {
    setHrNotes(false)
   };

  async function fetchNeededData() {
    try {
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

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
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

    if (ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(ToDate),
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


    try {
      setIsLoading(true);
      var formData = {
        ToDate: formateDate(ToDate),
        EmployeeId: searchData.EmployeeId,
        EmpStatusId: searchData.EmpStatusId,
        OrganizationId: searchData.OrganizationId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetMedicalInsuranceReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
      },
    },
    {
        name: "employeeCode",
        label: intl.formatMessage(messages.EmpCode),
        options: {
          filter: true,
        },
      },
      {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
        options: {
          filter: true,
        },
      },
    {
      name: "hiringDate",
      label: intl.formatMessage(messages.hiringDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.hiringDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
        name: "insuranceDate",
        label: intl.formatMessage(messages.insuranceDate),
        options: getDateColumnOptions(
          intl.formatMessage(messages.insuranceDate),
          {
            minDateLabel: intl.formatMessage(payrollMessages.minDate),
            maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
          }
        ),
      },
      {
        name: "birthDate",
        label: intl.formatMessage(messages.birthDate),
        options: getDateColumnOptions(
          intl.formatMessage(messages.birthDate),
          {
            minDateLabel: intl.formatMessage(payrollMessages.minDate),
            maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
          }
        ),
      },
    {
        name: "job",
        label: intl.formatMessage(messages.job),
        options: {
          filter: true,
        },
      },
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
        },
      },
      {
        name: "insNotes",
        label: intl.formatMessage(messages.hrNotes),
        options: {
          filter: true,
          print: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div >
                <Tooltip title= "Edit">
                <span 
                onClick={()=>{
                  handleClickOpen()
                  setRowIndexVal(tableMeta.rowData[0])
                }}
                  > 
                  {value} 
                  </span>
                </Tooltip>
                
              </div>
            );
          }
        },
      },
  ];


  const createHrNotesFun = async (hrNoteVal) => {

    try {
      let response = await ApiData(locale).save(hrNoteVal,rowIndexVal);
      if (response.status==200) {
        toast.success(notif.saved);
        setdata([]);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }


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

      setToDate(OpenMonthData ? OpenMonthData.todateAtt : null)
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setToDate(null)
    }

  },[searchData.BranchId, searchData.EmployeeId])



  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>

           <Grid item xs={6} md={4} lg={3} xl={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(payrollMessages.todate)}
                          value={ToDate ? dayjs(ToDate) : ToDate}
                        className={classes.field}
                          onChange={(date) => {
                            setToDate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`ToDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`ToDate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
           </Grid>

           <Grid item xs={12}></Grid>

          <Grid item xs={12} md={10} lg={9} xl={8}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               notShowDate={true}
               company={searchData.BranchId}
            ></Search>
          </Grid>

          
          <Grid item xs={12} >
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>

        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />

      <InsuranceFormPopUp  
        handleClose={()=>handleClose()}
        open={hrNotes}
        callFun={createHrNotesFun}
      />
    </PayRollLoaderInForms>
  );
}

MedicalInsuranceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MedicalInsuranceReport);
