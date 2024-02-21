import React, { useEffect, useRef, useState } from "react";
import { Print } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack
} from '@mui/material';
import parse from 'html-react-parser';
import { useReactToPrint } from "react-to-print";
import { formateDate } from "../../../helpers";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/PermissionTrxData";
import { useSelector } from "react-redux";
import messages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import style from "../../../../../../../app/styles/styles.scss";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../../Style";
import { PapperBlock } from "enl-components";
import EditButton from "../../../Component/EditButton";
import DeleteButton from "../../../Component/DeleteButton";
import AddButton from "../../../Component/AddButton";
import { format } from "date-fns";
import AlertPopup from "../../../Component/AlertPopup";
import Payrollmessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";


function PermissionTrxList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const [printContent, setPrintContent] = useState('');
  const documentTitle = 'Permission ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    documentTitle,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const handleClickOpen = (item) => {
    debugger;
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
      debugger;
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        fetchData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList();
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const onPrintBtnClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await ApiData(locale).print(id);
      setPrintContent(response);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "date",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },

    {
      name: "employeeName",
      label: <FormattedMessage {...Payrollmessages["employeeName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "permissionName",
      label: <FormattedMessage {...messages["permissionName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "minutesCount",
      label: <FormattedMessage {...messages["minutesCount"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "notes",
      label: <FormattedMessage {...Payrollmessages["notes"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "step",
      label: <FormattedMessage {...Payrollmessages["step"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: <FormattedMessage {...Payrollmessages["status"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "approvedEmp",
      label: <FormattedMessage {...Payrollmessages["approvedEmp"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "Print",
      label: <FormattedMessage {...Payrollmessages["Print"]} />,
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (_, tableMeta) => (
          <IconButton onClick={() => onPrintBtnClick(tableMeta.rowData[0])}>
            <Print sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        ),
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log("tableMeta =", tableMeta);
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/Att/PermissionTrxEdit"}
              ></EditButton>
              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData[0])}
              ></DeleteButton>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: "none",
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={"/app/Pages/Att/PermissionTrxCreate"}></AddButton>
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };
  
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Box
          ref={printDivRef}
          sx={{
            display: 'none',
            '@media print': {
              display: 'block',
            },
            px: 2,
            py: 4,
          }}
        >
          <Stack spacing={2} px={2}>
            <div>
              <img src={company?.logo} alt='' height={45} />
            </div>
          </Stack>

          <div className='ql-snow' style={{ direction: 'ltr' }}>
            <div className='ql-editor'>{parse(printContent)}</div>
          </div>
        </Box>

        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
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
    </PayRollLoader>
  );
}

export default injectIntl(PermissionTrxList);
