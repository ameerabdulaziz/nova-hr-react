import React, { useEffect, useState,useRef } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import style from "../../../../../styles/styles.scss";
import GeneralListApis from "../../api/GeneralListApis";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useReactToPrint } from 'react-to-print';
import DetailedAttendanceReportTemplate from "../../reports-templates/DetailedAttendanceReportTemplate"
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { formateDate, getAutoCompleteValue, getCheckboxIcon } from "../../helpers";
import PayrollTable from "../../Component/PayrollTable";

function DetailedAttendanceReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [printData, setPrintData] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState(null);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    BranchId: '',
    OrganizationId: "",
    EmpStatusId: 1,
    withoutEmployeesWithoutAttendanceRules: false,
    insuredEmployeesOnly: false,
    showPresentEmployeeOnly: false,
    ShowViolationsOnly: false,
    showFingerprintDevice: false,
    printPicture: false,
  });

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [DateError, setDateError] = useState({});

      const [headerType, setHeaderType] = useState();

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
        label: intl.formatMessage(Payrollmessages.organizationName),
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
        label: intl.formatMessage(Payrollmessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.company),
        value: company.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.todate),
        value: formateDate(searchData.ToDate),
      });
    }

    if (Shift && Shift.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.shift),
        value: Shift.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const handleSearch = async (printType) => {

      // used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }



    let ShiftData = ""
    if(Shift !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Shift.map((ele, index)=>{
        ShiftData+= `${ele.id}`
        if(index + 1 !== Shift.length)
        {
            ShiftData+= ","
        }
      })
    }


    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        IsExcludeNotAttRules: searchData.withoutEmployeesWithoutAttendanceRules ,
        IsInsured: searchData.insuredEmployeesOnly ,
        IsTimeIn: searchData.showPresentEmployeeOnly ,
        IsNotValid: searchData.ShowViolationsOnly ,
        IsINOutDev: searchData.showFingerprintDevice ,
        IsImage: searchData.printPicture ,
        ShiftCodes: ShiftData ,
        isEmpPrint: printType === "employee" ? true : false ,
        isDatePrint: printType === "date" ? true : false 
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).DetailedAttendanceReportApi(formData)
      .then(res =>{         
      if(printType === "employee" || printType === "date" )
      {
        setPrintData(res)
      }
      else
      {
        setdata(res);
      }
      })
      

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  async function fetchData() {
    try {
      const Shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(Shift)

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
        label: intl.formatMessage(Payrollmessages.id),
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
        name: "shiftId",
        label: intl.formatMessage(messages.shiftCode),
      },
    {
        name: "shiftname",
        label: intl.formatMessage(messages.shift),
      },
      {
        name: "startTime",
        label: intl.formatMessage(messages.shiftStart),
      },
      {
        name: "endTime",
        label: intl.formatMessage(messages.shiftEnd),
      },
      {
        name: "shiftTime", 
        label: intl.formatMessage(messages.shiftHours),
      },
      {
        name: "dayName", 
        label: intl.formatMessage(messages.day),
        options: {
          customBodyRender: (value) => (<pre>{value}</pre>),
        },
      },
      {
        name: "shiftDate",
        label: intl.formatMessage(messages.attendanceDate),
        options: {
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
          setCellProps: (value, rowIndex) => {
            if(!Boolean(rowIndex && data[rowIndex])){
              return null
            }

            return {
              style: {
                ...(data[rowIndex].absence && { backgroundColor:'#f00' }),
                ...(data[rowIndex].vac && { backgroundColor:'#fafa02' }),
                ...(data[rowIndex].shiftVacancy && { backgroundColor:'#1bff00' }),
                paddingLeft: "0",
                textAlign: "center"
              },
            };
          },
        },
      },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },
    {
        name: "jobName",
        label: intl.formatMessage(messages.job),
        options: {
          customBodyRender: (value) => (<pre>{value}</pre>),
        },
      },
      {
        name: "socialInsuranceId",
        label: intl.formatMessage(messages.insuranceNumber),
      },
    {
        name: "timeIn", 
        label: intl.formatMessage(messages.signIn),
        options: {
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd hh:mm aa")}</pre>),
        },
      },
      {
        name: "timeOut",
        label: intl.formatMessage(messages.signOut),
        options: {
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd hh:mm aa")}</pre>),
        },
      },
      {
        name: "worktime", 
        label: intl.formatMessage(messages.workingHours),
      },
      {
        name: "lateMin", 
        label: intl.formatMessage(messages.lateness),
      },
    
    {
      name: "extraTime", 
      label: intl.formatMessage(messages.OverTime),
    },
    {
        name: "lessTime",
        label: intl.formatMessage(messages.lessTime),
      },
      {
        name: "replaceVac", 
        label: intl.formatMessage(messages.AccruedLeave),
      },
    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        customBodyRender: (value, tableMeta) => {
          if(value)
          {
          return <div className={style.tableCellSty}>
            {getCheckboxIcon(value)}
            <pre>{data[tableMeta?.rowIndex]?.jobName}</pre>
          </div>
         }
         else
         {
          return getCheckboxIcon(value)
         }
      },
      },
    },
    {
      name: "mission",
      label: intl.formatMessage(messages.mission),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
    {
        name: "per", 
        label: intl.formatMessage(messages.permission),
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value)
            {
             return <div>
              {getCheckboxIcon(value)}
              <pre>{data[tableMeta?.rowIndex]?.jobName}</pre>
            </div>
            }
            else
            {
             return getCheckboxIcon(value)
            }
          },
        },
      },
      {
        name: "absence",
        label: intl.formatMessage(messages.absence),
        options: {
          customBodyRender: (value) => getCheckboxIcon(value),
        },
      },
      {
        name: "shiftVacancy", 
        label: intl.formatMessage(messages.weekend),
        options: {
          customBodyRender: (value) => getCheckboxIcon(value),
        },
      },
      {
        name: "earlyLeave",
        label: intl.formatMessage(messages.earlyLeaveMin),
      },
  ];


  const onBeforeGetContent = () => {
    setIsLoading(true);
    setHeaderType()
  };

  const onAfterPrint = () => {
    setIsLoading(false);
    setHeaderType()
    setPrintData([])
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: intl.formatMessage(messages.DetailedAttendanceReport),
  });

  const onPrintClick = async (type) => {
    setHeaderType(type)
    handleSearch(type)
  };


  useEffect(()=>{
    if(printData.length !== 0)
    {
      debugger;
      printJS();
    }
  },[printData])



  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
               setDateError={setDateError}
            ></Search>
          </Grid>

          <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={ShiftList.length != 0 ? ShiftList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setShift(value);
                          } else {
                            setShift(null);
                          }
                      }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.name}
                            </li>
                          )}
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label={intl.formatMessage(messages.shift)}
                            />
                          )}
                        />
            </Grid>

          <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.withoutEmployeesWithoutAttendanceRules}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            withoutEmployeesWithoutAttendanceRules: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.WithoutEmployeesWhoDoNotMeetTheAttendanceRules)}
                  />
            </Grid>

            <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.insuredEmployeesOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            insuredEmployeesOnly: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.insuredEmployeesOnly)}
                  />
            </Grid>

          
            <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.showPresentEmployeeOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            showPresentEmployeeOnly: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.showPresentEmployeeOnly)}
                  />
            </Grid>

            <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.ShowViolationsOnly}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            ShowViolationsOnly: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.ShowViolationsOnly)}
                  />
            </Grid>

            <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.showFingerprintDevice}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            showFingerprintDevice: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.showFingerprintDevice)}
                  />
            </Grid>

            <Grid item md={6} lg={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.printPicture}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            printPicture: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.printPicture)}
                  />
            </Grid>
    
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={handleSearch}
                >
                  <FormattedMessage {...Payrollmessages.search} />
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={style.printBtnSty}
                onClick={()=>onPrintClick("employee")}
                >
                  <FormattedMessage {...messages.PrintByEmployee} />
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={style.printBtnSty}
                onClick={()=>onPrintClick("date")}
                >
                  <FormattedMessage {...messages.PrintByDate} />
                </Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </PapperBlock>

        <PayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />

      <DetailedAttendanceReportTemplate 
        printDivRef={printDivRef} 
        headerType={headerType }
        data={printData}
        date={searchData}
      />

    </PayRollLoader>
  );
}

DetailedAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(DetailedAttendanceReport);
