import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/DeviceData";
import { useSelector } from "react-redux";
import EditButton from "../../../Component/EditButton";
import DeleteButton from "../../../Component/DeleteButton";
import AddButton from "../../../Component/AddButton";
import messages from "../../messages";
import { injectIntl,FormattedMessage } from "react-intl";
import style from "../../../../../../../app/styles/styles.scss";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../../Style";
import { PapperBlock } from "enl-components";
import AlertPopup from "../../../Component/AlertPopup";
import Payrollmessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";


function DeviceList(props) {
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
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

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
      name: "arName",
      label: <FormattedMessage {...Payrollmessages["arName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "enName",
      label: <FormattedMessage {...Payrollmessages["enName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "iP",
      label: <FormattedMessage {...messages["ip"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "port",
      label: <FormattedMessage {...messages["port"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "serialNumber",
      label: <FormattedMessage {...messages["serialNumber"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "transportaion",
      label: <FormattedMessage {...messages["transportaion"]} />,
      options: {
        filter: true,
      },
    },
   
    
    {
      name: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/Att/DeviceEdit"}
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
      <AddButton url={"/app/Pages/Att/DeviceCreate"}></AddButton>
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

export default injectIntl(DeviceList);

