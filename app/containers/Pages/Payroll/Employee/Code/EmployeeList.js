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
  const [anchorElOpt, setAnchorElOpt] = useState(null);
  const handleClickOpt = (event) => setAnchorElOpt(event.currentTarget);
  const handleCloseOpt = () => setAnchorElOpt(null);
  const [employeeid, setemployeeid] = useState({});
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);  
  const Title = localStorage.getItem("MenuName");

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