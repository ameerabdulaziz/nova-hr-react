import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
import api from '../api/JobOfferStatusData';
import messages from '../messages';

function JobOfferStatus(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [statusPopupList, setStatusPopupList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [popupState, setPopupState] = useState({
    notes: '',
    status: null,
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
      setStatusPopupList(popupStatus);
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

  const onUpdateStatusBtnClick = (id) => {
    setSelectedRowsId([id]);
    setIsPopupOpen(true);
  };

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'jobOfferDate',
      label: intl.formatMessage(messages.offerDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'candidateName',
      label: intl.formatMessage(messages.applicantName),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.Actions),
      options: {
        filter: false,
        print: false,
        customBodyRender: (value) => (
          <Button
            variant='text'
            onClick={() => onUpdateStatusBtnClick(value)}
          >
            {intl.formatMessage(messages.updateStatus)}
          </Button>
        ),
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

  const closePopup = () => {
    setIsPopupOpen(false);

    setPopupState({
      notes: '',
      status: null,
    });
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    closePopup();

    const body = {
      ids: selectedRowsId,
      notes: popupState.notes,
      status: popupState.status,
    };

    setIsLoading(true);

    try {
      await api(locale).Save(body);
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
        onClose={closePopup}
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
                options={statusPopupList}
                value={
                  statusPopupList.find(
                    (item) => item.id === popupState.status
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompletePopupChange(value, 'status')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.status)}
                  />
                )}
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
                required
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closePopup}>
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
        options={options}
        columns={columns}
      />
    </>
  );
}

JobOfferStatus.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOfferStatus);
