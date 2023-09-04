import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EmployeeDocumentsData from '../api/EmployeeDocumentsData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/Styles.scss'
import { useHistory , useLocation  } from 'react-router-dom';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {FormControl, Tooltip, Card ,CardContent} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import FileViewerPopup  from '../../../../../components/Popup/fileViewerPopup';
import printJS from "print-js";
import { format } from "date-fns";
import {ServerURL} from '../../api/ServerConfig';






function CreateAndEditEmployeeDocuments(props) {
  const [id, setid] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [followDate, setFollowDate] = useState(null);
  const [note, setNote] = useState('');
  const [isPaperCopy, setIsPaperCopy] = useState(false);   
  const [validImageTypes ,setValidImageTypes] = useState([
    "image/jpg" ,
    "jpg" ,
    "image/jpeg", 
    "jpeg", 
    "image/png", 
    "png", 
    "image/apng", 
    "apng", 
    "image/webp" , 
    "webp" , 
    "image/svg+xml",
    "svg+xml"
  ])
  const [validPDFTypes ,setValidPDFTypes] = useState([ "application/pdf", ".pdf", "pdf"])
  const [document ,setDocument] = useState('')
  const [submitting ,setSubmitting] = useState(false)
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const history= useHistory(); 
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [documentsList, setDocumentsList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [employeeName, setEmployeeName] = useState([]);
  const { state } = useLocation()
  const  ID  = state?.id
  const  employeeID  = state?.employeeId
  const { intl } = props;
  const { classes, cx } = useStyles();




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setProcessing(true)
    const data = {
      id: id,
      employeeId: employeeID,
      documentId: document.id ? document.id : "",
      documentUrl: "",
      isPaperCopy: isPaperCopy,
      startDate: startDate,
      endDate: endDate,
      followDate: followDate,
      notes: note.length !== 0 ? note : "",
      Image: uploadedFile && uploadedFile instanceof File ? uploadedFile : null
    };



    try {
      let response = await EmployeeDocumentsData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Employee/EmployeeDocuments` ,  { employeeId: employeeID });
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

  const documentsData = await GeneralListApis(locale).GetDocumentList(locale);   
  const employees = await GeneralListApis(locale).GetEmployeeDataList(locale);  

  setDocumentsList(documentsData)
  setEmployeeName(employees.length !== 0 && employeeID ? employees.find((item)=> item.id === employeeID)?.name.split("-").pop() : "")
};


const getEditdata =  async () => {

  const data =  await EmployeeDocumentsData().GetDataById(ID,locale);
   


  setid(data ? data.id : "")
  setStartDate(data ? data.startDate : null) 
  setEndDate(data ? data.endDate : null)
  setFollowDate(data ? data.followDate : null) 
  setNote(data && data.notes ? data.notes : "") 
  setIsPaperCopy(data ? data.isPaperCopy : false)
  setDocument(data && data.documentId ? documentsList.find((item)=> item.id === data.documentId) : "")
  setUploadedFile(data && data.documentUrl ? ` ${ServerURL}${data.documentUrl} ` : "")
  setUploadedFileType(data && data.documentUrl ? ` ${ServerURL}${data.documentUrl} `.split(/[#?]/)[0].split('.').pop().trim() : null)


};



useEffect(() => {
  getdata();
}, []);

// used to get data by id to edit it  
useEffect(() => {
  if(ID && documentsList.length !== 0)
  {
    getEditdata()
  }
  }, [ID,documentsList]);


  // used to pass employeeId if user click browser back button
  useEffect(()=>{
     history.listen(() => {
        if (history.action === 'POP') 
        {
          history.push(`/app/Pages/Employee/EmployeeDocuments` , { employeeId: employeeID });
        }
      })
  },[])


  function oncancel(){
    history.push(`/app/Pages/Employee/EmployeeDocuments` ,  { employeeId: employeeID });
  }


  const uploadFileFun = (e) => {

    // check if uploaded file is larger than 1MB
    if(e.target.files[0])
    {
      if(e.target.files[0].size < 10000000)
      {
        if (validImageTypes.includes(e.target.files[0].type)) 
        {
          setUploadedFileType(e.target.files[0].type)
        }
        else if(validPDFTypes.includes(e.target.files[0].type))
        {
          setUploadedFileType(e.target.files[0].type)
        }

      setUploadedFile(e.target.files[0])
      }
      else
      {
        toast.error( intl.formatMessage(messages.uploadFileErrorMes));
      }
    }
  }

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
};

const handleClose = () => {
    setOpenParentPopup(false);
};


 const printFun = () => {
  printJS({
    printable: uploadedFile && uploadedFile instanceof File ?   URL.createObjectURL(uploadedFile) : uploadedFile, 
    type: validImageTypes.includes( uploadedFileType ) ? "image" : validPDFTypes.includes( uploadedFileType ) ? "pdf" : ""})
 }



  return (
    <div>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                       `${intl.formatMessage(messages.EditEmployeeDocument)}: ${employeeName}`
                    : `${intl.formatMessage(messages.CreateEmployeeDocument)}: ${employeeName}`
                 } 
          desc={""}>

            <form onSubmit={handleSubmit}>

            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                   <Grid item xs={12}  md={8}
                   container
                   spacing={3}
                   alignItems="flex-start"
                   direction="row"
                   >


                      <Grid item xs={12}  md={12}
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        className={style.container}
                        > 

                        <Grid item xs={12}  md={4}> 
                          <Autocomplete
                                id="ddlMenu"   
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={document.length != 0 && document !== null ? document : null}                       
                                options={documentsList.length != 0 ? documentsList: []}
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
                                      setDocument(value);
                                    } else {
                                      setDocument("");
                                    }
                                }}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="documentType"
                                    label={intl.formatMessage(messages.documentType) }
                                    margin="normal" 
                                    className={style.fieldsSty}
                                    required
                                    />
                                    
                                )}
                            />
                          </Grid>

                          <Grid item xs={12}  md={4}> 
                          <FormControlLabel  
                              control={ 
                                <Switch  
                                checked={isPaperCopy} 
                                onChange={() => 
                                  setIsPaperCopy(!isPaperCopy)
                                }
                                color="primary" 
                                className={style.BtnSty}
                                />} 
                              label={intl.formatMessage(messages.HardCopy) }
                              /> 

                            </Grid>
                        </Grid>



                  <Grid item xs={12}  md={12} > 
                  <Card className={classes.card}>
                    <CardContent>
                    <Grid item xs={12}  md={12} 
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row">
                    <Grid item xs={12}  md={3}> 
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label={intl.formatMessage(messages.startDate)}
                                value={startDate}
                                onChange={(date) => { setStartDate( format(new Date(date), "yyyy-MM-dd"))}}
                                className={classes.field}
                                renderInput={(params) => <TextField {...params} variant="outlined" required />}
                            />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12}  md={3}> 
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label={intl.formatMessage(messages.endDate)}
                                value={endDate}
                                onChange={(date) => { setEndDate( format(new Date(date), "yyyy-MM-dd"))}}
                                className={classes.field}
                                renderInput={(params) => <TextField {...params} variant="outlined" required />}
                            />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12}  md={3}> 
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label={intl.formatMessage(messages.followDate)}
                                value={followDate}
                                onChange={(date) => { setFollowDate( format(new Date(date), "yyyy-MM-dd"))}}
                                className={classes.field}
                                renderInput={(params) => <TextField {...params} variant="outlined" required />}
                            />
                        </LocalizationProvider>
                      </Grid>
                      </Grid>
                      </CardContent>
                    </Card>
                    </Grid>

                     
                      <Grid item xs={12}  md={9}> 
                          <TextField
                          name="note"
                          id="note"
                          placeholder={intl.formatMessage(messages.notes) }
                          label={intl.formatMessage(messages.notes) }
                          className={`${classes.field} ${style.fieldsSty}`}
                          margin="normal"
                          variant="outlined"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12}  md={12}
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                        >
                          <Grid item xs={12}  md={12}> 
                        
                              <FormControl variant="standard" >
                                <div className={classes.actions}>     
                                  <Tooltip title= "Upload">
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      className={style.BtnSty}
                                      component="label"
                                    >
                                      <AddIcon
                                        className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                                      />
                                      <FormattedMessage {...Payrollmessages.Upload} />
                                      <input 
                                        type="file" 
                                        name="file" 
                                        className={`custom-file-input ${style.uploadBtnSty}`} 
                                        id="inputGroupFile" 
                                        onChange={(e) => { 
                                            uploadFileFun(e)
                                        }} 
                                        accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml, application/pdf, .pdf"
                                        required={isPaperCopy  ?  false
                                          :
                                            uploadedFile !== null ? false :true
                                        }
                                      />
                                  </Button>
                                  </Tooltip>
                                </div>
                              </FormControl>   
                            
                              <Button variant="contained" size="medium" color="primary" className={style.printBtnSty}
                              disabled={!uploadedFile}
                                onClick={()=>printFun()}
                                >
                                  <FormattedMessage {...Payrollmessages.Print} /> 
                                </Button>  

                                        
                          </Grid>
                        </Grid>

                   
                        <Grid item xs={12} md={12}></Grid>
                        <Grid item xs={12} md={12}>                  
                            <Button variant="contained" type="submit" size="medium" color="primary"  disabled={submitting || processing} className={style.BtnSty}>
                            {processing && (
                              <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                            )}
                              <FormattedMessage {...Payrollmessages.save} /> 
                            </Button>

                            <Button variant="contained" size="medium" color="primary" className={style.BtnSty}
                            onClick={oncancel}
                            >
                              <FormattedMessage {...Payrollmessages.cancel} /> 
                            </Button>
                        </Grid>
                  </Grid>

                  <Grid item xs={12}  md={4}
                  container
                  spacing={3}
                  alignItems="flex-end"
                  className={style.imgContainer}
                   onClick={()=>{ 
                    if(uploadedFile)
                    {
                      handleClickOpen()
                    }
                  }}
                  >
                    { validImageTypes.includes( uploadedFileType ) ? 
                        <img  src={uploadedFile && uploadedFile instanceof File ?   URL.createObjectURL(uploadedFile) : uploadedFile}  /> 
                    :  validPDFTypes.includes( uploadedFileType ) ? 
                        <object
                        data={uploadedFile !== null && uploadedFile instanceof File ? URL.createObjectURL(uploadedFile) : uploadedFile}
                        type="application/pdf"
                        width="330"
                        height="230"
                      >
                        </object>

                      : null
                    }
      
                  </Grid>

                </Grid>

          </form>
      </PapperBlock>         

     

      <FileViewerPopup  
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
      />

    </div>
  );
}

CreateAndEditEmployeeDocuments.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditEmployeeDocuments);
