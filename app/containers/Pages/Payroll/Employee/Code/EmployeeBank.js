import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import brand from 'enl-api/dummy/brand';
import avatarApi from 'enl-api/images/avatars';
import notif from 'enl-api/ui/notifMessage';
import css from 'enl-styles/Form.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeBank';
import useStyles from '../component/BankList/EmpBank-jss';
import EmployeeBankElement from '../component/BankList/EmployeeBankElement';
import messages from '../messages';

const INIT_FORM_INFO = {
  key: 0,
  name: '',
  avatar: avatarApi[11],
  bankId: null,
  bnkAcc: '',
  bankBranchNo: '',
  iban: '',
  bnkEmpCode: '',
  swiftCode: '',
};

function EmployeeBank(props) {
  const { intl } = props;
  const location = useLocation();

  const title = brand.name + ' - Banks';
  const description = brand.desc;
  const { classes, cx } = useStyles();

  const dataTable = useSelector((state) => state.crudTableDemo.dataTable);
  const locale = useSelector((state) => state.language.locale);

  const [formInfo, setFormInfo] = useState(INIT_FORM_INFO);

  const [selectedEmployee, setSelectedEmployee] = useState(
    location.state?.empid ?? 0
  );
  const [selectedBank, setSelectedBank] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [employeeBankList, setEmployeeBankList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [bankList, setBankList] = useState([]);

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees || []);

      const banks = await api(locale).GetBankLookup(selectedEmployee);
      setBankList(banks || []);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchEmployeeBankList() {
    setIsLoading(true);

    try {
      const dataApi = await api(locale).GetList(selectedEmployee);
      setEmployeeBankList(dataApi);
      setSelectedBank(-1);
      setFormInfo(INIT_FORM_INFO);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeBankList();
    } else {
      setSelectedBank(-1);
      setEmployeeBankList([]);
      setFormInfo(INIT_FORM_INFO);
    }
  }, [selectedEmployee]);

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  useEffect(() => {
    if (selectedBank !== -1) {
      const selectedBankInfo = employeeBankList.find(
        (item) => item.key === selectedBank
      );

      if (selectedBankInfo) {
        const bank = {
          key: selectedBankInfo.key ?? 0,
          name: selectedBankInfo.name ?? '',
          avatar: selectedBankInfo.avatar ?? '',
          bankId: selectedBankInfo.bankId ?? '',
          bnkAcc: selectedBankInfo.bnkAcc ?? '',
          bankBranchNo: selectedBankInfo.bankBranchNo ?? '',
          iban: selectedBankInfo.iban ?? '',
          bnkEmpCode: selectedBankInfo.bnkEmpCode ?? '',
          swiftCode: selectedBankInfo.swiftCode ?? '',
        };

        setFormInfo(bank);
      }
    } else {
      setFormInfo(INIT_FORM_INFO);
    }
  }, [selectedBank]);

  const onDeleteBtnClick = async () => {
    setIsLoading(true);

    try {
      await api().Delete(selectedBank);
      toast.success(notif.removed);

      await fetchEmployeeBankList();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      if (dataTable.length === 0) {
        toast.error(intl.formatMessage(messages.enterTemplateDetails));
        return;
      }

      const formData = {
        id: formInfo.key,
        bankName: formInfo.name,
        employeeId: selectedEmployee,
        ...formInfo,
      };

      await api(locale).SaveData(formData, dataTable);

      toast.success(notif.saved);

      await fetchEmployeeBankList();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Helmet>

      <div className={cx(classes.root, classes.padding)}>
        <Drawer
          variant='permanent'
          anchor='left'
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <div className={cx(classes.toolbar, classes.clippedRight)}>
              <div className={classes.searchWrapper}>
                <Autocomplete
                  options={employeeList}
                  value={getAutoCompleteValue(employeeList, selectedEmployee)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(event, value) => {
                    setSelectedEmployee(value !== null ? value.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.selectEmployee)}
                    />
                  )}
                />
              </div>
            </div>

            <List className={classes.contactList}>
              {employeeBankList.map((item) => (
                <ListItem
                  button
                  key={item.key}
                  className={item.key === selectedBank ? classes.selected : ''}
                  onClick={() => {
                    setSelectedBank(item.key);
                    setShowMobileDetail(false);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={item.bankBranchNo}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        <Tooltip title='add'>
          <Fab
            color='secondary'
            onClick={() => setSelectedBank(-1)}
            className={classes.addBtn}
          >
            <Add />
          </Fab>
        </Tooltip>

        <main
          className={cx(
            classes.content,
            showMobileDetail ? classes.detailPopup : ''
          )}
        >
          <section className={classes.cover}>
            <div className={classes.opt}>
              <IconButton
                color='secondary'
                onClick={onDeleteBtnClick}
                size='large'
                disabled={!Boolean(selectedEmployee)}
                className={classes.EditBtn}
              >
                <Delete />
              </IconButton>
            </div>

            <Avatar
              alt={getAutoCompleteValue(bankList, formInfo.bankId)?.name ?? ''}
              src={formInfo.avatar}
              className={classes.avatar}
            />

            <div>
              <Typography className={classes.userName} variant='h6'>
                {getAutoCompleteValue(bankList, formInfo.bankId)?.name ?? ''}
              </Typography>

              <Typography variant='caption'>{formInfo.bankBranchNo}</Typography>
            </div>
          </section>

          <div className={classes.detailContact}>
            <form onSubmit={onFormSubmit}>
              <section className={css.bodyForm}>
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={6} sm={6}>
                    <Autocomplete
                      options={bankList}
                      value={getAutoCompleteValue(bankList, formInfo.bankId)}
                      disabled={!Boolean(selectedEmployee)}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'bankId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          disabled={!Boolean(selectedEmployee)}
                          label={intl.formatMessage(messages.bank)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='bnkAcc'
                      value={formInfo.bnkAcc}
                      required
                      disabled={!Boolean(selectedEmployee)}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.bankAccount)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='bankBranchNo'
                      value={formInfo.bankBranchNo}
                      disabled={!Boolean(selectedEmployee)}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.branchNumber)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='bnkEmpCode'
                      value={formInfo.bnkEmpCode}
                      disabled={!Boolean(selectedEmployee)}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.bankEmployeeCode)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='iban'
                      disabled={!Boolean(selectedEmployee)}
                      value={formInfo.iban}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.iban)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='swiftCode'
                      value={formInfo.swiftCode}
                      onChange={onInputChange}
                      disabled={!Boolean(selectedEmployee)}
                      label={intl.formatMessage(messages.swiftCode)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>
                </Grid>

                <EmployeeBankElement ids={selectedBank ?? 0} />
              </section>

              <div className={css.buttonArea}>
                <p>
                  {intl.formatMessage(
                    messages.onceYouSubmitItsMeanYouHaveAgreedWithOur
                  )}
                  &nbsp;
                  <a href='/terms-conditions' target='_blank'>
                    {intl.formatMessage(messages.termsAndCondition)}
                  </a>
                </p>

                <div>
                  <Button
                    variant='contained'
                    color='secondary'
                    type='submit'
                    disabled={!Boolean(selectedEmployee)}
                  >
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </PayRollLoader>
  );
}

EmployeeBank.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeBank);
