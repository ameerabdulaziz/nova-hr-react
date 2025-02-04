import {
    Autocomplete, Button, Grid, TextField
  } from '@mui/material';
  import notif from 'enl-api/ui/notifMessage';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState } from 'react';
  import { toast } from 'react-hot-toast';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import { useHistory, useLocation } from 'react-router-dom';
  import PayRollLoader from '../../Component/PayRollLoader';
  import SaveButton from '../../Component/SaveButton';
  import GeneralListApis from '../../api/GeneralListApis';
  import payrollMessages from '../../messages';
  import api from '../api/GuaranterData';
  import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';
  
  function GuarantorCreate(props) {
    const { intl } = props;
    const pageTitle = localStorage.getItem('MenuName');
    const locale = useSelector((state) => state.language.locale);
    const { state } = useLocation()
    const  ID  = state?.id
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [bankList, setBankList] = useState([]);
    const [formInfo, setFormInfo] = useState({
      id: 0,
      arName: '',
      enName: '',
      phone: '',
      email: '',
      bank: '',
      bankAccount: '',
      iban: '',
      address: '',
    });

    
    const fetchNeededData = async () => {
      setIsLoading(true);
  
      try {
        const banksData = await GeneralListApis(locale).GetBankList();
        setBankList(banksData);
  
      } catch (err) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNeededData();
    }, []);


    const getEditdata =  async () => {
      setIsLoading(true);
    
      try {
        const data =  await api().GetDataById(ID,locale);

        setFormInfo((prevState) => ({
          ...prevState,
            id : data ? data.id : "",
            arName: data ? data.arName : "",
            enName: data ? data.enName : "",
            phone: data ? data.phone : "",
            email: data ? data.email : "",
            bank: data && data.bankId ? bankList.find((item)=> item.id === data.bankId) : "",
            bankAccount: data ? data.bnkAcc : "",
            iban: data ? data.iban : "",
            address: data ? data.address : "",
        }))
    
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    
    };

    useEffect(() => {

      if(ID && bankList.length !== 0)
      {
        getEditdata();
      }
    }, [ID,bankList]);
  
    const onFormSubmit = async (evt) => {
      evt.preventDefault();
      setIsLoading(true);
  
     
      const data = {
        id: formInfo.id,
        enName: formInfo.enName ? formInfo.enName : "",
        arName: formInfo.arName ? formInfo.arName : "",
        phone: formInfo.phone ? formInfo.phone : "",
        email: formInfo.email ? formInfo.email : "",
        address: formInfo.address ? formInfo.address : "",
        bankId: formInfo.bank ? formInfo.bank.id : "",
        bankName: formInfo.bank ? formInfo.bank.name : "",
        bnkAcc: formInfo.bankAccount ? formInfo.bankAccount : "",
        iban: formInfo.iban ? formInfo.iban : "",
      };

      try {
        await api(locale).Save(data);
  
        toast.success(notif.saved);
        history.push(SITEMAP.mainData.Guarantor.route);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    const onInputChange = (evt) => {
      setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
    };
  
    const onCancelBtnClick = () => {
      history.push(SITEMAP.mainData.Guarantor.route);
    };
  
    return (
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={3} direction='row'>
              <Grid item xs={6} md={4} lg={3} xl={2.5}>
                <TextField
                  name='arName'
                  value={formInfo.arName}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.arName)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                  required
                />
              </Grid>
  
              <Grid item xs={6} md={4} lg={3} xl={2.5} >
                <TextField
                  name='enName'
                  value={formInfo.enName}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.enName)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                  required
                />
              </Grid>

              <Grid item xs={6} md={4} lg={3} xl={2}>
                <TextField
                  name='phone'
                  value={formInfo.phone}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.phone)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={6} md={4} lg={3} xl={3}>
                <TextField
                  name='email'
                  value={formInfo.email}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.email)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>
  
              <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Autocomplete
                      options={bankList}
                      value={formInfo.bank !== null && formInfo.bank.length !== 0 ? formInfo.bank : null}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(event, value) => {
                        setFormInfo((prev) => ({
                          ...prev,
                          bank: value !== null ? value : null,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(payrollMessages.bank)}
                        />
                      )}
                    />
                  </Grid>

              <Grid item xs={6} md={4} lg={3} xl={2.5}>
                <TextField
                  name='bankAccount'
                  value={formInfo.bankAccount}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.bankAccount)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={6} md={4} lg={3} xl={2.5}>
                <TextField
                  name='iban'
                  value={formInfo.iban}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.iban)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name='address'
                  value={formInfo.address}
                  onChange={onInputChange}
                  label={intl.formatMessage(messages.address)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                  multiline
                  rows={1}
                />
              </Grid>
  
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <SaveButton Id={ID} />
                  </Grid>
  
                  <Grid item>
                    <Button
                      variant='contained'
                      size='medium'
                      color='primary'
                      onClick={onCancelBtnClick}
                    >
                      <FormattedMessage {...payrollMessages.cancel} />
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
  
  GuarantorCreate.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(GuarantorCreate);
  