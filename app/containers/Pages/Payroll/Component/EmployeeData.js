import React,{useState,memo,useEffect } from 'react';
import {TextField ,Grid, Autocomplete ,Card ,CardContent} from "@mui/material";  
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import GeneralListApis from '../api/GeneralListApis';

import { useSelector } from 'react-redux';

function EmployeeData(props) {
  const {intl,data,setdata,isSuper,GetEmployeePenalties,GetSalary,GetworkingYears} = props;
  const {classes,cx} = useStyles();  
  const locale = useSelector((state) => state.language.locale);
  const [EmployeeList, setEmployeeList] = useState([]);

    async function fetchData() {
  
    const employees = await GeneralListApis(locale).GetEmployeeList();
    debugger ;
    setEmployeeList(employees);

  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function getEmployeeData(id) 
  {
    debugger;
    if (!id){
        if(isSuper)
            setdata((prevFilters) => ({
                ...prevFilters,
                superJob:"",
                superOrganization:"",
                superHiringDate:""
            }));   
          else
          {
                setdata((prevFilters) => ({
                    ...prevFilters,
                    job:"",
                    organization:"",
                    hiringDate:"",               
                })); 
                
                if(GetEmployeePenalties)
                    setdata((prevFilters) => ({
                        ...prevFilters,                    
                        month: "",
                        sixMonth:"",
                        year: "",
                        hiringDateNo: "",
                        lastDate: "",
                    })); 
                if(GetSalary)
                    setdata((prevFilters) => ({
                        ...prevFilters,     
                        jobId:"",              
                        oldElemVal:"",
                    })); 
                if(GetworkingYears)
                setdata((prevFilters) => ({
                    ...prevFilters,       
                    workingYears:""
                })); 
                    
            }
        return
    }
   
    const empdata = await GeneralListApis(locale).GetEmployeeData(id,GetworkingYears?true:false);
    if(isSuper)
        setdata((prevFilters) => ({
            ...prevFilters,
            superJob:empdata.jobName,
            superOrganization:empdata.organizationName,
            superHiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate,
        })); 
    else
    {
        setdata((prevFilters) => ({
            ...prevFilters,
            job:empdata.jobName,
            organization:empdata.organizationName,
            hiringDate:empdata.hiringDate===null ? "" :empdata.hiringDate,            
        })); 
        if(GetEmployeePenalties)
        {
            const result = await GeneralListApis(locale).GetEmployeePenalties(id);
            setdata((prevFilters) => ({
                ...prevFilters,               
                month: result.month,
                sixMonth:result.sixMonth,
                year: result.year,
                hiringDateNo: result.hiringDate,
                lastDate: result.lastDate,
            })); 
        }
        
        if(GetSalary)
            setdata((prevFilters) => ({
                ...prevFilters,
                jobId:empdata.jobId,
                oldElemVal:empdata.salary===null ? "" :empdata.salary
            })); 

        if(GetworkingYears)
            setdata((prevFilters) => ({
                ...prevFilters,       
                workingYears:empdata.workingYears!=null?empdata.workingYears:""
            })); 
    }  
}
  
  return (
      <div>
        <Card className={classes.card}>
            <CardContent>
                <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                    <Grid item xs={12} md={4}>
                        <Autocomplete  
                            id={isSuper?"superEmployeeId" :"employeeId" }                       
                            options={EmployeeList}  
                            value={{id:isSuper?data.superEmployeeId:data.employeeId,name:isSuper?data.superEmployeeName:data.employeeName}}     
                            isOptionEqualToValue={(option, value) =>
                                value.id === 0 || value.id === "" ||option.id === value.id
                            }                 
                            getOptionLabel={(option) =>
                            option.name ? option.name : ""
                            }
                            onChange={(event, value) => {
                                
                                if(isSuper)
                                    setdata((prevFilters) => ({
                                    ...prevFilters,
                                    superEmployeeId:value !== null?value.id:0,
                                    superEmployeeName:value !== null?value.name:""
                                    })); 
                                else
                                    setdata((prevFilters) => ({
                                    ...prevFilters,
                                    employeeId:value !== null?value.id:0,
                                    employeeName:value !== null?value.name:""
                                    }));

                                getEmployeeData(value.id)  ;   
                                
                            }}
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="employeeId"
                                required                              
                                label={intl.formatMessage(isSuper?Payrollmessages.superEmployeeName:Payrollmessages.employeeName)}
                                />
                            )}
                        />  
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id={isSuper?"superJob":"job"}
                            name={isSuper?"superJob":"job"}
                            value={isSuper?data.superJob:data.job}               
                            label={intl.formatMessage(Payrollmessages.job)}
                            className={classes.field}
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id={isSuper?"superOrganization":"organization"}
                            name={isSuper?"superOrganization":"organization"}
                            value={isSuper?data.superOrganization:data.organization}               
                            label={intl.formatMessage(Payrollmessages.organizationName)}
                            className={classes.field}
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id={isSuper?"superHiringDate":"hiringDate"}
                            name={isSuper?"superHiringDate":"hiringDate"}
                            value={isSuper?(data.superHiringDate===null ? "" :data.superHiringDate):(data.hiringDate===null ? "" :data.hiringDate)}               
                            label={intl.formatMessage(Payrollmessages.hiringDate)}
                            className={classes.field}
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    {GetSalary?
                        <Grid item xs={12} md={2}>                    
                        <TextField
                        id="oldElemVal"
                        name="oldElemVal"
                        disabled
                        value={data.oldElemVal}
                        onChange={(e) => setdata((prevFilters) => ({
                            ...prevFilters,
                            oldElemVal: e.target.value,
                        }))}                        
                        label={intl.formatMessage(Payrollmessages.oldElemVal)}
                        className={classes.field}
                        variant="outlined"
                        />
                        </Grid>:
                    
                    GetworkingYears?
                        <Grid item xs={12} md={2}>                    
                            <TextField
                                id="workingYears"
                                name="workingYears"
                                value={data.workingYears===null ? "" :data.workingYears}               
                                label={intl.formatMessage(Payrollmessages.workingYears)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:<Grid item xs={12} md={2}> </Grid>}
                        
                    {GetEmployeePenalties?
                        <Grid item xs={6} md={2}>
                            <TextField
                                id="month"
                                name="month"
                                value={data.month}               
                                label={intl.formatMessage(Payrollmessages.month)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:""}
                        {GetEmployeePenalties?
                        <Grid item xs={6} md={2}>
                            <TextField
                                id="sixMonth"
                                name="sixMonth"
                                value={data.sixMonth}               
                                label={intl.formatMessage(Payrollmessages.sixMonth)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:""}
                        {GetEmployeePenalties?
                        <Grid item xs={6} md={2}>
                            <TextField
                                id="year"
                                name="year"
                                value={data.year}               
                                label={intl.formatMessage(Payrollmessages.year)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:""}
                        {GetEmployeePenalties?
                        <Grid item xs={6} md={2}>
                            <TextField
                                id="hiringDateNo"
                                name="hiringDateNo"
                                value={data.hiringDateNo}               
                                label={intl.formatMessage(Payrollmessages.hiringDateNo)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:""}
                        {GetEmployeePenalties?
                        <Grid item xs={6} md={2}>
                            <TextField
                                id="lastDate"
                                name="lastDate"
                                value={data.lastDate}               
                                label={intl.formatMessage(Payrollmessages.lastDate)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                            />
                        </Grid>:""}                    
                </Grid>
            </CardContent>
        </Card>
      </div>
  );
}
  
const MemoedEmployeeData = memo(EmployeeData);

export default injectIntl(MemoedEmployeeData);