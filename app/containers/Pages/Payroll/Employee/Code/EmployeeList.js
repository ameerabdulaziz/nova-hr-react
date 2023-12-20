import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { injectIntl, FormattedMessage } from "react-intl";
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PersonalData';
import { useSelector } from 'react-redux';
import { CheckBox, IndeterminateCheckBoxRounded } from '@mui/icons-material';
import messages from '../messages';
import style from '../../../../../styles/styles.scss';
import useStyles from '../../Style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteButton from '../../Component/DeleteButton';
import AddButton from '../../Component/AddButton';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { Backdrop, CircularProgress, Box } from "@mui/material";
import AlertPopup from "../../Component/AlertPopup";
import Payrollmessages from "../../messages";
import { PapperBlock } from "enl-components";

function EmployeeList(props) {
  const { intl } = props;
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [employeeid, setemployeeid] = useState({});
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);  
  const Title = localStorage.getItem("MenuName");

  const [openedDropdown, setOpenedDropdown] = useState({});

  const closeDropdown = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const handleClickOpen = (item) => {
    debugger;
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

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
    try {
    const dataApi = await ApiData(locale).GetList();
    setdata(dataApi);
    } catch (err) {}
    finally {setIsLoading(false);}
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function deleterow() {
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        fetchData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      
    }
    finally {setIsLoading(false);}
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
      label: intl.formatMessage(messages.employeeCode),
      options: {
        filter: true,
      },
    },
    {
      name: 'enName',
      label: intl.formatMessage(messages.employeename),
      options: {
        filter: true,
      },
    },
    {
      name: 'statusName',
      label: intl.formatMessage(messages.status),
      options: {
        filter: true,
      },
    },

    {
      name: 'identityNumber',
      label: intl.formatMessage(messages.identitynumber),
      options: {
        filter: true,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
      options: {
        filter: true,
      },
    },
    {
      name: 'reportToName',
      label: intl.formatMessage(messages.reportto),
      options: {
        filter: true,
      },
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobname),
      options: {
        filter: true,
      },
    },
    {
      name: 'isInsured',
      label: intl.formatMessage(messages.isinsured),
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
      label: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData[0])}
              ></DeleteButton>

              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                //onClick={handleClick}
                //   onClick={handleClickOpt}
                onClick={(evt) => {
                  setOpenedDropdown((prev) => ({
                    ...prev,
                    [tableMeta.rowIndex]: evt.currentTarget,
                  }));
                  setemployeeid({
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[2],
                  });
                }}
                size="large"
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="long-menu"
                anchorEl={openedDropdown[tableMeta.rowIndex]}
                open={Boolean(openedDropdown[tableMeta.rowIndex])}
                onClose={() => closeDropdown(tableMeta.rowIndex)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      width: 200,
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
                {optionsOpt.map((option) => (
                  <MenuItem
                    key={option.name}
                    onClick={() => {
                      closeDropdown(tableMeta.rowIndex)
                      history.push(`/app/Pages/Employee/${option.url}`, {
                        empid: employeeid,
                      });
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
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
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={'/app/Pages/Employee/Personal'}></AddButton>
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };

  const { classes } = useStyles();

  return (
    <Box
    sx={{
      zIndex: 100,
      position: "relative",
    }}
  >
    <PapperBlock whiteBg icon="border_color" title={Title} desc="">
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.69)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <div className={classes.CustomMUIDataTable}>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
    <AlertPopup
          handleClose={handleClose}
          open={openParentPopup}
          messageData={`${intl.formatMessage(
            Payrollmessages.deleteMessage
          )}${deleteItem}`}
          callFun={deleterow}
        />
    </PapperBlock>
    </Box>
  );
}


export default injectIntl(EmployeeList);
