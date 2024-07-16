import React, { useEffect, useState,useRef } from "react";
import ApiData from "../api/AssessmentReportData";
import AssessmentReviewData from "../api/AssessmentReviewData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Checkbox
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoader from "../../Component/PayRollLoader";
import style from "../../../../../styles/styles.scss";
import { toast } from 'react-hot-toast';
import  ExamQuestionsPrint  from '../../Component/ExamQuestionsPrint';
import { useReactToPrint } from 'react-to-print';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import PayrollTable from "../../Component/PayrollTable";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { getAutoCompleteValue } from "../../helpers";

function AssessmentReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);


  const [EmployeeList, setEmployeeList] = useState([]);
  const [DepartmentList, setDepartmentList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Employee, setEmployee] = useState([]);
  const [Department, setDepartment] = useState("");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");

  const [filterHighlights, setFilterHighlights] = useState([]);

  const [examData, setExamData] = useState();
  const [allQuestionsAnswers, setAllQuestionsAnswers] = useState({})
  const [textareaEmpTrainingVal, setTextareaEmpTrainingVal] = useState("");
  const [OverallAppraisalVal, setOverallAppraisalVal] = useState("");
  const [textareaNoteForEmployeeVal, setTextareaNoteForEmployeeVal] = useState("");
  const [question, setQuestion] = useState()
  const [choices, setChoices] = useState()
  const [AssessmentReviewLock, setAssessmentReviewLock] = useState(true);
  const [printData, setPrintData] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const department = getAutoCompleteValue(DepartmentList, Department);
    const month = getAutoCompleteValue(MonthList, Month);
    const year = getAutoCompleteValue(YearList, Year);

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

    if (Employee && Employee.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: Employee.map((item) => item.name).join(", "),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
    if(Year.length !== 0)
    {
        try {
        setIsLoading(true);

        const EmployeeIds = Employee.map(item => item.id).join(',')

        
        const dataApi = await ApiData(locale).GetDataById(Year.id,Department,EmployeeIds,Month);

        dataApi[0].SalfEvaluation = dataApi[0].employeeEvalChoice ? [dataApi[0].employeeEvalChoice," (",dataApi[0].employeeEval,"%",")"] : null
        dataApi[0].ManagerEvaluation = dataApi[0].mgrEvalChoice ? [dataApi[0].mgrEvalChoice," (",dataApi[0].mgrEval,"%",")"] : null

        setdata(dataApi);

        getFilterHighlights();
        } catch (err) {
          console.log(err);
        } finally {
        setIsLoading(false);
        }
    }
    else
    {
        toast.error(intl.formatMessage(messages.YouMustToChooseYear));
    }
  };

  async function fetchData() {
    setIsLoading(true);
    
    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const departments = await GeneralListApis(locale).GetDepartmentList();
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
      name: "assessmentId",
      options: {
        // filter: false,
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
        name: 'templateName',
        label: intl.formatMessage(messages.templateName),
        options: {
          filter: true,
        },
      },
    {
      name: "monthName",
      label: intl.formatMessage(messages.month),
      options: {
        filter: true,
      },
    },

    {
      name: "SalfEvaluation",
      label: intl.formatMessage(messages.SalfEvaluation),
      options: {
        filter: true,
      },
    },
    {
      name: "ManagerEvaluation",
      label: intl.formatMessage(messages.ManagerEvaluation),
      options: {
        filter: true,
      },
    },
    {
      name: "mgrStaffAllert", 
      label: intl.formatMessage(messages.NoteForEmployee),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : ''),
      },
    },

    {
      name: "mgrComment", 
      label: intl.formatMessage(messages.ManagerNote),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : ''),
      },
    },
    {
      name: "staffTrainingReq",
      label: intl.formatMessage(messages.EmployeeTrainingRequest),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : ''),
      },
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


const printFun = async (assessmentId) => {
    try {
    const examQuestionsData = await AssessmentReviewData(locale).GetDataById(assessmentId);
    setExamData(examQuestionsData[0]);
    setPrintData(examQuestionsData[0])

    examQuestionsData[0].competencyList.map((queData, index)=>{
        if(queData.employeeChoiceID !== null || queData.employeeExample.length !== 0)
        {

        setAllQuestionsAnswers(prveState => (
     
            {
              ...prveState,
              [`que${index + 1}`] : {
                ...prveState[`que${index + 1}`],
                checkedVal: examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) ? examQuestionsData[0].choiceList.find((choice) => choice.id === queData.employeeChoiceID) : null,
                question: queData,
                textareaVal: queData.employeeExample
              }
          }
          ))

        setTextareaEmpTrainingVal(examQuestionsData[0].staffTrainingReq)

        setOverallAppraisalVal(examQuestionsData[0].mgrStaffAllert)

        setTextareaNoteForEmployeeVal(examQuestionsData[0].mgrComment)

        }
      })
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
}



useEffect(()=>{
    if(examData)
    {
      setQuestion(examData?.competencyList[0])
      setChoices(examData?.choiceList)
    }
  },[examData])

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
    documentTitle: intl.formatMessage(messages.AssessmentReport),
  });


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

      <Grid item xs={12} md={3}>
                <Autocomplete
                  options={EmployeeList.length != 0 ? EmployeeList: []}
                  multiple
                  disableCloseOnSelect
                  className={`${style.AutocompleteMulSty} ${
                    locale === 'ar' ? style.AutocompleteMulStyAR : null
                  }`}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  // value={reqDayNotAllow}
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
                  // onChange={(_, value) => setReqDayNotAllow(value)}
                  onChange={(event, value) => {
                    console.log("value =",value);
                    if (value !== null) {
                        setEmployee(value);
                    } else {
                        setEmployee("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label={intl.formatMessage(messages.reqDayNotAllow)}
                      label={intl.formatMessage(messages.employeeName)}
                    />
                  )}
                />
              </Grid>

      {/* ////// */}

      <Grid item xs={12} md={3}>
            
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
                    setDepartment(value.id);
                } else {
                    setDepartment("");
                }
            }}
            renderInput={(params) => (
            <TextField
                {...params}
                name="VacationType"
                label={intl.formatMessage(messages.department)}
                margin="normal" 
                className={style.fieldsSty}
                
                />
          )}
        />
      </Grid>

      <Grid item xs={12} md={2}>
           
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
                       setMonth(value.id);
                   } else {
                       setMonth("");
                   }
               }}
               renderInput={(params) => (
               <TextField
                   {...params}
                   name="VacationType"
                   label={intl.formatMessage(messages.months)}
                   margin="normal" 
                   className={style.fieldsSty}
                   
                   />

               )}
               /> 
         </Grid>
          
         <Grid item xs={12} md={2}>
            
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
                   setYear("");
               }
           }}
           renderInput={(params) => (
           <TextField
               {...params}
               name="VacationType"
               label={intl.formatMessage(messages.year)}
               margin="normal" 
               className={style.fieldsSty}
               
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




      <ExamQuestionsPrint 
         examData={examData} 
         choices={choices}
         allQuestionsAnswers={allQuestionsAnswers}
         textareaEmpTrainingVal={textareaEmpTrainingVal}
         OverallAppraisalVal={OverallAppraisalVal}
         textareaNoteForEmployeeVal={textareaNoteForEmployeeVal}
         intl={intl}
         AssessmentReviewLock={AssessmentReviewLock}
         printDivRef={printDivRef}
         data={data}
         Year={Year}
      />
    </PayRollLoader>
  );
}

AssessmentReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AssessmentReport);
