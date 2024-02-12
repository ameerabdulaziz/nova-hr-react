import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import { getFormData } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/CompanyData';
import messages from '../messages';

function Company(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [formInfo, setFormInfo] = useState({
    enName: '',
    arName: '',
    image: null,
    enCompanyOverView: '',
    arCompanyOverView: '',
    phone: '',
    mail: '',
    address: '',
    apikey: '',
    useGps: false,
    cvarTitle: '',
    cvarSubTitle: '',
    cvenTitle: '',
    cvenSubTitle: '',
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (!uploadedFile) {
      toast.error(intl.formatMessage(messages.logoIsRequired));
      return;
    }

    setIsLoading(true);

    const body = getFormData({
      ...formInfo,
      image: uploadedFile && (uploadedFile instanceof File) ? uploadedFile : null,
    });

    try {
      await api(locale).Save(body);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  const resetFormValues = () => {
    setFormInfo({
      enName: '',
      arName: '',
      image: null,
      enCompanyOverView: '',
      arCompanyOverView: '',
      phone: '',
      mail: '',
      address: '',
      apikey: ' ',
      useGps: false,
      cvarTitle: '',
      cvarSubTitle: '',
      cvenTitle: '',
      cvenSubTitle: '',
    });
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const response = await api(locale).getCompanyInfo();

      setFormInfo({
        enName: response.enName ?? '',
        arName: response.arName ?? '',
        image: response.image,
        enCompanyOverView: response.enCompanyOverView ?? '',
        arCompanyOverView: response.arCompanyOverView ?? '',
        phone: response.phone ?? '',
        mail: response.mail ?? '',
        address: response.address ?? '',
        apikey: response.apikey ?? '',
        useGps: response.useGps ?? false,
        cvarTitle: response.cvarTitle ?? '',
        cvarSubTitle: response.cvarSubTitle ?? '',
        cvenTitle: response.cvenTitle ?? '',
        cvenSubTitle: response.cvenSubTitle ?? '',
      });

      setUploadedFile(response.logo);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onFileInputChange = (evt) => {
    const file = evt.target.files[0];

    // to trigger onChange on the same file select
    evt.target.value = '';

    if (file) {
      // check if uploaded file is larger than 1MB
      if (file.size < 10000000) {
        setFormInfo((prev) => ({ ...prev, image: file }));
        setUploadedFile(file);
      } else {
        toast.error(intl.formatMessage(messages.fileSizeShouldBeLessThan10MB));
      }
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                name='arName'
                value={formInfo.arName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.arName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='enName'
                value={formInfo.enName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.enName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='phone'
                value={formInfo.phone}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.phone)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='mail'
                value={formInfo.mail}
                required
                onChange={onInputChange}
                type='email'
                label={intl.formatMessage(messages.email)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='arCompanyOverView'
                value={formInfo.arCompanyOverView}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.arabicOverview)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='enCompanyOverView'
                value={formInfo.enCompanyOverView}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.englishOverview)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='address'
                value={formInfo.address}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.address)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='cvarTitle'
                value={formInfo.cvarTitle}
                onChange={onInputChange}
                label={intl.formatMessage(messages.cvarTitle)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='cvarSubTitle'
                value={formInfo.cvarSubTitle}
                onChange={onInputChange}
                label={intl.formatMessage(messages.cvarSubTitle)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='cvenTitle'
                value={formInfo.cvenTitle}
                onChange={onInputChange}
                label={intl.formatMessage(messages.cvenTitle)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='cvenSubTitle'
                value={formInfo.cvenSubTitle}
                onChange={onInputChange}
                label={intl.formatMessage(messages.cvenSubTitle)}
                fullWidth
                variant='outlined'
                multiline
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formInfo.useGps}
                        onChange={onCheckboxChange}
                        name='useGps'
                      />
                    }
                    label={intl.formatMessage(messages.useGPS)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name='apikey'
                    value={formInfo.apikey}
                    required
                    onChange={onInputChange}
                    disabled={!formInfo.useGps}
                    label={intl.formatMessage(messages.apiKey)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} >
              <Stack direction='row' alignItems='center' spacing={2}>
                <div>
                  <input
                    accept='image/*'
                    id='attachment-button-file'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={onFileInputChange}
                  />
                  <label htmlFor='attachment-button-file'>
                    <Button variant='contained' component='span'>
                      {intl.formatMessage(messages.uploadLogo)}
                    </Button>
                  </label>
                </div>

                {uploadedFile && (
                  <Avatar sx={{ width: 56, height: 56 }} src={uploadedFile && uploadedFile instanceof File ? URL.createObjectURL(uploadedFile) : uploadedFile} />
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction='row' gap={2}>
                <Button variant='contained' color='secondary' type='submit'>
                  {intl.formatMessage(messages.submit)}
                </Button>

                <Button type='reset' onClick={resetFormValues}>
                  {intl.formatMessage(payrollMessages.reset)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

Company.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Company);
