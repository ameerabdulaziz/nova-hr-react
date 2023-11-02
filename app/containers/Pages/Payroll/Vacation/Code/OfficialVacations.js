import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import OfficialVacationsData from "../api/OfficialVacationsData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import PayRollLoader from "../../Component/PayRollLoader";
import { PapperBlock } from "enl-components";

function OfficialVacations({ intl }) {
  const Title = localStorage.getItem("MenuName");
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await OfficialVacationsData(locale).GetList();

      let newData = data.map((items) => {
        Object.keys(items).forEach((val) => {
          // this used to convert boolean values to string until table can read the values
          if (typeof items[val] == "boolean") {
            items[val] = String(items[val]);
          }
          // used to make table read date Data as a date
          if (val === "vacationDate") {
            items[val] = new Date(items[val]).toLocaleDateString();
          }
        });
        return items;
      });
      setDataTable(newData);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
      },
    },
    {
      name: "arName",
      label: intl.formatMessage(messages.arName),
      options: {
        filter: true,
      },
    },
    {
      name: "enName",
      label: intl.formatMessage(messages.enName),
    },
    {
      name: "vacationDate",
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        filter: true,
      },
    },
    {
      name: "Actions",
      label: intl.formatMessage(messages.actions),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/vac/OfficialVacationsEdit"}
              ></EditButton>

              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData)}
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
    page: 0,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    // searchOpen: true,
    selectableRows: "none",
    customToolbar: () => (
      <div className={style.customToolbarBtn}>
        <AddButton url={"/app/Pages/vac/OfficialVacationsCreate"}></AddButton>
      </div>
    ),
  };

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const DeleteFun = async () => {
    setSubmitting(true);
    setIsLoading(true);
    setProcessing(true);

    try {
      let response = await OfficialVacationsData().Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getdata();
      }
    } catch (err) {
      //
    } finally {
      setSubmitting(false);
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title={intl.formatMessage(messages.OfficialVacations)}
            data={dataTable}
            columns={columns}
            options={options}
            className={style.tableSty}
          />
        </div>

        <AlertPopup
          handleClose={handleClose}
          open={openParentPopup}
          messageData={`${intl.formatMessage(Payrollmessages.deleteMessage)}${
            deleteItem[1]
          }`}
          callFun={DeleteFun}
          submitting={submitting}
          processing={processing}
        />
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(OfficialVacations);
