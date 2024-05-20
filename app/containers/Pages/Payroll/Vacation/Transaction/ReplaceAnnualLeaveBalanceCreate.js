import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReplaceAnnualLeaveBalanceData from '../api/ReplaceAnnualLeaveBalanceData';
import { useSelector } from 'react-redux';
import pageStyle from '../../../../../styles/pagesStyle/ReplaceAnnualLeaveBalanceSty.scss';
import style from '../../../../../styles/styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import ErrorMessages from '../../api/ApiMessages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import {Card ,CardContent} from "@mui/material";
import {  useHistory, useLocation  } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import SaveButton from '../../Component/SaveButton';
import PayRollLoader from '../../Component/PayRollLoader';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';




function CreateAndEditReplaceAnnualLeaveBalance(props) {
  const [id, setid] = useState(0);
  const [Employee, setEmployee] = useState(null);
  const [date, setDate] = useState(new Date());
  const [Templet, setTemplet] = useState(null);
  const [Element, setElement] = useState(null);
  const [Year, setYear] = useState(null);
  const [Month, setMonth] = useState(null);
  const [CurrentBalance, setCurrentBalance] = useState('');
  const [BalanceToReplace, setBalanceToReplace] = useState('');
  const [caluVal, setCaluVal] = useState('');
  const [recSerial, setRecSerial] = useState(0); 
  const [job, setJob] = useState('');
  const [Department, setDepartment] = useState('');
  const [hiringDate, setHiringDate] = useState('');
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [TempletData, setTempletData] = useState([]);
  const [ElementData, setElementData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [YearData, setYearData] = useState([]);
  const [MonthData, setMonthData] = useState([]);
  const { intl } = props;
  const { classes } = useStyles();
  const { state } = useLocation()
  const  ID  = state?.id
  const history = useHistory(); 


  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    setIsLoading(true);

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }

    const data = {
        id: id,
        trxDate: dateFormatFun(date),
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
      }
    } catch (err) {
        //
        if(err.response && err.response.data && Object.keys(ErrorMessages).includes(err.response.data))
        {
            toast.error(intl.formatMessage( ErrorMessages[err.response.data]))
        }
    } finally {
        setProcessing(false)
        setIsLoading(false);
    }
    
  };
 


const getdata =  async () => {

    setIsLoading(true);

    try {        
        const EmployeeList = await GeneralListApis(locale).GetEmployeeList();      
        const TemplateList =  await await GeneralListApis(locale).GetPayTemplateList();  
        const YearList =  await await GeneralListApis(locale).GetYears();  
        const MonthList =  await await GeneralListApis(locale).GetMonths();  
    
        setEmployeeData(EmployeeList)
        setTempletData(TemplateList)
        setYearData(YearList)
        setMonthData(MonthList)
    } catch (error) {
        // 
    } finally {
        setProcessing(false)
        setIsLoading(false);
    }

};

const getEditdata =  async () => {
    setIsLoading(true);

    try {
        const data =  await ReplaceAnnualLeaveBalanceData(locale).GetDataById(ID);
        setid(data ? data.id : "")
        setDate(data ? data.trxDate : "") 
        setEmployee(data && data.employeeId && EmployeeData.find((item)=> item.id === data.employeeId) !== undefined  ? 
            EmployeeData.find((item)=> item.id === data.employeeId)
        : null) 
        setJob(data ? data.jobName : "") 
        setDepartment(data ? data.organizationName : "") 
        setHiringDate(data ? data.hiringDate : "") 
        setTemplet(data && data.payTemplateId && TempletData.find((item)=> item.id === data.payTemplateId) !== undefined ?
             TempletData.find((item)=> item.id === data.payTemplateId) 
             : null) 
        setElement(data && data.elementId && data.elementName ? {id: data.elementId, name: data.elementName} : null) 
        setYear(data && data.yearId && YearData.find((item)=> item.id === data.yearId) !== undefined ? 
            YearData.find((item)=> item.id === data.yearId) 
            : null) 
        setMonth(data && data.monthId &&  MonthData.find((item)=> item.id === data.monthId) !== undefined ? 
            MonthData.find((item)=> item.id === data.monthId) 
            : null) 
        setCurrentBalance(data ? data.vacCurrBal : "") 
        setBalanceToReplace(data ? data.vacBalRep : "") 
        setRecSerial(data ? data.recSerial : 0)
    } catch (error) {
        // 
    }  finally {
        setProcessing(false)
        setIsLoading(false);
    }
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
setYear(data && data.yearId ? YearData.find((item)=> item.id === data.yearId) : null) 
setMonth(data && data.monthId ? MonthData.find((item)=> item.id === data.monthId) : null) 
}

const getElementByIdData = async (templateId)=> {
        const ElementList =   await ReplaceAnnualLeaveBalanceData(locale).GetElementListByTemplate(templateId);  
    
        setElementData(ElementList)

        if(Element && Element.id && ElementList.find((item)=> item.id === Element.id))
        {
            setElement(ElementList.find((item)=> item.id === Element.id))
        }
        else
        {
            setElement(null)
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


function oncancel(){
    history.push(`/app/Pages/vac/ReplaceAnnualLeaveBalance`);
  }



  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" 
           title={ID ?  
            intl.formatMessage(messages.EditReplaceAnnualLeaveBalance)
          :  
            intl.formatMessage(messages.CreateReplaceAnnualLeaveBalance)
       }
          desc={""}>
           <form onSubmit={handleSubmit}> 
                        <Grid item xs={12}  md={6} lg={4}
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}> 
                            <Grid item xs={12}  md={12} > 
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                    label={intl.formatMessage(Payrollmessages.date)}
                                    value={date ? dayjs(date) : null}
                                    className={classes.field}
                                        onChange={(date) => {
                                            setDate(date)
                                    }}
                                    onError={(error,value)=>{
                                        if(error !== null)
                                        {
                                        setDateError((prevState) => ({
                                            ...prevState,
                                                [`date`]: true
                                            }))
                                        }
                                        else
                                        {
                                        setDateError((prevState) => ({
                                            ...prevState,
                                                [`date`]: false
                                            }))
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                            },
                                        }}
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
                                                        value={ Employee !== null ? Employee : null}
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
                                                                setEmployee(null);
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
                                                            autoComplete='off'
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
                                                            autoComplete='off'
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
                                                            autoComplete='off'
                                                            />
                                                </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}  md={12}
                            container
                            spacing={3}
                            alignItems="flex-start"
                            direction="row"
                            className={style.gridSty}> 
                            <Grid item xs={12}  md={6} lg={4}> 
                                <Autocomplete
                                    id="ddlMenu"   
                                    value={ Templet !== null ? Templet : null}
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
                                            setTemplet(null);
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
                                    value={ Element !== null ? Element : null}
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
                                            setElement(null);
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
                                        value={ Year !== null ? Year : null} 
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
                                                setYear(null);
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
                                        value={ Month !== null ? Month : null} 
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
                                                setMonth(null);
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
                                                autoComplete='off'
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
                                              autoComplete='off'
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
                                                autoComplete='off'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
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
                        <SaveButton Id={id} processing={processing} />
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
    </PayRollLoader>
  );
}

CreateAndEditReplaceAnnualLeaveBalance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditReplaceAnnualLeaveBalance); 
