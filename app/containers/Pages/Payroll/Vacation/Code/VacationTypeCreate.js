import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import VacationsTypesData from '../api/VacationsTypesData';
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
import {Card ,CardContent, Checkbox} from "@mui/material";
import PayRollLoader from "../../Component/PayRollLoader";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveButton from '../../Component/SaveButton';




function CreateVacationType(props) {
  const [id, setid] = useState(0);
  const [vacationName, setVacationName] = useState('');
  const [EnName, setEnName] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [Shortcut, setShortcut] = useState('');
  const [Maximum, setMaximum] = useState("");
  const [SalaryDeduction ,setSalaryDeduction] = useState(false)
  const [AnnualVacationDeduction ,setAnnualVacationDeduction] = useState(false)
  const [GovernmentSickVacation ,setGovernmentSickVacation] = useState(false)
  const [HasBalance ,setHasBalance] = useState(false)
  const [TransferToTheNextYear ,setTransferToTheNextYear] = useState(false)
  const [MaternityVacation ,setMaternityVacation] = useState(false)
  const [CalculatedAsAWorkingDay ,setCalculatedAsAWorkingDay] = useState(false)
  const [DonotApplayOfficialHolidaysRules ,setDonotApplayOfficialHolidaysRules] = useState(false)
  const [AffectsTheIncentiveCalculation ,setAffectsTheIncentiveCalculation] = useState(false)
  const [DoesnotTakeAWeekOff ,setDoesnotTakeAWeekOff] = useState(false)
  const [AnnualInAdvance ,setAnnualInAdvance] = useState(false)
  const [attachFile ,setAttachFile] = useState(false)
  const [elements, setElements] = useState("");
  const [processing ,setProcessing] = useState(false) 
  const locale = useSelector(state => state.language.locale);
  const [elementsData, setElementsData] = useState([]);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [branchList, setBranchList] = useState([]);
  const dayList = [
    {
      id: 1,
      name: 'Saturday',
    },
    {
      id: 2,
      name: 'Sunday',
    },
    {
      id: 3,
      name: 'Monday',
    },
    {
      id: 4,
      name: 'Tuesday',
    },
    {
      id: 5,
      name: 'Wednesday',
    },
    {
      id: 6,
      name: 'Thursday',
    },
    {
      id: 7,
      name: 'Friday',
    }
  ];

  const [reqDayNotAllow, setReqDayNotAllow] = useState([]);
  const [branchIds, setBranchIds] = useState([]);

  const [reqNotAllowInShiftVac, setReqNotAllowInShiftVac] = useState(false);
  const [reqDuringShift, setReqDuringShift] = useState(false);
  const [reqBeforeShiftInMinute, setReqBeforeShiftInMinute] = useState('');

  const [replacementVacOvertimeMinNo, setReplacementVacOvertimeMinNo] = useState('');
  const [replacementVacHourCheck, setReplacementVacHourCheck] = useState(false);
  const [haveReplacementDay, setHaveReplacementDay] = useState(false);

  const [isOfficialVacation, setIsOfficialVacation] = useState(false);
  const [allowLessOneDay, setAllowLessOneDay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    setIsLoading(true);

    const data = {
      id: id,
      enName: EnName ? EnName : "",
      arName: vacationName ? vacationName : "",
      deducted: SalaryDeduction,
      elementId: SalaryDeduction ? elements.id : "",
      eleDayVal: SalaryDeduction ? Number(dayValue) : "",
      balanceIsPostedToNextYear: TransferToTheNextYear,
      hasBalance: HasBalance,
      workDay: CalculatedAsAWorkingDay,
      dontVacRoule: DonotApplayOfficialHolidaysRules,
      isYearBalance: AnnualVacationDeduction,
      maxDayNo: Number(Maximum),
      app: Shortcut,
      affectHafez: AffectsTheIncentiveCalculation,
      newHiringVac: AnnualInAdvance,
      dontCalcWeekEnd: DoesnotTakeAWeekOff,
      governmentSick: GovernmentSickVacation,
      attachFile,
      maternity: MaternityVacation,
      ReqNotAllowInShiftVac: reqNotAllowInShiftVac,
      reqDayNotAllow: reqDayNotAllow.map(item => item.name).join(','),
      reqDuringShift,
      reqBeforeShiftInMinute,
      replacementVacOvertimeMinNo,
      replacementVacHourCheck,
      haveReplacementDay,
      allowLessOneDay,
      isOfficialVacation,
      branchIds: branchIds.map(item => item.id).join(','),
    };




    try {
      let response = await VacationsTypesData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/vac/VacationsTypes`);
      }
    } catch (err) {
      //
    } finally {
      setProcessing(false)
      setIsLoading(false);
    }
    
  };
 


const getdata =  async () => {
  setIsLoading(true);

  try {    
    const elements = await GeneralListApis(locale).GetElementListByType(2);    
  
    setElementsData(elements)

    const branchs = await GeneralListApis(locale).GetBranchList();
    setBranchList(branchs);
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }

};

const getEditdata =  async () => {
  setIsLoading(true);

  try {
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
    setGovernmentSickVacation(data ? data.governmentSick : "")
    setHasBalance(data ? data.hasBalance : "")
    setTransferToTheNextYear(data ? data.balanceIsPostedToNextYear : "")
    setMaternityVacation(data ? data.maternity : "")
    setCalculatedAsAWorkingDay(data ? data.workDay : "")
    setDonotApplayOfficialHolidaysRules(data ? data.dontVacRoule : "")
    setAffectsTheIncentiveCalculation(data ? data.affectHafez : "")
    setDoesnotTakeAWeekOff(data ? data.dontCalcWeekEnd : "")
    setAnnualInAdvance(data ? data.newHiringVac : "")
    setAttachFile(data ? data.attachFile : "")

      const branches = data.branchIds ? data.branchIds.split(',').map((branchId) => {
        const branch = branchList.find((item) => item.id === parseInt(branchId, 10));

        if (branch) {
          return branch;
        }

        return {
          id: branchId,
          name: branchId,
        };
      }) : [];

      const days = data.reqDayNotAllow.split(',').map(dayName => {
        const day = dayList.find((item) => item.name === dayName);

        if (day) {
          return day;
        }

        return {
          id: dayName,
          name: dayName,
        };
      });

      setReqDayNotAllow(days);
      setBranchIds(branches);
      setReqNotAllowInShiftVac(data.reqNotAllowInShiftVac);
      setReqDuringShift(data.reqDuringShift);
      setReqBeforeShiftInMinute(data.reqBeforeShiftInMinute);
      setReplacementVacOvertimeMinNo(data.replacementVacOvertimeMinNo);
      setReplacementVacHourCheck(data.replacementVacHourCheck);
      setHaveReplacementDay(data.haveReplacementDay);
      setIsOfficialVacation(data.isOfficialVacation);
      setAllowLessOneDay(data.allowLessOneDay);
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
  if(ID && elementsData.length !== 0 && branchList.length !== 0)
  {
    getEditdata()
  }
  }, [ID, elementsData, branchList]);


  function oncancel(){
    history.push(`/app/Pages/vac/VacationsTypes`);
  }


  return (
    <PayRollLoader isLoading={isLoading}>

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
                mt={0}
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
                          autoComplete='off'
                      />
                    </Grid>

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
                          autoComplete='off'
                      />
                    </Grid>

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
                          autoComplete='off'
                      />
                    </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={dayList}
                  multiple
                  disableCloseOnSelect
                  className={`${style.AutocompleteMulSty} ${
                    locale === 'ar' ? style.AutocompleteMulStyAR : null
                  }`}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  value={reqDayNotAllow}
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
                  onChange={(_, value) => setReqDayNotAllow(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.reqDayNotAllow)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={branchList}
                  multiple
                  disableCloseOnSelect
                  className={`${style.AutocompleteMulSty} ${
                    locale === 'ar' ? style.AutocompleteMulStyAR : null
                  }`}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  value={branchIds}
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
                  onChange={(_, value) => setBranchIds(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required={branchIds.length === 0}
                      label={intl.formatMessage(messages.company)}
                    />
                  )}
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

                          <Grid item> 
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

                          <Grid item xs={12}  md={3} className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
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
                    
                  
                          <Grid item xs={12}  md={2}   className={` ${locale === "ar" ?  style.DayValueContainer : null}`}> 
                            <TextField
                              name="DayValue"
                              id="DayValue"
                              placeholder={intl.formatMessage(messages.DayValue) }
                              label={intl.formatMessage(messages.DayValue)}
                              className={`${classes.field} ${style.fieldsSty}`}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                inputProps: {
                                  min: 1,
                                }
                              }}
                              type='number'
                              value={dayValue}
                              onChange={(e) => setDayValue(e.target.value)}
                              disabled={SalaryDeduction ? false: true}
                              autoComplete='off'
                            />
                          </Grid>

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

            <Grid item xs={12} md={12} className={style.gridSty}>
              <Card className={classes.card}>
                <CardContent className={style.CardContentSty}>
                  <Grid item xs={12} md={12}
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row">

                    <Grid item className={`${locale === 'ar' ? style.timeContainer : null}`}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={reqDuringShift}
                            onChange={() => setReqDuringShift(prev => !prev)}
                            color="primary"
                            className={style.BtnSty}
                          />
                        }
                        label={intl.formatMessage(messages.reqDuringShift) }
                      />
                    </Grid>

                    <Grid item className={`${locale === 'ar' ? style.timeContainer : null}`}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={reqNotAllowInShiftVac}
                            onChange={() => setReqNotAllowInShiftVac(prev => !prev)}
                            color="primary"
                            className={style.BtnSty}
                          />
                        }
                        label={intl.formatMessage(messages.reqNotAllowInShiftVac) }
                      />
                    </Grid>

                    <Grid item xs={12} md={3} className={style.totalMinutesContainer}>
                      <TextField
                        name="ReqBeforeShiftInMinute"
                        id="ReqBeforeShiftInMinute"
                        placeholder={intl.formatMessage(messages.reqBeforeShiftInMinute) }
                        label={intl.formatMessage(messages.reqBeforeShiftInMinute)}
                        className={`${classes.field} ${style.fieldsSty}`}
                        margin="normal"
                        variant="outlined"
                        type='number'
                        value={reqBeforeShiftInMinute}
                        onChange={(e) => setReqBeforeShiftInMinute(e.target.value)}
                        autoComplete='off'
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12} className={style.gridSty}>
              <Card className={classes.card}>
                <CardContent className={style.CardContentSty}>
                  <Grid item xs={12} md={12}
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row">

                    <Grid item className={`${locale === 'ar' ? style.timeContainer : null}`}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={haveReplacementDay}
                            onChange={() => setHaveReplacementDay(prev => !prev)}
                            color="primary"
                            className={style.BtnSty}
                          />
                        }
                        label={intl.formatMessage(messages.HaveReplacementDay) }
                      />
                    </Grid>

                    <Grid item className={`${locale === 'ar' ? style.timeContainer : null}`}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={replacementVacHourCheck}
                            onChange={() => setReplacementVacHourCheck(prev => !prev)}
                            color="primary"
                            className={style.BtnSty}
                          />
                        }
                        label={intl.formatMessage(messages.ReplacementVacHourCheck) }
                      />
                    </Grid>

                    <Grid item xs={12} md={3} className={style.totalMinutesContainer}>
                      <TextField
                        name="ReplacementVacOvertimeMinNo"
                        id="ReplacementVacOvertimeMinNo"
                        placeholder={intl.formatMessage(messages.ReplacementVacOvertimeMinNo) }
                        label={intl.formatMessage(messages.ReplacementVacOvertimeMinNo)}
                        className={`${classes.field} ${style.fieldsSty}`}
                        margin="normal"
                        variant="outlined"
                        type='number'
                        value={replacementVacOvertimeMinNo}
                        onChange={(e) => setReplacementVacOvertimeMinNo(e.target.value)}
                        autoComplete='off'
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
    

                        <Grid item className={` ${locale === "ar" ?  style.timeContainer : null}`}> 
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

                        <Grid item xs={12}  md={4} lg={2} className={style.totalMinutesContainer}> 
                        <TextField
                          name="Maximum"
                          label={intl.formatMessage(messages.Maximum)}
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          required={AnnualVacationDeduction}
                          type='number'
                          disabled={!AnnualVacationDeduction}
                          value={Maximum}
                          onChange={(e) => setMaximum(e.target.value)}
                          autoComplete='off'
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

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={isOfficialVacation} 
                                  onChange={() => 
                                    setIsOfficialVacation(!isOfficialVacation)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.IsOfficialVacation) }
                                  /> 
                              </Grid>

                              <Grid item xs={12} md={6}  lg={4} > 
                                <FormControlLabel  
                                  control={ 
                                  <Switch  
                                  checked={allowLessOneDay} 
                                  onChange={() => 
                                    setAllowLessOneDay(!allowLessOneDay)
                                  }
                                  color="primary" 
                                  className={style.BtnSty}
                                  />} 
                                  label={intl.formatMessage(messages.AllowLessOneDay) }
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

CreateVacationType.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateVacationType);
