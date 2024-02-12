import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmploymentData';
import RowDropdown from '../components/Employment/RowDropdown';
import messages from '../messages';

function Employment(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [popupState, setPopupState] = useState({
    date: null,
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

  useEffect(() => {
    fetchTableData();
  }, []);

  const onSetHiringDateBtnClick = (ids) => {
    setSelectedRowsId(ids);
    setIsPopupOpen(true);
  };

  const columns = [
    {
      name: 'candidateName',
      label: intl.formatMessage(messages.candidateName),
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'contractTypeName',
      label: intl.formatMessage(messages.contractType),
    },

    {
      name: 'grossSalary',
      label: intl.formatMessage(messages.grossSalary),
    },

    {
      name: 'commession',
      label: intl.formatMessage(messages.commession),
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
              onSetHiringDateBtnClick={onSetHiringDateBtnClick}
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

  const onPopupDatePickerChange = (value, name) => {
    setPopupState((prev) => ({ ...prev, [name]: value }));
  };

  const onPopupClose = () => {
    setIsPopupOpen(false);

    setPopupState({
      date: null,
    });
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    onPopupClose();

    const body = {
      ids: selectedRowsId,
      date: formateDate(popupState.date),
    };

    setIsLoading(true);

    try {
      await api(locale).save(body);
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.date)}
                  value={popupState.date}
                  onChange={(date) => onPopupDatePickerChange(date, 'date')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      fullWidth
                      required
                    />
                  )}
                />
              </LocalizationProvider>
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

Employment.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Employment);
