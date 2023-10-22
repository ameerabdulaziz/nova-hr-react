import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import Payrollmessages from '../../messages';
import api from '../api/SInsuranceOrgnizationData';
import messages from '../messages';

function SInsuranceOrgnizationCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const history = useHistory();

  const [governmentList, setGovernmentList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [insuranceOfficeList, setInsuranceOfficeList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    arName: '',
    enName: '',
    insuranceNumber: '',
    address: '',
    owner: '',
    legalStatus: '',
    companyLegalForm: '',
    governorateId: '',
    insuranceRegionId: '',
    insuranceOfficeId: '',
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const government = await GeneralListApis(locale).GetGovernmentList();
      setGovernmentList(government);

      const region = await api(locale).GetSinsuranceRegion();
      setRegionList(region);

      const office = await api(locale).GetSinsuranceOffices();
      setInsuranceOfficeList(office);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi[0]);
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    setProcessing(true);
    setIsLoading(true);

    try {
      if (id !== 0) {
        await api(locale).update(id, formData);
      } else {
        await api(locale).save(formData);
      }

      toast.success(notif.saved);
      history.push('/app/Pages/insurance/SInsuranceOrgnization');
    } catch (error) {
      toast.error(JSON.stringify(error.response.data ?? error));
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/insurance/SInsuranceOrgnization');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon='border_color'
        desc=''
        title={
          id === 0
            ? intl.formatMessage(messages.SInsuranceOrgnizationCreateTitle)
            : intl.formatMessage(messages.SInsuranceOrgnizationEditTitle)
        }
      >
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='arName'
                        value={formInfo.arName}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.arName)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='enName'
                        value={formInfo.enName}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.enName)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='insuranceNumber'
                        value={formInfo.insuranceNumber}
                        required
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.insuranceNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='address'
                        value={formInfo.address}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='owner'
                        value={formInfo.owner}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.ownerName)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='legalStatus'
                        value={formInfo.legalStatus}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(
                          messages.ownerLegalDescription
                        )}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='companyLegalForm'
                        required
                        value={formInfo.companyLegalForm}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.legalDescription)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={governmentList}
                        value={
                          governmentList.find(
                            (alt) => alt.id === formInfo.governorateId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            governorateId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.government)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={regionList}
                        value={
                          regionList.find(
                            (alt) => alt.id === formInfo.insuranceRegionId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            insuranceRegionId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.region)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceOfficeList}
                        value={
                          insuranceOfficeList.find(
                            (alt) => alt.id === formInfo.insuranceOfficeId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            insuranceOfficeId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceOffice)}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton Id={id} processing={processing} />
                </Grid>

                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...Payrollmessages.cancel} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(SInsuranceOrgnizationCreate);
