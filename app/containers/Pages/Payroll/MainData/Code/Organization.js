import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { injectIntl } from "react-intl";
import OrganizationData from "../api/OrganizationData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import useStyles from "../../../../../components/Tables/tableStyle-jss";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import Payrollmessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";

function Organization({ intl }) {
  const title = localStorage.getItem("MenuName");
  const { classes } = useStyles();
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    try {
      const data = await OrganizationData(locale).GetList();

      // this used to convert boolean values to string before store it in redux until table can read the values
      let newData = data.map((items) => {
        Object.keys(items).forEach((val) => {
          if (typeof items[val] == "boolean") {
            items[val] = String(items[val]);
          }
        });
        return items;
      });

      setDataTable(newData);
    } catch (e) {
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
      label: intl.formatMessage(messages.id),
      options: {
        display: true,
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
      options: {
        filter: true,
      },
    },
    {
      name: "parentName",
      label: intl.formatMessage(messages.parentNameOrg),
      options: {
        filter: true,
      },
    },
    {
      name: "empName",
      label: intl.formatMessage(messages.empName),
      options: {
        filter: true,
      },
    },
    {
      name: "manPower",
      label: intl.formatMessage(messages.manPower),
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
                url={"/app/Pages/MainData/OrganizationEdit"}
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
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    customToolbar: () => (
      <div className={style.customToolbarBtn}>
        <AddButton url={"/app/Pages/MainData/OrganizationCreate"}></AddButton>
      </div>
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const DeleteFun = async () => {
    try {
      setIsLoading(true);
      let response = await OrganizationData().Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getdata();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title={intl.formatMessage(messages.OrganizationsList)}
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
            locale === "en" ? deleteItem[2] : deleteItem[1]
          }`}
          callFun={DeleteFun}
        />
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(Organization);
