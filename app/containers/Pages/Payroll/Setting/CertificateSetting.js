import ColorizeIcon from '@mui/icons-material/Colorize';
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
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import PayRollLoader from '../Component/PayRollLoader';
import { formateDate } from '../helpers';
import payrollMessages from '../messages';
import messages from './messages';

const DUMMY_CERTIFICATE =	'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/alabaster-and-whisper-blank-certificate-template-ozxhgp391b566b.webp';

function CertificateSetting(props) {
  const { intl } = props;

  const canvasRef = useRef(null);

  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const [anchorEl, setAnchorEl] = useState(null);

  const [image, setImage] = useState(() => {
    const img = new Image();
    img.src = DUMMY_CERTIFICATE;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      drawCertificate();
    };

    return img;
  });

  // const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(false);

  const [directions, setDirections] = useState({
    x: {
      employeeName: 120,
      courseName: 75,
      accomplishDate: 320,
    },
    y: {
      employeeName: 200,
      courseName: 290,
      accomplishDate: 290,
    },
  });

  const [styles, setStyles] = useState({
    fontSize: {
      employeeName: 24,
      courseName: 18,
      accomplishDate: 14,
    },
    isCenter: {
      employeeName: true,
      courseName: false,
      accomplishDate: false,
    },
    color: '#ddbb07',
  });

  const [certificateInfo, setCertificateInfo] = useState({
    employeeName: 'محمد تيسير لطفي',
    courseName: 'Wire-shark Basics',
    accomplishDate: new Date(),
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    console.log({
      directions,
      styles,
      certificateInfo,
    });

    setIsLoading(true);
    try {
      // const response = await api(locale).getEmployeeInfo(formInfo.EmployeeId);
      // setEmployeeInfo(response);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onIsCenterCheckboxChange = (evt) => {
    setStyles((prev) => ({
      ...prev,
      isCenter: {
        ...prev.isCenter,
        [evt.target.name]: evt.target.checked,
      },
    }));
  };

  const onFontSizeInputChange = (evt) => {
    setStyles((prev) => ({
      ...prev,
      fontSize: {
        ...prev.fontSize,
        [evt.target.name]: evt.target.value,
      },
    }));
  };

  const onXDirectionInputChange = (evt) => {
    setDirections((prev) => ({
      ...prev,
      x: {
        ...prev.x,
        [evt.target.name]: evt.target.value,
      },
    }));
  };

  const onYDirectionInputChange = (evt) => {
    setDirections((prev) => ({
      ...prev,
      y: {
        ...prev.y,
        [evt.target.name]: evt.target.value,
      },
    }));
  };

  const onColorInputChange = (evt) => setStyles((prev) => ({ ...prev, color: evt.target.value }));

  const onColorPickerChange = (color) => setStyles((prev) => ({ ...prev, color: color.hex }));

  const drawCertificate = () => {
    if (canvasRef?.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Set default alignment
      ctx.textAlign = 'left';

      // Store both canvas width and height
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;

      // Draw image as background
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      // Employee Name
      // set employee name style
      ctx.font = `${styles.fontSize.employeeName}px Cairo`;
      ctx.fillStyle = styles.color;

      // Calculate employee name width if isCenter not provide
      let employeeNameWidth = directions.x.employeeName;
      if (styles.isCenter.employeeName) {
        const textWidth = ctx.measureText(certificateInfo.employeeName).width;
        employeeNameWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw employee name
      ctx.fillText(
        certificateInfo.employeeName,
        employeeNameWidth,
        directions.y.employeeName
      );

      // Course Name
      // set course name style
      let courseNameWidth = directions.x.courseName;
      ctx.font = `${styles.fontSize.courseName}px Cairo`;

      // Calculate course name width if isCenter not provide
      if (styles.isCenter.courseName) {
        const textWidth = ctx.measureText(certificateInfo.courseName).width;
        courseNameWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw course name
      ctx.fillText(
        certificateInfo.courseName,
        courseNameWidth,
        directions.y.courseName
      );

      // Course Date
      // set course date style
      const accomplishDate = formateDate(certificateInfo.accomplishDate);
      ctx.font = `${styles.fontSize.accomplishDate}px Cairo`;

      // Calculate course date width if isCenter not provide
      let accomplishDateWidth = directions.x.accomplishDate;
      if (styles.isCenter.accomplishDate) {
        const textWidth = ctx.measureText(accomplishDate).width;
        accomplishDateWidth = canvasWidth / 2 - textWidth / 2;
      }

      // Draw course date
      ctx.fillText(
        accomplishDate,
        accomplishDateWidth,
        directions.y.accomplishDate
      );
    }
  };

  useEffect(() => {
    drawCertificate();
  }, [styles, directions, certificateInfo]);

  const onCanvasClick = () => {
    if (canvasRef?.current) {
      let downloadURI = canvasRef.current.toDataURL('image/png');
      const title = `${today} Certificate`;

      html2canvas(canvasRef?.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        downloadURI = imgData;
        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        pdf.save(`${title}.pdf`);
      });

      // Create dummy "a" link to download the file
      const link = document.createElement('a');
      link.setAttribute('href', downloadURI);
      link.setAttribute('download', `${title}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadURI);
    }
  };

  return (
    <>
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
          <form onSubmit={onFormSubmit}>
            {/* <button onClick={onCanvasClick} type='button'>
              Download
            </button> */}

            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <TextField
                      name='textColor'
                      label={intl.formatMessage(messages.textColor)}
                      variant='outlined'
                      autoComplete='off'
                      value={styles.color}
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
                        color={styles.color}
                        onChangeComplete={onColorPickerChange}
                      />
                    </Popover>
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
                          name='employeeName'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={styles.fontSize.employeeName}
                          onChange={onFontSizeInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='courseName'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={styles.fontSize.courseName}
                          onChange={onFontSizeInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='accomplishDate'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={styles.fontSize.accomplishDate}
                          onChange={onFontSizeInputChange}
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
                              checked={styles.isCenter.employeeName}
                              onChange={onIsCenterCheckboxChange}
                              name='employeeName'
                            />
                          }
                          label={intl.formatMessage(messages.employeeName)}
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={styles.isCenter.courseName}
                              onChange={onIsCenterCheckboxChange}
                              name='courseName'
                            />
                          }
                          label={intl.formatMessage(messages.courseName)}
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={styles.isCenter.accomplishDate}
                              onChange={onIsCenterCheckboxChange}
                              name='accomplishDate'
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
                          name='employeeName'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.x.employeeName}
                          onChange={onXDirectionInputChange}
                          disabled={styles.isCenter.employeeName}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='courseName'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.x.courseName}
                          disabled={styles.isCenter.courseName}
                          onChange={onXDirectionInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='accomplishDate'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.x.accomplishDate}
                          disabled={styles.isCenter.accomplishDate}
                          onChange={onXDirectionInputChange}
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
                          name='employeeName'
                          label={intl.formatMessage(messages.employeeName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.y.employeeName}
                          onChange={onYDirectionInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='courseName'
                          label={intl.formatMessage(messages.courseName)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.y.courseName}
                          onChange={onYDirectionInputChange}
                          autoComplete='off'
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <TextField
                          name='accomplishDate'
                          label={intl.formatMessage(messages.accomplishDate)}
                          variant='outlined'
                          inputProps={{
                            min: 0,
                          }}
                          type='number'
                          value={directions.y.accomplishDate}
                          onChange={onYDirectionInputChange}
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
        <Box sx={{ overflow: 'auto' }}>
          <canvas ref={canvasRef} height='350px' width='500px'></canvas>
        </Box>
      </PapperBlock>
    </>
  );
}

CertificateSetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CertificateSetting);
