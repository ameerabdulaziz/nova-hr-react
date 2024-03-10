import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import tableMessage from '../../../../../../components/Tables/messages';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function EditTableRowPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    selectedRow,
    governmentList,
    cityList,
    onSave,
  } = props;

  const [formInfo, setFormInfo] = useState({
    id: null,
    cityId: null,
    governmentId: null,
    arAddress: '',
    enaddress: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormInfo({
        id: selectedRow?.id ?? 0,
        cityId: selectedRow?.cityId ?? null,
        governmentId: selectedRow?.governmentId ?? null,
        arAddress: selectedRow?.arAddress ?? '',
        enaddress: selectedRow?.enaddress ?? '',
      });
    } else {
      setFormInfo({
        id: null,
        cityId: null,
        governmentId: null,
        arAddress: '',
        enaddress: '',
      });
    }
  }, [isOpen]);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value ? value.id : null,
    }));
  };

  const onPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    onSave(formInfo);

    setIsOpen(false);
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
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
        {intl.formatMessage(
          selectedRow ? messages.editAddress : messages.createAddress
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container mb={3} spacing={3} pt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='arAddress'
              value={formInfo.arAddress}
              onChange={onInputChange}
              label={intl.formatMessage(tableMessage.araddress)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name='enaddress'
              value={formInfo.enaddress}
              onChange={onInputChange}
              label={intl.formatMessage(tableMessage.enaddress)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={governmentList}
              value={
                governmentList.find(
                  (item) => item.id === formInfo.governmentId
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => onAutoCompleteChange(value, 'governmentId')}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label={intl.formatMessage(tableMessage.govname)}
                />
              )}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={cityList}
              value={
                cityList.find((item) => item.id === formInfo.cityId) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => onAutoCompleteChange(value, 'cityId')}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label={intl.formatMessage(tableMessage.city)}
                />
              )}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>

        <Button type='submit' variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditTableRowPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  governmentList: PropTypes.array.isRequired,
  cityList: PropTypes.array.isRequired,
  selectedRow: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default injectIntl(EditTableRowPopup);
