import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ApplicationCallStatusData';
import RowDropdown from '../components/ApplicationCallStatus/RowDropdown';
import messages from '../messages';

function ApplicationCallStatus(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [callStatusList, setCallStatusList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [popupState, setPopupState] = useState({
    appFirstStatus: null,
    notes: '',
    interviewTime: '',
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const popupStatus = await GeneralListApis(locale).GetCallStatusList();
      setCallStatusList(popupStatus);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onUpdateStatusBtnClick = (ids) => {
    setSelectedRowsId(ids);
    setIsPopupOpen(true);

    if (ids.length === 1) {
      const row = tableData.find((item) => item.id === ids[0]);

      if (row) {
        setPopupState({
          appFirstStatus: row.callStatusId ?? null,
          notes: row.callNote ?? '',
          interviewTime: row.interviewTime ?? '',
        });
      }
    }
  };

  const onSendInterviewTimeBtnClick = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).SendInterviewTimeMail(id);
      toast.success(notif.sent);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);

      await fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'email',
      label: intl.formatMessage(messages.email),
    },

    {
      name: 'phone',
      label: intl.formatMessage(messages.phone),
    },

    {
      name: 'callStatus',
      label: intl.formatMessage(messages.callStatus),
    },

    {
      name: 'interviewTime',
      label: intl.formatMessage(messages.interviewTime),
      options: {
        customBodyRender: (value) => (
          <pre>{formateDate(value, 'yyyy-MM-dd hh:mm:ss')}</pre>
        ),
      },
    },

    {
      name: 'callNote',
      label: intl.formatMessage(payrollMessages.notes),
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return '';
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              onUpdateStatusBtnClick={onUpdateStatusBtnClick}
              onSendInterviewTimeBtnClick={onSendInterviewTimeBtnClick}
            />
          );
        },
      },
    },
  ];

  const onToolBarIconClick = (rows) => {
    const ids = rows.map((item) => tableData[item.dataIndex]?.id);

    setSelectedRowsId(ids);
    setIsPopupOpen(true);
  };

  const options = {
    selectableRows: 'multiple',
    customToolbarSelect: (selectedRows) => (
      <IconButton
        sx={{ mx: 2 }}
        onClick={() => onToolBarIconClick(selectedRows.data)}
      >
        <ManageAccountsIcon sx={{ fontSize: '25px' }} />
      </IconButton>
    ),
  };

  const onAutoCompletePopupChange = (value, name) => {
    setPopupState((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onPopupClose = () => {
    setIsPopupOpen(false);

    setPopupState({
      appFirstStatus: null,
      notes: '',
      interviewTime: '',
    });
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    onPopupClose();

    const popupData = {
      ...popupState,
      ids: selectedRowsId,
      interviewTime: formateDate(
        popupState.interviewTime,
        'yyyy-MM-dd hh:mm:ss'
      ),
    };

    setIsLoading(true);

    try {
      await api(locale).Save(popupData);
      toast.success(notif.updated);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  };

  return (
    <>
      <Dialog
        open={isPopupOpen}
        onClose={onPopupClose}
        component='form'
        onSubmit={onPopupFormSubmit}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down('md')]: {
              width: '100%',
            },
            width: '70vw',
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...payrollMessages.Actions} />
        </DialogTitle>

        <DialogContent sx={{ pt: '10px !important' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={callStatusList}
                value={
                  callStatusList.find(
                    (item) => item.id === popupState.appFirstStatus
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompletePopupChange(value, 'appFirstStatus')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.callStatus)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='interviewTime'
                value={popupState.interviewTime}
                label={intl.formatMessage(messages.interviewTime)}
                type='datetime-local'
                onChange={(evt) => onPopupInputChange(evt)}
                fullWidth
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='notes'
                onChange={onPopupInputChange}
                value={popupState.notes}
                label={intl.formatMessage(payrollMessages.notes)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onPopupClose}>
            <FormattedMessage {...payrollMessages.cancel} />
          </Button>

          <Button type='submit' variant='contained'>
            <FormattedMessage {...messages.confirm} />
          </Button>
        </DialogActions>
      </Dialog>

      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
        options={options}
      />
    </>
  );
}

ApplicationCallStatus.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ApplicationCallStatus);
