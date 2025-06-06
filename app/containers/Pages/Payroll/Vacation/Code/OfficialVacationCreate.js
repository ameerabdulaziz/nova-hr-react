import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OfficialVacationsData from '../api/OfficialVacationsData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveButton from '../../Component/SaveButton';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from '../../../../App/routes/sitemap';



function CreateOfficialVacation(props) {
  const [id, setid] = useState(0);
  const [vacationDesEN, setVacationDesEN] = useState('');
  const [vacationDesAR, setVacationDesAR] = useState('');
  const [element, setElement] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [ElementsData, setElementsData] = useState([]);
  const [date, setDate] = useState(null);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { classes } = useStyles();


  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    setIsLoading(true)
    setProcessing(true)

    let elementsData = ""
// used to reformat elements data ( combobox ) before send it to api
    element.map((ele, index)=>{
      elementsData+= `${ele.id}`
      if(index + 1 !== element.length)
      {
        elementsData+= ","
      }
    })


    const data = {
      id: id,
      arName: vacationDesAR ? vacationDesAR : "",
      enName: vacationDesEN ? vacationDesEN : "",
      vacationDate: dateFormatFun(date),
      parsId: elementsData,
    };




    try {
      let response = await OfficialVacationsData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(SITEMAP.vacation.OfficialVacations.route);
      } else {
          toast.error(response.statusText);
      }
      setIsLoading(false)
      setProcessing(false)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {
  setIsLoading(true);

  try {
    const elements = await GeneralListApis(locale).GetControlParameterList(locale);    
  
    setElementsData(elements)
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};

const getEditdata =  async () => {
  setIsLoading(true);

  try {
    const data =  await OfficialVacationsData().GetDataById(ID,locale);


    setid(data ? data.id : "")
    setDate(data ? data.vacationDate : "") 
    setVacationDesAR(data ? data.arName : "")
    setVacationDesEN(data ? data.enName : "")
    setElement(data ? data.controlParameterList: "")
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(ID)
  {
    getEditdata()
  }
  }, [ID]);



  function oncancel(){
    history.push(SITEMAP.vacation.OfficialVacations.route);
  }




  return (
    <PayRollLoaderInForms isLoading={isLoading}>

      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.EditOfficialVacation)
                  :  
                    intl.formatMessage(messages.CreateOfficialVacation)
               } 
          desc={""}>
            <form onSubmit={handleSubmit}>

            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row">

                  <Grid item xs={6}  md={4} lg={2.8} xl={2}> 
                  
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
                    
                <Grid item xs={12}  md={4} lg={4} xl={3}> 
                  <TextField
                      name="vacationDescriptionAr"
                      id="vacationDescriptionAr"
                      placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                      label={intl.formatMessage(messages.vacationDescriptionAr)}
                      required
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={vacationDesAR}
                      onChange={(e) => setVacationDesAR(e.target.value)}
                      autoComplete='off'
                  />
              
                </Grid>
                    
                <Grid item xs={12}  md={4} lg={4} xl={3}> 
                  <TextField
                      name="vacationDescriptionEN"
                      id="vacationDescriptionEN"
                      placeholder={intl.formatMessage(messages.vacationDescriptionEN) }
                      label={intl.formatMessage(messages.vacationDescriptionEN)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={vacationDesEN}
                      onChange={(e) => setVacationDesEN(e.target.value)}
                      autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}  md={6} lg={6} xl={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          value={element.length != 0 && element !== null ? element : []}   
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={ElementsData.length != 0 ? ElementsData: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setElement(value);
                          } else {
                            setElement("");
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
                            placeholder={intl.formatMessage(messages.Elements) }
                            label={intl.formatMessage(messages.Elements)}
                            />
                          )}
                        />
              
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
                <Grid item >                  
                    <SaveButton Id={id} processing={processing} />
                </Grid>
                <Grid item >
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

    </PayRollLoaderInForms>
  );
}

CreateOfficialVacation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateOfficialVacation); 
