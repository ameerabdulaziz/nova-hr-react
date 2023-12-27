import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/UploadAssessmentGuidelinesData';
import messages from '../messages';

function UploadAssessmentGuidelines(props) {
  const { intl } = props;

  // const locale = useSelector((state) => state.language.locale);

  const title = localStorage.getItem('MenuName');

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    competency: null,
    competencyAr: null,
    rating: null,
    performance: null,
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api().save(formInfo);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getAttachmentType = (file) => {
    if (file && typeof file === 'string') {
      return file.split('.')?.pop().toLowerCase().trim();
    }

    if (file instanceof File) {
      return file.type;
    }

    return null;
  };

  const onDocumentInputChange = (evt, fileName) => {
    const file = evt.target.files[0];

    if (file) {
      // check if uploaded file is larger than 1MB
      if (file.size < 10000000) {
        const extension = getAttachmentType(file);

        if (extension === 'application/pdf') {
          if (file.name === fileName + '.pdf') {
            setFormInfo(prev => ({ ...prev, [evt.target.name]: file }));
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

      <form onSubmit={onFormSubmit} >
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <Grid container spacing={3} mt={0} >
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3} >{intl.formatMessage(messages.competenciesGuideline)}</Typography>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <div>
                      <input
                        accept="application/pdf"
                        id="competency-attachment-button-file"
                        name='competency'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={evt => onDocumentInputChange(evt, 'Competency')}
                      />
                      <label htmlFor="competency-attachment-button-file">
                        <Button variant="contained" component="span">
                          <FormattedMessage
                            {...messages.upload}
                          />
                        </Button>
                      </label>
                    </div>

                    {formInfo.competency && (
                      <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.competency)} >
                        <FormattedMessage
                          {...messages.preview}
                        />
                      </Button>
                    )}
                  </Stack>

                  <Stack direction="row" alignItems="center" mt={2} spacing={2}>
                    <div>
                      <input
                        accept="application/pdf"
                        id="competencyAr-attachment-button-file"
                        name='competencyAr'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={evt => onDocumentInputChange(evt, 'CompetencyAr')}
                      />
                      <label htmlFor="competencyAr-attachment-button-file">
                        <Button variant="contained" component="span">
                          <FormattedMessage
                            {...messages.uploadAr}
                          />
                        </Button>
                      </label>
                    </div>

                    {formInfo.competencyAr && (
                      <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.competencyAr)}>
                        <FormattedMessage
                          {...messages.preview}
                        />
                      </Button>
                    )}
                  </Stack>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3} >{intl.formatMessage(messages.rating)}</Typography>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <div>
                      <input
                        accept="application/pdf"
                        id="rating-attachment-button-file"
                        name='rating'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={evt => onDocumentInputChange(evt, 'Rating')}
                      />
                      <label htmlFor="rating-attachment-button-file">
                        <Button variant="contained" component="span">
                          <FormattedMessage
                            {...messages.upload}
                          />
                        </Button>
                      </label>
                    </div>

                    {formInfo.rating && (
                      <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.rating)}>
                        <FormattedMessage
                          {...messages.preview}
                        />
                      </Button>
                    )}
                  </Stack>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3} >{intl.formatMessage(messages.performanceAppraisalPurpose)}</Typography>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <div>
                      <input
                        accept="application/pdf"
                        id="performance-attachment-button-file"
                        name='performance'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={evt => onDocumentInputChange(evt, 'Performance')}
                      />
                      <label htmlFor="performance-attachment-button-file">
                        <Button variant="contained" component="span">
                          <FormattedMessage
                            {...messages.upload}
                          />
                        </Button>
                      </label>
                    </div>

                    {formInfo.performance && (
                      <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.performance)}>
                        <FormattedMessage
                          {...messages.preview}
                        />
                      </Button>
                    )}
                  </Stack>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} mt={4} >
              <Button
                variant='contained'
                type='submit'
                size='medium'
                color='secondary'
              >
                <FormattedMessage {...payrollMessages.save} />
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

UploadAssessmentGuidelines.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UploadAssessmentGuidelines);
