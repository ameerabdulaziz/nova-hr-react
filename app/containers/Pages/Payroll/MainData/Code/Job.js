import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import JobData from "../api/JobData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import Payrollmessages from "../../messages";
import { PapperBlock } from "enl-components";
import PayRollLoader from "../../Component/PayRollLoader";

function Job({ intl }) {
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    try {
      setIsLoading(true);
      const data = await JobData(locale).GetList();

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
    } catch (err) {
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
    // {
    //   name: 'jobCode',
    //   label: intl.formatMessage(messages.jobCode),
    //   options: {
    //     filter: true
    //   }
    // },
    // {
    //   name: 'isLeadershipPosition',
    //   label: intl.formatMessage(messages.isLeadershipPosition),
    //   options: {
    //     filter: true
    //   }
    // },
    // {
    //   name: 'medicalInsuranceStartDay',
    //   label: intl.formatMessage(messages.medicalInsuranceStartDay),
    //   options: {
    //     filter: true
    //   }
    // },
    // {
    //   name: 'sancLevelName',
    //   label: intl.formatMessage(messages.sancLevelName),
    //   options: {
    //     filter: true
    //   }
    // },
    // {
    //   name: 'sancLevelArName',
    //   label: intl.formatMessage(messages.sancLevelArName),
    //   options: {
    //     filter: true
    //   }
    // },
    {
      name: "jobTypeName",
      label: intl.formatMessage(messages.jobTypeName),
      options: {
        filter: true,
      },
    },
    {
      name: "jobNatureName",
      label: intl.formatMessage(messages.jobNatureName),
      options: {
        filter: true,
      },
    },
    {
      name: "parentName",
      label: intl.formatMessage(messages.parentName),
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
                url={"/app/Pages/MainData/JobEdit"}
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
        <AddButton url={"/app/Pages/MainData/JobCreate"}></AddButton>
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
      let response = await JobData().Delete(deleteItem);

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
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=''
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

export default injectIntl(Job);
