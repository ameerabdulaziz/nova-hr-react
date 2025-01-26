import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
import AddToTrainingPopup from '../components/Employment/AddToTrainingPopup';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Tooltip from '@mui/material/Tooltip';

function Employment(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [dateError, setDateError] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  const [openAddToTrainIngPopup, setOpenAddToTrainIngPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [popupType, setPopupType] = useState("");
  const [SelectedRows, setSelectedRows] = useState([]);

  const [popupState, setPopupState] = useState({
    date: new Date(),
  });

   const [training, setTraining] = useState({
      id: 0,
      arName: "",
      enName: "",
      courseId: 0,
      courseName: "",
      fromDate: null,
      toDate: null,
      locationName: "",
      trainerId: 0,
      trainerName: "",
      hiringDate: null
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
    setPopupType("setHiringDate")
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
              addToTrainingFun={addToTrainingFun}
            />
          );
        },
      },
    },
  ];

  const onToolBarIconClick = (rows,popupTypeData) => {
    const ids = rows.map((item) => tableData[item.dataIndex]?.id);
    setSelectedRowsId(ids);

    if(popupTypeData === "setHiringDate")
    {
      setIsPopupOpen(true);
    }
    else if(popupTypeData === "training")
    {
      setOpenAddToTrainIngPopup(true);
    }
  };

  const options = {
    selectableRows: 'multiple',
    customToolbarSelect: (selectedRows) => (
      <div>
        <Tooltip title={intl.formatMessage(messages.addToTraining)} cursor="pointer" className="mr-6">  
          <IconButton
            onClick={() => {
              onToolBarIconClick(selectedRows.data,"training")
              setPopupType("training")
            }}
          >
            <LocalLibraryIcon sx={{ fontSize: '25px' }} />
          </IconButton>
        </Tooltip>

        <IconButton
          onClick={() => {
            onToolBarIconClick(selectedRows.data,"setHiringDate")
            setPopupType("setHiringDate")
          }}
        >
        <ManageAccountsIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </div>
    ),
    onRowSelectionChange: (rowsSelectedIndexes) => {
      setSelectedRows(rowsSelectedIndexes);
    },
    rowsSelected: SelectedRows
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

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    let body = {} 
    let params = {}

    if(popupType === "setHiringDate")
      {
        body = {
          ids: selectedRowsId,
        };

        params = {
          hiringdate:formateDate(popupState.date)
        }

        onPopupClose();
      }

      if(popupType === "training")
      {
        body = selectedRowsId


        params = {
          hiringdate:formateDate(popupState.date),
          TrainingId: training.id,
        }

        handleClosePoup()
      }

      setIsLoading(true);

    try {
      await api(locale).save(params,body);
      toast.success(notif.updated);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      setSelectedRows([])
      await fetchTableData();
    }
  };


  const handleClosePoup = () => {
    setOpenAddToTrainIngPopup(false);
  };


  const addToTrainingFun = (ids) => {    
    setSelectedRowsId(ids);
    setOpenAddToTrainIngPopup(true);
    setPopupType("training")
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.date)}
                  value={popupState.date ? dayjs(popupState.date) : null}
                  sx={{ width: '100%' }}
                  onChange={(date) => onPopupDatePickerChange(date, 'date')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      date: error !== null,
                    }));
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
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

      <AddToTrainingPopup 
        handleClose={handleClosePoup}
        open={openAddToTrainIngPopup}
        training={training}
        setTraining={setTraining}
        submitFun={onPopupFormSubmit}
      />

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
