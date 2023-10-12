import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/UniformTrxData";
import { useSelector } from "react-redux";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import style from "../../../../../../app/styles/styles.scss";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";

function UniformReceiveList(props) {
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
    const dataApi = await ApiData(locale).GetList(2);
    setdata(dataApi);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      label: <FormattedMessage {...Payrollmessages["id"]} />,
      options: {
        filter: false,
      },
    },
    {
      name: "date",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "employeeName",
      label: <FormattedMessage {...messages["employeeName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "uniformName",
      label: <FormattedMessage {...messages["uniformName"]} />,
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
      name: "quantity",
      label: <FormattedMessage {...Payrollmessages["count"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "uniformPrice",
      label: <FormattedMessage {...Payrollmessages["price"]} />,
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
                url={"/app/Pages/HR/UniformReceiveEdit"}
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
      <AddButton url={"/app/Pages/HR/UniformReceiveCreate"}></AddButton>
    ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
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

export default injectIntl(UniformReceiveList);
