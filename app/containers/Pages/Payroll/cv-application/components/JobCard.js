import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import messages from '../messages';

function JobCard(props) {
  const { job, intl } = props;
  const history = useHistory();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onOpenPopupBtnClick = () => {
    setIsPopupOpen(true);
  };

  const onTitleClick = () => {
    history.push('/public/JobVacation/Application/', {
      id: job.id
    });
  };

  return (
    <div className='cv-job-card'>
      <div onClick={onTitleClick} className='title'>
        {job.job}
      </div>

      <Stack direction='row' gap={1} alignItems='center'>
        <Typography variant='body2' color='gray'>
          {job.jobAdvertisementCode}
        </Typography>

        <Divider orientation='vertical' flexItem />

        <Typography variant='body2' color='gray'>
          {job.organizationName}
        </Typography>

      </Stack>

      <Typography variant='body2' color='gray'>
        {job.experiance} {intl.formatMessage(messages.yearsOfExperience)}
      </Typography>

      <Typography variant='body2' mt={2}>
        {job.jobDescription.substr(0, 80)}
      </Typography>

      {job.jobRequirementList.length > 0 && (
        <Stack
          mt={2}
          direction='row'
          gap={1}
          alignItems='center'
          flexWrap='wrap'
        >
          {job.jobRequirementList.slice(0, 5).map((item, index) => (
            <Chip label={item} size='small' key={index} />
          ))}
        </Stack>
      )}

      <Stack direction='row' justifyContent='center' mt={3}>
        <button className='cv-btn' onClick={onOpenPopupBtnClick}>
          {intl.formatMessage(messages.showDetails)}
        </button>
      </Stack>

      <Dialog
        open={isPopupOpen}
        onClose={closePopup}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down('md')]: {
              width: '100%',
            },
            width: '500%',
          }),
        }}
      >
        <DialogTitle>{job.job}</DialogTitle>
        <DialogContent>
          <Stack direction='row' gap={1} alignItems='center'>
            <Typography variant='body2' color='gray'>
              {job.jobAdvertisementCode}
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='gray'>
              {job.organizationName}
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='gray'>
              {job.experiance} {intl.formatMessage(messages.yearsOfExperience)}
            </Typography>
          </Stack>

          {job.jobRequirementList.length > 0 && (
            <Stack
              mt={2}
              direction='row'
              gap={1}
              alignItems='center'
              flexWrap='wrap'
            >
              {job.jobRequirementList.map((item, index) => (
                <Chip label={item} size='small' key={index} />
              ))}
            </Stack>
          )}

          <Typography variant='body2' mt={2}>
            {job.jobDescription}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closePopup}>
            {intl.formatMessage(messages.close)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobCard);
