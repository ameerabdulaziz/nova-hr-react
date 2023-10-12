import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/ShiftData";
import { useSelector } from "react-redux";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import style from "../../../../../../app/styles/styles.scss";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";

function ShiftList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");

  async function deleteList(selectedRows) {
    const list = [];
    for (let i = 0; i < selectedRows.data.length; i++) {
      list.push(data[selectedRows.data[i].dataIndex].id);
    }
    try {
      let response = await ApiData(locale).DeleteList(list);

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
  async function fetchData() {
    const dataApi = await ApiData(locale).GetList();
    setdata(dataApi);
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
      name: "startTime",
      label: <FormattedMessage {...messages["startTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "endTime",
      label: <FormattedMessage {...messages["endTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "shft2d",
      label: <FormattedMessage {...messages["shft2d"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "shft10Hours",
      label: <FormattedMessage {...messages["shft10Hours"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "hoursFromEmp",
      label: <FormattedMessage {...messages["hoursFromEmp"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "webHide",
      label: <FormattedMessage {...messages["webHide"]} />,
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
                url={"/app/Pages/Att/ShiftEdit"}
              ></EditButton>
              <DeleteButton
                clickfnc={() => deleterow(tableMeta.rowData[0])}
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
    rowsPerPage: 10,
    page: 0,
    searchOpen: true,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={"/app/Pages/Att/ShiftCreate"}></AddButton>
    ),
    customToolbarSelect: (selectedRows) => (
      <div>
        <DeleteButton clickfnc={() => deleteList(selectedRows)}></DeleteButton>
      </div>
    ),
  };

  return (
    <PapperBlock whiteBg icon="border_color" title={Title} desc="">
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PapperBlock>
  );
}

export default injectIntl(ShiftList);
