import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import payrollMessages from '../../messages';
import api from '../api/ReviewEmploymentRequestData';
import messages from '../messages';

function ReviewEmploymentRequest(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [openedDropdown, setOpenedDropdown] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isCreateEmploymentRequest, setIsCreateEmploymentRequest] = useState(false);

  const [popupState, setPopupState] = useState({
    comments: '',
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

  const onPreviewEmploymentRequestClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;

    history.push('/app/Pages/Recruitment/ReviewEmploymentRequestEdit', {
      id,
    });
  };

  const onSetHiringDateBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;
    setSelectedRowId(id);
    setIsPopupOpen(true);
  };

  const columns = [
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
      name: 'positionTypeName',
      label: intl.formatMessage(messages.positionType),
      options: {
        filter: true,
      },
    },

    {
      name: 'reportingToName',
      label: intl.formatMessage(messages.reportingTo),
      options: {
        filter: true,
      },
    },

    {
      name: 'insDate',
      label: intl.formatMessage(messages.insertDate),
      options: {
        filter: true,
        customBodyRender: formateDate
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        customBodyRender: (_, tableMeta) => (
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
                  {intl.formatMessage(messages.createEmploymentRequest)}
                </ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => onPreviewEmploymentRequestClick(tableMeta.rowIndex)}
              >
                <ListItemIcon>
                  <VisibilityIcon fontSize='small' />
                </ListItemIcon>

                <ListItemText>
                  {intl.formatMessage(messages.viewEmploymentRequest)}
                </ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: 'none',
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

  const onPopupClose = () => {
    setIsPopupOpen(false);

    setPopupState({
      comments: '',
    });
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();

    onPopupClose();

    if (isCreateEmploymentRequest) {
      history.push('/app/Pages/Recruitment/JobAdvertisementCreate', {
        employmentId: selectedRowId,
        employmentComments: popupState.comments
      });
    } else {
      const body = {
        id: selectedRowId,
        ...popupState
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
            <Grid item xs={12}>
              <TextField
                name='comments'
                value={popupState.comments}
                onChange={onPopupInputChange}
                label={intl.formatMessage(messages.comments)}
                fullWidth
                variant='outlined'
                required
                multiline
                rows={1}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCreateEmploymentRequest}
                    onChange={(evt) => setIsCreateEmploymentRequest(evt.target.checked)}
                  />
                }
                label={intl.formatMessage(messages.createJobAdvertisement)}
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

ReviewEmploymentRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReviewEmploymentRequest);
