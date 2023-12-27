import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import messages from '../messages';

function AssessmentGuidelines(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formInfo, setFormInfo] = useState({
    competency: null,
    competencyAr: null,
    rating: null,
    performance: null,
  });

  const onPreviewPopupClose = () => {
    setIsPreviewPopupOpen(false);
  };

  const openPreviewPopup = (item) => {
    setIsPreviewPopupOpen(true);
    setUploadedFile(item);
  };

  return (
    <>
      <FileViewerPopup
        handleClose={onPreviewPopupClose}
        open={isPreviewPopupOpen}
        uploadedFileType='pdf'
        uploadedFile={uploadedFile}
        validImageTypes={[]}
        validPDFTypes={['pdf']}
      />

      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container spacing={3} mt={0} >
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6' mb={3} >{intl.formatMessage(messages.competenciesGuideline)}</Typography>

                <Stack direction="row" alignItems="center" spacing={2}>

                  <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.competency)} >
                    <FormattedMessage
                      {...messages.preview}
                    />
                  </Button>

                  <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.competencyAr)}>
                    <FormattedMessage
                      {...messages.preview}
                    />
                  </Button>
                </Stack>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6' mb={3} >{intl.formatMessage(messages.rating)}</Typography>

                <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.rating)}>
                  <FormattedMessage
                    {...messages.preview}
                  />
                </Button>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6' mb={3} >{intl.formatMessage(messages.performanceAppraisalPurpose)}</Typography>

                <Button variant="contained" color='secondary' component="span" onClick={() => openPreviewPopup(formInfo.performance)}>
                  <FormattedMessage
                    {...messages.preview}
                  />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PapperBlock>
    </>
  );
}

AssessmentGuidelines.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AssessmentGuidelines);
