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
import notif from 'enl-api/ui/notifMessage';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../../Component/PayRollLoader';
import settingMessages from '../../../Setting/messages';
import vacationMessages from '../../../Vacation/messages';
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import api from '../../api/TrTrainingTrxListData';
import messages from '../../messages';

function PreviewCertificatePopup(props) {
  const {
    intl, isOpen, onClose, selectedEmployee, certificateInfo
  } = props;

  const canvasRef = useRef(null);

  const locale = useSelector((state) => state.language.locale);

  const [uploadOption, setUploadOption] = useState('uploadCreated');
  const [uploadedCertificate, setUploadedCertificate] = useState(null);
  const [createdCertificate, setCreatedCertificate] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [previewImageURL, setPreviewImageURL] = useState('');

  // Function to load the image
  const loadImage = (src) => {
    const imagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });

    return imagePromise;
  };

  // Function to draw the background image
  const drawBackground = (ctx, options) => {
    const { image, canvasWidth, canvasHeight } = options;

    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  };

  // Function to draw text on the canvas
  const drawText = (ctx, options) => {
    const {
      text, fontSize, textColor, y, xDirection, canvasWidth, isCenter
    } = options;

    ctx.font = `${fontSize}px DINNextLTArabic`;
    ctx.fillStyle = textColor;

    let x = xDirection;

    if (isCenter) {
      const textWidth = ctx.measureText(text).width;
      x = canvasWidth / 2 - textWidth / 2;
    }
    ctx.fillText(text, x, y);
  };

  // Function to create a PDF from the canvas
  const createPDF = async (canvas) => {
    const canvasImage = await html2canvas(canvas);
    const imgData = canvasImage.toDataURL('image/png');
    const pdf = new JsPDF({
      orientation: 'landscape',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

    const blob = pdf.output('blob');

    const file = new File([blob], 'certificate.pdf', { type: 'application/pdf' });

    return file;
  };

  const drawCertificate = async () => {
    // Start loading
    setIsLoading(true);

    // Load the image
    const image = await loadImage(certificateInfo.certificateImage);

    const ctx = canvasRef.current.getContext('2d');

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    // Draw the background image
    drawBackground(ctx, {
      image,
      canvasWidth,
      canvasHeight,
    });

    // Draw the employee name
    drawText(ctx, {
      text: selectedEmployee.employeeName,
      fontSize: certificateInfo.nameFontSize,
      textColor: certificateInfo.textColor,
      y: certificateInfo.ydirectionName,
      xDirection: certificateInfo.xdirectionName,
      canvasWidth,
      isCenter: certificateInfo.nameInCenter,
    });

    // Draw the course name
    drawText(ctx, {
      text: selectedEmployee.courseName,
      fontSize: certificateInfo.courseFontSize,
      textColor: certificateInfo.textColor,
      y: certificateInfo.ydirectionCourse,
      xDirection: certificateInfo.xdirectionCourse,
      canvasWidth,
      isCenter: certificateInfo.courseInCenter,
    });

    // Draw the course date
    drawText(ctx, {
      text: formateDate(selectedEmployee.toDate),
      fontSize: certificateInfo.dateFontSize,
      textColor: certificateInfo.textColor,
      y: certificateInfo.ydirectionDate,
      xDirection: certificateInfo.xdirectionDate,
      canvasWidth,
      isCenter: certificateInfo.dateInCenter,
    });

    // Create the certificate PDF
    const file = await createPDF(canvasRef.current);
    setCreatedCertificate(file);

    // Stop loading
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      // wait until canvas is rendered before drawing
      setTimeout(() => {
        if (canvasRef) {
          drawCertificate();
        }
      }, 0);
    }
  }, [isOpen]);

  const onCloseBtnClick = () => {
    onClose();
  };

  const onSaveBtnClick = async () => {
    setIsLoading(true);

    try {
      const body = {
        certificate: uploadOption === 'uploadCreated' ? createdCertificate : uploadedCertificate,
      };

      await api(locale).saveCertificate(selectedEmployee.trainingEmpId, body);

      toast.success(notif.saved);

      // true is to pre-fetch employee again
      onClose(true);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onCertificateInputChange = (evt) => {
    // check if uploaded file is larger than 1MB
    if (evt.target.files[0]) {
      if (evt.target.files[0].size < 10000000) {
        setUploadedCertificate(evt.target.files?.[0]);

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
        <PayRollLoader isLoading={isLoading}>
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
            />

            {uploadOption === 'uploadFromDevice' && (
              <>
                <input
                  accept='image/*, application/pdf'
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

                {uploadedCertificate && (
                  <img
                    src={previewImageURL}
                    alt='certificate'
                    style={{
                      width: '500px',
                      height: '350px',
                      marginTop: '10px',
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </PayRollLoader>
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
