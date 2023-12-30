import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, IconButton, Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import { ServerURL } from '../../api/ServerConfig';
import payrollMessages from '../../messages';
import api from '../api/UploadAssessmentGuidelinesData';
import messages from '../messages';

function UploadAssessmentGuidelines(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    Competency: '',
    CompetencyAr: '',
    Rating: '',
    Performance: '',
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const fd = new FormData();

    Object.entries(formInfo)
      .filter((item) => Boolean(item[1]))
      .forEach(([fileName, file], index) => {
        fd.append(`GuidelinesViewModel[${index}].DocumentName`, fileName);
        fd.append(
          `GuidelinesViewModel[${index}].Document`,
          file instanceof File ? file : null
        );
      });

    try {
      await api().save(fd);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const response = await api().CheckFileExists();

      setFormInfo({
        Competency: response.competency
          ? `${ServerURL}Doc/Assessment/Competency.pdf`
          : '',
        CompetencyAr: response.competencyAr
          ? `${ServerURL}Doc/Assessment/CompetencyAr.pdf`
          : '',
        Rating: response.rating ? `${ServerURL}Doc/Assessment/Rating.pdf` : '',
        Performance: response.performance
          ? `${ServerURL}Doc/Assessment/Performance.pdf`
          : '',
      });
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const getAttachmentType = (file) => {
    if (file && typeof file === 'string') {
      return file.split('.')?.pop().toLowerCase().trim();
    }

    if (file instanceof File) {
      return file.type;
    }

    return null;
  };

  const onDocumentInputChange = (evt) => {
    const file = evt.target.files[0];
    const fileName = evt.target.name;

    if (file) {
      // check if uploaded file is larger than 1MB
      if (file.size < 10000000) {
        const extension = getAttachmentType(file);

        if (extension === 'application/pdf') {
          if (file.name === fileName + '.pdf') {
            setFormInfo((prev) => ({ ...prev, [evt.target.name]: file }));
          } else {
            toast.error(intl.formatMessage(messages.invalidFileName));
          }
        } else {
          toast.error(intl.formatMessage(messages.fileExtensionShouldBePdf));
        }
      } else {
        toast.error(intl.formatMessage(messages.fileSizeShouldBeLessThan10MB));
      }
    }
  };

  const onPreviewPopupClose = () => {
    setIsPreviewPopupOpen(false);
  };

  const openPreviewPopup = (item) => {
    setIsPreviewPopupOpen(true);
    setUploadedFile(item);
  };

  const deleteFile = async (item) => {
    setFormInfo((prev) => ({ ...prev, [item]: null }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <FileViewerPopup
        handleClose={onPreviewPopupClose}
        open={isPreviewPopupOpen}
        uploadedFileType='pdf'
        uploadedFile={uploadedFile}
        validImageTypes={[]}
        validPDFTypes={['pdf']}
      />

      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <TableContainer>
            <Table size='small' sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>{intl.formatMessage(messages.title)}</TableCell>

                  <TableCell sx={{ width: 150 }}>
                    {intl.formatMessage(messages.actions)}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    {intl.formatMessage(messages.competenciesGuideline)}
                  </TableCell>

                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <div>
                        <input
                          accept='application/pdf'
                          id='competency-attachment-button-file'
                          name='Competency'
                          type='file'
                          onChange={onDocumentInputChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor='competency-attachment-button-file'>
                          <IconButton component='span'>
                            <CloudUploadIcon />
                          </IconButton>
                        </label>
                      </div>

                      <IconButton
                        disabled={!formInfo.Competency}
                        onClick={() => openPreviewPopup(formInfo.Competency)}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color='error'
                        disabled={!formInfo.Competency}
                        onClick={() => deleteFile('Competency')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    {intl.formatMessage(messages.arabicCompetenciesGuideline)}
                  </TableCell>

                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <div>
                        <input
                          accept='application/pdf'
                          id='competencyAr-attachment-button-file'
                          name='CompetencyAr'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={onDocumentInputChange}
                        />
                        <label htmlFor='competencyAr-attachment-button-file'>
                          <IconButton component='span'>
                            <CloudUploadIcon />
                          </IconButton>
                        </label>
                      </div>

                      <IconButton
                        disabled={!formInfo.CompetencyAr}
                        onClick={() => openPreviewPopup(formInfo.CompetencyAr)}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color='error'
                        disabled={!formInfo.CompetencyAr}
                        onClick={() => deleteFile('CompetencyAr')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>{intl.formatMessage(messages.rating)}</TableCell>

                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <div>
                        <input
                          accept='application/pdf'
                          id='rating-attachment-button-file'
                          name='Rating'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={onDocumentInputChange}
                        />
                        <label htmlFor='rating-attachment-button-file'>
                          <IconButton component='span'>
                            <CloudUploadIcon />
                          </IconButton>
                        </label>
                      </div>

                      <IconButton
                        disabled={!formInfo.Rating}
                        onClick={() => openPreviewPopup(formInfo.Rating)}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color='error'
                        disabled={!formInfo.Rating}
                        onClick={() => deleteFile('Rating')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    {intl.formatMessage(messages.performanceAppraisalPurpose)}
                  </TableCell>

                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <div>
                        <input
                          accept='application/pdf'
                          id='performance-attachment-button-file'
                          name='Performance'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={onDocumentInputChange}
                        />
                        <label htmlFor='performance-attachment-button-file'>
                          <IconButton component='span'>
                            <CloudUploadIcon />
                          </IconButton>
                        </label>
                      </div>

                      <IconButton
                        disabled={!formInfo.Performance}
                        onClick={() => openPreviewPopup(formInfo.Performance)}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color='error'
                        disabled={!formInfo.Performance}
                        onClick={() => deleteFile('Performance')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant='contained'
            type='submit'
            size='medium'
            color='secondary'
          >
            <FormattedMessage {...payrollMessages.save} />
          </Button>
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

UploadAssessmentGuidelines.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UploadAssessmentGuidelines);
