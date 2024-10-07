import {
    Autocomplete, Button, Grid, TextField, TextareaAutosize
  } from '@mui/material';
  import notif from 'enl-api/ui/notifMessage';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState, useRef } from 'react';
  import { toast } from 'react-hot-toast';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import { useHistory, useLocation } from 'react-router-dom';
  import PayRollLoader from '../../../Component/PayRollLoader';
  import SaveButton from '../../../Component/SaveButton';
  import GeneralListApis from '../../../api/GeneralListApis';
  import { ServerURL } from '../../../api/ServerConfig';
  import { getFormData } from '../../../helpers';
  import payrollMessages from '../../../messages';
  import api from '../../api/EmployeeInvestigationData';
  import messages from '../../messages';
  import style from "../../../../../../styles/styles.scss";
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
  import useStyles from '../../../Style';
  import { useReactToPrint } from 'react-to-print';
  import EmployeeInvestigationPrint from './PrintTemplate/EmployeeInvestigationPrint';
  import AttachFileIcon from '@mui/icons-material/AttachFile';
  import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
  import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
  import IconButton from '@mui/material/IconButton';
  import Tooltip from '@mui/material/Tooltip';
  import FileViewerPopup from "../../../../../../components/Popup/fileViewerPopup";
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs';
  
  function EmployeeInvestigationCreate(props) {
    const { intl } = props;
    const { classes } = useStyles();
    const pageTitle = localStorage.getItem('MenuName');
  
    const locale = useSelector((state) => state.language.locale);
    const location = useLocation();
  
    const id = location.state?.id ?? 0;
  
    const history = useHistory();
  
    const [isLoading, setIsLoading] = useState(true);
  
    const [printData, setPrintData] = useState({});
    const printDivRef = useRef(null);

    const [employeeList, setEmployeeList] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const [validImageTypes, setValidImageTypes] = useState([
      "image/jpg",
      "jpg",
      "image/jpeg",
      "jpeg",
      "image/png",
      "png",
      "image/apng",
      "apng",
      "image/webp",
      "webp",
      "image/svg+xml",
      "svg+xml",
    ]);
    const [validPDFTypes, setValidPDFTypes] = useState([
      "application/pdf",
      ".pdf",
      "pdf",
    ]);
  
    const [DateError, setDateError] = useState({});
    const [queCounter, setQueCounter] = useState(0);
    const [queCounterVals, setQueCounterVals] = useState(0);
    const [queAndAns, setQueAndAns] = useState({});
    const [openParentPopup, setOpenParentPopup] = useState(false);
    const [formInfo, setFormInfo] = useState({
      id,
      date: "",
      investigator: "",
      employee: "",
      incidentDate: "",
      incident: "",
      InvestigationResult: '',
      Question: "",
      Answer: "",
      uploadedFile: null
    });

    

    
  
    const fetchNeededData = async () => {
      setIsLoading(true);
  
      try {

        const employees = await GeneralListApis(locale).GetEmployeeList();
        setEmployeeList(employees || []);

      } catch (err) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNeededData();
    }, []);
  
    const onFormSubmit = async (evt) => {
      evt.preventDefault();

     // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }
  
      let queAndAnsArr = []
      let queAndAnsKeys = []

      const data = {
        id: formInfo.id,
        trxDate: formInfo.date,
        incidentDate: formInfo.incidentDate,
        investigatorId: formInfo.investigator.length !== 0 ? formInfo.investigator.id : "",
        employeeId: formInfo.employee.id,
        Incident: formInfo.incident,
        InvestigationResult: formInfo.InvestigationResult,
        uploadedFile: uploadedFile,
        details: []
      }

      // add first question and answer
      queAndAnsArr.push({
        id: 0,
        question: formInfo.Question,
        answer: formInfo.Answer,
      })
      

      // add rest of questions and answers
      Object.keys(queAndAns).map((item,index)=>{

        queAndAnsKeys = Object.keys(queAndAns[item])

        queAndAnsArr.push({
          id: 0,
          question: queAndAns[item][queAndAnsKeys[0]],
          answer: queAndAns[item][queAndAnsKeys[1]],
        })
        
      })


      data.details = queAndAnsArr

      setIsLoading(true);
  
      try {
        await api(locale).save(getFormData(data));
  
        toast.success(notif.saved);
        history.push('/app/Pages/HR/EmpInvestigation');
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    const onInputChange = (evt) => {
      setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
    };
  
    const onCancelBtnClick = () => {
      history.push('/app/Pages/HR/EmpInvestigation');
    };


    const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;



    const removeQueFun = (que,ans) => {
      const newObject = { ...queAndAns };
      delete newObject[que];
      setQueAndAns(newObject)
    }


    const onBeforeGetContent = () => {
      setIsLoading(true);
    };
  
    const onAfterPrint = () => {
      setIsLoading(false);

      setPrintData([])
    };
  
    const onPrintError = () => {
      setIsLoading(false);
    };


    const printJS = useReactToPrint({
      content: () => printDivRef?.current,
      onBeforeGetContent,
      onAfterPrint,
      onPrintError,
      documentTitle: intl.formatMessage(messages.EmpInvestigation),
    });


    const onPrintClick = async (type) => {
      setPrintData({
        formInfo: formInfo,
        queAndAns
      })
    };



    useEffect(()=>{
      if(Object.keys(printData).length !== 0)
      {
        printJS();
      }
    },[printData])





    const getEditdata =  async () => {
      setIsLoading(true);

      try {
        const data =  await api(locale).getById(id,locale);

        setFormInfo((prevState) => ({
          ...prevState, 
          date: data.trxDate ? data.trxDate : null,
          investigator: (data && data.investigatorId ? employeeList.find((item)=> item.id === data.investigatorId) : ""),
          employee: (data && data.employeeId ? employeeList.find((item)=> item.id === data.employeeId) : ""),
          incidentDate: data.incidentDate ? data.incidentDate : null,
          incident: data.incident ? data.incident : null,
          InvestigationResult: data.investigationResult ? data.investigationResult : null,
          Question: data.details.length !== 0 ? data.details[0].question : "",
          Answer: data.details.length !== 0 ? data.details[0].answer : "",
        }))

        setQueCounter(data.details.length > 1 ? data.details.length - 1 : 0)
        setQueCounterVals(data.details.length > 1 ? data.details.length - 1 : 0)

        if(data.details.length > 1)
        {
          data.details.map((item,index) =>{

            if(index !== 0)
              {
                setQueAndAns((prev)=>({
                  ...prev,
                  [`queAndAns${index }`] : {
                    [`que${index}`] : item.question ? item.question : "",
                    [`ans${index}`] : item.answer ? item.answer : "",
                  }         
                }))
              }

          })
          
        }

        setUploadedFile(
          data && data.docName ? ` ${ServerURL}${data.docName} ` : ""
        );
        setUploadedFileType(
          data && data.docName
            ? ` ${ServerURL}${data.docName} `
                .split(/[#?]/)[0]
                .split(".")
                .pop()
                .trim()
            : null
        );
        
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    
    };


    useEffect(() => {
      if(id !== 0 && employeeList.length !== 0)
      {
        getEditdata()
      }
      }, [id,employeeList]);



      const uploadFileFun = (e) => {
        // check if uploaded file is larger than 1MB
        if (e.target.files[0]) {
          if (e.target.files[0].size < 10000000) {
            if (validImageTypes.includes(e.target.files[0].type)) {
              setUploadedFileType(e.target.files[0].type);
            } else if (validPDFTypes.includes(e.target.files[0].type)) {
              setUploadedFileType(e.target.files[0].type);
            }
    
            setUploadedFile(e.target.files[0]);
          } else {
            toast.error(intl.formatMessage(messages.uploadFileErrorMes));
          }
        }
      };


      const handleClickOpen = (item) => {
        setOpenParentPopup(true);
      };
    
      const handleClose = () => {
        setOpenParentPopup(false);
      };

    return (
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={3} direction='row' >
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        name='date'
                        label={intl.formatMessage(messages.date)}
                        value={formInfo.date ? dayjs(formInfo.date) : null}
                        onChange={(date) => {
                        setFormInfo((prev) => ({
                            ...prev,
                            date: date !== null ? date : null,
                            }));
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
                             ...(Object.values(DateError).includes(true) && { helperText: intl.formatMessage(payrollMessages.DateNotValid) }) 
                            },
                          }}
                      />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={9}>
                <Grid container spacing={3} justifyContent="end">
                  <Grid item>
                    <Tooltip title={intl.formatMessage(messages.Attachment)} >
                      <IconButton component="label">
                        <AttachFileIcon />
                        <input
                          type="file"
                          name="file"
                          className={`custom-file-input ${style.uploadBtnSty}`}
                          id="inputGroupFile"
                          onChange={(e) => {
                            uploadFileFun(e);
                          }}
                          accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml, application/pdf, .pdf"
                        />
                      
                      </IconButton>
                    </Tooltip>
                  </Grid>
             
                  <Grid item>
                    <Tooltip title={intl.formatMessage(payrollMessages.Print)} >
                      <IconButton onClick={onPrintClick}>
                        <LocalPrintshopIcon 
                          
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  {validImageTypes.includes(uploadedFileType) || validPDFTypes.includes(uploadedFileType) ? 
                  (
                    <Grid item>
                      <Tooltip title={intl.formatMessage(payrollMessages.viewAttachment)} >
                        <IconButton onClick={handleClickOpen}>
                          <InsertPhotoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  ) : null}
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
            <Grid item xs={12} md={3}>
                <Autocomplete
                        options={employeeList.filter(user => user.id !== formInfo.employee?.id)}
                        value={getAutoCompleteValue(employeeList, formInfo.investigator?.id)}
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                            {option.name}
                        </li>
                        )}
                        onChange={(event,value) => {
                            setFormInfo((prev) => ({
                            ...prev,
                            investigator: value !== null ? value : null,
                            }));
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label={intl.formatMessage(messages.investigatorName)}
                        />
                        )}
                    />
              </Grid>
              <Grid item xs={12} md={3}>
                <Autocomplete
                        options={employeeList.filter(user => user.id !== formInfo.investigator?.id)}
                        value={getAutoCompleteValue(employeeList, formInfo.employee?.id)}
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                            {option.name}
                        </li>
                        )}
                        onChange={(event, value) => {
                            setFormInfo((prev) => ({
                            ...prev,
                            employee: value !== null ? value : null,
                            }));
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label={intl.formatMessage(messages.employeeName)}
                        />
                        )}
                    />
              </Grid>
            </Grid>
            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        name='incidentDate'
                       label={intl.formatMessage(messages.incidentDate)}
                        value={formInfo.incidentDate ? dayjs(formInfo.incidentDate) : null}
                        onChange={(date) => {
                        setFormInfo((prev) => ({
                            ...prev,
                            incidentDate: date !== null ? date : null,
                            }));
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`incidentDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`incidentDate`]: false
                            }))
                        }
                      }}
                       slotProps={{
                          textField: {
                             ...(Object.values(DateError).includes(true) && { helperText: intl.formatMessage(payrollMessages.DateNotValid) }) 
                            },
                          }}
                      />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={11}>
                    <TextField
                    name='incident'
                    value={formInfo.incident}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.incident)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                    multiline
                    rows={1}
                    />
              </Grid>
            </Grid>
            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
                <Grid item xs={5} md={4}>
                  <TextField
                    name='Question'
                    value={formInfo.Question}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.Question)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid>
                <Grid item xs={5} md={7}>
                  <TextareaAutosize
                  name='Answer'
                  value={formInfo.Answer}
                   onChange={onInputChange}
                    maxRows={2}
                    placeholder={intl.formatMessage(messages.Answer)}
                    className={`${style.investigationAnswer} ${classes.textareaSty}`}
                    autoComplete='off'
                  />
              </Grid>
              <Grid item xs={2} md={1}  
              container
              spacing={0}
              direction="column"
              justifyContent="center"
              >
                    <AddCircleOutlineIcon 
                      className={`${style.addIconSty} ${classes.colorSty}`}
                      onClick={()=>{
                        setQueCounter(queCounter + 1)
                        setQueCounterVals(queCounterVals + 1)
                        setQueAndAns((prev)=>({
                          ...prev,
                          [`queAndAns${queCounterVals + 1}`] : {
                            [`que${queCounterVals + 1}`] : "",
                            [`ans${queCounterVals + 1}`] : "",
                          }
                        }))
                      }}
                      />
              </Grid>
            </Grid>


            { queAndAns && queAndAns.length !== 0 ? 
              (
               
                Object.keys(queAndAns).map((que,index)=>{
                  
                 return <Grid container spacing={3} direction='row' style={{marginTop: "0"}} key={index}>
                          <Grid item xs={5} md={4}>
                            <TextField
                              name='Question'
                              value={queAndAns[que][Object.keys(queAndAns[que])[0]]}
                              onChange={(e)=>{
                                setQueAndAns((prev)=>({
                                  ...prev,
                                    [que] : {
                                      ...prev[`${que}`],
                                      [`${Object.keys(queAndAns[que])[0]}`]: e.target.value
                                    }
                                }))
                              }}
                              label={intl.formatMessage(messages.Question)}
                              fullWidth
                              variant='outlined'
                              autoComplete='off'
                            />
                          </Grid>
                          <Grid item xs={5} md={7}>
                            <TextareaAutosize
                              value={queAndAns[que][Object.keys(queAndAns[que])[1]]}
                              maxRows={2}
                              placeholder={intl.formatMessage(messages.Answer)}
                              className={`${style.investigationAnswer} ${classes.textareaSty}`}
                              onChange={(e)=>{
                                setQueAndAns((prev)=>({
                                  ...prev,
                                  [que] : {
                                    ...prev[`${que}`],
                                    [`${Object.keys(queAndAns[que])[1]}`]: e.target.value
                                  }
                                }))
                              }}
                              autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={2} md={1}  
                        container
                        spacing={0}
                        direction="column"
                        justifyContent="center"
                        >
                          <RemoveCircleOutlineIcon 
                            className={`${style.addIconSty} ${classes.colorSty}`}
                            onClick={()=>{
                              setQueCounter(queCounter - 1)
                              removeQueFun(que)
                            }}
                            />
                        </Grid>
                    </Grid>
                  
                })
              ) : null
            }


            <Grid container spacing={3} direction='row' style={{marginTop: "0"}}>
              <Grid item xs={11}>
                <TextField
                  name='InvestigationResult'
                  value={formInfo.InvestigationResult}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.investigationResult)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                  multiline
                  rows={1}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <SaveButton Id={id} />
                  </Grid>
  
                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                      onClick={onCancelBtnClick}
                    >
                      <FormattedMessage {...payrollMessages.cancel} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>



      <EmployeeInvestigationPrint 
        printDivRef={printDivRef} 
        data={printData}
      />


      <FileViewerPopup
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
      />



      </PayRollLoader>
    );
  }
  
  EmployeeInvestigationCreate.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(EmployeeInvestigationCreate);
  