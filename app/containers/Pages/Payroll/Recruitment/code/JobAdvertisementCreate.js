import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { EditTable } from '../../../../Tables/demos';
import AlertPopup from '../../Component/AlertPopup';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api, { tableData } from '../api/JobAdvertisementData';
import messages from '../messages';
import QuesAndAnsPopup from '../../Component/QuesAndAnsPopup';
import JobAdvertisementCards from '../components/JobAdvertisementCards/JobAdvertisementCards';
import Styles from '../../../../../styles/styles.scss';
import SITEMAP from '../../../../App/routes/sitemap';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function JobAdvertisementCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const dataTable = useSelector((state) => state.crudTableDemo.dataTable);
  const id = location.state?.id ?? 0;
  const { isCopy } = location.state ?? false;

  const employmentComments = location.state?.employmentComments ?? '';
  const employmentId = location.state?.employmentId ?? 0;

  const title = localStorage.getItem('MenuName');

  const [dateError, setDateError] = useState({});
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [jobList, setJobList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState('');

  const [formInfo, setFormInfo] = useState({
    id,

    jobId: '',
    expireDate: null,
    jobAdvertisementCode: '',
    jobDescription: '',
    experiance: '',
    organizationId: '',
    OrganizationIds: [],
    recJobRequirement: [],

    employmentComments,
    employmentId,
  });

  const [quesPopupData, setQuesPopupData] = useState({});
  const [quesPopupEditData, setQuesPopupEditData] = useState({});
  const [quesPopupEditcardName, setQuesPopupEditcardName] = useState("");

  const [open, setOpen] = useState(false);

  const save = async () => {
    setIsLoading(true);

    const formData = {
      ...formInfo,
      expireDate: formateDate(formInfo.expireDate),
    };

    formData.recJobRequirement = dataTable.map((item) => ({
      description: item.description,
      jobAdvertisementId: id,
      id: item.index,
    }));

let recQuestions = []
let Question = {}
let Answer = {}
let recAdvAnswer = []
let checkboxObject = []

Object.keys(quesPopupData).map((item)=>{

  Answer = {}

  Question = {
    enName: quesPopupData[item].formData.Question1,
    arName: quesPopupData[item].formData.Question1,
  }

  Answer = {
    enName: quesPopupData[item].formData.Answer1,
    arName: quesPopupData[item].formData.Answer1,
    isCorrect: quesPopupData[item].formData.Answer1Checkbox,
  }

  if(quesPopupData[item].answerIds)
  {

    Question.id = quesPopupData[item].formData.queId
    Answer.id = quesPopupData[item].formData.ansId
    
  }


  recAdvAnswer.push(Answer)
  


if(quesPopupData[item] && quesPopupData[item].quesAns)
{
  if(quesPopupData[item].quesAns.queAns1)
  {

    checkboxObject = Object.keys(quesPopupData[item].quesAns.que1AnswersCheckbox)
    

    

    Object.keys(quesPopupData[item].quesAns.queAns1).map((ans,index)=>{

      Answer = {}

      Answer = {
        enName: quesPopupData[item].quesAns.queAns1[ans],
        arName: quesPopupData[item].quesAns.queAns1[ans],
        isCorrect: quesPopupData[item].quesAns.que1AnswersCheckbox[checkboxObject[index]],
      }


      if(quesPopupData[item].answerIds)
        {
          Answer.id = quesPopupData[item].answerIds[`${ans}Id`]
          
        }

      recAdvAnswer.push(Answer)
      
      
    })
   
    
  }

}

Question.recAdvAnswer = recAdvAnswer


recQuestions.push(Question)
recAdvAnswer = []

  
})

    formData.recQuestions = recQuestions
    formData.organizationId = formInfo.OrganizationIds.length !== 0 ? formInfo.OrganizationIds[0].id : ""
    formData.OrganizationIds =  formData.OrganizationIds.length !== 0 ? `,${formData.OrganizationIds.map((item) => item.id).join(",")},` : ""

    if(isCopy)
    {
      formData.id = 0
    }


    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.JobAdvertisement.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    try {
      const response = await api(locale).CheckManPower(
        formInfo.OrganizationIds.length !== 0 ? formInfo.OrganizationIds[0].id : "",
        formInfo.jobId
      );
      if (response) {
        setOpenParentPopup(true);
        setIsLoading(false);
        setConfirmMessage(response);
      } else {
        save();
      }
    } catch (error) {
      //
    }
  };


  const getEditDataFun = async () => {

    let cards = {}

      const dataApi = await api(locale).GetById(id);

    const branches = dataApi.organizationIds ? dataApi.organizationIds.slice(1, -1).split(',').map((orgId) => {
    const branch = organizationList.find((item) => item.id == orgId);

      return branch;

    }) : [];

      setFormInfo((prev) => ({
        ...prev,
        experiance: dataApi.experiance,
        expireDate: dataApi.expireDate,
        jobId: dataApi.jobId,
        jobAdvertisementCode: dataApi.jobAdvertisementCode,
        jobDescription: dataApi.jobDescription,
        recJobRequirement: dataApi.recJobRequirement,
        organizationId: dataApi.organizationId,
        OrganizationIds: branches.length !== 0 ? branches : [],
      }));

      let answers = {}
      let answersCheckboxs = {}
      let answersIdsVals = {}

      dataApi.recQuestions.map((item,index)=>{

        item.recAdvAnswer.map((item2,index)=>{
          
          if(index !== 0)
          {
            answers[`ans${index + 1}`] =  item2.enName
            

            answersCheckboxs[`ans${index + 1}Checkbox`] = item2.isCorrect

            answersIdsVals[`ans${index + 1}Id`] = item2.id
            
          }
        })

        cards[`cardData${index + 1}`] = {
            formData: {
              Answer1: item.recAdvAnswer[0].enName,
              Answer1Checkbox: item.recAdvAnswer[0].isCorrect,
              Question1: item.enName,
              queId: item.id,
              ansId: item.recAdvAnswer[0].id,
            },
            quesAns:{
              queAns1: answers,
              que1AnswersCheckbox: answersCheckboxs,
            },
            answerIds: answersIdsVals
          }

          answers = {}
          answersCheckboxs = {}
          answersIdsVals = {}
        
      })

     setQuesPopupData(cards)
     
  }


  useEffect(()=>{
    if(id !== 0 && jobList.length !== 0 && organizationList.length !== 0)
    {
      getEditDataFun()
    }
  },[id,jobList,organizationList])

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const jobs = await api(locale).GetJobList();
      setJobList(jobs);

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onJobAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      jobId: value !== null ? value.id : null,
      jobAdvertisementCode: value !== null ? value.id : null,
    }));

    if (id === 0 && value !== null) {
      setFormInfo((prev) => ({
        ...prev,
        jobDescription: value?.jobDescription.join('\n'),
      }));
    }
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.recruitment.JobAdvertisement.route);
  };

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'description',
      label: 'requirements',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },

    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  const handleClose = () => {
    setOpenParentPopup(false);
  };


const openQuesPopup = () => {
  setOpen(true);
}

const closeQuesPopup = () => {
  setQuesPopupEditcardName("")
  setOpen(false);
}


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={confirmMessage}
        callFun={save}
      />

      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' desc='' title={title}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Autocomplete
                options={jobList}
                value={
                  jobList.find((item) => item.id === formInfo.jobId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onJobAutoCompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.jobName)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <TextField
                name='jobAdvertisementCode'
                onChange={onInputChange}
                value={formInfo.jobAdvertisementCode}
                label={intl.formatMessage(messages.jobCode)}
                className={classes.field}
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.expireDate)}
                  value={
                    formInfo.expireDate ? dayjs(formInfo.expireDate) : null
                  }
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'expireDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      expireDate: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                name='experiance'
                value={formInfo.experiance}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.experience)}
                className={classes.field}
                variant='outlined'
                required
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6.5} >
              <Autocomplete
                multiple  
                className={`${Styles.AutocompleteMulSty} ${locale !== "en" ?  Styles.AutocompleteMulStyAR : null}`}
                value={formInfo.OrganizationIds}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={organizationList.length != 0 ? organizationList: []}
                disableCloseOnSelect
                getOptionLabel={(option) =>(
                  option  ? option.name : ""
                )}
                onChange={(event, value) => {
                    setFormInfo((prev) => ({
                      ...prev,
                      OrganizationIds: value !== null ? value : [],
                    }));
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} 
                  label={intl.formatMessage(messages.organization)}
                  required={formInfo.OrganizationIds.length === 0}
                  
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6.5}>
              <TextField
                name='jobDescription'
                value={formInfo.jobDescription}
                onChange={onInputChange}
                label={intl.formatMessage(messages.description)}
                className={classes.field}
                variant='outlined'
                required
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              
              {Object.keys(quesPopupData).length !== 0 ? (
                <p className={Styles.cardsTitle}>{intl.formatMessage(messages.questionsCardsTitle)}</p>
                
              ): null}

              <JobAdvertisementCards 
                quesPopupData={quesPopupData}
                setQuesPopupData={setQuesPopupData}
                setQuesPopupEditData={setQuesPopupEditData}
                setQuesPopupEditcardName={setQuesPopupEditcardName}
                openQuesPopup={openQuesPopup}
                setPopupType={setPopupType}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item >
                  <SaveButton Id={id} processing={isLoading} />
                </Grid>

                <Grid item >
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Grid>

                <Grid item >
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={()=>{
                      setPopupType("create")
                      openQuesPopup()
                    }}
                  >
                    <FormattedMessage {...messages.createQuestion} />
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>

        <EditTable
          anchorTable={anchorTable}
          title={`${id}/${formInfo.jobId || 0}/${locale}`}
          API={tableData(`${id}/${formInfo.jobId || 0}/${locale}`)}
          IsNotSave={true}
        />
        


        <QuesAndAnsPopup 
          open={open}
          handleClose={closeQuesPopup}
          setQuesPopupData={setQuesPopupData}
          quesPopupData={quesPopupData}
          quesPopupEditData={quesPopupEditData}
          quesPopupEditcardName={quesPopupEditcardName}
          setQuesPopupEditcardName={setQuesPopupEditcardName}
          setPopupType={setPopupType}
          popupType={popupType}
        />
      </form>
    </PayRollLoaderInForms>
  );
}

JobAdvertisementCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobAdvertisementCreate);
