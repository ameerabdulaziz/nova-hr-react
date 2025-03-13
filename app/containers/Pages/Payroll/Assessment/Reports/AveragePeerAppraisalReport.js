import React, { useEffect, useState,useRef, useCallback } from "react";
import ApiData from "../api/AveragePeerAppraisalReportData";
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
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import style from "../../../../../styles/styles.scss";
import  AveragePeerAppraisalReportPrint  from './Print/AveragePeerAppraisalReportPrint';
import { useReactToPrint } from 'react-to-print';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getAutoCompleteValue } from "../../helpers";
import { format } from "date-fns";

function AveragePeerAppraisalReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);


  const [EmployeeList, setEmployeeList] = useState([]);
  const [DepartmentList, setDepartmentList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Employee, setEmployee] = useState(null);

  
  const [Department, setDepartment] = useState("");
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})
  const [printData, setPrintData] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const department = getAutoCompleteValue(DepartmentList, Department?.id);
    const month = getAutoCompleteValue(MonthList, Month?.id);
    const year = getAutoCompleteValue(YearList, Year?.id);

    if (Employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: Employee.name,
      });
    }

    if (department) {
      highlights.push({
        label: intl.formatMessage(messages.department),
        value: department.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.month),
        value: month.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.year),
        value: year.name,
      });
    }

    setFilterHighlights(highlights);
  };


const handleSearch = async (e) => {

    try {
    setIsLoading(true);

    let params = {
      YearId: Year ? Year.id : "",
      MonthId: Month ? Month.id : "", 
      EmployeeId: Employee ? Employee.id : "",
      OrganizationId: Department ? Department.id : "",
    }

    const dataApi = await ApiData(locale).GetData(params);

    setdata(dataApi);

    getFilterHighlights();
    } catch (err) {
    } finally {
    setIsLoading(false);
    }
};

  async function fetchData() {
    setIsLoading(true);
    
    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const departments = await GeneralListApis(locale).GetDepartmentList(branchId);
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();
     
      setEmployeeList(empolyees)
      setDepartmentList(departments)
      setMonthList(months)
      setYearList(years)

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'birthDate',
      label: intl.formatMessage(messages.BirthDate),
      options: {
        customBodyRender: (value, tableMeta) => (
           format(new Date(value) , "yyyy-MM-dd")
          ),
      },
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },
    {
      name: 'evaluators',
      label: intl.formatMessage(messages.evaluators),
    },
    {
      name: 'evaluatorsDone',
      label: intl.formatMessage(messages.evaluatorsDone),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(payrollMessages.hiringDate),
      options: {
        customBodyRender: (value, tableMeta) => (
           format(new Date(value) , "yyyy-MM-dd")
          ),
      },
    },
    {
      name: 'month',
      label: intl.formatMessage(messages.month),
    },
    {
      name: 'year',
      label: intl.formatMessage(messages.year),
    },
    {
      name: 'totalEvaluation',
      label: intl.formatMessage(messages.totalEvaluation),
    },
    {
      name: "",
      label: intl.formatMessage(messages.Print),
      options: {
        filter: false,
        print: false,
        customBodyRender: (value, tableMeta) => (
            <LocalPrintshopOutlinedIcon 
             className={classes.textSty}
             style={{cursor: "pointer"}}
             onClick={()=>printFun(tableMeta.rowData[0])}
            />
          ),
      },
    },
  ];


const printFun = async (Id) => {
    try {
    const examQuestionsData = await ApiData(locale).printApi(Id);

    setPrintData(examQuestionsData)

    examQuestionsData.map((exam,index)=>{
      
      exam.competencyList.map((queData, index)=>{
        if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
        {

          setAllQuestionsAnswers(prveState => (
                {
                  ...prveState,
                  [`que${index + 1}`] : {
                    ...prveState[`que${index + 1}`],
                    checkedVal: exam.choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? exam.choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                    question: queData,
                    textareaVal: queData.employeeExample
                  }
              }
            ))
        }
      })
    })
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
}


const printDivRef = useRef(null);


const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
    setPrintData([])
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: intl.formatMessage(messages.averagePeerAppraisalReport),
  });


  useEffect(()=>{
    if(printData.length !== 0)
    {
      printJS();
    }
  },[printData])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
              <Grid item xs={12} md={6} lg={3.5} xl={3}>
                  <Autocomplete
                     options={EmployeeList.length != 0 ? EmployeeList: []}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(event, value) => {
                        if (value !== null) {
                            setEmployee(value);
                        } else {
                            setEmployee(null);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.employeeName)}
                        />
                      )}
                  />
                </Grid>

            <Grid item xs={12} md={6} lg={4}  xl={3.3}>
                  <Autocomplete
                  id="ddlMenu"   
                  isOptionEqualToValue={(option, value) => option.id === value.id}                    
                  options={DepartmentList.length != 0 ? DepartmentList: []}
                  getOptionLabel={(option) =>(
                      option  ? option.name : ""
                  )
                  }
                  renderOption={(props, option) => {
                      return (
                      <li {...props} key={option.id}>
                          {option.name}
                      </li>
                      );
                  }}
                  onChange={(event, value) => {
                    if (value !== null) {
                        setDepartment(value);
                    } else {
                        setDepartment(null);
                    }
                    
                  }}
                  renderInput={(params) => (
                  <TextField
                      {...params}
                      name="department"
                      label={intl.formatMessage(messages.department)}
                      margin="normal" 
                      className={style.fieldsSty}
                      
                      />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2}  xl={1.5}>
                <Autocomplete
                    id="ddlMenu"   
                    isOptionEqualToValue={(option, value) => option.id === value.id}                     
                    options={MonthList.length != 0 ? MonthList: []}
                    getOptionLabel={(option) =>(
                        option  ? option.name : ""
                    )
                    }
                    renderOption={(props, option) => {
                        return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                        );
                    }}
                    onChange={(event, value) => {
                        if (value !== null) {
                            setMonth(value);
                        } else {
                            setMonth(null);
                        }
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name="months"
                        label={intl.formatMessage(messages.months)}
                        margin="normal" 
                        className={style.fieldsSty}
                        
                        />

                    )}
                    /> 
              </Grid>
          
              <Grid item xs={6} md={3} lg={2}  xl={1.5}>
                <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                     
                options={YearList.length != 0 ? YearList: []}
                getOptionLabel={(option) =>(
                    option  ? option.name : ""
                )
                }
                renderOption={(props, option) => {
                    return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                    );
                }}
                onChange={(event, value) => {
                    if (value !== null) {
                        setYear(value);
                    } else {
                        setYear(null);
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="year"
                    label={intl.formatMessage(messages.year)}
                    margin="normal" 
                    className={style.fieldsSty}
                    />
                  )}
                />
              </Grid>
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
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />

      <AveragePeerAppraisalReportPrint 
         examData={printData} 
         allQuestionsAnswers={allQuestionsAnswers}
         intl={intl}
         printDivRef={printDivRef}
         data={data}
         Year={Year}
      />
    </PayRollLoaderInForms>
  );
}

AveragePeerAppraisalReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AveragePeerAppraisalReport);
