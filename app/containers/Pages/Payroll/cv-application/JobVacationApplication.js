import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FileViewerPopup from '../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../Component/PayRollLoader';
import GeneralListApis from '../api/GeneralListApis';
import CoursesPopup from './components/CoursesPopup';
import ExperiencePopup from './components/ExperiencePopup';
import Section from './components/Section';
import messages from './messages';

function JobVacationApplication(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const validPDFTypes = ['application/pdf', '.pdf', 'pdf'];

  const [isCVPopupOpen, setIsCVPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [militaryStatusList, setMilitaryStatusList] = useState([]);
  const [IDTypeList, setIDTypeList] = useState([]);
  const [qualificationList, setQualificationList] = useState([]);
  const [computerSkillsList, setComputerSkillsList] = useState([]);
  const [linkSourceList, setLinkSourceList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [socialStatusList, setSocialStatusList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [workTypesList, setWorkTypesList] = useState([
    {
      id: 1,
      name: intl.formatMessage(messages.site),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.home),
    },
  ]);
  const [graduationGradList, setGraduationGradList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const [workExperience, setWorkExperience] = useState([]);
  const [isExperiencePopupOpen, setIsExperiencePopupOpen] = useState(false);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState(null);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCoursePopupOpen, setIsCoursePopupOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    militaryStatus: null,
    avatar: null,
    cv: null,
    gender: null,

    IDType: null,
    idNumber: '',
    issuePlace: '',
    issueDate: null,

    socialStatus: null,
    childrenNumber: '',
    birthDate: null,
    address: '',
    relativePhoneNumber: '',
    hasDrivingLicense: false,
    hasCar: false,

    qualification: null,
    graduationPlace: '',
    graduationDate: null,
    computerSkills: null,
    graduationGrade: null,

    jobId: null,
    salary: '',
    insuranceNumber: '',
    linkSource: null,
    workType: null,
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const departments = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(departments);

      const militaryStatus = await GeneralListApis(locale).GetMilitaryStatusList();
      setMilitaryStatusList(militaryStatus);

      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);

      const gender = await GeneralListApis(locale).GetGenderList();
      setGenderList(gender);

      const socialStatus = await GeneralListApis(locale).GetSocialStatusList();
      setSocialStatusList(socialStatus);

      const grads = await GeneralListApis(locale).GetGradeList();
      setGraduationGradList(grads);

      const qualification = await GeneralListApis(locale).GetQualificationsList();
      setQualificationList(qualification);

      const IDTypes = await GeneralListApis(locale).GetIdentityTypeList();
      setIDTypeList(IDTypes);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onCVPopupClose = () => {
    setIsCVPopupOpen(false);
  };

  const onCVPopupBtnClick = () => {
    setIsCVPopupOpen(true);
  };

  const uuid = () => {
    const S4 = () => ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
    return (
      S4()
      + S4()
      + '-'
      + S4()
      + '-'
      + S4()
      + '-'
      + S4()
      + '-'
      + S4()
      + S4()
      + S4()
    );
  };

  const onExperienceSave = (experience) => {
    if (selectedWorkExperience) {
      const clonedWorkExp = [...workExperience];
      const index = clonedWorkExp.findIndex((exp) => exp.id === experience.id);

      if (index !== -1) {
        clonedWorkExp[index] = experience;
        setWorkExperience(clonedWorkExp);
      }
      setSelectedWorkExperience(null);
    } else {
      setWorkExperience((prev) => [...prev, { ...experience, id: uuid() }]);
    }
  };

  const onExperienceRemove = (id) => {
    const clonedWorkExp = [...workExperience];
    const indexToRemove = clonedWorkExp.findIndex((exp) => exp.id === id);

    if (indexToRemove !== -1) {
      clonedWorkExp.splice(indexToRemove, 1);
      setWorkExperience(clonedWorkExp);
    }
  };

  const onCourseSave = (course) => {
    if (selectedCourse) {
      const clonedCourses = [...courses];
      const index = clonedCourses.findIndex((exp) => exp.id === course.id);

      if (index !== -1) {
        clonedCourses[index] = course;
        setCourses(clonedCourses);
      }
      setSelectedCourse(null);
    } else {
      setCourses((prev) => [...prev, { ...course, id: uuid() }]);
    }
  };

  const onCourseRemove = (id) => {
    const clonedCourses = [...courses];
    const indexToRemove = clonedCourses.findIndex((exp) => exp.id === id);

    if (indexToRemove !== -1) {
      clonedCourses.splice(indexToRemove, 1);
      setWorkExperience(clonedCourses);
    }
  };

  const onExperiencePopupBtnClick = () => {
    setIsExperiencePopupOpen(true);
  };

  const onCoursePopupBtnClick = () => {
    setIsCoursePopupOpen(true);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    console.log(formInfo);
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
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

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onAvatarInputChange = (evt) => {
    if (evt.target.files[0]) {
      if (evt.target.files[0].size < 10000000) {
        setFormInfo((prev) => ({
          ...prev,
          avatar: evt.target.files[0],
        }));
      } else {
        toast.error(intl.formatMessage(messages.uploadedFileIsLargerThan1MB));
      }
    }
  };

  const onCVInputChange = (evt) => {
    if (evt.target.files[0]) {
      setFormInfo((prev) => ({
        ...prev,
        cv: evt.target.files[0],
      }));
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Section>
        <ExperiencePopup
          jobList={jobList}
          departmentList={departmentList}
          isOpen={isExperiencePopupOpen}
          setIsOpen={setIsExperiencePopupOpen}
          onSave={onExperienceSave}
          selectedWorkExperience={selectedWorkExperience}
        />

        <CoursesPopup
          isOpen={isCoursePopupOpen}
          setIsOpen={setIsCoursePopupOpen}
          onSave={onCourseSave}
          selectedCourse={selectedCourse}
        />

        <form onSubmit={onFormSubmit}>
          <div className='cv-container'>
            <Grid container m={0} rowSpacing={2} justifyContent='center'>
              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <Button
                    variant='text'
                    startIcon={<ArrowBackIosNewIcon />}
                    component={Link}
                    to='/public/JobVacation'
                  >
                    {intl.formatMessage(messages.backToJobVacation)}
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <div className='title'>
                    {intl.formatMessage(messages.personalInfo)}
                  </div>

                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='fullName'
                            value={formInfo.fullName}
                            onChange={onInputChange}
                            label={intl.formatMessage(messages.fullName)}
                            fullWidth
                            variant='outlined'
                            required
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='email'
                            value={formInfo.email}
                            onChange={onInputChange}
                            label={intl.formatMessage(messages.email)}
                            fullWidth
                            variant='outlined'
                            required
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='phone'
                            value={formInfo.phone}
                            onChange={onInputChange}
                            label={intl.formatMessage(messages.phone)}
                            fullWidth
                            variant='outlined'
                            required
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            options={militaryStatusList}
                            value={
                              militaryStatusList.find(
                                (item) => item.id === formInfo.militaryStatus
                              ) ?? null
                            }
                            isOptionEqualToValue={(option, value) => option.id === value.id
                            }
                            getOptionLabel={(option) => (option ? option.name : '')
                            }
                            onChange={(_, value) => onAutoCompleteChange(value, 'militaryStatus')
                            }
                            renderInput={(params) => (
                              <TextField
                                required
                                {...params}
                                label={intl.formatMessage(
                                  messages.militaryStatus
                                )}
                              />
                            )}
                            renderOption={(propsOption, option) => (
                              <li {...propsOption} key={option.id}>
                                {option.name}
                              </li>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            options={genderList}
                            value={
                              genderList.find(
                                (item) => item.id === formInfo.gender
                              ) ?? null
                            }
                            isOptionEqualToValue={(option, value) => option.id === value.id
                            }
                            getOptionLabel={(option) => (option ? option.name : '')
                            }
                            onChange={(_, value) => onAutoCompleteChange(value, 'gender')
                            }
                            renderInput={(params) => (
                              <TextField
                                required
                                {...params}
                                label={intl.formatMessage(messages.gender)}
                              />
                            )}
                            renderOption={(propsOption, option) => (
                              <li {...propsOption} key={option.id}>
                                {option.name}
                              </li>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} md={7}>
                          <Stack direction='row' alignItems='center' spacing={2}>
                            <div>
                              <input
                                accept='.pdf, .doc, .docx'
                                id='cv-button-file'
                                type='file'
                                style={{ display: 'none' }}
                                onChange={onCVInputChange}
                              />
                              <label htmlFor='cv-button-file' className='cv-btn'>
                                {intl.formatMessage(messages.uploadCV)}
                              </label>
                            </div>

                            {formInfo.cv && (
                              <span className='link' onClick={onCVPopupBtnClick}>
                                {intl.formatMessage(messages.preview)}
                              </span>
                            )}
                          </Stack>

                          <FileViewerPopup
                            handleClose={onCVPopupClose}
                            open={isCVPopupOpen}
                            uploadedFileType='pdf'
                            uploadedFile={formInfo.cv}
                            validImageTypes={[]}
                            validPDFTypes={validPDFTypes}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div>
                        <input
                          accept='image/*'
                          id='avatar-button-file'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={onAvatarInputChange}
                        />
                        <Grid
                          container
                          spacing={2}
                          alignItems='center'
                          sx={(th) => ({
                            justifyContent: 'flex-end',
                            [th.breakpoints.down('md')]: {
                              justifyContent: 'flex-start',
                            },
                          })}
                        >
                          <Grid item>
                            <label className='link' htmlFor='avatar-button-file'>
                              {intl.formatMessage(messages.uploadImage)}
                            </label>
                          </Grid>

                          <Grid item>
                            <label className='link' htmlFor='avatar-button-file'>
                              <Avatar
                                src={
                                  formInfo.avatar
                                    ? URL.createObjectURL(formInfo.avatar)
                                    : undefined
                                }
                                sx={{ width: 80, height: 80, cursor: 'pointer' }}
                              />
                            </label>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <div className='title'>
                    {intl.formatMessage(messages.personalIDInfo)}
                  </div>

                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={IDTypeList}
                        value={
                          IDTypeList.find(
                            (item) => item.id === formInfo.IDType
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'IDType')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.IDType)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='idNumber'
                        value={formInfo.idNumber}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.IDNumber)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='issuePlace'
                        value={formInfo.issuePlace}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.issuePlace)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.issueDate)}
                          value={formInfo.issueDate}
                          onChange={(date) => onDatePickerChange(date, 'issueDate')
                          }
                          renderInput={(params) => (
                            <TextField {...params} fullWidth variant='outlined' />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <div className='title'>
                    {intl.formatMessage(messages.personalExtraInfo)}
                  </div>

                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={socialStatusList}
                        value={
                          socialStatusList.find(
                            (item) => item.id === formInfo.socialStatus
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'socialStatus')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.socialStatus)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='childrenNumber'
                        value={formInfo.childrenNumber}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.childrenNumber)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.birthDate)}
                          value={formInfo.birthDate}
                          onChange={(date) => onDatePickerChange(date, 'birthDate')
                          }
                          renderInput={(params) => (
                            <TextField {...params} fullWidth variant='outlined' />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='address'
                        value={formInfo.address}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='relativePhoneNumber'
                        value={formInfo.relativePhoneNumber}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.relativePhoneNumber)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} lg={7}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={formInfo.hasDrivingLicense}
                              onChange={onCheckboxChange}
                            />
                          }
                          label={intl.formatMessage(messages.hasDrivingLicense)}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={formInfo.hasCar}
                              onChange={onCheckboxChange}
                            />
                          }
                          label={intl.formatMessage(messages.hasCar)}
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <div className='title'>
                    {intl.formatMessage(messages.educationalInfo)}
                  </div>

                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={qualificationList}
                        value={
                          qualificationList.find(
                            (item) => item.id === formInfo.qualification
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'qualification')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.qualification)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='graduationPlace'
                        required
                        value={formInfo.graduationPlace}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.graduationPlace)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={graduationGradList}
                        value={
                          graduationGradList.find(
                            (item) => item.id === formInfo.graduationGrade
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'graduationGrade')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.graduationGrade)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.graduationDate)}
                          value={formInfo.graduationDate}
                          onChange={(date) => onDatePickerChange(date, 'graduationDate')
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              required
                              variant='outlined'
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={computerSkillsList}
                        value={
                          computerSkillsList.find(
                            (item) => item.id === formInfo.computerSkills
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'computerSkills')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.computerSkills)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Grid item>
                      <div className='title'>
                        {intl.formatMessage(messages.workExperienceInfo)}
                      </div>
                    </Grid>
                    <Grid item>
                      <button
                        className='cv-btn'
                        type='button'
                        onClick={onExperiencePopupBtnClick}
                      >
                        {intl.formatMessage(messages.addExperience)}
                      </button>
                    </Grid>
                  </Grid>

                  {workExperience.length > 0 ? (
                    <Grid container mt={0} spacing={3}>
                      {workExperience.map((exp) => (
                        <Grid item xs={12} key={exp.id} md={4}>
                          {exp.id}{' '}
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
                        <HomeRepairServiceIcon
                          sx={{ color: '#a7acb2', fontSize: 30 }}
                        />
                        <Typography color='#a7acb2' variant='body1'>
                          {intl.formatMessage(messages.noExperience)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Grid item>
                      <div className='title'>
                        {intl.formatMessage(messages.coursesInfo)}
                      </div>
                    </Grid>
                    <Grid item>
                      <button
                        className='cv-btn'
                        type='button'
                        onClick={onCoursePopupBtnClick}
                      >
                        {intl.formatMessage(messages.addCourse)}
                      </button>
                    </Grid>
                  </Grid>

                  {courses.length > 0 ? (
                    <Grid container mt={0} spacing={3}>
                      {courses.map((course) => (
                        <Grid item xs={12} key={course.id} md={4}>
                          {course.id}
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
                        <BadgeIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                        <Typography color='#a7acb2' variant='body1'>
                          {intl.formatMessage(messages.noCourses)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <div className='title'>
                    {intl.formatMessage(messages.jobInfo)}
                  </div>

                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={jobList}
                        value={
                          jobList.find((item) => item.id === formInfo.jobId)
                        ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'jobId')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.jobTitle)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={workTypesList}
                        value={
                          workTypesList.find(
                            (item) => item.id === formInfo.workType
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'workType')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.workType)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='salary'
                        value={formInfo.salary}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.expectedSalary)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        name='insuranceNumber'
                        value={formInfo.insuranceNumber}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.insuranceNumber)}
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={linkSourceList}
                        value={
                          linkSourceList.find(
                            (item) => item.id === formInfo.linkSource
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => onAutoCompleteChange(value, 'linkSource')
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label={intl.formatMessage(messages.linkSource)}
                          />
                        )}
                        renderOption={(propsOption, option) => (
                          <li {...propsOption} key={option.id}>
                            {option.name}
                          </li>
                        )}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className='cv-form-card'>
                  <Stack direction='row' justifyContent='center'>
                    <button className='cv-btn' type='submit'>
                      {intl.formatMessage(messages.submitApplication)}
                    </button>
                  </Stack>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </Section>
    </PayRollLoader>
  );
}

JobVacationApplication.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobVacationApplication);
