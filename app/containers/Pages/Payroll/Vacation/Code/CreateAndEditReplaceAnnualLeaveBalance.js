import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReplaceAnnualLeaveBalanceData from '../api/ReplaceAnnualLeaveBalanceData';
import { useSelector } from 'react-redux';
import pageStyle from '../../../../../styles/pagesStyle/ReplaceAnnualLeaveBalanceSty.scss';
import style from '../../../../../styles/Styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import {Card ,CardContent} from "@mui/material";
import {  useHistory, useLocation  } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from "date-fns";




function CreateAndEditReplaceAnnualLeaveBalance(props) {
  const [id, setid] = useState(0);
  const [Employee, setEmployee] = useState('');
  const [date, setDate] = useState(null);
  const [Templet, setTemplet] = useState('');
  const [Element, setElement] = useState('');
  const [Year, setYear] = useState('');
  const [Month, setMonth] = useState('');
  const [CurrentBalance, setCurrentBalance] = useState('');
  const [BalanceToReplace, setBalanceToReplace] = useState('');
  const [caluVal, setCaluVal] = useState('');
  const [recSerial, setRecSerial] = useState(0); 
  const [Day, setDay] = useState(0);
  const [job, setJob] = useState('');
  const [Department, setDepartment] = useState('');
  const [hiringDate, setHiringDate] = useState('');
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [TempletData, setTempletData] = useState([]);
  const [ElementData, setElementData] = useState([]);
  const [YearData, setYearData] = useState([]);
  const [MonthData, setMonthData] = useState([]);
  const { intl } = props;
  const { classes } = useStyles();
  const { state } = useLocation()
  const  ID  = state?.id
  const history = useHistory(); 




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)


    const data = {
        id: id,
        trxDate: date,
        elementId: Element.id,
        payTemplateId: Templet.id,
        employeeId: Employee.id,
        yearId: Year.id,
        monthId: Month.id,
        vacBalRep: Number( BalanceToReplace ),
        recSerial: recSerial
    };


    try {
      let response = await ReplaceAnnualLeaveBalanceData().Save(data);

     
      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/vac/ReplaceAnnualLeaveBalance`);
      } else {
          toast.error(response.statusText);
      }
      setSubmitting(false)
      setProcessing(false)
    } catch (err) {
      toast.error( err.response &&  err.response.data ? intl.formatMessage( messages[err.response.data]) : notif.error );
      setSubmitting(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {

  const EmployeeList = await GeneralListApis(locale).GetEmployeeList(locale);      
  const TemplateList =  await await GeneralListApis(locale).GetPayTemplateList();  
  const YearList =  await await GeneralListApis(locale).GetYears();  
  const MonthList =  await await GeneralListApis(locale).GetMonths();  

  setEmployeeData(EmployeeList)
  setTempletData(TemplateList)
  setYearData(YearList)
  setMonthData(MonthList)
};

const getEditdata =  async () => {

  const data =  await ReplaceAnnualLeaveBalanceData(locale).GetDataById(ID);


    setid(data ? data.id : "")
    setDate(data ? data.trxDate : "") 
    setEmployee(data && data.employeeId ? EmployeeData.find((item)=> item.id === data.employeeId) : "") 
    setJob(data ? data.jobName : "") 
    setDepartment(data ? data.organizationName : "") 
    setHiringDate(data ? data.hiringDate : "") 
    setTemplet(data && data.payTemplateId ? TempletData.find((item)=> item.id === data.payTemplateId) : "") 
    setElement(data && data.elementId && data.elementName ? {id: data.elementId, name: data.elementName} : "") 
    setYear(data && data.yearId ? YearData.find((item)=> item.id === data.yearId) : "") 
    setMonth(data && data.monthId ? MonthData.find((item)=> item.id === data.monthId) : "") 
    setCurrentBalance(data ? data.vacCurrBal : "") 
    setBalanceToReplace(data ? data.vacBalRep : "") 
    setRecSerial(data ? data.recSerial : 0)
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
    if(ID && EmployeeData.length !== 0 && TempletData.length !== 0)
    {
      getEditdata()
    }
    }, [ID,EmployeeData,TempletData]);

    

const getEmpData = async (EmployeeId)=> {
    const data =  await GeneralListApis(locale).GetEmployeeData(EmployeeId,false,true,true);

setJob(data && data.jobName ? data.jobName : "")
setDepartment(data && data.organizationName ? data.organizationName : "")
setHiringDate(data && data.hiringDate ? data.hiringDate : "")
setCurrentBalance(data && data.currVacBal ? data.currVacBal : "")
setYear(data && data.yearId ? YearData.find((item)=> item.id === data.yearId) : "") 
setMonth(data && data.monthId ? MonthData.find((item)=> item.id === data.monthId) : "") 
}

const getElementByIdData = async (templateId)=> {
        const ElementList =   await ReplaceAnnualLeaveBalanceData(locale).GetElementListByTemplate(templateId);  
    
        setElementData(ElementList)

        if(ElementList.find((item)=> item.id === Element.id))
        {
            setElement(ElementList.find((item)=> item.id === Element.id))
        }
        else
        {
            setElement("")
        }
}

useEffect(() => {
    if(Templet)
    {
        getElementByIdData(Templet.id);
    }
  }, [Templet]);

const caluValFun = async ()=>{
    
    
    const calcData = {
        elementId: Element.id,
        payTemplateId: Templet.id,
        employeeId: Employee.id,
        yearId: Year.id,
        monthId: Month.id,
        vacBalRep: Number(BalanceToReplace)
    }

    const data =  await ReplaceAnnualLeaveBalanceData(locale).GetCaluVal(calcData);

    setCaluVal(data)
}





  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
           title={ID ?  
            intl.formatMessage(messages.EditReplaceAnnualLeaveBalance)
          :  
            intl.formatMessage(messages.CreateReplaceAnnualLeaveBalance)
       }
          desc={""}>
            <form onSubmit={handleSubmit}>

            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row">

                <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                    className={style.gridSty}> 
            
                        <Grid item xs={12}  md={6} lg={4}
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}
                            > 
                    
                                <Grid item xs={12}  md={12} > 
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            label={intl.formatMessage(Payrollmessages.date)}
                                            value={date}
                                            onChange={(date) => { setDate( format(new Date(date), "yyyy-MM-dd"))}}
                                            className={classes.field}
                                            renderInput={(params) => <TextField {...params} variant="outlined"  required/>}
                                        />
                                    </LocalizationProvider>
                            
                                </Grid>
                        </Grid>

                        <Grid item xs={12}  md={12} 
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}> 

                            <Grid item xs={12}  md={12}  > 
                                <Card className={classes.card}>
                                    <CardContent className={style.CardContentSty}>
                                        <Grid item xs={12}  md={12} 
                                            container
                                            spacing={3}
                                            alignItems="flex-start"
                                            direction="row"
                                            className={style.gridSty}
                                            > 
                                                <Grid item xs={12}  md={12} lg={4} className={`${locale === "ar" ?  style.AutocompleteMulFieldStyAR : null}`}> 
                                                    <Autocomplete
                                                        id="ddlMenu"   
                                                        value={Employee.length != 0 && Employee !== null ? Employee : null}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}                  
                                                        options={EmployeeData.length != 0 ? EmployeeData: []}
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
                                                                setEmployee(value);
                                                                getEmpData(value.id);
                                                            } else {
                                                                setEmployee("");
                                                            }
                                                        }}
                                                        
                                                        renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            name="EmployeeName"
                                                            label={intl.formatMessage(messages.EmployeeName) }
                                                            margin="normal" 
                                                            className={style.fieldsSty}
                                                            required
                                                            />
                                                            
                                                        )}
                                                        /> 
                                                </Grid>

                                                <Grid item xs={12}  md={4} lg={2} className={style.gridSty}> 
                                                    <TextField
                                                            name="Job"
                                                            id="Job"
                                                            placeholder={intl.formatMessage(messages.Job) }
                                                            label={intl.formatMessage(messages.Job)}
                                                            className={`${classes.field} `}
                                                            margin="normal"
                                                            variant="outlined"
                                                            type='text'
                                                            value={job}
                                                            onChange={(e) => setJob(e.target.value)}
                                                            inputProps={{ pattern: "^[0-9.]+$" }}
                                                            disabled
                                                            />
                                            
                                                </Grid>

                                                <Grid item xs={12}  md={4} lg={2} className={style.gridSty}> 
                                                    <TextField
                                                            name="Department"
                                                            id="Department"
                                                            placeholder={intl.formatMessage(messages.Department) }
                                                            label={intl.formatMessage(messages.Department)}
                                                            className={`${classes.field} `}
                                                            margin="normal"
                                                            variant="outlined"
                                                            type='text'
                                                            value={Department}
                                                            onChange={(e) => setDepartment(e.target.value)}
                                                            inputProps={{ pattern: "^[0-9.]+$" }}
                                                            disabled
                                                            />
                                                </Grid>

                                                <Grid item xs={12}  md={4} lg={2} className={style.gridSty}> 
                                                    <TextField
                                                            name="hiringDate"
                                                            id="hiringDate"
                                                            placeholder={intl.formatMessage(messages.hiringDate) }
                                                            label={intl.formatMessage(messages.hiringDate)}
                                                            className={`${classes.field} `}
                                                            margin="normal"
                                                            variant="outlined"
                                                            type='text'
                                                            value={hiringDate}
                                                            onChange={(e) => setHiringDate(e.target.value)}
                                                            inputProps={{ pattern: "^[0-9.]+$" }}
                                                            disabled
                                                            />
                                            
                                                </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}  md={6} lg={4}
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}> 
                            <Grid item xs={12}  md={12}> 
                                <Autocomplete
                                    id="ddlMenu"   
                                    value={Templet.length != 0 && Templet !== null ? Templet : null}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}                  
                                    options={TempletData.length != 0 ? TempletData: []}
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
                                            setTemplet(value);
                                        } else {
                                            setTemplet("");
                                        }
                                    }}
                                    
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="Template"
                                        label={intl.formatMessage(messages.Template) }
                                        margin="normal" 
                                        className={style.fieldsSty}
                                        required
                                        />
                                        
                                    )}
                                    /> 
                            </Grid>
                        </Grid>

                        <Grid item xs={12}  md={12} 
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}
                            > 
                            <Grid item xs={12}  md={6} lg={4}> 
                                <Autocomplete
                                    id="ddlMenu"   
                                    value={Element.length != 0 && Element !== null ? Element : null}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}                  
                                    options={ElementData.length != 0 ? ElementData: []}
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
                                            setElement(value);
                                        } else {
                                            setElement("");
                                        }
                                    }}
                                    
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="Element"
                                        label={intl.formatMessage(messages.Element) }
                                        margin="normal" 
                                        className={style.fieldsSty}
                                        required
                                        />
                                        
                                    )}
                                    /> 
                            </Grid>
                        </Grid>

                        <Grid item xs={12}  md={12} 
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}> 
                        
                                <Grid item xs={12}  md={3} lg={2}> 
                                    <Autocomplete
                                        id="ddlMenu"  
                                        value={Year.length !== 0 && Year !== null ? Year : null} 
                                        isOptionEqualToValue={(option, value) => option.id === value.id}                  
                                        options={YearData.length != 0 ? YearData: []}
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
                                            name="Year"
                                            label={intl.formatMessage(messages.year) }
                                            margin="normal" 
                                            className={style.fieldsSty}
                                            required
                                            />
                                            
                                        )}
                                        /> 
                                </Grid>

                                <Grid item xs={12}  md={3} lg={2}> 
                                    <Autocomplete
                                        id="ddlMenu"   
                                        value={Month.length !== 0 && Month !== null ? Month : null} 
                                        isOptionEqualToValue={(option, value) => option.id === value.id}                  
                                        options={MonthData.length != 0 ? MonthData: []}
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
                                                setMonth("");
                                            }
                                        }}
                                        
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="Month"
                                            label={intl.formatMessage(messages.Month) }
                                            margin="normal" 
                                            className={style.fieldsSty}
                                            required
                                            />
                                            
                                        )}
                                        /> 
                                </Grid>

                        </Grid>
                </Grid>    
        
                <Grid item xs={12}  md={12} lg={4}
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                    > 
             
                        <Grid item xs={12}  md={12}  > 
                            <Card className={classes.card}>
                                <CardContent className={style.CardContentSty}>
                                    <Grid item xs={12}  md={12} 
                                        container
                                        spacing={3}
                                        alignItems="flex-start"
                                        direction="row"
                                        >
    
                                        <Grid item xs={12}  md={6} lg={6} > 
                                            <TextField
                                                name="CurrentBalance"
                                                id="CurrentBalance"
                                                placeholder={intl.formatMessage(messages.CurrentBalance) }
                                                label={intl.formatMessage(messages.CurrentBalance)}
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                type='number'
                                                value={CurrentBalance}
                                                onChange={(e) => setCurrentBalance(e.target.value)}
                                                inputProps={{ pattern: "^[0-9.]+$" }}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={6} lg={6} > 
                                            <TextField
                                            name="BalanceToReplace"
                                            id="BalanceToReplace"
                                            placeholder={intl.formatMessage(messages.BalanceToReplace) }
                                            label={intl.formatMessage(messages.BalanceToReplace)}
                                            className={`${classes.field} ${style.fieldsSty}`}
                                            margin="normal"
                                            variant="outlined"
                                            type='text'
                                            value={BalanceToReplace}
                                            onChange={(e) => setBalanceToReplace(e.target.value)}
                                            inputProps={{ pattern: "^[0-9.]+$" }}
                                              required
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}  md={12} 
                                        container
                                        spacing={3}
                                        alignItems="flex-start"
                                        direction="row"
                                        >
                                        <Grid item xs={12}  md={12}
                                            container
                                            spacing={3}
                                            alignItems="center"
                                            direction="row"
                                            className={`${style.itemsStyle} ${pageStyle.containerSty}`}
                                            > 

                                            <Grid item xs={3}  md={6} lg={6} className={pageStyle.calcBtnSty}>
                                                <Button variant="contained" size="medium" color="primary" 
                                                     onClick={caluValFun}
                                                     className={`${locale === "ar" ?  pageStyle.btnStAr : null}`}
                                                >
                                                    <FormattedMessage {...messages.caluValue} /> 
                                                </Button>
                                            </Grid>

                                            <Grid item xs={12}  md={6} lg={6} > 
                                                <TextField
                                                name="Value"
                                                id="Value"
                                                placeholder={intl.formatMessage(messages.Value) }
                                                label={intl.formatMessage(messages.Value)}
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                type='text'
                                                value={caluVal}
                                                inputProps={{ pattern: "^[0-9.]+$" }}
                                                disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                </Grid> 
            </Grid>


              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                 
                  <Grid item xs={12} md={12}></Grid>
                  <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                    <Button variant="contained" type="submit" size="medium" color="primary"  disabled={submitting || processing}>
                    {processing && (
                      <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                    )}
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item xs={3}  md={5} lg={3}>
                    <Button variant="contained" size="medium" color="primary" 
                    onClick={oncancel}
                     >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>

                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </div>
  );
}

CreateAndEditReplaceAnnualLeaveBalance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditReplaceAnnualLeaveBalance); 
