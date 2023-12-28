import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import { ServerURL } from '../../api/ServerConfig';
import api from '../api/UploadAssessmentGuidelinesData';
import messages from '../messages';

function AssessmentGuidelines(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    competency: false,
    competencyAr: false,
    rating: false,
    performance: false,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const response = await api().CheckFileExists();
      setFormInfo(response);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onPreviewPopupClose = () => {
    setIsPreviewPopupOpen(false);
  };

  const openPreviewPopup = (item) => {
    setUploadedFile(item);
    setIsPreviewPopupOpen(true);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <FileViewerPopup
        handleClose={onPreviewPopupClose}
        open={isPreviewPopupOpen}
        uploadedFileType='pdf'
        uploadedFile={`${ServerURL}Doc/Assessment/${uploadedFile}.pdf`}
        validImageTypes={[]}
        validPDFTypes={['pdf']}
      />

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
                    <IconButton
                      disabled={!formInfo.competency}
                      onClick={() => openPreviewPopup('Competency')}
                    >
                      <VisibilityIcon />
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
                    <IconButton
                      disabled={!formInfo.competencyAr}
                      onClick={() => openPreviewPopup('CompetencyAr')}
                    >
                      <VisibilityIcon />
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
                    <IconButton
                      disabled={!formInfo.rating}
                      onClick={() => openPreviewPopup('Rating')}
                    >
                      <VisibilityIcon />
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
                    <IconButton
                      disabled={!formInfo.performance}
                      onClick={() => openPreviewPopup('Performance')}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </PapperBlock>

      {/* <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container spacing={3} mt={0}>
          {!formInfo.competency
            && !formInfo.competencyAr
            && !formInfo.rating
            && !formInfo.performance && (
            <Grid item xs={12}>
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
                    {intl.formatMessage(messages.noFilesUploaded)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          )}

          {(formInfo.competency || formInfo.competencyAr) && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3}>
                    {intl.formatMessage(messages.competenciesGuideline)}
                  </Typography>

                  <Stack direction='row' alignItems='center' spacing={2}>
                    {formInfo.competency && (
                      <Button
                        variant='contained'
                        color='secondary'
                        component='span'
                        onClick={() => openPreviewPopup('Competency')}
                      >
                        <FormattedMessage {...messages.preview} />
                      </Button>
                    )}

                    {formInfo.competencyAr && (
                      <Button
                        variant='contained'
                        color='secondary'
                        component='span'
                        onClick={() => openPreviewPopup('CompetencyAr')}
                      >
                        <FormattedMessage {...messages.preview} />
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}

          {formInfo.rating && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3}>
                    {intl.formatMessage(messages.rating)}
                  </Typography>

                  <Button
                    variant='contained'
                    color='secondary'
                    component='span'
                    onClick={() => openPreviewPopup('Rating')}
                  >
                    <FormattedMessage {...messages.preview} />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}

          {formInfo.performance && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ p: '16px!important' }}>
                  <Typography variant='h6' mb={3}>
                    {intl.formatMessage(messages.performanceAppraisalPurpose)}
                  </Typography>

                  <Button
                    variant='contained'
                    color='secondary'
                    component='span'
                    onClick={() => openPreviewPopup('Performance')}
                  >
                    <FormattedMessage {...messages.preview} />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </PapperBlock> */}
    </PayRollLoader>
  );
}

AssessmentGuidelines.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AssessmentGuidelines);
