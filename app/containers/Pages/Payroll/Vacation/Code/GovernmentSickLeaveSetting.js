import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import GovernmentSickLeaveSettingData from '../api/GovernmentSickLeaveSettingData';
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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {Card ,CardContent} from "@mui/material";




function GovernmentSickLeaveSetting(props) {
  const [id, setid] = useState(0);
  const [GovernmentSickVac, setGovernmentSickVac] = useState('');
  const [ElementListByType, setElementListByType] = useState('');
  const [Yearly, setYearly] = useState(true);
  const [Every3Years, setEvery3Years] = useState(false);
  const [DaysNumber1, setDaysNumber1] = useState('');
  const [DayValue1, setDayValue1] = useState('');
  const [DaysNumber2, setDaysNumber2] = useState('');
  const [DayValue2, setDayValue2] = useState('');
  const [DaysNumber3, setDaysNumber3] = useState('');
  const [DayValue3, setDayValue3] = useState('');
  const [DaysNumber4, setDaysNumber4] = useState('');
  const [DayValue4, setDayValue4] = useState('');
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [GovernmentSickVacData, setGovernmentSickVacData] = useState([]);
  const [ElementListByTypeData, setElementListByTypeData] = useState([]);
  const { state } = useLocation()
  const { intl } = props;
  const { classes } = useStyles();




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)


    const data = {
      id: id,
      vacCode: GovernmentSickVac.id,
      elementId: ElementListByType.id,
      no1Choice: Number( DaysNumber1),
      no2Choice: Number( DaysNumber2),
      no3Choice: Number( DaysNumber3),
      no4Choice: Number( DaysNumber4),
      no1Value: Number( DayValue1),
      no2Value: Number( DayValue2),
      no3Value: Number( DayValue3),
      no4Value: Number( DayValue4),
      yearlyOpt:  Yearly,
      yerar3Opt: Every3Years,
    };



    try {
      let response = await GovernmentSickLeaveSettingData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
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

  const GovernmentSickVacList = await GeneralListApis(locale).GetGovernmentSickVacList(locale);    
  const ElementListByType = await GeneralListApis(locale).GetElementListByType(2);    

  setGovernmentSickVacData(GovernmentSickVacList)
  setElementListByTypeData(ElementListByType)
};

const getEditdata =  async () => {

  const data =  await GovernmentSickLeaveSettingData().GetDataById(GovernmentSickVac.id,locale);

  setid(data ? data.id : "")
  setElementListByType(data && data.elementId && data.elementName ? {id: data.elementId, name: data.elementName} : "")
  setYearly(data ? data.yearlyOpt : false) 
  setEvery3Years(data ? data.yerar3Opt : false) 
  setDaysNumber1(data ? data.no1Choice : "") 
  setDayValue1(data ? data.no1Value : "") 
  setDaysNumber2(data ? data.no2Choice : "") 
  setDayValue2(data ? data.no2Value : "") 
  setDaysNumber3(data ? data.no3Choice : "") 
  setDayValue3(data ? data.no3Value : "") 
  setDaysNumber4(data ? data.no4Choice : "") 
  setDayValue4(data ? data.no4Value : "") 
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(GovernmentSickVac.length !== 0)
  {
    getEditdata()
  }
  }, [GovernmentSickVac]);




  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ intl.formatMessage(messages.GovernmentSickLeaveSetting) } 
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
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}                      
                            options={GovernmentSickVacData.length != 0 ? GovernmentSickVacData: []}
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
                            onChange={(event, value) => setGovernmentSickVac(value !== null?value:"")}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="VacationType"
                                  label={intl.formatMessage(messages.VacationType) }
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
                    
                <Grid item xs={12}  md={4}> 
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={ElementListByType.length != 0 && ElementListByType !== null ? ElementListByType : null}                       
                            options={ElementListByTypeData.length != 0 ? ElementListByTypeData: []}
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
                            onChange={(event, value) =>setElementListByType(value !== null?value:"")}
                            
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="element"
                                  label={intl.formatMessage(messages.element) }
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
                <Grid item xs={12}  md={2}> 
                  <FormControlLabel  
                    control={ 
                      <Switch  
                      checked={Yearly} 
                      onChange={() => {
                          setYearly(!Yearly)
                          setEvery3Years(!Every3Years)
                      }}
                      color="primary" 
                      className={style.BtnSty}
                      />} 
                      label={intl.formatMessage(messages.Yearly) }
                    /> 
                </Grid>

                <Grid item xs={12}  md={2}> 
                  <FormControlLabel  
                    control={ 
                      <Switch  
                      checked={Every3Years} 
                      onChange={() => {
                          setEvery3Years(!Every3Years)
                          setYearly(!Yearly)
                      }}
                      color="primary" 
                      className={style.BtnSty}
                      />} 
                      label={intl.formatMessage(messages.Every3Years) }
                    /> 
                </Grid>
                
              </Grid>

              <Grid item xs={12}  md={4}  className={style.gridSty}> 
                  <Card className={classes.card}>
                        <p className={style.EmployeeDaysDeductionTitle}> {intl.formatMessage(messages.EmployeeDeduction)}  </p>
                    <CardContent className={style.CardContentSty}>
                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        className={style.EmployeeDaysDeduction}
                        >
    
                        <Grid item xs={12}  md={4} lg={6} > 
                          <TextField
                            name="DaysNumber"
                            id="DaysNumber"
                            placeholder={intl.formatMessage(messages.DaysNumber) }
                            label={intl.formatMessage(messages.DaysNumber)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='number'
                            value={DaysNumber1}
                            onChange={(e) => setDaysNumber1(e.target.value)}
                            required
                          />
                        </Grid>

                        <Grid item xs={12}  md={4} lg={6} > 
                            <TextField
                            name="CountValueDay"
                            id="CountValueDay"
                            placeholder={intl.formatMessage(messages.CountValueDay) }
                            label={intl.formatMessage(messages.CountValueDay)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='text'
                              value={DayValue1}
                              onChange={(e) => setDayValue1(e.target.value)}
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
                        className={style.EmployeeDaysDeduction}
                        >
    
                        <Grid item xs={12}  md={4} lg={6} > 
                          <TextField
                            name="DaysNumber"
                            id="DaysNumber"
                            placeholder={intl.formatMessage(messages.DaysNumber) }
                            label={intl.formatMessage(messages.DaysNumber)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='number'
                            value={DaysNumber2}
                            onChange={(e) => setDaysNumber2(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12}  md={4} lg={6} > 
                            <TextField
                            name="CountValueDay"
                            id="CountValueDay"
                            placeholder={intl.formatMessage(messages.CountValueDay) }
                            label={intl.formatMessage(messages.CountValueDay)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            type='text'
                              value={DayValue2}
                              onChange={(e) => setDayValue2(e.target.value)}
                              inputProps={{ pattern: "^[0-9.]+$" }}
                            />
                        </Grid>

                      </Grid>

                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        className={style.EmployeeDaysDeduction}
                        >
    
                          <Grid item xs={12}  md={4} lg={6} > 
                            <TextField
                              name="DaysNumber"
                              id="DaysNumber"
                              placeholder={intl.formatMessage(messages.DaysNumber) }
                              label={intl.formatMessage(messages.DaysNumber)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              type='number'
                              value={DaysNumber3}
                              onChange={(e) => setDaysNumber3(e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={12}  md={4} lg={6} > 
                              <TextField
                              name="CountValueDay"
                              id="CountValueDay"
                              placeholder={intl.formatMessage(messages.CountValueDay) }
                              label={intl.formatMessage(messages.CountValueDay)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              type='text'
                                value={DayValue3}
                                onChange={(e) => setDayValue3(e.target.value)}
                                inputProps={{ pattern: "^[0-9.]+$" }}
                              />
                          </Grid>

                      </Grid>

                      <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        className={style.EmployeeDaysDeduction}
                        >
    
                          <Grid item xs={12}  md={4} lg={6} > 
                            <TextField
                              name="DaysNumber"
                              id="DaysNumber"
                              placeholder={intl.formatMessage(messages.DaysNumber) }
                              label={intl.formatMessage(messages.DaysNumber)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              type='number'
                              value={DaysNumber4}
                              onChange={(e) => setDaysNumber4(e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={12}  md={4} lg={6} > 
                              <TextField
                              name="CountValueDay"
                              id="CountValueDay"
                              placeholder={intl.formatMessage(messages.CountValueDay) }
                              label={intl.formatMessage(messages.CountValueDay)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              type='text'
                                value={DayValue4}
                                onChange={(e) => setDayValue4(e.target.value)}
                                inputProps={{ pattern: "^[0-9.]+$" }}
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

                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </div>
  );
}

GovernmentSickLeaveSetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GovernmentSickLeaveSetting); 
