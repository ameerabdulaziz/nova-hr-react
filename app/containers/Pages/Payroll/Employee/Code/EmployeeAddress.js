import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import tableMessage from '../../../../../components/Tables/messages';
import AlertPopup from '../../Component/AlertPopup';
import PayrollTable from '../../Component/PayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeAddressData';
import EditTableRowPopup from '../component/EmployeeAddress/EditTableRowPopup';
import messages from '../messages';

function EmployeeAddress(props) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // decode URL
  const url = decodeURI(window.location.href);

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isValidEncode = (str) => {
    try {
      atob(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // get employee data from url
  const { empid } =		isValidEncode(url.split('/').at(-1))
		&& isValidJSON(atob(url.split('/').at(-1)))
		  ? JSON.parse(atob(url.split('/').at(-1)))
		  : { id: 0, name: '' };

  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const [employee, setEmployee] = useState(empid ?? { id: 0, name: '' });
  const [employeeList, setEmployeeList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [governmentList, setGovernmentList] = useState([]);

  const locale = useSelector((state) => state.language.locale);

  const fetchTableData = async (id = 0) => {
    setIsLoading(true);

    try {
      const response = await api(locale).getList(id);
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const government = await GeneralListApis(locale).GetGovernmentList();
      setGovernmentList(government);

      const cities = await GeneralListApis(locale).GetCityList();
      setCityList(cities);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
      fetchTableData();
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const deleteRow = async () => {
    try {
      setIsLoading(true);
      await api(locale).delete(deletedId);

      toast.success(notif.saved);

      fetchTableData(employee.id);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async (body) => {
    const formData = {
      ...body,
      employeeId: employee.id,
    };

    try {
      setIsLoading(true);

      await api(locale).save(formData);

      toast.success(notif.saved);

      fetchTableData(employee.id);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onEmployeeChange = (value) => {
    setEmployee({
      id: value !== null ? value.id : 0,
      name: value !== null ? value.name : '',
    });

    if (value) {
      fetchTableData(value.id);
    }
  };

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'arAddress',
      label: intl.formatMessage(tableMessage.araddress),
    },

    {
      name: 'enaddress',
      label: intl.formatMessage(tableMessage.enaddress),
    },

    {
      name: 'govName',
      label: intl.formatMessage(tableMessage.govname),
    },

    {
      name: 'cityName',
      label: intl.formatMessage(tableMessage.city),
    },

    {
      name: 'actions',
      label: intl.formatMessage(payrollMessages.Actions),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData.find((row) => row.id === tableMeta.rowData[0]);

          return (
            <Stack direction='row'>
              <IconButton
                color='primary'
                onClick={() => {
                  setSelectedRow(row);
                  setIsPopupOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color='error'
                onClick={() => {
                  setDeletedId(tableMeta.rowData[0]);
                  setIsDeletePopupOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    },
  ];

  const options = {
    customToolbar: () => (
      <Button
        disabled={employee.id === 0 || employee.id === ''}
        variant='contained'
        onClick={() => {
          setIsPopupOpen(true);
        }}
        color='primary'
        startIcon={<AddIcon />}
      >
        {intl.formatMessage(payrollMessages.add)}
      </Button>
    ),
  };

  return (
    <>
      <AlertPopup
        handleClose={() => {
          setIsDeletePopupOpen(false);
        }}
        open={isDeletePopupOpen}
        messageData={intl.formatMessage(payrollMessages.deleteMessage)}
        callFun={deleteRow}
      />

      <EditTableRowPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        selectedRow={selectedRow}
        governmentList={governmentList}
        cityList={cityList}
        onSave={onSave}
      />

      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container spacing={2} mt={0}>
          <Grid item md={6}>
            <Autocomplete
              options={employeeList}
              value={{ id: employee.id, name: employee.name }}
              isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => onEmployeeChange(value)}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id + option.name}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  {...params}
                  label={intl.formatMessage(messages.chooseEmp)}
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        showLoader
        data={tableData}
        columns={columns}
        options={options}
      />
    </>
  );
}

EmployeeAddress.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeAddress);
