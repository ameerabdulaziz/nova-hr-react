import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import VacationsTypesData from '../api/VacationsTypesData';
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
import {Card ,CardContent} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';




function CreateVacationType(props) {
  const [id, setid] = useState(0);
  const [vacationName, setVacationName] = useState('');
  const [EnName, setEnName] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [Shortcut, setShortcut] = useState('');
  const [Maximum, setMaximum] = useState("");
  const [SalaryDeduction ,setSalaryDeduction] = useState(false)
  const [AnnualVacationDeduction ,setAnnualVacationDeduction] = useState(false)
  const [HalfDay ,setHalfDay] = useState(false)
  const [GovernmentSickVacation ,setGovernmentSickVacation] = useState(false)
  const [HasBalance ,setHasBalance] = useState(false)
  const [TransferToTheNextYear ,setTransferToTheNextYear] = useState(false)
  const [MaternityVacation ,setMaternityVacation] = useState(false)
  const [CalculatedAsAWorkingDay ,setCalculatedAsAWorkingDay] = useState(false)
  const [HideItForTheEmployee ,setHideItForTheEmployee] = useState(false)
  const [DonotApplayOfficialHolidaysRules ,setDonotApplayOfficialHolidaysRules] = useState(false)
  const [AffectsTheIncentiveCalculation ,setAffectsTheIncentiveCalculation] = useState(false)
  const [DoesnotTakeAWeekOff ,setDoesnotTakeAWeekOff] = useState(false)
  const [AnnualInAdvance ,setAnnualInAdvance] = useState(false)
  const [attachFile ,setAttachFile] = useState(false)
  const [elements, setElements] = useState("");
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false) 
  const locale = useSelector(state => state.language.locale);
  const [elementsData, setElementsData] = useState([]);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)
    const data = {
      id: id,
      enName: EnName ? EnName : "",
      arName: vacationName ? vacationName : "",
      deducted: SalaryDeduction,
      elementId: SalaryDeduction ? elements.id : "",
      eleDayVal: SalaryDeduction ? Number(dayValue) : "",
      balanceIsPostedToNextYear: TransferToTheNextYear,
      hasBalance: HasBalance,
      halfDay: HalfDay,
      workDay: CalculatedAsAWorkingDay,
      dontVacRoule: DonotApplayOfficialHolidaysRules,
      isYearBalance: AnnualVacationDeduction,
      maxDayNo: Number(Maximum),
      app: Shortcut,
      webInvisible: HideItForTheEmployee,
      affectHafez: AffectsTheIncentiveCalculation,
      newHiringVac: AnnualInAdvance,
      dontCalcWeekEnd: DoesnotTakeAWeekOff,
      governmentSick: GovernmentSickVacation,
      attachFile: attachFile,
      maternity: MaternityVacation
    };




    try {
      let response = await VacationsTypesData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/vac/VacationsTypes`);
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

  const elements = await GeneralListApis(locale).GetElementList(locale);    

  setElementsData(elements)
};

const getEditdata =  async () => {

  const data =  await VacationsTypesData().GetDataById(ID,locale);


  setid(data ? data.id : "")
  setVacationName(data ? data.arName : "")
  setEnName(data ? data.enName : "")
  setDayValue(data ? data.eleDayVal : "")
  setElements((data && data.elementId ? elementsData.find((item)=> item.id === data.elementId) : ""))
  setShortcut(data ? data.app : "")
  setMaximum(data ? data.maxDayNo : "")
  setSalaryDeduction(data ? data.deducted : "")
  setAnnualVacationDeduction(data ? data.isYearBalance : "")
  setHalfDay(data ? data.halfDay : "")
  setGovernmentSickVacation(data ? data.governmentSick : "")
  setHasBalance(data ? data.hasBalance : "")
  setTransferToTheNextYear(data ? data.balanceIsPostedToNextYear : "")
  setMaternityVacation(data ? data.maternity : "")
  setCalculatedAsAWorkingDay(data ? data.workDay : "")
  setHideItForTheEmployee(data ? data.webInvisible : "")
  setDonotApplayOfficialHolidaysRules(data ? data.dontVacRoule : "")
  setAffectsTheIncentiveCalculation(data ? data.affectHafez : "")
  setDoesnotTakeAWeekOff(data ? data.dontCalcWeekEnd : "")
  setAnnualInAdvance(data ? data.newHiringVac : "")
  setAttachFile(data ? data.attachFile : "")

};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(ID && elementsData.length !== 0)
  {
    getEditdata()
  }
  }, [ID, elementsData]);


  function oncancel(){
    history.push(`/app/Pages/vac/VacationsTypes`);
  }


  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.EditVacationType)
                  :  
                    intl.formatMessage(messages.CreateVacationType)
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
                      <TextField
                          name="vacationName"
                          id="vacationName"
                          placeholder={intl.formatMessage(messages.vacationName) }
                          label={intl.formatMessage(messages.vacationName)}
                          required
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={vacationName}
                          onChange={(e) => setVacationName(e.target.value)}
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
                          name="enName"
                          id="enName"
                          placeholder={intl.formatMessage(messages.enName) }
                          label={intl.formatMessage(messages.enName)}
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={EnName}
                          onChange={(e) => setEnName(e.target.value)}
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
                          name="Shortcut"
                          id="Shortcut"
                          placeholder={intl.formatMessage(messages.shortcut) }
                          label={intl.formatMessage(messages.shortcut)}
                          required
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={Shortcut}
                          onChange={(e) => setShortcut(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                <Grid item xs={12}  md={12}  className={style.gridSty}> 
                  <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row">


                          <Grid item xs={12}  md={4} lg={3} className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
                            <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={elements.length != 0 && elements !== null ? elements : null}                       
                            options={elementsData.length != 0 ? elementsData: []}
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
                                  setElements(value);
                                } else {
                                  setElements("");
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="element"
                                  label={intl.formatMessage(messages.element) }
                                margin="normal" 
                                className={style.fieldsSty}
                                />
                                
                            )}
                            disabled={SalaryDeduction ? false: true}
                            className={` ${locale === "ar" ?  style.ElementsContainer : null}`}
                            /> 
                          </Grid>
                    
                  
                          <Grid item xs={12}  md={3} lg={1}  className={` ${locale === "ar" ?  style.DayValueContainer : null}`}> 
                            <TextField
                              name="DayValue"
                              id="DayValue"
                              placeholder={intl.formatMessage(messages.DayValue) }
                              label={intl.formatMessage(messages.DayValue)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              type='number'
                              value={dayValue}
                              onChange={(e) => setDayValue(e.target.value)}
                              disabled={SalaryDeduction ? false: true}
                            />
                          </Grid>

                          <Grid item xs={12}  md={5} lg={8} > 
                            <FormControlLabel  
                              control={ 
                                <Switch  
                                checked={SalaryDeduction} 
                                onChange={() => 
                                  setSalaryDeduction(!SalaryDeduction)
                                }
                                color="primary" 
                                className={style.BtnSty}
                                />} 
                              label={intl.formatMessage(messages.SalaryDeduction) }
                              /> 
                          </Grid>

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={12}  md={12}  className={style.gridSty}> 
                  <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row">
    
                        <Grid item xs={12}  md={4} lg={1} className={style.totalMinutesContainer}> 
                        <TextField
                          name="Maximum"
                          id="Maximum"
                          placeholder={intl.formatMessage(messages.Maximum) }
                          label={intl.formatMessage(messages.Maximum)}
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          type='number'
                          value={Maximum}
                          onChange={(e) => setMaximum(e.target.value)}
                        />
                        </Grid>

                        <Grid item xs={12}  md={8} lg={11} className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
                          <FormControlLabel  
                            control={ 
                              <Switch  
                              checked={AnnualVacationDeduction} 
                              onChange={() => 
                                setAnnualVacationDeduction(!AnnualVacationDeduction)
                              }
                              color="primary" 
                              className={style.BtnSty}
                              />} 
                            label={intl.formatMessage(messages.AnnualVacationDeduction) }
                            /> 
                        </Grid>

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={12}  md={12}  className={style.gridSty}> 
                  <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row">

                        <Grid item xs={12}  md={6}  lg={4} > 
                          <FormControlLabel  
                              control={ 
                                <Switch  
                                checked={HalfDay} 
                                onChange={() => 
                                  setHalfDay(!HalfDay)
                                }
                                color="primary" 
                                className={style.BtnSty}
                                />} 
                              label={intl.formatMessage(messages.HalfDay) }
                              /> 
                        </Grid>

                        <Grid item xs={12}  md={6}  lg={4} > 
                          <FormControlLabel  
                              control={ 
                              <Switch  
                              checked={GovernmentSickVacation} 
                              onChange={() => 
                                setGovernmentSickVacation(!GovernmentSickVacation)
                              }
                              color="primary" 
                              className={style.BtnSty}
                              />} 
                              label={intl.formatMessage(messages.GovernmentSickVacation) }
                              /> 

                          </Grid>

                          <Grid item xs={12}  md={6}  lg={4} > 
                            <FormControlLabel  
                                control={ 
                                <Switch  
                                  checked={HasBalance} 
                                  onChange={() => 
                                    setHasBalance(!HasBalance)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.HasBalance) }
                                /> 
                          </Grid>

                          <Grid item xs={12} md={6}  lg={4} > 
                              <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={TransferToTheNextYear} 
                                  onChange={() => 
                                    setTransferToTheNextYear(!TransferToTheNextYear)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.TransferToTheNextYear) }
                                  /> 
                            </Grid>

                            <Grid item xs={12}  md={6}  lg={4} > 
                              <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={MaternityVacation} 
                                  onChange={() => 
                                    setMaternityVacation(!MaternityVacation)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.MaternityVacation) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4}> 
                                <FormControlLabel  
                                    control={ 
                                    <Switch  
                                    checked={CalculatedAsAWorkingDay} 
                                    onChange={() => 
                                      setCalculatedAsAWorkingDay(!CalculatedAsAWorkingDay)
                                    }
                                    color="primary" 
                                    className={style.BtnSty}
                                    />} 
                                    label={intl.formatMessage(messages.CalculatedAsAWorkingDay) }
                                    /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4}> 
                                <FormControlLabel  
                                    control={ 
                                    <Switch  
                                    checked={HideItForTheEmployee} 
                                    onChange={() => 
                                      setHideItForTheEmployee(!HideItForTheEmployee)
                                    }
                                    color="primary" 
                                    className={style.BtnSty}
                                    />} 
                                    label={intl.formatMessage(messages.HideItForTheEmployee) }
                                    /> 
                              </Grid>

                              <Grid item xs={12}  md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={DonotApplayOfficialHolidaysRules} 
                                  onChange={() => 
                                    setDonotApplayOfficialHolidaysRules(!DonotApplayOfficialHolidaysRules)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.DonotApplyOfficialHolidaysRules) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={AffectsTheIncentiveCalculation} 
                                  onChange={() => 
                                    setAffectsTheIncentiveCalculation(!AffectsTheIncentiveCalculation)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.AffectsTheIncentiveCalculation) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={DoesnotTakeAWeekOff} 
                                  onChange={() => 
                                    setDoesnotTakeAWeekOff(!DoesnotTakeAWeekOff)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.DoesnotTakeAWeekOff) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={AnnualInAdvance} 
                                  onChange={() => 
                                    setAnnualInAdvance(!AnnualInAdvance)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.AnnualInAdvance) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={attachFile} 
                                  onChange={() => 
                                    setAttachFile(!attachFile)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.MustAttachFile) }
                                  /> 
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

CreateVacationType.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateVacationType);
