import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import style from "../../../../styles/styles.scss";
import { FormattedMessage, injectIntl } from 'react-intl';
import useStyles from '../Style';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import messages from '../Recruitment/messages';
import payrollMessages from '../messages';
import styles from '../../../../styles/styles.scss';

  

import {
    Button, Grid, TextField, TextareaAutosize
  } from '@mui/material';

 const QuesAndAnsPopup = ({
    open,
    handleClose,
    setQuesPopupData,
    quesPopupData,
    quesPopupEditData,
    quesPopupEditcardName,
    setQuesPopupEditcardName,
    popupType,
    intl
}) => {

    const [quesAns, setQuesAns] = useState({});
    const [quesAnsCounterVals, setQuesAnsCounterVals] = useState({
        ques1AnsCounterVals: 1
    });
    const [formData, setFormData] = useState({
      Question1: "",
      Answer1: "",
      Answer1Checkbox: false,
    });
    const { classes } = useStyles();


      const removeAnsFun = (quekey,ansKey,ansCheckboxsKey, answerCheckboxKey,answerIdsKey,answerIdKey) => {
 
        const newObject = { ...quesAns };
        const newEditObject = { ...quesPopupEditData };

        delete newObject[quekey][ansKey];
        delete newObject[ansCheckboxsKey][answerCheckboxKey];

        if(newEditObject[answerIdsKey])
        {
          delete newEditObject[answerIdsKey][answerIdKey];
        }

        setQuesAns(newObject)
        
      }


      const onInputChange = (e) => {


        if(e.target.type === "checkbox")
        {
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
        }
        else
        {
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
        
      };


      const savePopupDataFun = () => {

        if(Object.hasOwn(quesPopupData, quesPopupEditcardName) )
        {
          setQuesPopupData((prev)=>({
            ...prev,
            [`${quesPopupEditcardName}`]:{
              formData,
              quesAns
            }
          }))
        }
        else
        {
          setQuesPopupData((prev)=>({
            ...prev,
            [`cardData${Object.keys(quesPopupData).length + 1}`]:{
              formData,
              quesAns
            }
          }))
        }

        setQuesPopupEditcardName("")
        handleClose()
      }

      const clearFeilds = () => {

        setQuesAns({})
        setQuesAnsCounterVals({ques1AnsCounterVals: 1})
        setFormData({
          Question1: "",
          Answer1: "",
          Answer1Checkbox: false,
        })
      }

      useEffect(()=>{

        if(Object.keys(quesPopupEditData).length !== 0 && popupType === "edit")
        {

          setFormData({
            Question1: quesPopupEditData.formData.Question1,
            Answer1: quesPopupEditData.formData.Answer1,
            Answer1Checkbox: quesPopupEditData.formData.Answer1Checkbox,
          })

          
          setQuesAns(quesPopupEditData.quesAns)
          if(quesPopupEditData.quesAns && quesPopupEditData.quesAns.queAns1)
          {
            setQuesAnsCounterVals({ques1AnsCounterVals: Object.keys(quesPopupEditData.quesAns.queAns1).length + 1 })
          }
        }

        if(popupType === "create")
        {
          clearFeilds()
        }

      },[quesPopupEditData,popupType,open])


  return (
   
      <Dialog
      className={styles.popupContainer}
        open={open}
        onClose={()=>{
          handleClose()
        }}
      >
        <DialogTitle>{intl.formatMessage(messages.createQuestion)}</DialogTitle>

        <DialogContent>
          <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                <Grid item xs={12} lg={10}>
                  <TextField
                    name='Question1'
                    value={formData.Question1}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.Question)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid>
               
                <Grid item xs={5} md={8} lg={8}>
                  <TextareaAutosize
                  name='Answer1'
                  value={formData.Answer1}
                   onChange={onInputChange}
                    maxRows={2}
                    placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid>
              <Grid item xs={1}  
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                >
                    <AddCircleIcon 
                      className={`${style.addIconSty} ${classes.colorSty}`}
                      onClick={()=>{
              
                        setQuesAnsCounterVals((prev)=>({
                            ...prev,
                            ques1AnsCounterVals: quesAnsCounterVals.ques1AnsCounterVals + 1
                        }))
                        setQuesAns((prev)=>({
                            ...prev,
                          queAns1 : {
                            ...prev.queAns1,
                            [`ans${quesAnsCounterVals.ques1AnsCounterVals  + 1}`] : "",
                          },
                          que1AnswersCheckbox: {
                            ...prev.que1AnswersCheckbox,
                            [`ans${quesAnsCounterVals.ques1AnsCounterVals  + 1}Checkbox`] : false,
                          }
                        }))
                       
                      }}
                      />
              </Grid>
              <Grid item xs={6} md={3} lg={3} >
                     <FormControlLabel 
                     control={
                        <Checkbox 
                            name='Answer1Checkbox' 
                            checked={formData.Answer1Checkbox} 
                            onChange={onInputChange} 
                          />} 
                      label={intl.formatMessage(messages.TrueAnswer)} 
                     />
                </Grid>

              {quesAns && quesAns.queAns1 &&  quesAns.queAns1.length !== 0 ? 
              
                Object.keys(quesAns.queAns1).map((ans,index)=>{

                  return <Grid container  spacing={3} direction='row' style={{marginLeft: "0",width:"revert-layer", marginRight:"0"}} key={index}>
                          
                         <Grid item xs={5} md={8}>
                            <TextareaAutosize
                            name='Answer'
                            value={quesAns.queAns1[Object.keys(quesAns.queAns1)[index]]}
                            onChange={(e)=>{
                              
                              setQuesAns((prev)=>({
                                ...prev,
                                  queAns1 : {
                                    ...prev.queAns1,
                                    [`${Object.keys(quesAns.queAns1)[index]}`]: e.target.value
                                  }
                              }))
                            }}
                                maxRows={2}
                                placeholder="Answer"
                                className={`${style.investigationAnswer} ${classes.textareaSty}`}
                                autoComplete='off'
                            />
                        </Grid>

                          <Grid item xs={1} md={1}  
                            container
                            spacing={0}
                            direction="column"
                            justifyContent="center"
                            >
                            <RemoveCircleIcon 
                                className={`${style.addIconSty} ${classes.colorSty}`}
                                onClick={()=>{
                                  removeAnsFun("queAns1",ans,"que1AnswersCheckbox",`ans${index + 2}Checkbox`,"answerIds",`ans${index + 2}Id`)

                                }}
                                />
                          </Grid>

                          <Grid item xs={6} md={3}>
                            <FormControlLabel 
                              control={
                              <Checkbox  
                                checked={quesAns.que1AnswersCheckbox[`ans${index + 2}Checkbox`]} 
                                onChange={(e)=>{
                                  setQuesAns((prev)=>({
                                    ...prev,
                                    que1AnswersCheckbox : {
                                        ...prev.que1AnswersCheckbox,
                                        [`ans${index + 2}Checkbox`]: e.target.checked
                                      }
                                  }))
                                }}
                              />} 
                              label={intl.formatMessage(messages.TrueAnswer)} 
                            />
                        </Grid>
                    </Grid>
              })
              
              : null}

            </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={()=>{
              clearFeilds()
              handleClose()
            }}
            >
              <FormattedMessage {...payrollMessages.cancel} />
          </Button>
          <Button onClick={savePopupDataFun}><FormattedMessage {...payrollMessages.save} /></Button>
        </DialogActions>
      </Dialog>
   
  );
}


export default injectIntl(QuesAndAnsPopup)