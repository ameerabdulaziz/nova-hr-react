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
  import messages from '../../messages';
  
  function WorkLanguagePopup(props) {
    const {
      intl,
      isOpen,
      setIsOpen,
      onSave,
      selectedLang,
      levelList,
      setSelectedLang,
      langList,
    } = props;
  
    const [formInfo, setFormInfo] = useState({
      description: '',
      LanguageId: null,
      languageLevelID: null,
      id: null,
    });
  
    useEffect(() => {
      if (isOpen && selectedLang) {
        setFormInfo({
          description: selectedLang?.description || '',
          LanguageId: selectedLang?.LanguageId || null,
          languageLevelID: selectedLang?.languageLevelID || null,
          id: selectedLang?.id || null,
        });
      } else {
        setFormInfo({
          description: '',
          id: null,
          LanguageId: null,
          languageLevelID: null,
        });
      }
    }, [isOpen,selectedLang]);
  
    const onLangPopupClose = () => {
      setIsOpen(false);
      setSelectedLang(null);
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
    
    return (
      <Dialog
        open={isOpen}
        onClose={onLangPopupClose}
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
          {intl.formatMessage(
            selectedLang ? messages.editLang : messages.addLang
          )}
        </DialogTitle>
        <DialogContent>
          <Grid container mt={0} spacing={1}>

          <Grid item xs={12} lg={6}>
              <Autocomplete
                options={langList}
                value={
                    langList.find((item) => item.id === formInfo.LanguageId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'LanguageId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.languages)}
                  />
                )}
              />
            </Grid>
            
  
            <Grid item xs={12} lg={6}>
              <Autocomplete
                options={levelList}
                value={
                  levelList.find((item) => item.id === formInfo.languageLevelID) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'languageLevelID')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.level)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onLangPopupClose}>
            {intl.formatMessage(messages.close)}
          </Button>
          <Button type='submit' variant='contained'>
            {intl.formatMessage(messages.save)}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  

  export default injectIntl(WorkLanguagePopup);
  