import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from '../messages';

function JobCard(props) {
  const { job, intl } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onOpenPopupBtnClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className='cv-job-card'>
      <Link to={`/public/JobVacation/Application/${job.id}`} className='title'>
        {job.title}
      </Link>

      <Stack direction='row' gap={1} alignItems='center'>
        <Typography variant='body2' color='gray'>
          {job.code}
        </Typography>

        <Divider orientation='vertical' flexItem />

        <Typography variant='body2' color='gray'>
          {job.experience} {intl.formatMessage(messages.yearsOfExperience)}
        </Typography>
      </Stack>

      <Typography variant='body2' color='gray'>
        {job.organization}
      </Typography>

      <Typography variant='body2' mt={2}>
        {job.description.substr(0, 80)}
      </Typography>

      {job.requirement.length > 0 && (
        <Stack
          mt={2}
          direction='row'
          gap={1}
          alignItems='center'
          flexWrap='wrap'
        >
          {job.requirement.slice(0, 5).map((item, index) => (
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
              width: '100%'
            },
            width: '500%'
          }),
        }}
      >
        <DialogTitle>{job.title}</DialogTitle>
        <DialogContent>
          <Stack direction='row' gap={1} alignItems='center'>
            <Typography variant='body2' color='gray'>
              {job.code}
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='gray'>
              {job.organization}
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='gray'>
              {job.experience} {intl.formatMessage(messages.yearsOfExperience)}
            </Typography>
          </Stack>

          {job.requirement.length > 0 && (
            <Stack
              mt={2}
              direction='row'
              gap={1}
              alignItems='center'
              flexWrap='wrap'
            >
              {job.requirement.map((item, index) => (
                <Chip label={item} size='small' key={index} />
              ))}
            </Stack>
          )}

          <Typography variant='body2' mt={2}>
            {job.description}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closePopup}>{intl.formatMessage(messages.close)}</Button>
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
