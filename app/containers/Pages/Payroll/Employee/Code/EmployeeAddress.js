import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CallMadeIcon from '@mui/icons-material/CallMade';
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
import { useLocation } from 'react-router-dom';
import tableMessage from '../../../../../components/Tables/messages';
import AlertPopup from '../../Component/AlertPopup';
import DecryptUrl from '../../Component/DecryptUrl';
import EmployeeNavigation from '../../Component/EmployeeNavigation';
import PayrollTable from '../../Component/PayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/EmployeeAddressData';
import EditTableRowPopup from '../component/EmployeeAddress/EditTableRowPopup';
import messages from '../messages';
import EmployeeData from '../../Component/EmployeeData';

function EmployeeAddress(props) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  // get employee data from url
  const empid  = DecryptUrl() ?  DecryptUrl()  : location.state ? location.state : null

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
        disabled={ employee === 0 || employee === ''}
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

  const handleEmpChange = (id, name, empName) => {
    if (name == "employeeId")
    {
      // setEmployee(id)
      
      if (id) {
        setEmployee({ id: id, name: empName })
        fetchTableData(id);
      }

      // used to disable add button when clear employee name compobox
    if(id === "")
    {
      setEmployee({ id: 0, name: '' })
      fetchTableData(0)
    }
    }
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
        setSelectedRow={setSelectedRow}
      />

      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container justifyContent='end' mt={0}>
          <Grid item>
            <EmployeeNavigation
              employeeId={employee.id}
              employeeName={employee.name}
              openInNewTap
              anchor={
                <Button variant='contained' endIcon={<CallMadeIcon />}>
                  {intl.formatMessage(payrollMessages.goTo)}
                </Button>
              }
            />
          </Grid>
        </Grid>

          <EmployeeData handleEmpChange={handleEmpChange}  id={empid && empid.id !== 0 ? empid.id : null} ></EmployeeData>
        
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
