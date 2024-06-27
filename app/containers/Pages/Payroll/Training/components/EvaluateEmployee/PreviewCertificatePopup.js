import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import settingMessages from '../../../Setting/messages';
import vacationMessages from '../../../Vacation/messages';
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function PreviewCertificatePopup(props) {
  const {
    intl, isOpen, onClose, selectedEmployee, certificateInfo
  } = props;

  const canvasRef = useRef(null);

  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const [uploadOption, setUploadOption] = useState('uploadFromDevice');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [createdCertificate, setCreatedCertificate] = useState(null);

  const [previewImageURL, setPreviewImageURL] = useState('')

  const drawCertificate = async () => {
    console.log(canvasRef?.current);
    if (canvasRef?.current) {
      const image = new Image();
      image.src = certificateInfo.certificateImage;
      image.crossOrigin = 'anonymous';

      image.onload = async () => {
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
        ctx.font = `${certificateInfo.nameFontSize}px Cairo`;
        ctx.fillStyle = certificateInfo.textColor;

        // Calculate employee name width if isCenter not provide
        let employeeNameWidth = certificateInfo.xdirectionName;
        if (certificateInfo.nameInCenter) {
          const textWidth = ctx.measureText(
            selectedEmployee.employeeName
          ).width;
          employeeNameWidth = canvasWidth / 2 - textWidth / 2;
        }

        // Draw employee name
        ctx.fillText(
          selectedEmployee.employeeName,
          employeeNameWidth,
          certificateInfo.ydirectionName
        );

        // Course Name
        // set course name style
        let courseNameWidth = certificateInfo.xdirectionCourse;
        ctx.font = `${certificateInfo.courseFontSize}px Cairo`;

        // Calculate course name width if isCenter not provide
        if (certificateInfo.courseInCenter) {
          const textWidth = ctx.measureText(selectedEmployee.courseName).width;
          courseNameWidth = canvasWidth / 2 - textWidth / 2;
        }

        // Draw Course name
        ctx.fillText(
          selectedEmployee.courseName,
          courseNameWidth,
          certificateInfo.ydirectionCourse
        );

        // Course Date
        // set course date style
        ctx.font = `${certificateInfo.dateFontSize}px Cairo`;

        // Calculate course date width if isCenter not provide
        let accomplishDateWidth = certificateInfo.xdirectionDate;
        if (certificateInfo.dateInCenter) {
          const textWidth = ctx.measureText(
            selectedEmployee.accomplishDate
          ).width;
          accomplishDateWidth = canvasWidth / 2 - textWidth / 2;
        }

        // Draw Course date
        ctx.fillText(
          formateDate(selectedEmployee.toDate),
          accomplishDateWidth,
          certificateInfo.ydirectionDate
        );

        const canvas = await html2canvas(canvasRef?.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

        const file = pdf.output('blob');

        console.log(file);

        setCreatedCertificate(file);
      };
    }
  };

  useEffect(() => {
    if (isOpen && !createdCertificate) {
      drawCertificate();
    }
  }, [isOpen, uploadOption]);

  const onCloseBtnClick = () => {
    onClose(false);
  };

  const onSaveBtnClick = async () => {
    const title = `${selectedEmployee.employeeName} ${today}`;

    console.log(uploadedImage, createdCertificate, title);
  };

  const onCertificateInputChange = (evt) => {
    // check if uploaded file is larger than 1MB
    if (evt.target.files[0]) {
      if (evt.target.files[0].size < 10000000) {
        setUploadedImage(evt.target.files?.[0]);

        setPreviewImageURL(URL.createObjectURL(evt.target.files[0]));

        // to trigger onChange on the same file select
        evt.target.value = '';
      } else {
        toast.error(intl.formatMessage(vacationMessages.uploadFileErrorMes));
      }
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        {intl.formatMessage(messages.createCertificate)}
      </DialogTitle>

      <DialogContent>
        <FormControl>
          <FormLabel>
            {intl.formatMessage(messages.selectUploadOption)}
          </FormLabel>
          <RadioGroup
            row
            value={uploadOption}
            onChange={(evt) => setUploadOption(evt.target.value)}
            name='uploadOption'
          >
            <FormControlLabel
              value='uploadCreated'
              control={<Radio />}
              label={intl.formatMessage(messages.uploadCreatedCertificate)}
            />

            <FormControlLabel
              value='uploadFromDevice'
              control={<Radio />}
              label={intl.formatMessage(messages.uploadFromDevice)}
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <canvas
            ref={canvasRef}
            height='350px'
            width='500px'
            style={{
              display: uploadOption === 'uploadCreated' ? 'block' : 'none',
            }}
          ></canvas>

          {uploadOption === 'uploadFromDevice' && (
            <>
              <input
                accept='image/*'
                id='attachment-button-file'
                type='file'
                style={{ display: 'none' }}
                onChange={onCertificateInputChange}
              />

              <label htmlFor='attachment-button-file'>
                <Button variant='contained' component='span'>
                  {intl.formatMessage(settingMessages.uploadCertificate)}
                </Button>
              </label>

              <br />

              {uploadedImage && (
                <img
                  src={previewImageURL}
                  alt='certificate'
                  style={{ width: '500px', height: '350px', marginTop: '10px' }}
                />
              )}
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCloseBtnClick}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>

        <Button variant='contained' onClick={onSaveBtnClick}>
          {intl.formatMessage(payrollMessages.Upload)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PreviewCertificatePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  certificateInfo: PropTypes.object.isRequired,
};

export default injectIntl(PreviewCertificatePopup);
