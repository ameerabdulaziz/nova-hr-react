import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PersonalData';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox, IndeterminateCheckBoxRounded } from '@mui/icons-material';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import style from '../../../../../styles/styles.scss';
import useStyles from '../../Style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteButton from '../../Component/DeleteButton';
import AddButton from '../../Component/AddButton';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';

function EmployeeList() {
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [anchorElOpt, setAnchorElOpt] = useState(null);
  const handleClickOpt = (event) => setAnchorElOpt(event.currentTarget);
  const handleCloseOpt = () => setAnchorElOpt(null);
  const [employeeid, setemployeeid] = useState({});
  const title = localStorage.getItem('MenuName');

  const optionsOpt = [
    { name: 'Personal', url: 'Personal' },
    { name: 'Qualification', url: 'EmployeeQualification' },
    { name: 'Contact Info', url: 'EmployeeContactInfo' },
    { name: 'Address', url: 'EmployeeAddress' },
    { name: 'Car', url: 'EmployeeCar' },
    { name: 'Course', url: 'EmployeeCourse' },
    { name: 'Contract', url: 'EmployeeContract' },
    { name: 'Experince', url: 'EmployeeExperince' },
    { name: 'Insurance', url: 'EmployeeInsurance' },
    { name: 'Bank', url: 'EmployeeBank' },
    { name: 'Salary', url: 'EmployeeSalary' },
  ];

  async function fetchData() {
    const dataApi = await ApiData(locale).GetList();
    setdata(dataApi);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function deleterow(id) {
    try {
      let response = await ApiData(locale).Delete(id);

      if (response.status == 200) {
        toast.success(notif.saved);
        fetchData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
  }
  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: 'false',
      },
    },
    {
      name: 'employeeCode',
      label: <FormattedMessage {...messages['employeeCode']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'enName',
      label: <FormattedMessage {...messages['employeename']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'statusName',
      label: <FormattedMessage {...messages['status']} />,
      options: {
        filter: true,
      },
    },

    {
      name: 'identityNumber',
      label: <FormattedMessage {...messages['identitynumber']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'organizationName',
      label: <FormattedMessage {...messages['organization']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'reportToName',
      label: <FormattedMessage {...messages['reportto']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'jobName',
      label: <FormattedMessage {...messages['jobname']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'isInsured',
      label: <FormattedMessage {...messages['isinsured']} />,
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === true) {
            return <CheckBox />;
          }
          if (value === false) {
            return <IndeterminateCheckBoxRounded />;
          }
          return <Chip label="Unknown" />;
        },
      },
    },

    {
      name: 'Actions',
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log('tableMeta =', tableMeta);
          return (
            <div className={style.actionsSty}>
              <DeleteButton
                clickfnc={() => deleterow(tableMeta.rowData[0])}
              ></DeleteButton>

              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                //onClick={handleClick}
                //   onClick={handleClickOpt}
                onClick={(e) => {
                  setemployeeid({
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  });
                  setAnchorElOpt(e.currentTarget);
                }}
                size="large"
              >
                <MoreVertIcon />
                <Menu
                  id="long-menu"
                  anchorEl={anchorElOpt}
                  open={Boolean(anchorElOpt)}
                  onClose={handleCloseOpt}
                  PaperProps={{
                    style: {
                      // maxHeight: 48 * 4.5,
                      width: 200,
                    },
                  }}
                >
                  {optionsOpt.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={() => {
                        history.push(`/app/Pages/Employee/${option.url}`, {
                          empid: employeeid,
                        });
                        setAnchorElOpt(null);
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 100,
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/Employee/Personal'}></AddButton>
    ),
  };

  const { classes } = useStyles();

  return (
    <div className={classes.table}>
      <MUIDataTable
        title={title ?? ''}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default EmployeeList;
