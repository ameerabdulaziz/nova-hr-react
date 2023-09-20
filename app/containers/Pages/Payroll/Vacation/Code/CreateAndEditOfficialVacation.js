import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OfficialVacationsData from '../api/OfficialVacationsData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/Styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';




function CreateOfficialVacation(props) {
  const [id, setid] = useState(0);
  const [vacationDesEN, setVacationDesEN] = useState('');
  const [vacationDesAR, setVacationDesAR] = useState('');
  const [element, setElement] = useState('');
  const [submitting ,setSubmitting] = useState(false)
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





  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
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
      vacationDate: date,
      parsId: elementsData,
    };




    try {
      let response = await OfficialVacationsData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/vac/OfficialVacations`);
      } else {
          toast.error(response.statusText);
      }
      setSubmitting(false)
      setProcessing(false)
    } catch (err) {
      toast.error(notif.error);
      setSubmitting(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {

  const elements = await GeneralListApis(locale).GetControlParameterList(locale);    

  setElementsData(elements)
};

const getEditdata =  async () => {

  const data =  await OfficialVacationsData().GetDataById(ID,locale);


  setid(data ? data.id : "")
  setDate(data ? data.vacationDate : "") 
  setVacationDesAR(data ? data.arName : "")
  setVacationDesEN(data ? data.enName : "")
  setElement(data ? data.controlParameterList: "")
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
    history.push(`/app/Pages/vac/OfficialVacations`);
  }




  return (
    <div>
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
            
              <Grid item xs={12}  md={12} 
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
                > 
                    
                <Grid item xs={12}  md={4}> 
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
              className={style.gridSty}
              > 
                    
                <Grid item xs={12}  md={4}> 
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
                    
                <Grid item xs={12}  md={4}> 
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
                    
                  <Grid item xs={12}  md={4}> 
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

CreateOfficialVacation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateOfficialVacation); 
