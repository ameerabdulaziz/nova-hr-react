import { BorderColor, Delete } from '@mui/icons-material';
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
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import FileViewerPopup from '../../../../components/Popup/fileViewerPopup';
import { ThemeContext } from '../../../App/ThemeWrapper';
import PayRollLoader from '../Component/PayRollLoader';
import { formateDate, getFormData } from '../helpers';
import API from './api';
import CoursesPopup from './components/CoursesPopup';
import ExperiencePopup from './components/ExperiencePopup';
import Section from './components/Section';
import Layout from './layouts/Layout.cv';
import messages from './messages';

function JobAdvertisementApplication(props) {
  const { intl } = props;
  const history = useHistory();
  const changeMode = useContext(ThemeContext);
  const { jobApplicarionId = 0, JobId = 0 } = useParams();
  const locale = useSelector((state) => state.language.locale);
  const validPDFTypes = ['application/pdf', '.pdf', 'pdf'];
  const workTypesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.site),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.home),
    },
  ];

  const [isCVPopupOpen, setIsCVPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [config, setConfig] = useState({
    phone: '',
    mail: '',
    companyName: '',
    logo: '',
    cvTitle: '',
    cvSubTitle: '',
    companyOverView: '',
  });

  const [militaryStatusList, setMilitaryStatusList] = useState([]);
  const [IDTypeList, setIDTypeList] = useState([]);
  const [qualificationList, setQualificationList] = useState([]);
  const [linkSourceList, setLinkSourceList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [socialStatusList, setSocialStatusList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [graduationGradList, setGraduationGradList] = useState([]);

  const [workExperience, setWorkExperience] = useState([]);
  const [isExperiencePopupOpen, setIsExperiencePopupOpen] = useState(false);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState(null);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCoursePopupOpen, setIsCoursePopupOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id: 0,
    JobAdvertisementID: jobApplicarionId,

    empName: '',
    email: '',
    phone: '',
    militaryStatusId: null,
    Image: null,
    cvdoc: null,
    genderId: null,

    identityTypeId: null,
    idcardNumber: '',
    IdcardIssuingAuth: '',
    idcardIssuingDate: null,

    socialStatusId: null,
    childrenNo: '',
    birthDate: null,
    address: '',
    relativesPhone: '',
    drivingLicense: false,
    haveCar: false,

    qualificationId: null,
    QualificationRelease: '',
    QualificationDate: null,
    computerSkills: null,
    GraduationStatusId: null,

    jobId: JobId !== 0 ? parseInt(JobId, 10) : null,
    expectedSalary: '',
    SocialInsuranceId: '',
    sourceLink: null,
    workingFrom: null,
  });

  async function fetchNeededData() {
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      const militaryStatus = await API(
        locale
      ).GetMilitaryStatusList();
      setMilitaryStatusList(militaryStatus);

      const jobs = await API(locale).GetJobList();
      setJobList(jobs);

      const gender = await API(locale).GetGenderList();
      setGenderList(gender);

      const socialStatus = await API(locale).GetSocialStatusList();
      setSocialStatusList(socialStatus);

      const grads = await API(locale).GetGradeList();
      setGraduationGradList(grads);

      const qualification = await API(
        locale
      ).GetQualificationsList();
      setQualificationList(qualification);

      const IDTypes = await API(locale).GetIdentityTypeList();
      setIDTypeList(IDTypes);

      const linkSources = await API(
        locale
      ).GetHiringSourceList();
      setLinkSourceList(linkSources);

      const configResponse = await API(locale).GetCompanyData();
      setConfig({
        phone: configResponse.phone ?? '',
        mail: configResponse.mail ?? '',
        companyName: configResponse.companyName ?? '',
        logo: configResponse.logo ?? '',
        cvTitle: configResponse.cvTitle ?? '',
        cvSubTitle: configResponse.cvSubTitle ?? '',
        companyOverView: configResponse.companyOverView ?? '',
      });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setIsCoursePopupOpen(true);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedWorkExperience) {
      setIsExperiencePopupOpen(true);
    }
  }, [selectedWorkExperience]);

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

    setIsExperiencePopupOpen(false);
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

    setIsCoursePopupOpen(false);
  };

  const onCourseRemove = (id) => {
    const clonedCourses = [...courses];
    const indexToRemove = clonedCourses.findIndex((exp) => exp.id === id);

    if (indexToRemove !== -1) {
      clonedCourses.splice(indexToRemove, 1);
      setCourses(clonedCourses);
    }
  };

  const onCourseEdit = (course) => {
    setSelectedCourse(course);
  };

  const onExperienceEdit = (exp) => {
    setSelectedWorkExperience(exp);
  };

  const onExperiencePopupBtnClick = () => {
    setIsExperiencePopupOpen(true);
  };

  const onCoursePopupBtnClick = () => {
    setIsCoursePopupOpen(true);
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);

    const formData = { ...formInfo };

    formData.idcardIssuingDate = formateDate(formInfo.idcardIssuingDate);
    formData.QualificationDate = formateDate(formInfo.QualificationDate);
    formData.birthDate = formateDate(formInfo.birthDate);

    formData.recJobApplicationCourse = courses.map(
      ({ id: _id, ...course }) => ({
        ...course,
        endDate: formateDate(course.endDate),
        jobApplicarionId: 0,
        id: 0,
      })
    );

    formData.RecJobApplicationExperience = workExperience.map(
      ({ id: _id, ...exp }) => ({
        ...exp,
        fromDate: formateDate(exp.fromDate),
        toDate: formateDate(exp.toDate),
        jobApplicarionId: 0,
        id: 0,
      })
    );

    try {
      const body = getFormData(formData);

      await API(locale).save(body);

      toast.success(notif.saved);

      history.push('/public/ApplicationUnderReviewing');
    } catch (error) {
      //
    } finally {
      setIsSubmitting(false);
    }
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
          Image: evt.target.files[0],
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
        cvdoc: evt.target.files[0],
      }));
    }
  };

  const onBackToVacationBtnClick = () => {
    history.push('/public/JobAdvertisement');
  };

  return (
    <PayRollLoader isLoading={isSubmitting}>
      <Layout isLoading={isLoading} config={config} changeMode={changeMode}>
        <Section>
          <ExperiencePopup
            isOpen={isExperiencePopupOpen}
            setIsOpen={setIsExperiencePopupOpen}
            onSave={onExperienceSave}
            selectedWorkExperience={selectedWorkExperience}
            setSelectedWorkExperience={setSelectedWorkExperience}
          />

          <CoursesPopup
            isOpen={isCoursePopupOpen}
            setIsOpen={setIsCoursePopupOpen}
            onSave={onCourseSave}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />

          <form onSubmit={onFormSubmit}>
            <div className='cv-container'>
              <Grid container m={0} rowSpacing={2} justifyContent='center'>
                <Grid item xs={12}>
                  <div className='cv-form-card'>
                    <Button
                      variant='text'
                      startIcon={<ArrowBackIosNewIcon />}
                      onClick={onBackToVacationBtnClick}
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
                              name='empName'
                              value={formInfo.empName}
                              onChange={onInputChange}
                              label={intl.formatMessage(messages.fullName)}
                              fullWidth
                              variant='outlined'
                              required
                              autoComplete='off'
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
                              autoComplete='off'
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
                              autoComplete='off'
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Autocomplete
                              options={militaryStatusList}
                              value={
                                militaryStatusList.find(
                                  (item) => item.id === formInfo.militaryStatusId
                                ) ?? null
                              }
                              isOptionEqualToValue={(option, value) => option.id === value.id
                              }
                              getOptionLabel={(option) => (option ? option.name : '')
                              }
                              onChange={(_, value) => onAutoCompleteChange(value, 'militaryStatusId')
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
                                  (item) => item.id === formInfo.genderId
                                ) ?? null
                              }
                              isOptionEqualToValue={(option, value) => option.id === value.id
                              }
                              getOptionLabel={(option) => (option ? option.name : '')
                              }
                              onChange={(_, value) => onAutoCompleteChange(value, 'genderId')
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
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              <div>
                                <input
                                  accept='.pdf, .doc, .docx'
                                  id='cv-button-file'
                                  type='file'
                                  style={{ display: 'none' }}
                                  onChange={onCVInputChange}
                                />
                                <label
                                  htmlFor='cv-button-file'
                                  className='cv-btn'
                                >
                                  {intl.formatMessage(messages.uploadCV)}
                                </label>
                              </div>

                              {formInfo.cvdoc && (
                                <span
                                  className='link'
                                  onClick={onCVPopupBtnClick}
                                >
                                  {intl.formatMessage(messages.preview)}
                                </span>
                              )}
                            </Stack>

                            <FileViewerPopup
                              handleClose={onCVPopupClose}
                              open={isCVPopupOpen}
                              uploadedFileType='pdf'
                              uploadedFile={formInfo.cvdoc}
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
                              <label
                                className='link'
                                htmlFor='avatar-button-file'
                              >
                                {intl.formatMessage(messages.uploadImage)}
                              </label>
                            </Grid>

                            <Grid item>
                              <label
                                className='link'
                                htmlFor='avatar-button-file'
                              >
                                <Avatar
                                  src={
                                    formInfo.Image
                                      ? URL.createObjectURL(formInfo.Image)
                                      : undefined
                                  }
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    cursor: 'pointer',
                                  }}
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
                              (item) => item.id === formInfo.identityTypeId
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'identityTypeId')
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
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
                          name='idcardNumber'
                          value={formInfo.idcardNumber}
                          onChange={onNumericInputChange}
                          label={intl.formatMessage(messages.IDNumber)}
                          fullWidth
                          required
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          name='IdcardIssuingAuth'
                          value={formInfo.IdcardIssuingAuth}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.issuePlace)}
                          fullWidth
                          required
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DatePicker
                            label={intl.formatMessage(messages.issueDate)}
                            value={formInfo.idcardIssuingDate}
                            onChange={(date) => onDatePickerChange(date, 'idcardIssuingDate')
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
                              (item) => item.id === formInfo.socialStatusId
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'socialStatusId')
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
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
                          name='childrenNo'
                          value={formInfo.childrenNo}
                          onChange={onNumericInputChange}
                          label={intl.formatMessage(messages.childrenNumber)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
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
                        <TextField
                          name='address'
                          value={formInfo.address}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.address)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          name='relativesPhone'
                          value={formInfo.relativesPhone}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.relativePhoneNumber)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} lg={7}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={formInfo.drivingLicense}
                                onChange={onCheckboxChange}
                              />
                            }
                            label={intl.formatMessage(messages.hasDrivingLicense)}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={formInfo.haveCar}
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
                              (item) => item.id === formInfo.qualificationId
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'qualificationId')
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
                          name='QualificationRelease'
                          required
                          value={formInfo.QualificationRelease}
                          onChange={onInputChange}
                          label={intl.formatMessage(messages.graduationPlace)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          options={graduationGradList}
                          value={
                            graduationGradList.find(
                              (item) => item.id === formInfo.GraduationStatusId
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'GraduationStatusId')
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
                            value={formInfo.QualificationDate}
                            onChange={(date) => onDatePickerChange(date, 'QualificationDate')
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
                          options={graduationGradList}
                          value={
                            graduationGradList.find(
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
                              required
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
                    <div className='title'>
                      {intl.formatMessage(messages.jobInfo)}
                    </div>

                    <Grid container mt={1} spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          options={jobList}
                          disabled={Boolean(formInfo.jobId)}
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
                              (item) => item.id === formInfo.workingFrom
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'workingFrom')
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
                          name='expectedSalary'
                          value={formInfo.expectedSalary}
                          onChange={onNumericInputChange}
                          label={intl.formatMessage(messages.expectedSalary)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          name='SocialInsuranceId'
                          value={formInfo.SocialInsuranceId}
                          onChange={onNumericInputChange}
                          label={intl.formatMessage(messages.insuranceNumber)}
                          fullWidth
                          variant='outlined'
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          options={linkSourceList}
                          value={
                            linkSourceList.find(
                              (item) => item.id === formInfo.sourceLink
                            ) ?? null
                          }
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
                          getOptionLabel={(option) => (option ? option.name : '')}
                          onChange={(_, value) => onAutoCompleteChange(value, 'sourceLink')
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
                      <Grid container mt={0} spacing={3} alignItems='stretch'>
                        {workExperience.map((exp) => (
                          <Grid item xs={12} key={exp.id} md={4}>
                            <div className='single-exp-card create-edit-card '>
                              <IconButton
                                size='small'
                                className='action-btn edit-btn'
                                aria-label='edit'
                                color='primary'
                                onClick={() => onExperienceEdit(exp)}
                              >
                                <BorderColor />
                              </IconButton>

                              <IconButton
                                size='small'
                                className='action-btn delete-btn'
                                color='error'
                                aria-label='delete'
                                onClick={() => onExperienceRemove(exp.id)}
                              >
                                <Delete />
                              </IconButton>

                              <div className='title'>
                                {exp.jobName}
                              </div>
                              <span className='info'>
                                {formateDate(exp.fromDate)} -{' '}
                                {formateDate(exp.toDate)}
                              </span>

                              <div>
                                {exp.departmentName}
                              </div>
                            </div>
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
                      <Grid container mt={0} spacing={3} alignItems='stretch'>
                        {courses.map((course) => (
                          <Grid item xs={12} key={course.id} md={4}>
                            <div className='single-course create-edit-card'>
                              <IconButton
                                size='small'
                                className='action-btn edit-btn'
                                aria-label='edit'
                                color='primary'
                                onClick={() => onCourseEdit(course)}
                              >
                                <BorderColor />
                              </IconButton>

                              <IconButton
                                size='small'
                                className='action-btn delete-btn'
                                color='error'
                                aria-label='delete'
                                onClick={() => onCourseRemove(course.id)}
                              >
                                <Delete />
                              </IconButton>

                              <div className='title'>{course.courseName}</div>
                              <span className='date'>
                                {formateDate(course.endDate)}
                              </span>
                            </div>
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
      </Layout>
    </PayRollLoader>
  );
}

JobAdvertisementApplication.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobAdvertisementApplication);
