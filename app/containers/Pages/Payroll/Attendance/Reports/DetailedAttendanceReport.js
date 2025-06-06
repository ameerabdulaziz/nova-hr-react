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
  Radio,
  RadioGroup,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import style from "../../../../../styles/styles.scss";
import GeneralListApis from "../../api/GeneralListApis";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useReactToPrint } from 'react-to-print';
import DetailedAttendanceReportTemplate from "../../reports-templates/DetailedAttendanceReportTemplate"
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { formateDate, getAutoCompleteValue, getCheckboxIcon } from "../../helpers";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import SITEMAP, { DOMAIN_NAME } from "../../../../App/routes/sitemap";

function DetailedAttendanceReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const [printData, setPrintData] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState(null);
  const [printAndReviewType, setPrintAndReviewType] = useState("employee");
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    BranchId: branchId,
    OrganizationId: "",
    EmpStatusId: 1,
    withoutEmployeesWithoutAttendanceRules: false,
    insuredEmployeesOnly: false,
    showPresentEmployeeOnly: false,
    ShowViolationsOnly: false,
    showFingerprintDevice: false,
    printPicture: false,
  });

  const [printFilterData, setPrintFilterData] = useState({
    FromDate: null,
    ToDate: null,
    Employee: '',
    EmpStatus: "",
    Organization: '',
    Branch: "",
  });

  const [filterHighlights, setFilterHighlights] = useState([]);

  const [DateError, setDateError] = useState({});

  const [headerType, setHeaderType] = useState();


  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.organizationName),
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
        label: intl.formatMessage(Payrollmessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (Shift && Shift.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.shift),
        value: Shift.map((item) => item.name).join(' , '),
      });
    }

    if (searchData.withoutEmployeesWithoutAttendanceRules) {
         highlights.push({
           label: intl.formatMessage(messages.WithoutEmployeesWhoDoNotMeetTheAttendanceRules),
           value: searchData.withoutEmployeesWithoutAttendanceRules
             ? intl.formatMessage(Payrollmessages.yes)
             : intl.formatMessage(Payrollmessages.no),
         });
       }

     if (searchData.insuredEmployeesOnly) {
      highlights.push({
        label: intl.formatMessage(messages.insuredEmployeesOnly),
        value: searchData.insuredEmployeesOnly
          ? intl.formatMessage(Payrollmessages.yes)
          : intl.formatMessage(Payrollmessages.no),
      });
    }

    if (searchData.showPresentEmployeeOnly) {
      highlights.push({
        label: intl.formatMessage(messages.showPresentEmployeeOnly),
        value: searchData.showPresentEmployeeOnly
          ? intl.formatMessage(Payrollmessages.yes)
          : intl.formatMessage(Payrollmessages.no),
      });
    }

    if (searchData.ShowViolationsOnly) {
      highlights.push({
        label: intl.formatMessage(messages.ShowViolationsOnly),
        value: searchData.ShowViolationsOnly
          ? intl.formatMessage(Payrollmessages.yes)
          : intl.formatMessage(Payrollmessages.no),
      });
    }

    if (searchData.showFingerprintDevice) {
      highlights.push({
        label: intl.formatMessage(messages.showFingerprintDevice),
        value: searchData.showFingerprintDevice
          ? intl.formatMessage(Payrollmessages.yes)
          : intl.formatMessage(Payrollmessages.no),
      });
    }

    setFilterHighlights(highlights);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const handleSearch = async (printType,reviewVal) => {

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


      if( reviewVal === "review")
        {  
          sessionStorage.setItem('Review',JSON.stringify( {
            formData,
                  headerType: printType,
                  searchData: searchData,
          }));


          window.open(`${DOMAIN_NAME}${SITEMAP.attendance.TimeTableDetailsReportReview.route}`, "_blank")?.focus();
  
        }
        else
        {
          const dataApi = await ApiData(locale).DetailedAttendanceReportApi(formData)
          .then(res =>{ 
            // with print
            if((printType === "employee" || printType === "date") && reviewVal !== "review")
            {              

              setPrintData(res)
            }

              // with search
            if(printType !== "employee" && printType !== "date" && reviewVal !== "review")
            {

              setdata(res);

            }
          })
    }
      

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
          customBodyRender: (value) => (<pre>{value?format(new Date(value), "yyyy-MM-dd hh:mm aa"):""}</pre>),
        },
      },
      {
        name: "timeOut",
        label: intl.formatMessage(messages.signOut),
        options: {
          customBodyRender: (value) => (<pre>{value?format(new Date(value), "yyyy-MM-dd hh:mm aa"):""}</pre>),
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
            <pre>{data[tableMeta?.rowIndex]?.vacShortName}</pre>
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
        customBodyRender: (value, tableMeta) => {
          if(value)
          {
          return <div className={style.tableCellSty}>
            {getCheckboxIcon(value)}
            <pre>{data[tableMeta?.rowIndex]?.missionName}</pre>
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
        name: "per", 
        label: intl.formatMessage(messages.permission),
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value)
            {
             return <div>
              {getCheckboxIcon(value)}
              <pre>{data[tableMeta?.rowIndex]?.perShortName}</pre>
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

      printJS();
    }
  },[printData])



  const reviewDetailsFun =  (type) => {
    handleSearch(printAndReviewType,"review")
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

      
      setsearchData((prev)=>({
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
      setsearchData((prev)=>({
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

  },[searchData.BranchId, searchData.EmployeeId])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
               setDateError={setDateError}
               company={searchData.BranchId}
               setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

          <Grid item xs={12} md={1} lg={3} xl={5}></Grid>

          <Grid item xs={12} md={5.5} lg={4.5} xl={3.5}> 
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

            </Grid>
          </Grid>

            <Grid item container spacing={2}>
              <Grid item>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="employee"
                  onChange={(e)=>{
                    setPrintAndReviewType(e.target.value)
                  }}
                >
                  <FormControlLabel value="employee" control={<Radio />} label={intl.formatMessage(messages.ByEmployee)} />
                  <FormControlLabel value="date" control={<Radio />} label={intl.formatMessage(messages.ByDate)} />
                  
                </RadioGroup>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={style.printBtnSty}
                onClick={()=>{
                  if(printAndReviewType)
                  {
                    onPrintClick(printAndReviewType)
                  }
                  else
                  {
                    toast.error(intl.formatMessage(messages.printAndReviewErrMess));
                  }
                }}
                >
                  
                  <FormattedMessage {...Payrollmessages.Print} />
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={style.printBtnSty}
                onClick={()=>{
                  if(printAndReviewType)
                    {
                      reviewDetailsFun(printAndReviewType)
                    }
                    else
                    {
                      toast.error(intl.formatMessage(messages.printAndReviewErrMess));
                    }
                }}
                >
                  
                  <FormattedMessage {...Payrollmessages.review} />
                </Button>
              </Grid>
            </Grid>

        </Grid>
      </PapperBlock>

        <SimplifiedPayrollTable
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

    </PayRollLoaderInForms>
  );
}

DetailedAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(DetailedAttendanceReport);
