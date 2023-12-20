import DescriptionIcon from '@mui/icons-material/Description';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import api from '../api/ReviewEmploymentRequestData';
import messages from '../messages';

function ReviewEmploymentRequestCreate(props) {
  const { intl } = props;
  const location = useLocation();

  const locale = useSelector((state) => state.language.locale);

  const id = location.state?.id ?? 0;

  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id,

    newPosition: '',
    jobId: '',
    genderId: '',
    departmentId: '',
    comments: '',
    startingDate: '',
    reportingTo: '',
    noOfVacancies: '',
    salaryRange: '',
    jobLevel: '',
    jobType: '',

    englishLanguageLevelId: '',
    arabicLanguageLevelId: '',
    otherLanguageLevelId: '',
    otherLanguage: '',
    educationMajor: '',

    age: '',
    employeeReplacement: '',
    yearsOfExperience: '',
    noOfSubordinates: '',
    educationLevel: '',
    positionTypeId: '',

    communicationList: [],
    knowledgeList: [],
    jobDescription: [],

    jobName: '',
    departmentName: '',
    insDate: '',
    reportingToName: '',
    englishLanguageLevelName: '',
    arabicLanguageLevelName: '',
    otherLanguageLevelName: '',
    positionTypeName: '',
    employeeReplacementName: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : '');

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const dataApi = await api(locale).GetById(id);

      setFormInfo(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id !== 0) {
      fetchNeededData();
    }
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={2} direction='row'>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>
                {intl.formatMessage(messages.generalInformation)}
              </Typography>

              <Grid container spacing={3} mt={0} direction='row'>
                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.jobName}
                    label={intl.formatMessage(messages.position)}
                    name='jobId'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.departmentName}
                    label={intl.formatMessage(messages.department)}
                    name='departmentId'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formateDate(formInfo.startingDate)}
                    label={intl.formatMessage(messages.startDate)}
                    name='startingDate'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.reportingToName}
                    label={intl.formatMessage(messages.reportingTo)}
                    name='reportingTo'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.noOfVacancies}
                    label={intl.formatMessage(messages.vacanciesNumber)}
                    name='noOfVacancies'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.noOfSubordinates}
                    label={intl.formatMessage(messages.subordinatesNumber)}
                    name='noOfSubordinates'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.positionTypeName}
                    label={intl.formatMessage(
                      messages.newReplacementOrPosition
                    )}
                    name='positionTypeId'
                    disabled
                    fullWidth
                  />
                </Grid>

                {formInfo.positionTypeId === 2 ? (
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.employeeReplacementName}
                      label={intl.formatMessage(messages.employeeName)}
                      name='employeeReplacement'
                      disabled
                      fullWidth
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.newPosition}
                      label={intl.formatMessage(messages.newPosition)}
                      name='newPosition'
                      disabled
                      fullWidth
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={4}>
                  <TextField
                    value={formInfo.salaryRange}
                    label={intl.formatMessage(messages.salaryRange)}
                    name='salaryRange'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name='comments'
                    value={formInfo.comments}
                    disabled
                    label={intl.formatMessage(messages.comments)}
                    fullWidth
                    variant='outlined'
                    multiline
                    rows={1}
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
                  <FormLabel>{intl.formatMessage(messages.gender)}</FormLabel>
                  <RadioGroup
                    row
                    value={formInfo.genderId}
                    name='genderId'
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.male)}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.female)}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.any)}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControl>
                  <FormLabel>{intl.formatMessage(messages.age)}</FormLabel>
                  <RadioGroup row value={formInfo.age} name='age'>
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled />}
                      label={`21 - 25 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled />}
                      label={`26 - 28 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio disabled />}
                      label={`29 - 34 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio disabled />}
                      label={`35 - 40 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio disabled />}
                      label={`> 40 ${intl.formatMessage(messages.year)}`}
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
                    name='yearsOfExperience'
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled />}
                      label={`0 - 2 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled />}
                      label={`2 - 4 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio disabled />}
                      label={`5 - 7 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio disabled />}
                      label={`8 - 10 ${intl.formatMessage(messages.year)}`}
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio disabled />}
                      label={`> 10 ${intl.formatMessage(messages.year)}`}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControl>
                  <FormLabel>{intl.formatMessage(messages.jobType)}</FormLabel>
                  <RadioGroup
                    row
                    value={formInfo.jobType}
                    name='jobType'
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.fullTime)}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.partTime)}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.temp)}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.training)}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControl>
                  <FormLabel>{intl.formatMessage(messages.jobLevel)}</FormLabel>
                  <RadioGroup
                    row
                    value={formInfo.jobLevel}
                    name='jobLevel'
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.junior)}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.senior)}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.supervisor)}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.manager)}
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio disabled />}
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
                    name='educationLevel'
                  >
                    <FormControlLabel
                      value='0'
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.highSchool)}
                    />
                    <FormControlLabel
                      value='1'
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.bachelorDegree)}
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.diploma)}
                    />
                    <FormControlLabel
                      value='3'
                      control={<Radio disabled />}
                      label={intl.formatMessage(messages.masters)}
                    />
                    <FormControlLabel
                      value='4'
                      control={<Radio disabled />}
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
                      disabled
                      fullWidth
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
              <Typography variant='h6'>
                {intl.formatMessage(messages.languages)}
              </Typography>

              <Grid container spacing={2} mt={1} direction='row'>
                <Grid item md={4} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={Boolean(formInfo.arabicLanguageLevelId)}
                        name='arabic'
                      />
                    }
                    label={intl.formatMessage(messages.arabic)}
                  />

                  <TextField
                    value={formInfo.arabicLanguageLevelName}
                    label={intl.formatMessage(messages.level)}
                    name='arabicLanguageLevelId'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={Boolean(formInfo.englishLanguageLevelId)}
                        name='english'
                      />
                    }
                    label={intl.formatMessage(messages.english)}
                  />

                  <TextField
                    value={formInfo.englishLanguageLevelName}
                    label={intl.formatMessage(messages.level)}
                    name='englishLanguageLevelId'
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item md={8} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={Boolean(formInfo.otherLanguageLevelId)}
                        name='other'
                      />
                    }
                    label={intl.formatMessage(messages.other)}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        value={formInfo.otherLanguage}
                        label={intl.formatMessage(messages.otherLanguage)}
                        name='otherLanguage'
                        disabled
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        value={formInfo.otherLanguageLevelName}
                        label={intl.formatMessage(messages.level)}
                        name='otherLanguageLevelId'
                        disabled
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>
                {intl.formatMessage(messages.jobSkill)}
              </Typography>

              {formInfo.communicationList.length > 0 ? (
                <Grid container spacing={3} mt={0} alignItems='stretch'>
                  {formInfo.communicationList.map((item) => (
                    <Grid item xs={12} key={item.id} md={4}>
                      <Card variant='outlined'>
                        <CardContent sx={{ p: '16px!important' }}>
                          <Typography variant='body2' color='text.secondary'>
                            {item.levelId}
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
              <Typography variant='h6'>
                {intl.formatMessage(messages.jobKnowledge)}
              </Typography>

              {formInfo.knowledgeList.length > 0 ? (
                <Grid container spacing={3} mt={0} alignItems='stretch'>
                  {formInfo.knowledgeList.map((item) => (
                    <Grid item xs={12} key={item.id} md={4}>
                      <Card variant='outlined'>
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
              <Typography variant='h6'>
                {intl.formatMessage(messages.jobDescription)}
              </Typography>

              {formInfo.jobDescription.length > 0 ? (
                <Grid container spacing={3} mt={0} alignItems='stretch'>
                  {formInfo.jobDescription.map((item) => (
                    <Grid item xs={12} key={item.id} md={4}>
                      <Card variant='outlined'>
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
                    <DescriptionIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                    <Typography color='#a7acb2' variant='body1'>
                      {intl.formatMessage(messages.noJobDescription)}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

ReviewEmploymentRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReviewEmploymentRequestCreate);
