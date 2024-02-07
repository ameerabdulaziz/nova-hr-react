import React, { useEffect, useState,useRef } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import style from "../../../../../styles/styles.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from '@mui/material/Autocomplete';
import GeneralListApis from "../../api/GeneralListApis";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useReactToPrint } from 'react-to-print';
import DetailedAttendanceReportTemplate from "../../reports-templates/DetailedAttendanceReportTemplate"
import { format } from "date-fns";

function DetailedAttendanceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
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
    OrganizationId: "",
    EmpStatusId: 1,
    withoutEmployeesWithoutAttendanceRules: false,
    insuredEmployeesOnly: false,
    showPresentEmployeeOnly: false,
    ShowViolationsOnly: false,
    showFingerprintDevice: false,
    printPicture: false,
  });


      const [headerType, setHeaderType] = useState();


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const handleSearch = async (printType) => {

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
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
        name: "shiftId",
        label: intl.formatMessage(messages.shiftCode),
        options: {
          filter: true,
        },
      },
    {
        name: "shiftname",
        label: intl.formatMessage(messages.shift),
        options: {
          filter: true,
        },
      },
      {
        name: "startTime",
        label: intl.formatMessage(messages.shiftStart),
        options: {
          filter: true,
        },
      },
      {
        name: "endTime",
        label: intl.formatMessage(messages.shiftEnd),
        options: {
          filter: true,
        },
      },
      {
        name: "shiftTime", 
        label: intl.formatMessage(messages.shiftHours),
        options: {
          filter: true,
        },
      },
      {
        name: "dayName", 
        label: intl.formatMessage(messages.day),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{value}</pre>),
        },
      },
      {
        name: "shiftDate",
        label: intl.formatMessage(messages.AttendanceDate),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
          setCellProps: (value, rowIndex) => {
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
        name: "jobName",
        label: intl.formatMessage(messages.job),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{value}</pre>),
        },
      },
      {
        name: "socialInsuranceId",
        label: intl.formatMessage(messages.insuranceNumber),
        options: {
          filter: true,
        },
      },
    {
        name: "timeIn", 
        label: intl.formatMessage(messages.signIn),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd hh:mm aa")}</pre>),
        },
      },
      {
        name: "timeOut",
        label: intl.formatMessage(messages.signOut),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd hh:mm aa")}</pre>),
        },
      },
      {
        name: "worktime", 
        label: intl.formatMessage(messages.workingHours),
        options: {
          filter: true,
        },
      },
      {
        name: "lateMin", 
        label: intl.formatMessage(messages.lateness),
        options: {
          filter: true,
        },
      },
    
    {
      name: "extraTime", 
      label: intl.formatMessage(messages.OverTime),
      options: {
        filter: true,
      },
    },
    {
        name: "lessTime",
        label: intl.formatMessage(messages.lessTime),
        options: {
          filter: true,
        },
      },
      {
        name: "replaceVac", 
        label: intl.formatMessage(messages.AccruedLeave),
        options: {
          filter: true,
        },
      },
    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? (
                <CheckIcon style={{ color: "#3f51b5" }} />
              ) : (
                <CloseIcon style={{ color: "#717171" }} />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "mission",
      label: intl.formatMessage(messages.mission),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
            return (
              <div className={style.actionsSty}>
                {value ? (
                  <CheckIcon style={{ color: "#3f51b5" }} />
                ) : (
                  <CloseIcon style={{ color: "#717171" }} />
                )}
              </div>
            );
          },
      },
    },
    {
        name: "per", 
        label: intl.formatMessage(messages.permission),
        options: {
          filter: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <div className={style.actionsSty}>
                {value ? (
                  <CheckIcon style={{ color: "#3f51b5" }} />
                ) : (
                  <CloseIcon style={{ color: "#717171" }} />
                )}
              </div>
            );
          },
        },
      },
      {
        name: "absence",
        label: intl.formatMessage(messages.absence),
        options: {
          filter: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <div className={style.actionsSty}>
                {value ? (
                  <CheckIcon style={{ color: "#3f51b5" }} />
                ) : (
                  <CloseIcon style={{ color: "#717171" }} />
                )}
              </div>
            );
          },
        },
      },
      {
        name: "shiftVacancy", 
        label: intl.formatMessage(messages.weekend),
        options: {
          filter: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <div className={style.actionsSty}>
                {value ? (
                  <CheckIcon style={{ color: "#3f51b5" }} />
                ) : (
                  <CloseIcon style={{ color: "#717171" }} />
                )}
              </div>
            );
          },
        },
      },
      {
        name: "earlyLeave",
        label: intl.formatMessage(messages.earlyLeaveMin),
        options: {
          filter: true,
        },
      },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: "none",
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };



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



  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
            ></Search>
          </Grid>

          <Grid item md={12}>
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

                  <Grid item xs={12} md={12}></Grid>

            <Grid item md={6} lg={3}>
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

          
            <Grid item md={6} lg={3}>
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

            <Grid item md={6} lg={3}>
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

            <Grid item md={6} lg={3}>
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
    

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>

          <Grid item xs={12} md={12}></Grid>

          <Grid item xs={12} lg={2}>
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

                  <Grid item xs={12} lg={2}>
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
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      
  
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
