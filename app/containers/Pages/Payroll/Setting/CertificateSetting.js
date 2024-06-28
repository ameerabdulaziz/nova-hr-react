import ColorizeIcon from '@mui/icons-material/Colorize';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import PayRollLoader from '../Component/PayRollLoader';
import payrollMessages from '../messages';
import vacationMessages from '../Vacation/messages';
import API from './api/CertificateSettingData';
import messages from './messages';

const certificateInfo = {
  employeeName: 'Employee Name',
  courseName: 'Course Name',
  accomplishDate: 'Accomplish Date',
};

function CertificateSetting(props) {
  const { intl } = props;

  const canvasRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const [certificateImage, setCertificateImage] = useState(new Image());

  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    textColor: '#000',

    nameFontSize: 10,
    courseFontSize: 10,
    dateFontSize: 10,

    nameInCenter: false,
    courseInCenter: false,
    dateInCenter: false,

    xdirectionName: 0,
    xdirectionCourse: 0,
    xdirectionDate: 0,

    ydirectionName: 10,
    ydirectionCourse: 20,
    ydirectionDate: 30,

    certificateImage: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const response = await API().getCertificateInfo();

      setFormInfo({
        textColor: response.textColor,

        nameFontSize: response.nameFontSize,
        courseFontSize: response.courseFontSize,
        dateFontSize: response.dateFontSize,

        nameInCenter: Boolean(response.nameInCenter),
        courseInCenter: Boolean(response.courseInCenter),
        dateInCenter: Boolean(response.dateInCenter),

        xdirectionName: response.xdirectionName,
        xdirectionCourse: response.xdirectionCourse,
        xdirectionDate: response.xdirectionDate,

        ydirectionName: response.ydirectionName,
        ydirectionCourse: response.ydirectionCourse,
        ydirectionDate: response.ydirectionDate,

        certificateImage: response.certificateImage,
      });

      const image = new Image();
      image.src = response.certificateImage;
      image.crossOrigin = 'anonymous';
      image.onload = async () => {
        setCertificateImage(image);
      };
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const body = {
      ...formInfo,
      image: formInfo.certificateImage,
    };

    try {
      await API().save(body);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,

      [evt.target.name]: evt.target.checked,
    }));
  };

  const onColorInputChange = (evt) => setFormInfo((prev) => ({ ...prev, textColor: evt.target.value }));

  const onColorPickerChange = (color) => setFormInfo((prev) => ({ ...prev, textColor: color.hex }));

  const drawCertificate = async () => {
    if (canvasRef?.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Set default alignment
      ctx.textAlign = 'left';

      // Store both canvas width and height
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;

      // Draw image as background
      ctx.drawImage(certificateImage, 0, 0, canvasWidth, canvasHeight);

      // Employee Name
      // set employee name style
      ctx.font = `${formInfo.nameFontSize}px Cairo`;
      ctx.fillStyle = formInfo.textColor;

      // Calculate employee name width if isCenter not provide
      let employeeNameWidth = formInfo.xdirectionName;
      if (formInfo.nameInCenter) {
        const textWidth = ctx.measureText(certificateInfo.employeeName).width;
        employeeNameWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw employee name
      ctx.fillText(
        certificateInfo.employeeName,
        employeeNameWidth,
        formInfo.ydirectionName
      );

      // Course Name
      // set course name style
      let courseNameWidth = formInfo.xdirectionCourse;
      ctx.font = `${formInfo.courseFontSize}px Cairo`;

      // Calculate course name width if isCenter not provide
      if (formInfo.courseInCenter) {
        const textWidth = ctx.measureText(certificateInfo.courseName).width;
        courseNameWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw Course name
      ctx.fillText(
        certificateInfo.courseName,
        courseNameWidth,
        formInfo.ydirectionCourse
      );

      // Course Date
      // set course date style
      ctx.font = `${formInfo.dateFontSize}px Cairo`;

      // Calculate course date width if isCenter not provide
      let accomplishDateWidth = formInfo.xdirectionDate;
      if (formInfo.dateInCenter) {
        const textWidth = ctx.measureText(certificateInfo.accomplishDate).width;
        accomplishDateWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw Course date
      ctx.fillText(
        certificateInfo.accomplishDate,
        accomplishDateWidth,
        formInfo.ydirectionDate
      );
    }
  };

  useEffect(() => {
    drawCertificate();
  }, [formInfo, certificateImage]);

  const onCertificateInputChange = (evt) => {
    // check if uploaded file is larger than 1MB
    if (evt.target.files[0]) {
      if (evt.target.files[0].size < 10000000) {
        setFormInfo((prev) => ({
          ...prev,
          certificateImage: evt.target.files?.[0],
        }));

        const image = new Image();
        image.src = URL.createObjectURL(evt.target.files[0]);
        image.crossOrigin = 'anonymous';
        image.onload = async () => {
          setCertificateImage(image);
        };

        // to trigger onChange on the same file select
        evt.target.value = '';
      } else {
        toast.error(intl.formatMessage(vacationMessages.uploadFileErrorMes));
      }
    }
  };

  return (
    <>
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <TextField
                      name='textColor'
                      label={intl.formatMessage(messages.textColor)}
                      variant='outlined'
                      autoComplete='off'
                      value={formInfo.textColor}
                      onChange={onColorInputChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='start'>
                            <IconButton
                              onClick={(evt) => {
                                setAnchorEl(evt.currentTarget);
                              }}
                            >
                              <ColorizeIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                    >
                      <SketchPicker
                        color={formInfo.textColor}
                        onChangeComplete={onColorPickerChange}
                      />
                    </Popover>
                  </Grid>

                  <Grid item>
                    <input
                      accept='image/*'
                      id='attachment-button-file'
                      type='file'
                      style={{ display: 'none' }}
                      onChange={onCertificateInputChange}
                    />
                    <label htmlFor='attachment-button-file'>
                      <Button variant='contained' component='span'>
                        {intl.formatMessage(messages.uploadCertificate)}
                      </Button>
                    </label>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: '16px!important' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {intl.formatMessage(messages.fontSize)}
                    </Typography>

                    <Grid container spacing={2} mt={0}>
                      <Grid item xs={6} md={4}>
                        <TextField
                          name='nameFontSize'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.nameFontSize}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='courseFontSize'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.courseFontSize}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='dateFontSize'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.dateFontSize}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: '16px!important' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {intl.formatMessage(messages.isCenter)}
                    </Typography>

                    <Grid container spacing={2} mt={0}>
                      <Grid item xs={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formInfo.nameInCenter}
                              onChange={onCheckboxChange}
                              name='nameInCenter'
                            />
                          }
                          label={intl.formatMessage(messages.employeeName)}
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formInfo.courseInCenter}
                              onChange={onCheckboxChange}
                              name='courseInCenter'
                            />
                          }
                          label={intl.formatMessage(messages.courseName)}
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formInfo.dateInCenter}
                              onChange={onCheckboxChange}
                              name='dateInCenter'
                            />
                          }
                          label={intl.formatMessage(messages.accomplishDate)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: '16px!important' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {intl.formatMessage(messages.xDirection)}
                    </Typography>

                    <Grid container spacing={2} mt={0}>
                      <Grid item xs={6} md={4}>
                        <TextField
                          name='xdirectionName'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.xdirectionName}
                          onChange={onInputChange}
                          disabled={formInfo.nameInCenter}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='xdirectionCourse'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.xdirectionCourse}
                          disabled={formInfo.courseInCenter}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='xdirectionDate'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.xdirectionDate}
                          disabled={formInfo.dateInCenter}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: '16px!important' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {intl.formatMessage(messages.yDirection)}
                    </Typography>

                    <Grid container spacing={2} mt={0}>
                      <Grid item xs={6} md={4}>
                        <TextField
                          name='ydirectionName'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.ydirectionName}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='ydirectionCourse'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.ydirectionCourse}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='ydirectionDate'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={formInfo.ydirectionDate}
                          onChange={onInputChange}
                          autoComplete='off'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  {intl.formatMessage(payrollMessages.save)}
                </Button>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>
      </PayRollLoader>

      <PapperBlock
        whiteBg
        icon='border_color'
        title={intl.formatMessage(payrollMessages.preview)}
        desc=''
      >
        {!formInfo.certificateImage && !certificateImage.src ? (
          <Stack
            direction='row'
            sx={{ minHeight: 200 }}
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <Box>
              <PermMediaIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
              <Typography color='#a7acb2' variant='body1'>
                {intl.formatMessage(
                  isLoading
                    ? payrollMessages.loading
                    : messages.noCertificateFoundPleaseUploadCertificate
                )}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ overflow: 'auto' }}>
            <canvas ref={canvasRef} height='350px' width='500px'></canvas>
          </Box>
        )}
      </PapperBlock>
    </>
  );
}

CertificateSetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CertificateSetting);
