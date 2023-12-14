import DownloadIcon from '@mui/icons-material/Download';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import { ServerURL } from '../../api/ServerConfig';
import payrollMessages from '../../messages';
import api from '../api/EmploymentData';
import messages from '../messages';

function Employment(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [openedDropdown, setOpenedDropdown] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [popupState, setPopupState] = useState({
    date: null,
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

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

  const onDropdownClose = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const onPreviewCVBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;

    history.push('/app/Pages/Recruitment/JobApplicationPreview', {
      id,
    });
  };

  const onSetHiringDateBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;
    setSelectedRowsId([id]);
    setIsPopupOpen(true);
  };

  const columns = [
    {
      name: 'candidateName',
      label: intl.formatMessage(messages.candidateName),
      options: {
        filter: true,
      },
    },

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
      options: {
        filter: true,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
      options: {
        filter: true,
      },
    },

    {
      name: 'contractTypeName',
      label: intl.formatMessage(messages.contractType),
      options: {
        filter: true,
      },
    },

    {
      name: 'grossSalary',
      label: intl.formatMessage(messages.grossSalary),
      options: {
        filter: true,
      },
    },

    {
      name: 'commession',
      label: intl.formatMessage(messages.commession),
      options: {
        filter: true,
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          return (
            <div>
              <IconButton
                onClick={(evt) => {
                  setOpenedDropdown((prev) => ({
                    ...prev,
                    [tableMeta.rowIndex]: evt.currentTarget,
                  }));
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={openedDropdown[tableMeta.rowIndex]}
                open={Boolean(openedDropdown[tableMeta.rowIndex])}
                onClose={() => onDropdownClose(tableMeta.rowIndex)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => onSetHiringDateBtnClick(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <SystemUpdateAltIcon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText>
                    {intl.formatMessage(messages.setHiringDate)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={() => onPreviewCVBtnClick(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <VisibilityIcon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText>
                    {intl.formatMessage(messages.viewApplicationForm)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  component='a'
                  target='_blank'
                  disabled={!row.cVfile}
                  href={ServerURL + 'Doc/CVDoc/' + row.cVfile}
                  onClick={() => onDropdownClose(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <DownloadIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    {intl.formatMessage(messages.downloadCV)}
                  </ListItemText>
                </MenuItem>
              </Menu>
            </div>
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
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    // selectableRows: 'none',
    searchOpen: false,
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
    customToolbarSelect: (selectedRows) => (
      <>
        <IconButton
          sx={{ mx: 2 }}
          onClick={() => onToolBarIconClick(selectedRows.data)}
        >
          <ManageAccountsIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </>
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
    <PayRollLoader isLoading={isLoading}>
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
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant='outlined' required />
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

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=''
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

Employment.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Employment);
