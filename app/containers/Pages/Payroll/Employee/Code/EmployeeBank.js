import { BorderColor, Delete } from '@mui/icons-material';
import Add from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  Switch,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import brand from 'enl-api/dummy/brand';
import avatarApi from 'enl-api/images/avatars';
import notif from 'enl-api/ui/notifMessage';
import css from 'enl-styles/Form.scss';
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeBankData';
import useStyles from '../component/BankList/EmpBank-jss';
import TemplatePopup from '../component/BankList/TemplatePopup';
import messages from '../messages';
import { uuid } from '../../helpers';
import DecryptUrl from "../../Component/DecryptUrl";
import { PapperBlock } from 'enl-components';
import { useLocation } from 'react-router-dom';
import { DOMAIN_NAME } from '../../../../App/routes/sitemap';

const INIT_FORM_INFO = {
  id: 0,
  name: '',
  bankId: null,
  bnkAcc: '',
  bankBranchNo: '',
  iban: '',
  bnkEmpCode: '',
  swiftCode: '',
  empEmpBankElement: [],
  isBnkTransfer: false,
};

function EmployeeBank(props) {
  const location = useLocation();

  // get employee data from url
  const empid  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : { id: 0, name: "" }
  const { intl } = props;


  const title = localStorage.getItem('MenuName');
  const description = brand.desc;
  const { classes, cx } = useStyles();

  const locale = useSelector((state) => state.language.locale);

  const [formInfo, setFormInfo] = useState(INIT_FORM_INFO);

 
  const [selectedEmployee, setSelectedEmployee] = useState(
    empid?.id ?? 0
  );
  const [selectedBank, setSelectedBank] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [employeeBankList, setEmployeeBankList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees || []);

      const banks = await api(locale).GetBankLookup(selectedEmployee);
      setBankList(banks || []);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const currency = await GeneralListApis(locale).MdCurrency();
      setCurrencyList(currency);
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
        (item) => item.id === selectedBank
      );

      if (selectedBankInfo) {
        const bank = {
          id: selectedBankInfo.id ?? 0,
          name: selectedBankInfo.name ?? '',
          bankId: selectedBankInfo.bankId ?? '',
          bnkAcc: selectedBankInfo.bnkAcc ?? '',
          bankBranchNo: selectedBankInfo.bankBranchNo ?? '',
          iban: selectedBankInfo.iban ?? '',
          bnkEmpCode: selectedBankInfo.bnkEmpCode ?? '',
          swiftCode: selectedBankInfo.swiftCode ?? '',
          empEmpBankElement: selectedBankInfo.empEmpBankElement ?? [],
          isBnkTransfer: selectedBankInfo?.isBnkTransfer ?? false,
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
      if (formInfo.empEmpBankElement.length === 0) {
        toast.error(intl.formatMessage(messages.enterTemplateDetails));
        return;
      }

      const formData = {
        id: formInfo.id,
        employeeId: selectedEmployee,
        bankId: formInfo.bankId,
        bankBranchNo: formInfo.bankBranchNo,
        iban: formInfo.iban,
        bnkAcc: formInfo.bnkAcc,
        swiftCode: formInfo.swiftCode,
        bnkEmpCode: formInfo.bnkEmpCode,
        isBnkTransfer: formInfo.isBnkTransfer,
        empEmpBankElement: formInfo.empEmpBankElement.map((item) => ({
          EmpBankId: formInfo.id,
          PayTemplateId: item.payTemplateId,
          CurrencyId: item.currencyId,
        })),
      };

      await api(locale).SaveData(formData);

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

  const onTemplateRemove = (index) => {
    const clonedItems = [...formInfo.empEmpBankElement];

    clonedItems.splice(index, 1);

    setFormInfo((prev) => ({
      ...prev,
      empEmpBankElement: clonedItems,
    }));
  };

  useEffect(() => {
    if (selectedTemplate) {
      setIsPopupOpen(true);
    }
  }, [selectedTemplate]);

  const onTemplateSave = (template) => {
    if (selectedTemplate) {
      const cloned = [...formInfo.empEmpBankElement];
      const index = cloned.findIndex((item) => item.id === template.id);

      if (index !== -1) {
        cloned[index] = template;

        setFormInfo((prev) => ({
          ...prev,
          empEmpBankElement: cloned,
        }));
      }
      setSelectedTemplate(null);
    } else {
      setFormInfo((prev) => ({
        ...prev,
        empEmpBankElement: [
          ...prev.empEmpBankElement,
          { ...template, id: uuid() },
        ],
      }));
    }

    setIsPopupOpen(false);
  };

  const onTemplateEdit = (item) => {
    setSelectedTemplate(item);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const getCurrencyName = (id) => {
    const currency = currencyList.find((item) => item.id === id);

    if (currency) {
      return currency.name;
    }

    return '';
  };

  const getPayTemplateName = (id) => {
    const template = payTemplateList.find((item) => item.id === id);

    if (template) {
      return template.name;
    }

    return '';
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <TemplatePopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        onSave={onTemplateSave}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        currencyList={currencyList}
        payTemplateList={payTemplateList}
      />
<PapperBlock whiteBg icon='border_color' title={title} desc=''>
      <form onSubmit={onFormSubmit}>
        <div className={cx(classes.root, classes.padding)}>
        <Grid container >
        <Grid item xs={1} sm={4}>
          <Drawer
            variant='permanent'
            anchor='left'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
            PaperProps={{
              sx: {
                width: "100% !important",
              }
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
                    key={item.id}
                    className={
                      item.id === selectedBank ? classes.selected : ''
                    }
                    onClick={() => {
                      setSelectedBank(item.id);
                      setShowMobileDetail(false);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={item.bankName}
                        src={`/${DOMAIN_NAME}/${avatarApi[11]}`}
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.bankName}
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
              </Grid>

              <Grid item xs={1} sm={8}>

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
                  disabled={!selectedEmployee}
                  className={classes.EditBtn}
                >
                  <Delete />
                </IconButton>
              </div>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={formInfo.isBnkTransfer}
                        onChange={() => setFormInfo(prev => ({ ...prev, isBnkTransfer: !prev.isBnkTransfer }))}
                        color="secondary"
                      />
                    }
                    label={intl.formatMessage(messages.isBnkTransfer)}
                  />
            </section>

            <div className={classes.detailContact}>
              <section className={css.bodyForm}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Autocomplete
                      options={bankList}
                      value={getAutoCompleteValue(bankList, formInfo.bankId)}
                      disabled={!selectedEmployee}
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
                          disabled={!selectedEmployee}
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
                      disabled={!selectedEmployee}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.bankAccount)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='bankBranchNo'
                      value={formInfo.bankBranchNo}
                      disabled={!selectedEmployee}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.branchNumber)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='bnkEmpCode'
                      value={formInfo.bnkEmpCode}
                      disabled={!selectedEmployee}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.bankEmployeeCode)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='iban'
                      disabled={!selectedEmployee}
                      value={formInfo.iban}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.iban)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='swiftCode'
                      value={formInfo.swiftCode}
                      onChange={onInputChange}
                      disabled={!selectedEmployee}
                      label={intl.formatMessage(messages.swiftCode)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Card>
                      <CardContent sx={{ p: '16px!important' }}>
                        <Grid
                          container
                          justifyContent='space-between'
                          alignItems='center'
                          mb={3}
                        >
                          <Grid item>
                            <Typography variant='h6'>
                              {intl.formatMessage(messages.templateInfo)}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Button
                              variant='contained'
                              disabled={!selectedEmployee}
                              onClick={
                                !selectedEmployee ? undefined : openPopup
                              }
                              color='primary'
                            >
                              {intl.formatMessage(messages.addOrChangeTemplate)}
                            </Button>
                          </Grid>
                        </Grid>

                        {formInfo.empEmpBankElement.length > 0 ? (
                          <>
                            <TableContainer>
                              <Table sx={{ minWidth: 650 }} size='small'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      {intl.formatMessage(
                                        messages.templateName
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {intl.formatMessage(messages.currency)}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {formInfo.empEmpBankElement.map((item, index) => (
                                    <TableRow
                                      key={item.id}
                                      sx={{
                                        '&:last-child td, &:last-child th': {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        {getPayTemplateName(item.payTemplateId)}
                                      </TableCell>
                                      <TableCell>
                                        {getCurrencyName(item.currencyId)}
                                      </TableCell>
                                      <TableCell>
                                        <Stack direction='row' spacing={2}>
                                          <IconButton
                                            color='primary'
                                            size='small'
                                            onClick={() => onTemplateEdit(item)}
                                          >
                                            <BorderColor />
                                          </IconButton>

                                          <IconButton
                                            size='small'
                                            color='error'
                                            onClick={() => onTemplateRemove(index)
                                            }
                                          >
                                            <Delete />
                                          </IconButton>
                                        </Stack>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </>
                        ) : (
                          <Stack
                            direction='row'
                            sx={{ minHeight: 200 }}
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                          >
                            <Box>
                              <PeopleIcon
                                sx={{ color: '#a7acb2', fontSize: 30 }}
                              />
                              <Typography color='#a7acb2' variant='body1'>
                                {intl.formatMessage(messages.noTemplateAdded)}
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Button
                      variant='contained'
                      color='secondary'
                      type='submit'
                      disabled={!selectedEmployee}
                    >
                      {intl.formatMessage(payrollMessages.save)}
                    </Button>
                  </Grid>
                </Grid>
              </section>
            </div>
          </main>
          </Grid>
          </Grid>
        </div>
      </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

EmployeeBank.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeBank);
