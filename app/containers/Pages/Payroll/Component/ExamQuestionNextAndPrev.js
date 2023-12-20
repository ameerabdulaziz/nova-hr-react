import React, { useEffect, useState } from 'react';
import useStyles from '../../Payroll/Style';
import style from '../../../../styles/styles.scss'
import LinearProgress from '@mui/material/LinearProgress';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { TextareaAutosize } from '@mui/base';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';



const ExamQuestionNextAndPrev = () => {


    const { classes } = useStyles();
    const locale = useSelector(state => state.language.locale);
 
    return(
        <Grid item xs={12}  > 
        {/* <Grid item xs={12}  style={!startExam?  {display: 'none'} : {display: 'block'}}>  */}
                    <h1 className={`${classes.textSty} ${style.categorySty} ${locale === "en" ?  style.categoryEnSty : style.categoryArSty}`}>Category</h1>
                        <div className={`${style.examContainer2}`}>
                          
                            <div>
                              <LinearProgress variant="determinate" value={80} />
                              <p>4/5</p>
                              <h1>
                                  Do you think to suggest our company to a friend or parent?
                              </h1>
                              <FormControl style={{width: "100%"}}>
                                  <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // defaultValue="female"
                                      name="radio-buttons-group"
                                     className={style.radioContainer}
                                  >
                                      <FormControlLabel 
                                      value="No" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty} />} />} 
                                      label="No" 
                                      />
                                      
                                      <FormControlLabel 
                                      value="Maybe" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="Maybe" />
                                      
                                      <FormControlLabel 
                                      value="Probably" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="Probably" />

                                      <FormControlLabel 
                                      value="100% Sure" 
                                      control={<Radio checkedIcon={<CheckIcon className={style.checkedIconeSty}/>} icon={<RadioButtonUncheckedIcon className={style.iconeSty}/>} />} 
                                      label="100% Sure" />
                                  </RadioGroup>
                                  </FormControl>

                                  <p>
                                      In no, please describe with few words why
                                  </p>

                                  

                                  <TextareaAutosize
                                    color="neutral"
                                    minRows={3}
                                    placeholder="Type here additional info..."
                                    size="lg"
                                    // style={{width: "100%"}}
                                    
                                />

                                <div></div>

                                <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-end"
                                  direction="row"
                                  
                                  >
                                  
                    
                                    <Grid item xs={12}
                                    container
                                    spacing={3}
                                    alignItems="flex-start"
                                    direction="row"
                                    className={`${style.itemsStyle} ${style.nextPrevBtnSty}`}
                                    justifyContent="end"
                                    >
                                 

                                  <Grid item xs={6} md={3}  lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      // onClick={onCopy}
                                      // disabled={brCode? false : true}
                                    >
                                   {/* <FormattedMessage {...messages.copytoAllBr} /> */}
                                      Prev
                                    </Button>
                                  </Grid>

                                  <Grid item xs={6} md={3} lg={2}>
                                    <Button
                                      variant="contained"
                                      size="medium"
                                      color="primary"
                                      // onClick={onCopy}
                                      // disabled={brCode? false : true}
                                    >
                                      {/* <FormattedMessage {...messages.copytoAllBr} /> */}
                                      Next
                                    </Button>
                                  </Grid>

                                 

                                  </Grid>
                                </Grid>
                            </div>
                        </div>                   
                    </Grid>
    )
}


export default ExamQuestionNextAndPrev;
