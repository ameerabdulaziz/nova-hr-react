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
    </PayRollLoader>
  );
}

AssessmentGuidelines.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AssessmentGuidelines);
