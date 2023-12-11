import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import OfficialVacationsData from '../api/OfficialVacationsData';
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveButton from '../../Component/SaveButton';
import PayRollLoader from '../../Component/PayRollLoader';

import {Box, Card ,CardContent, InputAdornment } from "@mui/material";





function BranchSalarySetting(props) {
  const [id, setid] = useState(0);
  const [vacationDesEN, setVacationDesEN] = useState('');
  const [vacationDesAR, setVacationDesAR] = useState('');
  const [element, setElement] = useState('');
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
  const [BranchList, setBranchList] = useState([]);
  const [brCode, setBrCode] = useState();




  const handleSubmit = async (e) => {
    e.preventDefault();
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
      vacationDate: date,
      parsId: elementsData,
    };




    // try {
    //   let response = await OfficialVacationsData().Save(data);

    //   if (response.status==200) {
    //     toast.success(notif.saved);
    //     history.push(`/app/Pages/vac/OfficialVacations`);
    //   } else {
    //       toast.error(response.statusText);
    //   }
    //   setIsLoading(false)
    //   setProcessing(false)
    // } catch (err) {
    //   //
    // } finally {
    //   setIsLoading(false)
    //   setProcessing(false)
    // }
    
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

//   try {
//     const data =  await OfficialVacationsData().GetDataById(ID,locale);


//     setid(data ? data.id : "")
//     setDate(data ? data.vacationDate : "") 
//     setVacationDesAR(data ? data.arName : "")
//     setVacationDesEN(data ? data.enName : "")
//     setElement(data ? data.controlParameterList: "")
//   } catch (error) {
//     //
//   } finally {
//     setIsLoading(false);
//   }
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



  async function fetchData() {
    try {
      const list1 = await GeneralListApis(locale).GetBranchList();
      setBranchList(list1);
    } catch (err) {
      console.log("err =", err)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

console.log("brCode =", brCode)

  return (
    <PayRollLoader isLoading={isLoading}>

      <PapperBlock whiteBg icon="border_color" 
          title={
            "BranchSalarySetting"
            // ID ?  
            //         intl.formatMessage(messages.EditOfficialVacation)
            //       :  
            //         intl.formatMessage(messages.CreateOfficialVacation)
               } 
          desc={""}>
            <form onSubmit={handleSubmit}>




            <Grid item xs={12} md={6}>
              <Autocomplete
                id="brCode"
                options={BranchList}
                // value={
                //   BranchList.find((item) => item.id === data.brCode) || null
                // }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                // onChange={(event, value) => {
                //   // getLoanSetting(value !== null ? value.id : null);
                //   // setdata((prevFilters) => ({
                //   //   ...prevFilters,
                //   //   brCode: value !== null ? value.id : null,
                //   // }));
                //   setBrCode(value !== null ? value.id : null)
                // }}
                onChange={(event, value) => {
                  setBrCode(value !== null ? value.id : null)
              }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="brCode"
                    required
                    label={intl.formatMessage(Payrollmessages.organizationName)}
                  />
                )}
              />
            </Grid>
 



  <Box component="fieldset" style={{border: "1px solid #c4c4c4", padding: "30px", paddingTop: "40px", width: "45%"}}>
      <legend>Taxe parameters</legend>
      
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

                        <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        // className={style.gridSty}
                        > 
                            
                        <Grid item xs={12}  md={6}> 
                            <TextField
                                name="PersonalExemption"
                                id="PersonalExemption"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                placeholder="Personal exemption"
                                label="Personal exemption"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                            />
                        </Grid>

                       

                        <Grid item xs={12}  md={6}> 
                            <TextField
                                name="specialNeedsExemption"
                                id="specialNeedsExemption"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                placeholder="Special Needs Exemption"
                                label="Special Needs Exemption"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                            />
                        </Grid>

                        </Grid>

                        {/* <Grid item xs={12}  md={12}></Grid> */}

                        <Grid item xs={12}  md={12}> 
                            <Card className={classes.card}>

                                <CardContent className={style.CardContentSty}>
                                    <Grid item xs={12}  md={12} 
                                    container
                                    spacing={3}
                                    alignItems="flex-start"
                                    direction="row"
                                    // className={style.EmployeeDaysDeduction}
                                    >
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="FirstBracketLimit"
                                                id="FirstBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="First bracket Limit"
                                                label="First bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={2}> 
                                            <TextField
                                                name="FirstBracketTax"
                                                id="FirstBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                // placeholder="First Bracket Tax"
                                                label="First Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="SecondBracketLimit"
                                                id="SecondBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Second bracket Limit"
                                                label="Second bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="SecondBracketTax"
                                                id="SecondBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Second Bracket Tax"
                                                label="Second Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="ThirdBracketLimit"
                                                id="ThirdBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Third bracket Limit"
                                                label="Third bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="ThirdBracketTax"
                                                id="ThirdBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Third Bracket Tax"
                                                label="Third Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="FourthBracketLimit"
                                                id="FourthBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Fourth bracket Limit"
                                                label="Fourth bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="FourthBracketTax"
                                                id="FourthBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Fourth Bracket Tax"
                                                label="Fourth Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="FifthBracketLimit"
                                                id="FifthBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Fifth bracket Limit"
                                                label="Fifth bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="FifthBracketTax"
                                                id="FifthBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Fifth Bracket Tax"
                                                label="Fifth Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="SixthBracketLimit"
                                                id="SixthBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Sixth bracket Limit"
                                                label="Sixth bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="SixthBracketTax"
                                                id="SixthBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Sixth Bracket Tax"
                                                label="Sixth Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="seventhBracketLimit"
                                                id="seventhBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Seventh bracket Limit"
                                                label="Seventh bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="seventhBracketTax"
                                                id="seventhBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Seventh Bracket Tax"
                                                label="Seventh Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
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
                                        <Grid item xs={12}  md={8}> 
                                            <TextField
                                                name="EighthBracketLimit"
                                                id="EighthBracketLimit"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Eighth bracket Limit"
                                                label="Eighth bracket Limit"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}  md={4}> 
                                            <TextField
                                                name="EighthBracketTax"
                                                id="EighthBracketTax"
                                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                                placeholder="Eighth Bracket Tax"
                                                label="Eighth Bracket Tax"
                                                // required
                                                className={`${classes.field} ${style.fieldsSty}`}
                                                margin="normal"
                                                variant="outlined"
                                                value={vacationDesAR}
                                                onChange={(e) => setVacationDesAR(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        %
                                                      </InputAdornment>
                                                    ),
                                                  }}
                                            />
                                        </Grid>
                                    </Grid>

                                    

                                </CardContent>
                            </Card>
                        </Grid>


                        <Grid item xs={12}  md={12} 
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        // className={style.gridSty}
                        > 
                            
                        <Grid item xs={12}  md={6}> 
                            <TextField
                                name="EpidemicsContribution"
                                id="EpidemicsContribution"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                placeholder="Epidemics Contribution"
                                label="Epidemics Contribution"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>

                       

                        <Grid item xs={12}  md={6}> 
                            <TextField
                                name="DisplayName"
                                id="DisplayName"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                placeholder="Display Name"
                                label="Display Name"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                            />
                        </Grid>

                        </Grid>
                        
                    </Grid>

        </Grid>
    </Box>



    <Box component="fieldset" style={{border: "1px solid #c4c4c4", padding: "30px", paddingTop: "40px",marginTop: "20px", width: "45%"}}>
      <legend>Social insurance  parameters</legend>
      
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
                    <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                    // className={style.gridSty}
                    // style={{justifyContent: "center"}}
                    > 
                        <Grid item xs={12} md={4}> 
                            <TextField
                                name="FixedElementsSILimit"
                                id="FixedElementsSILimit"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                placeholder="Fixed elements SI limit"
                                label="Fixed elements SI limit"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}> 
                            <TextField
                                name="CompanyShare"
                                id="CompanyShare"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                // placeholder="Company share"
                                label="Company share"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>

                        
                        <Grid item xs={12} md={4}> 
                            <TextField
                                name="TheEmployee'sShareOfSI"
                                id="sShareOfSI"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                // placeholder="The employee's share of SI"
                                label="The employee's share of SI"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>
                    </Grid>

                    {/* <Grid item xs={12}  md={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                    // className={style.gridSty}
                    // style={{justifyContent: "center"}}
                    > 
                        <Grid item xs={12} md={4}> 
                            <TextField
                                name="CompanyShare"
                                id="CompanyShare"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                // placeholder="Company share"
                                label="Company share"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}> 
                            <TextField
                                name="TheEmployee'sShareOfSI"
                                id="sShareOfSI"
                                //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                                //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                                // placeholder="The employee's share of SI"
                                label="The employee's share of SI"
                                // required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={vacationDesAR}
                                onChange={(e) => setVacationDesAR(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>
                    </Grid> */}

                </Grid>
        </Grid>
    </Box>




{/* //////////////////////////////// */}


            {/* <Grid
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
                    //   placeholder={intl.formatMessage(messages.vacationDescriptionAr) }
                    //   label={intl.formatMessage(messages.vacationDescriptionAr)}
                    placeholder="vacationDescriptionAr"
                      label="vacationDescriptionAr"
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
                    //   placeholder={intl.formatMessage(messages.vacationDescriptionEN) }
                    //   label={intl.formatMessage(messages.vacationDescriptionEN)}
                    placeholder="vacationDescriptionEN"
                      label="vacationDescriptionEN"
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
                            // placeholder={intl.formatMessage(messages.Elements) }
                            // label={intl.formatMessage(messages.Elements)}
                            placeholder="Elements"
                            label="Elements"
                            />
                          )}
                        />
              
                  </Grid>
                
              </Grid>

            </Grid> */}


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

BranchSalarySetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BranchSalarySetting); 
