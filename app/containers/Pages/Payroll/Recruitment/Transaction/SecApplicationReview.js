import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import api from '../api/SecApplicationReviewData';
import RowDropdown from '../components/SecApplicationReview/RowDropdown';
import messages from '../messages';

function SecApplicationReview(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  const [selectedRowEmployee, setSelectedRowEmployee] = useState([]);

  const [statusPopupList, setStatusPopupList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [popupState, setPopupState] = useState({
    appFirstStatus: null,
    reason: '',
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
      const popupStatus = await GeneralListApis(
        locale
      ).GetApplicationStatusList(false, true);
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

  const onUpdateStatusBtnClick = (row) => {
    setSelectedRowsId([row.id]);
    setSelectedRowEmployee(row.techStatusList);
    setIsPopupOpen(true);
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
      name: 'phone',
      label: intl.formatMessage(messages.phone),
    },

    {
      name: 'email',
      label: intl.formatMessage(messages.email),
    },

    {
      name: 'secStatus',
      label: intl.formatMessage(messages.status),
    },

    {
      name: '',
      label: '',
      options: {
        print: false,
        filter: false,
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
      reason: '',
    });
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    onPopupClose();

    const popupData = { ...popupState, ids: selectedRowsId };

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

        <DialogContent>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage {...payrollMessages.employeeName} />
                </TableCell>
                <TableCell>
                  <FormattedMessage {...payrollMessages.status} />
                </TableCell>
                <TableCell>
                  <FormattedMessage {...messages.comment} />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedRowEmployee?.map((row) => (
                <TableRow
                  key={row.techEmp}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.techEmp}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Grid container spacing={2} mt={0}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={statusPopupList}
                value={
                  statusPopupList.find(
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
                    label={intl.formatMessage(messages.status)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='reason'
                onChange={onPopupInputChange}
                value={popupState.reason}
                label={intl.formatMessage(messages.reason)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                required
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

SecApplicationReview.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SecApplicationReview);
