import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/LoanTrxData";
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
import AlertPopup from "../../../Component/AlertPopup";
import Payrollmessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";


function LoanTrxList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  
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
      debugger;
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const CheckBox = (value) => {
    return (
      <div className={style.actionsSty}>
        {value ? (
          <CheckIcon style={{ color: "#3f51b5" }} />
        ) : (
          <CloseIcon style={{ color: "#717171" }} />
        )}
      </div>
    );
  };


  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "transDate",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
      name: "monthName",
      label: <FormattedMessage {...Payrollmessages["month"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "yearName",
      label: <FormattedMessage {...Payrollmessages["year"]} />,
      options: {
        filter: true,
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
      name: "totalvalue",
      label: <FormattedMessage {...Payrollmessages["value"]} />,
      options: {
        filter: true, 
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
                url={"/app/Pages/Payroll/LoanTrxEdit"}
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
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={"/app/Pages/Payroll/LoanTrxCreate"}></AddButton>
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

export default injectIntl(LoanTrxList);
