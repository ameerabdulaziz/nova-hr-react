import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import style from '../../../../styles/styles.scss';
import underConstructionImage from '../Assets/under-contraction.png';
import payrollMessages from '../messages';

function UnderContractionPopup(props) {
  const { setIsOpen, isOpen } = props;

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '50vw',
          maxWidth: '50vw',
        }),
      }}
    >
      <DialogTitle>
        <FormattedMessage {...payrollMessages.pageUnderConstruction} />
      </DialogTitle>

      <DialogContent>
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <img
            src={underConstructionImage}
            alt='under contraction'
            width={400}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button className={style.deleteAlertBtnSty} onClick={closeModal}>
          <FormattedMessage {...payrollMessages.close} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UnderContractionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default UnderContractionPopup;
