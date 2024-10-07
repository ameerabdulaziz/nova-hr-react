import { HomeRepairService } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import cvMessages from '../../cv-application/messages';
import api from '../api/JobApplicationPreviewData';
import { formateDate } from '../../helpers';
import DecryptUrl from "../../Component/DecryptUrl";
import useStyles from "../../Style";
import styles from "../../../../../styles/styles.scss";

function JobApplicationPreview(props) {


// get employee data from url
const  empid   = DecryptUrl()
const id  = empid?.id

const { classes } = useStyles();

  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(false);
  const [isCVPopupOpen, setIsCVPopupOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    empName: '',
    email: '',
    phone: '',
    militaryStatusName: '',
    image: null,
    cvdoc: null,
    genderName: '',

    identityTypeName: '',
    idcardNumber: '',
    issuePlace: '',
    idcardIssuingDate: '',

    socialStatusName: '',
    childrenNo: '',
    birthDate: '',
    address: '',
    relativesPhone: '',
    drivingLicense: false,
    haveCar: false,

    qualificationName: '',
    qualificationRelease: '',
    qualificationDate: '',
    computerSkillsName: '',
    GraduationStatusName: '',

    job: '',
    expectedSalary: '',
    socialInsuranceId: '',
    sourceLinkName: '',
    workingFromName: '',

    recJobApplicationExperience: [],
    recJobApplicationCourse: [],
  });

  const onCVPopupBtnClick = () => {
    setIsCVPopupOpen(true);
  };

  const onCVPopupClose = () => {
    setIsCVPopupOpen(false);
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetById(id);
      setFormInfo({
        empName: response.empName,
        email: response.email,
        phone: response.phone,
        militaryStatusName: response.militaryStatusName,
        image: response.image,
        cvdoc: response.cvdoc,
        genderName: response.genderName,

        identityTypeName: response.identityTypeName,
        idcardNumber: response.idcardNumber,
        issuePlace: response.issuePlace,
        idcardIssuingDate: formateDate(response.idcardIssuingDate),

        socialStatusName: response.socialStatusName,
        childrenNo: response.childrenNo,
        birthDate: formateDate(response.birthDate),
        address: response.address,
        relativesPhone: response.relativesPhone,
        drivingLicense: response.drivingLicense,
        haveCar: response.haveCar,

        qualificationName: response.qualificationName,
        qualificationRelease: response.qualificationRelease,
        qualificationDate: formateDate(response.qualificationDate),
        computerSkillsName: response.computerSkillsName,
        GraduationStatusName: response.GraduationStatusName,

        job: response.job,
        expectedSalary: response.expectedSalary,
        socialInsuranceId: response.socialInsuranceId,
        sourceLink: response.sourceLink,
        sourceLinkName: response.sourceLinkName,
        workingFromName: response.workingFromName,

        recJobApplicationExperience: response.recJobApplicationExperience,
        recJobApplicationCourse: response.recJobApplicationCourse,

        recQuestions: response.recQuestions,
      });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id !== 0) {
      fetchNeededData();
    }
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={1} direction='row'>
        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.personalInfo)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name='empName'
                      value={formInfo.empName}
                      label={intl.formatMessage(cvMessages.fullName)}
                      fullWidth
                      disabled
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='email'
                      value={formInfo.email}
                      label={intl.formatMessage(cvMessages.email)}
                      fullWidth
                      disabled
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='phone'
                      value={formInfo.phone}
                      label={intl.formatMessage(cvMessages.phone)}
                      fullWidth
                      disabled
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='militaryStatusName'
                      value={formInfo.militaryStatusName}
                      label={intl.formatMessage(cvMessages.militaryStatus)}
                      fullWidth
                      disabled
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='genderName'
                      value={formInfo.genderName}
                      label={intl.formatMessage(cvMessages.gender)}
                      fullWidth
                      disabled
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={7}>
                    {formInfo.cvdoc && (
                      <Button
                        component='span'
                        variant='contained'
                        onClick={onCVPopupBtnClick}
                      >
                        {intl.formatMessage(cvMessages.previewCV)}
                      </Button>
                    )}

                    <FileViewerPopup
                      handleClose={onCVPopupClose}
                      open={isCVPopupOpen}
                      uploadedFileType='pdf'
                      uploadedFile={formInfo.cvdoc}
                      validImageTypes={[]}
                      validPDFTypes={['pdf']}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={4}>
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
                    <Avatar
                      src={formInfo.image}
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.personalIDInfo)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  name='identityTypeName'
                  value={formInfo.identityTypeName}
                  label={intl.formatMessage(cvMessages.IDType)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name='idcardNumber'
                  value={formInfo.idcardNumber}
                  label={intl.formatMessage(cvMessages.IDNumber)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name='issuePlace'
                  value={formInfo.issuePlace}
                  label={intl.formatMessage(cvMessages.issuePlace)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name='issueDate'
                  value={(formInfo.idcardIssuingDate)}
                  label={intl.formatMessage(cvMessages.issueDate)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.personalExtraInfo)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  name='socialStatusName'
                  value={formInfo.socialStatusName}
                  label={intl.formatMessage(cvMessages.socialStatus)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='childrenNo'
                  value={formInfo.childrenNo}
                  label={intl.formatMessage(cvMessages.childrenNumber)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='birthDate'
                  value={(formInfo.birthDate)}
                  label={intl.formatMessage(cvMessages.birthDate)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='address'
                  value={formInfo.address}
                  label={intl.formatMessage(cvMessages.address)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='relativesPhone'
                  value={formInfo.relativesPhone}
                  label={intl.formatMessage(cvMessages.relativePhoneNumber)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} lg={7}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox disabled checked={formInfo.drivingLicense} />
                    }
                    label={intl.formatMessage(cvMessages.hasDrivingLicense)}
                  />
                  <FormControlLabel
                    control={<Checkbox disabled checked={formInfo.haveCar} />}
                    label={intl.formatMessage(cvMessages.hasCar)}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.educationalInfo)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  name='qualificationName'
                  value={formInfo.qualificationName}
                  label={intl.formatMessage(cvMessages.qualification)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='qualificationRelease'
                  value={formInfo.qualificationRelease}
                  label={intl.formatMessage(cvMessages.graduationPlace)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='GraduationStatusName'
                  value={formInfo.GraduationStatusName}
                  label={intl.formatMessage(cvMessages.graduationGrade)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='graduationDate'
                  value={(formInfo.qualificationDate)}
                  label={intl.formatMessage(cvMessages.graduationDate)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='computerSkillsName'
                  value={formInfo.computerSkillsName}
                  label={intl.formatMessage(cvMessages.computerSkills)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.jobInfo)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  name='job'
                  value={formInfo.job}
                  label={intl.formatMessage(cvMessages.jobTitle)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='workingFrom'
                  value={formInfo.workingFromName}
                  label={intl.formatMessage(cvMessages.workType)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='expectedSalary'
                  value={formInfo.expectedSalary}
                  label={intl.formatMessage(cvMessages.expectedSalary)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='socialInsuranceId'
                  value={formInfo.socialInsuranceId}
                  label={intl.formatMessage(cvMessages.insuranceNumber)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  name='sourceLink'
                  value={formInfo.sourceLinkName}
                  label={intl.formatMessage(cvMessages.linkSource)}
                  fullWidth
                  disabled
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        {formInfo.recQuestions && formInfo.recQuestions.length !== 0 && (

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.ExclusionaryQuestions)}
            desc=''
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                    {formInfo.recQuestions && (
                      formInfo.recQuestions.map((item)=>{
                        return <div>
                            <p className={`${classes.colorSty} ${styles.queSty}`}>{item.question} &nbsp; ?</p>
                            <p className={styles.ansSty}>{item.answer}</p>
                        </div>
                    }))}
              </Grid>
            </Grid>
          </PapperBlock>
        </Grid>

        ) }

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.workExperienceInfo)}
            desc=''
          >
            {formInfo.recJobApplicationExperience.length > 0 ? (
              <Grid container spacing={3} alignItems='stretch'>
                {formInfo.recJobApplicationExperience.map((exp) => (
                  <Grid item xs={12} key={exp.id} md={4}>
                    <Card variant='outlined' sx={{ p: 2 }}>
                      <CardContent >
                        <Typography variant='h5' component='div'>
                          {exp.jobName}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                          {formateDate(exp.fromDate)} -{' '}
                          {formateDate(exp.toDate)}
                        </Typography>

                        <Typography>{exp.departmentName}</Typography>
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
                  <HomeRepairService sx={{ color: '#a7acb2', fontSize: 30 }} />
                  <Typography color='#a7acb2' variant='body1'>
                    {intl.formatMessage(cvMessages.noExperience)}
                  </Typography>
                </Box>
              </Stack>
            )}
          </PapperBlock>
        </Grid>

        <Grid item xs={12}>
          <PapperBlock
            whiteBg
            icon='border_color'
            title={intl.formatMessage(cvMessages.coursesInfo)}
            desc=''
          >
            {formInfo.recJobApplicationCourse.length > 0 ? (
              <Grid container spacing={3} alignItems='stretch'>
                {formInfo.recJobApplicationCourse.map((course) => (
                  <Grid item xs={12} key={course.id} md={4}>
                    <Card variant='outlined' sx={{ p: 2 }}>
                      <CardContent>
                        <Typography variant='h5' component='div'>
                          {course.courseName}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                          {formateDate(course.endDate)}
                        </Typography>
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
                  <BadgeIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                  <Typography color='#a7acb2' variant='body1'>
                    {intl.formatMessage(cvMessages.noCourses)}
                  </Typography>
                </Box>
              </Stack>
            )}
          </PapperBlock>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

JobApplicationPreview.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobApplicationPreview);
