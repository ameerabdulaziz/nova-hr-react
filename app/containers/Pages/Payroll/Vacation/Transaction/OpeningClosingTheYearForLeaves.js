import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OpeningClosingTheYearForLeavesData from '../api/OpeningClosingTheYearForLeavesData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import ErrorMessages from '../../api/ApiMessages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import {Card ,CardContent} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from "date-fns";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PayRollLoader from '../../Component/PayRollLoader';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function OpeningClosingTheYearForLeaves(props) {
  const [apiData, setApiData] = useState();
  const [Organization, setOrganization] = useState(null);
  const [Year, setYear] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [submittingOpenYear ,setSubmittingOpenYear] = useState(false)
  const [submittingCloseYear ,setSubmittingCloseYear] = useState(false)
  const [processingCloseYear ,setProcessingCloseYear] = useState(false)
  const [processingOpenYear ,setProcessingOpenYear] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [OrganizationData, setOrganizationData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const { intl } = props;
  const { classes } = useStyles();


  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


const getdata =  async () => {
  setIsLoading(true);

  try {
    const Organizationlist = await GeneralListApis(locale).GetBranchList(true);  
    const YearList =  await await GeneralListApis(locale).GetYears();   
  
    setOrganizationData(Organizationlist)
    setYearData(YearList)

      if (branchId) {
        setOrganization(Organizationlist.find((item)=> item.id === branchId));
        const response = await GeneralListApis(locale).getOpenMonth(branchId, 0);

        setYear(YearList.find((item)=> item.id === response.yearId));
      }
  } catch (error) {
    // 
  }finally {
    setIsLoading(false);
  }
};

const getDataById =  async () => {
  setIsLoading(true);

  try {
    const data =  await OpeningClosingTheYearForLeavesData().GetDataById(Organization.id,Year.id);

    setApiData(data)
  } catch (error) {
    // 
  }finally {
    setIsLoading(false);
  }
};



useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(Organization !== null && Year !== null)
  {
    getDataById()
  }
  }, [Organization,Year]);


  const openYearFun = async () => {

    	// used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }

    setSubmittingOpenYear(true)
    setProcessingOpenYear(true)
    setIsLoading(true);

    const data = {
        organizationId: Organization.id,
        yearId: Year.id,
        startDateVac: dateFormatFun(fromDate),
        endDateVac: dateFormatFun(toDate),
        yearName: Year.name
        };


        try {
          let response = await OpeningClosingTheYearForLeavesData().SaveOpenYear(data);

          setOrganization(null)
          setYear(null)
          setFromDate(null)
          setToDate(null)
          setApiData(null)

          if (response.status==200) {
            toast.success(notif.saved);
          }
        } catch (err) {
          // 
        } finally {
          setSubmittingOpenYear(false)
          setProcessingOpenYear(false)
          setIsLoading(false);
        }
  }


  const closeYearFun = async () => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }
   
    setSubmittingCloseYear(true)
    setProcessingCloseYear(true)
    setIsLoading(true);

    const data = {
      organizationId: Organization.id,
      yearId: Year.id,
      startDateVac: dateFormatFun(fromDate),
      endDateVac: dateFormatFun(toDate),
      yearName: Year.name
      };


        try {
          let response = await OpeningClosingTheYearForLeavesData().SaveCloseYear(data);

          setOrganization(null)
          setYear(null)
          setFromDate(null)
          setToDate(null)
          setApiData(null)

          if (response.status==200) {
            toast.success(notif.saved);
          } else {
              toast.error(response.statusText);
          }

        } catch (err) {
          // 
        }finally {
          setSubmittingCloseYear(false)
          setProcessingCloseYear(false)
          setIsLoading(false);
        }
  }

// used to print error message if user choose end date before start date
  useEffect(()=>{
    if(fromDate >= toDate && fromDate !== null && toDate !== null)
    {
      toast.error(intl.formatMessage(messages.dateErrorMes));
    }
  },[fromDate,toDate])


  
  

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" 
          title={ intl.formatMessage(messages.OpeningClosingYearForLeaves) } 
          desc={""}>
            <form>

            <Grid
              container
              spacing={3}>

                  <Grid item xs={12}  md={3} > 
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}             
                            value={Organization}                    
                            options={OrganizationData.length != 0 ? OrganizationData: []}
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
                                  setOrganization(value);
                                } else {
                                  setOrganization(null);
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="Organization"
                                label={intl.formatMessage(messages.company) }
                                margin="normal" 
                                className={style.fieldsSty}
                                required
                                />
                                
                            )}
                            /> 
                  </Grid>
                
                <Grid item xs={12}  md={3}> 
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}     
                            value={Year}                
                            options={yearData.length != 0 ? yearData: []}
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
                                label={intl.formatMessage(messages.Year) }
                                margin="normal" 
                                className={style.fieldsSty}
                                required
                                />
                                
                            )}
                            /> 
              
                </Grid>
                    

                          <Grid item xs={12}  md={3}> 
                          
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label={intl.formatMessage(messages.StartDate)}
                                  value={fromDate ? dayjs(fromDate) : null}
                                className={classes.field}
                                  onChange={(date) => {
                                    setFromDate(date)
                                }}
                                onError={(error,value)=>{
                                  if(error !== null)
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`fromDate`]: true
                                      }))
                                  }
                                  else
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`fromDate`]: false
                                      }))
                                  }
                                }}
                                slotProps={{
                                    textField: {
                                        required: toDate !== null ? true : false,
                                      },
                                    }}
                                />
                            </LocalizationProvider>
                          </Grid>


                          {/* <Grid item xs={12}  md={3}> 
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                  label={intl.formatMessage(messages.EndDate)}
                                  value={toDate}
                                  onChange={(date) => { 
                                    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                                      if (!isNaN(new Date(date))) { 
                                        setToDate(  date === null ? null : format(new Date(date), "yyyy-MM-dd"),)
                                      } 
                                      else
                                      {
                                        setToDate(null)
                                      }
                                    }
                                  }}
                                  className={classes.field}
                                  renderInput={(params) => <TextField {...params} variant="outlined"  required={fromDate !== null ? true : false}/>}
                                />
                            </LocalizationProvider>
                      
                          </Grid> */}

                          <Grid item xs={12}  md={3}> 
                          
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label={intl.formatMessage(messages.EndDate)}
                                  value={toDate ? dayjs(toDate) : null}
                                className={classes.field}
                                  onChange={(date) => {
                                    sethiringDate(date)
                                }}
                                onError={(error,value)=>{
                                  if(error !== null)
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`toDate`]: true
                                      }))
                                  }
                                  else
                                  {
                                    setDateError((prevState) => ({
                                        ...prevState,
                                          [`toDate`]: false
                                      }))
                                  }
                                }}
                                slotProps={{
                                    textField: {
                                        required: fromDate !== null ? true : false,
                                      },
                                    }}
                                />
                            </LocalizationProvider>
                          </Grid>

                <Grid item xs={12}  md={2}> 
                    <Button variant="contained" size="medium" color="primary" 
                    disabled={ (!submittingOpenYear || !processingOpenYear) && (fromDate < toDate || (fromDate === null && toDate === null)) && (apiData && apiData.id === 0)  ? false :  true}
                    onClick={openYearFun}
                     >
                      {processingOpenYear && (
                          <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                        )}
                       <FormattedMessage {...messages.OpenYear} /> 
                    </Button>
                </Grid>

                <Grid item xs={12}  md={2}> 
                    <Button variant="contained" size="medium" color="primary" 
                    disabled={ (!submittingCloseYear || !processingCloseYear) && (fromDate < toDate || (fromDate === null && toDate === null)) && (apiData && apiData.id > 0 && apiData.closeDate === null) ? false : true }
                    onClick={closeYearFun}
                     >
                       {processingCloseYear && (
                          <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                        )}
                       <FormattedMessage {...messages.CloseYear} /> 
                    </Button>
                </Grid>
                

            </Grid>

          </form>
      </PapperBlock>         

     
    </PayRollLoader>
  );
}

OpeningClosingTheYearForLeaves.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpeningClosingTheYearForLeaves); 
