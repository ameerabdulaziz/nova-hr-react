import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/PermissionData";
import { useSelector } from "react-redux";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { FormattedMessage } from "react-intl";
import style from "../../../../../../app/styles/styles.scss";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";

function PermissionList() {
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
      name: "elementName",
      label: <FormattedMessage {...Payrollmessages["element"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "isDeducted",
      label: <FormattedMessage {...messages["isDeducted"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "deductedValue",
      label: <FormattedMessage {...messages["deductedValue"]} />,
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
                url={"/app/Pages/Att/PermissionEdit"}
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
    rowsPerPage: 50,
    page: 0,
    searchOpen: true,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={"/app/Pages/Att/PermissionCreate"}></AddButton>
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

export default PermissionList;
