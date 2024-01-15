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
import payrollMessages from '../../../messages';
import messages from '../../messages';

function TemplatePopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedTemplate,
    currencyList,
    payTemplateList,
    setSelectedTemplate,
  } = props;

  const [formInfo, setFormInfo] = useState({
    payTemplateId: null,
    id: null,
    currencyId: null,
  });

  useEffect(() => {
    if (isOpen && selectedTemplate) {
      setFormInfo({
        payTemplateId: selectedTemplate?.payTemplateId || null,
        id: selectedTemplate?.id || null,
        currencyId: selectedTemplate?.currencyId || null,
      });
    } else {
      setFormInfo({
        payTemplateId: null,
        id: null,
        currencyId: null,
      });
    }
  }, [isOpen]);

  const onPopupClose = () => {
    setIsOpen(false);
    setSelectedTemplate(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onSave(formInfo);

    setIsOpen(false);
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

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
          width: '500px',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(messages.addOrChangeTemplate)}
      </DialogTitle>

      <DialogContent>
        <Grid container mt={0} spacing={2}>
          <Grid item xs={12} md={12}>
            <Autocomplete
              options={payTemplateList}
              value={getAutoCompleteValue(payTemplateList, formInfo.payTemplateId)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'payTemplateId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.templateName)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Autocomplete
              options={currencyList}
              value={getAutoCompleteValue(currencyList, formInfo.currencyId)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'currencyId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.currency)}
                />
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

TemplatePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedTemplate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.object,
  currencyList: PropTypes.array.isRequired,
  payTemplateList: PropTypes.array.isRequired,
};

export default injectIntl(TemplatePopup);
