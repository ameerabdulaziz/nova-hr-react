import { BorderColor, Delete } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import LanguageIcon from '@mui/icons-material/Language';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, uuid } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmploymentRequestData';
import WorkDescriptionPopup from '../components/EmploymentRequest/WorkDescriptionPopup';
import WorkKnowledgePopup from '../components/EmploymentRequest/WorkKnowledgePopup';
import WorkSkillPopup from '../components/EmploymentRequest/WorkSkillPopup';
import WorkLanguagePopup from '../components/EmploymentRequest/WorkLanguagePopup';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function EmploymentRequestCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const [levelList, setLevelList] = useState([]);
  const [replacementList, setReplacementList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDescriptionPopupOpen, setIsDescriptionPopupOpen] = useState(false);
  const [workDescription, setWorkDescription] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const [isKnowledgePopupOpen, setIsKnowledgePopupOpen] = useState(false);
  const [workKnowledge, setWorkKnowledge] = useState([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);

  const [isSkillPopupOpen, setIsSkillPopupOpen] = useState(false);

  const [workSkill, setWorkSkill] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [isLangPopupOpen, setIsLangPopupOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const [langList, setLangList] = useState([]);
  const [workLang, setWorkLang] = useState([]);
 

  const [formInfo, setFormInfo] = useState({
    id,

    newPosition: '',
    jobId: null,
    genderId: null,
    departmentId: null,
    comments: '',
    startingDate: new Date(),
    reportingTo: null,
    noOfVacancies: '',
    salaryRange: '',
    jobLevel: null,
    jobType: null,

    educationMajor: '',

    employeeReplacement: '',
    yearsOfExperience: '',
    noOfSubordinates: '',
    educationLevel: null,
    positionTypeId: null,

    communicationList: [],
    knowledgeList: [],
    jobDescription: [],

    fromAge: "",
    toAge: "",
  });


  const [DateError, setDateError] = useState({});

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    const formData = {
      ...formInfo,
      startingDate: formateDate(formInfo.startingDate),
      communicationList: workSkill.map((item) => ({
        description: item.description,
        id: 0,
        languageLevelID: item.levelId,
        type: 1,
      })),
      knowledgeList: workKnowledge.map((item) => ({
        description: item.description,
        id: 0,
        languageLevelID: '',
        type: 2,
      })),
      jobDescription: workDescription.map((item) => ({
        description: item.description,
        id: 0,
        languageLevelID: '',
        type: 3,
      })),
      Languages: workLang.map((item) => ({
        description: "",
        id: 0, 
        LanguageId: item.LanguageId,
        languageLevelID: item.languageLevelID,
        type: 4,
      })),
    };


    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.EmploymentRequest.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);

      const levels = await api(locale).GetLanguageLevelList();
      setLevelList(levels);

      const Languages = await GeneralListApis(locale).GetLanguageList();
      setLangList(Languages);

      const jobs = await api(locale).GetJobList();
      setJobsList(jobs);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const replacements = await api(locale).GetPositionTypeList();
      setReplacementList(replacements);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);

        setWorkDescription(dataApi.jobDescription);
        setWorkKnowledge(dataApi.knowledgeList);
        setWorkSkill(
          dataApi.communicationList.map((item) => ({
            ...item,
            levelId: item.languageLevelID,
          }))
        );

        setWorkLang(
          dataApi.languageList.map((item) => ({
            ...item,
            LanguageId: item.languageID,
            languageLevelID: item.languageLevelID,
          }))
        );

      }
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
    }));

    if (value !== null && id === 0) {
      setWorkDescription(
        value.jobDescription.map((item) => ({
          description: item,
          id: uuid(),
        }))
      );
    }
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.recruitment.EmploymentRequest.route);
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };


  const onRadioInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  useEffect(() => {
    if (selectedDescription) {
      setIsDescriptionPopupOpen(true);
    }
  }, [selectedDescription]);

  const onDescriptionSave = (description) => {
    if (selectedDescription) {
      const clonedWorkDescription = [...workDescription];
      const index = clonedWorkDescription.findIndex(
        (item) => item.id === description.id
      );
      if (index !== -1) {
        clonedWorkDescription[index] = description;
        setWorkDescription(clonedWorkDescription);
      }
      setSelectedDescription(null);
    } else {
      setWorkDescription((prev) => [...prev, { ...description, id: uuid() }]);
    }

    setIsDescriptionPopupOpen(false);
  };

  const onDescriptionRemove = (id) => {
    const clonedWorkDescription = [...workDescription];
    const indexToRemove = clonedWorkDescription.findIndex(
      (item) => item.id === id
    );

    if (indexToRemove !== -1) {
      clonedWorkDescription.splice(indexToRemove, 1);
      setWorkDescription(clonedWorkDescription);
    }
  };

  const onDescriptionEdit = (description) => {
    setSelectedDescription(description);
  };

  const onDescriptionPopupBtnClick = () => {
    setIsDescriptionPopupOpen(true);
  };

  useEffect(() => {
    if (selectedKnowledge) {
      setIsKnowledgePopupOpen(true);
    }
  }, [selectedKnowledge]);

  const onKnowledgeSave = (knowledge) => {
    if (selectedKnowledge) {
      const clonedWorkKnowledge = [...workKnowledge];
      const index = clonedWorkKnowledge.findIndex(
        (item) => item.id === knowledge.id
      );
      if (index !== -1) {
        clonedWorkKnowledge[index] = knowledge;
        setWorkKnowledge(clonedWorkKnowledge);
      }
      setSelectedKnowledge(null);
    } else {
      setWorkKnowledge((prev) => [...prev, { ...knowledge, id: uuid() }]);
    }

    setIsKnowledgePopupOpen(false);
  };

  const onKnowledgeRemove = (id) => {
    const clonedWorkKnowledge = [...workKnowledge];
    const indexToRemove = clonedWorkKnowledge.findIndex(
      (item) => item.id === id
    );

    if (indexToRemove !== -1) {
      clonedWorkKnowledge.splice(indexToRemove, 1);
      setWorkKnowledge(clonedWorkKnowledge);
    }
  };

  const onKnowledgeEdit = (knowledge) => {
    setSelectedKnowledge(knowledge);
  };

  const onKnowledgePopupBtnClick = () => {
    setIsKnowledgePopupOpen(true);
  };

  useEffect(() => {
    if (selectedSkill) {
      setIsSkillPopupOpen(true);
    }
  }, [selectedSkill]);

  const onSkillSave = (skill) => {
    if (selectedSkill) {
      const clonedWorkSkill = [...workSkill];
      const index = clonedWorkSkill.findIndex((item) => item.id === skill.id);
      if (index !== -1) {
        clonedWorkSkill[index] = skill;
        setWorkSkill(clonedWorkSkill);
      }
      setSelectedSkill(null);
    } else {
      setWorkSkill((prev) => [...prev, { ...skill, id: uuid() }]);
    }

    setIsSkillPopupOpen(false);
  };

  const onSkillRemove = (id) => {
    const clonedWorkSkill = [...workSkill];
    const indexToRemove = clonedWorkSkill.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      clonedWorkSkill.splice(indexToRemove, 1);
      setWorkSkill(clonedWorkSkill);
    }
  };

  const onSkillEdit = (skill) => {
    setSelectedSkill(skill);
  };

  const onSkillPopupBtnClick = () => {
    setIsSkillPopupOpen(true);
  };


  const onLangSave = (lang) => {
    
    if (selectedLang) {
      const clonedWorkLang = [...workLang];
      const index = clonedWorkLang.findIndex((item) => item.id === lang.id);
      if (index !== -1) {
        clonedWorkLang[index] = lang;
        setWorkLang(clonedWorkLang);
      }
      setSelectedLang(null);
    } else {
      setWorkLang((prev) => [...prev, { ...lang, id: uuid() }]);
    }

    setSelectedLang(false);
  };


  const onLangRemove = (id) => {
    const clonedWorkLang = [...workLang];
    const indexToRemove = clonedWorkLang.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      clonedWorkLang.splice(indexToRemove, 1);
      setWorkLang(clonedWorkLang);
    }
  };

  const onLangEdit = (lang) => {
    setSelectedLang(lang);
  };

  const onLangPopupBtnClick = () => {
    setIsLangPopupOpen(true);
  };


  useEffect(() => {
    if (selectedLang) {
      setIsLangPopupOpen(true);
    }
  }, [selectedLang]);
  
  return (
    <PayRollLoader isLoading={isLoading}>
      <WorkDescriptionPopup
        isOpen={isDescriptionPopupOpen}
        setIsOpen={setIsDescriptionPopupOpen}
        onSave={onDescriptionSave}
        selectedDescription={selectedDescription}
        setSelectedDescription={setSelectedDescription}
      />

      <WorkKnowledgePopup
        isOpen={isKnowledgePopupOpen}
        setIsOpen={setIsKnowledgePopupOpen}
        onSave={onKnowledgeSave}
        selectedKnowledge={selectedKnowledge}
        setSelectedKnowledge={setSelectedKnowledge}
      />

      <WorkSkillPopup
        isOpen={isSkillPopupOpen}
        setIsOpen={setIsSkillPopupOpen}
        onSave={onSkillSave}
        selectedSkill={selectedSkill}
        levelList={levelList}
        setSelectedSkill={setSelectedSkill}
      />

      <WorkLanguagePopup
        isOpen={isLangPopupOpen}
        setIsOpen={setIsLangPopupOpen}
        onSave={onLangSave}
        selectedLang={selectedLang}
        levelList={levelList}
        setSelectedLang={setSelectedLang}
        langList={langList}
      />




      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.generalInformation)}
                </Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={jobsList}
                      value={
                        jobsList.find((item) => item.id === formInfo.jobId)
                        ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onJobAutoCompleteChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.position)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={departmentList}
                      value={
                        departmentList.find(
                          (item) => item.id === formInfo.departmentId
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'departmentId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.department)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(messages.startDate)}
                        value={
                          formInfo.startingDate
                            ? dayjs(formInfo.startingDate)
                            : null
                        }
                        className={classes.field}
                        onChange={(date) => onDatePickerChange(date, 'startingDate')
                        }
                        onError={(error, value) => {
                          if (error !== null) {
                            setDateError((prevState) => ({
                              ...prevState,
                              startingDate: true,
                            }));
                          } else {
                            setDateError((prevState) => ({
                              ...prevState,
                              startingDate: false,
                            }));
                          }
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={jobsList}
                      value={
                        jobsList.find(
                          (item) => item.id === formInfo.reportingTo
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'reportingTo')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.reportingTo)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.noOfVacancies}
                      label={intl.formatMessage(messages.vacanciesNumber)}
                      name='noOfVacancies'
                      required
                      onChange={onNumericInputChange}
                      className={classes.field}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.noOfSubordinates}
                      label={intl.formatMessage(messages.subordinatesNumber)}
                      name='noOfSubordinates'
                      required
                      onChange={onNumericInputChange}
                      className={classes.field}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={replacementList}
                      value={
                        replacementList.find(
                          (item) => item.id === formInfo.positionTypeId
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'positionTypeId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(
                            messages.newReplacementOrPosition
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {formInfo.positionTypeId === 2 ? (
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={employeeList}
                        value={
                          employeeList.find(
                            (item) => item.id === formInfo.employeeReplacement
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                        onChange={(_, value) => onAutoCompleteChange(value, 'employeeReplacement')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.employeeName)}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={4}>
                      <TextField
                        value={formInfo.newPosition}
                        label={intl.formatMessage(messages.newPosition)}
                        name='newPosition'
                        required
                        onChange={onInputChange}
                        fullWidth
                        autoComplete='off'
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.salaryRange}
                      label={intl.formatMessage(messages.salaryRange)}
                      name='salaryRange'
                      required
                      onChange={onNumericInputChange}
                      fullWidth
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='comments'
                      value={formInfo.comments}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.comments)}
                      fullWidth
                      variant='outlined'
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.jobSpecifications)}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>{intl.formatMessage(messages.age)}</FormLabel>
                  </FormControl>
                  <Grid container spacing={1} mt={0} direction='row'>
                    <Grid item xs={12} md={1}>
                      <TextField
                        value={formInfo.fromAge}
                        label={intl.formatMessage(messages.fromAge)}
                        name='fromAge'
                        onChange={onNumericInputChange}
                        className={classes.field}
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <TextField
                        value={formInfo.toAge}
                        label={intl.formatMessage(messages.toAge)}
                        name='toAge'
                        onChange={onNumericInputChange}
                        className={classes.field}
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>{intl.formatMessage(messages.gender)}</FormLabel>
                    <RadioGroup
                      row
                      value={formInfo.genderId}
                      onChange={onRadioInputChange}
                      name='genderId'
                    >
                      <FormControlLabel
                        value='0'
                        control={<Radio />}
                        label={intl.formatMessage(messages.male)}
                      />
                      <FormControlLabel
                        value='1'
                        control={<Radio />}
                        label={intl.formatMessage(messages.female)}
                      />
                      <FormControlLabel
                        value='2'
                        control={<Radio />}
                        label={intl.formatMessage(messages.any)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.experience)}
                    </FormLabel>
                    <RadioGroup
                      row
                      value={formInfo.yearsOfExperience}
                      onChange={onRadioInputChange}
                      name='yearsOfExperience'
                    >
                      <FormControlLabel
                        value='0'
                        control={<Radio />}
                        label={`0 - 2 ${intl.formatMessage(messages.year)}`}
                      />
                      <FormControlLabel
                        value='1'
                        control={<Radio />}
                        label={`2 - 4 ${intl.formatMessage(messages.year)}`}
                      />
                      <FormControlLabel
                        value='2'
                        control={<Radio />}
                        label={`5 - 7 ${intl.formatMessage(messages.year)}`}
                      />
                      <FormControlLabel
                        value='3'
                        control={<Radio />}
                        label={`8 - 10 ${intl.formatMessage(messages.year)}`}
                      />
                      <FormControlLabel
                        value='4'
                        control={<Radio />}
                        label={`> 10 ${intl.formatMessage(messages.year)}`}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.jobType)}
                    </FormLabel>
                    <RadioGroup
                      row
                      value={formInfo.jobType}
                      onChange={onRadioInputChange}
                      name='jobType'
                    >
                      <FormControlLabel
                        value='0'
                        control={<Radio />}
                        label={intl.formatMessage(messages.fullTime)}
                      />
                      <FormControlLabel
                        value='1'
                        control={<Radio />}
                        label={intl.formatMessage(messages.partTime)}
                      />
                      <FormControlLabel
                        value='2'
                        control={<Radio />}
                        label={intl.formatMessage(messages.temp)}
                      />
                      <FormControlLabel
                        value='3'
                        control={<Radio />}
                        label={intl.formatMessage(messages.training)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.jobLevel)}
                    </FormLabel>
                    <RadioGroup
                      row
                      value={formInfo.jobLevel}
                      onChange={onRadioInputChange}
                      name='jobLevel'
                    >
                      <FormControlLabel
                        value='0'
                        control={<Radio />}
                        label={intl.formatMessage(messages.junior)}
                      />
                      <FormControlLabel
                        value='1'
                        control={<Radio />}
                        label={intl.formatMessage(messages.senior)}
                      />
                      <FormControlLabel
                        value='2'
                        control={<Radio />}
                        label={intl.formatMessage(messages.supervisor)}
                      />
                      <FormControlLabel
                        value='3'
                        control={<Radio />}
                        label={intl.formatMessage(messages.manager)}
                      />
                      <FormControlLabel
                        value='4'
                        control={<Radio />}
                        label={intl.formatMessage(messages.director)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <FormControl>
                    <FormLabel>
                      {intl.formatMessage(messages.educationLevel)}
                    </FormLabel>
                    <RadioGroup
                      row
                      value={formInfo.educationLevel}
                      onChange={onRadioInputChange}
                      name='educationLevel'
                    >
                      <FormControlLabel
                        value='0'
                        control={<Radio />}
                        label={intl.formatMessage(messages.highSchool)}
                      />
                      <FormControlLabel
                        value='1'
                        control={<Radio />}
                        label={intl.formatMessage(messages.bachelorDegree)}
                      />
                      <FormControlLabel
                        value='2'
                        control={<Radio />}
                        label={intl.formatMessage(messages.diploma)}
                      />
                      <FormControlLabel
                        value='3'
                        control={<Radio />}
                        label={intl.formatMessage(messages.masters)}
                      />
                      <FormControlLabel
                        value='4'
                        control={<Radio />}
                        label={intl.formatMessage(messages['dpa-phd'])}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        value={formInfo.educationMajor}
                        label={intl.formatMessage(messages.educationMajor)}
                        name='educationMajor'
                        onChange={onInputChange}
                        fullWidth
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.languages)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onLangPopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addLang)}
                    </Button>
                  </Grid>
                </Grid>
                <Typography color='gray' mt={1} variant='body2'>
                  {intl.formatMessage(messages.languageInfo)}
                </Typography>

                {workLang.length > 0 ? (
                  <Grid container spacing={3} mt={0} alignItems='stretch'>
                    {workLang.map((item) => (
                      <Grid item xs={12} key={item.id} md={4}>
                        <Card
                          variant='outlined'
                          sx={{
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <IconButton
                            size='small'
                            sx={{
                              right: '5px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onLangEdit(item)}
                          >
                            <BorderColor sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            sx={{
                              right: '35px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onLangRemove(item.id)}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <CardContent sx={{ p: '16px!important' }}>
                            <Typography variant='body2' color='text.secondary'>
                              {levelList.find(
                                (level) => level.id === item.languageLevelID
                              )?.name ?? ''}
                            </Typography>

                            <Typography>
                              {langList.find(
                                (lang) => lang.id === item.LanguageId
                              )?.name ?? ''}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <LanguageIcon
                        sx={{ color: '#a7acb2', fontSize: 30 }}
                      />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noLanguage)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.jobSkill)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onSkillPopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addSkill)}
                    </Button>
                  </Grid>
                </Grid>
                <Typography color='gray' mt={1} variant='body2'>
                  {intl.formatMessage(messages.addSkillInfo)}
                </Typography>

                {workSkill.length > 0 ? (
                  <Grid container spacing={3} mt={0} alignItems='stretch'>
                    {workSkill.map((item) => (
                      <Grid item xs={12} key={item.id} md={4}>
                        <Card
                          variant='outlined'
                          sx={{
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <IconButton
                            size='small'
                            sx={{
                              right: '5px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onSkillEdit(item)}
                          >
                            <BorderColor sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            sx={{
                              right: '35px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onSkillRemove(item.id)}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <CardContent sx={{ p: '16px!important' }}>
                            <Typography variant='body2' color='text.secondary'>
                              {levelList.find(
                                (level) => level.id === item.levelId
                              )?.name ?? ''}
                            </Typography>

                            <Typography>{item.description}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <SensorOccupiedIcon
                        sx={{ color: '#a7acb2', fontSize: 30 }}
                      />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noSkill)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.jobKnowledge)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onKnowledgePopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addKnowledge)}
                    </Button>
                  </Grid>
                </Grid>
                <Typography color='gray' mt={1} variant='body2'>
                  {intl.formatMessage(messages.addKnowledgeInfo)}
                </Typography>

                {workKnowledge.length > 0 ? (
                  <Grid container spacing={3} mt={0} alignItems='stretch'>
                    {workKnowledge.map((item) => (
                      <Grid item xs={12} key={item.id} md={4}>
                        <Card
                          variant='outlined'
                          sx={{
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <IconButton
                            size='small'
                            sx={{
                              right: '5px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onKnowledgeEdit(item)}
                          >
                            <BorderColor sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            sx={{
                              right: '35px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onKnowledgeRemove(item.id)}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <CardContent sx={{ p: '16px!important' }}>
                            <Typography>{item.description}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <LiveHelpIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noKnowledgeDescription)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.jobDescription)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onDescriptionPopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addDescription)}
                    </Button>
                  </Grid>
                </Grid>
                <Typography color='gray' mt={1} variant='body2'>
                  {intl.formatMessage(messages.addDescriptionInfo)}
                </Typography>

                {workDescription.length > 0 ? (
                  <Grid container spacing={3} mt={0} alignItems='stretch'>
                    {workDescription.map((item) => (
                      <Grid item xs={12} key={item.id} md={4}>
                        <Card
                          variant='outlined'
                          sx={{
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <IconButton
                            size='small'
                            sx={{
                              right: '5px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onDescriptionEdit(item)}
                          >
                            <BorderColor sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            sx={{
                              right: '35px',
                              position: 'absolute',
                              top: '-12px',
                              backgroundColor: '#eee',
                            }}
                            onClick={() => onDescriptionRemove(item.id)}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>

                          <CardContent sx={{ p: '16px!important' }}>
                            <Typography>{item.description}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <DescriptionIcon
                        sx={{ color: '#a7acb2', fontSize: 30 }}
                      />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noJobDescription)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Stack direction='row' gap={2}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>

                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </PayRollLoader>
  );
}

EmploymentRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmploymentRequestCreate);
