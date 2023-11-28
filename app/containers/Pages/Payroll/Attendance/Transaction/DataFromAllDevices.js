import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/DeviceData";
import { useSelector } from "react-redux";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";
import Payrollmessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";
import { Button, Grid } from "@mui/material";

function DataFromAllDevices(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      debugger;
      const dataApi = await ApiData(locale).GetList();
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetData(selectedRows) {
    try {
      debugger;
      const params = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        params.push(data[selectedRows.data[i].dataIndex].id);
      }
      if (params.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).ReadAllDevices(params);
        var messages = "";
        if (response.status == 200) {
          for (let i = 0; i < response.data.length; i++) {
            messages += response.data[i] + "\n";
          }
          toast.success(messages);
          fetchData();
        } else {
          toast.error(response.statusText);
        }
      }
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
      name: "ip",
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
      name: "lastLog",
      label: <FormattedMessage {...messages["lastLog"]} />,
      options: {
        filter: true,
        /*  customBodyRender: (value) =>
          value == null ? "" : format(new Date(value), "yyyy-MM-dd HH:mm"), */
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,

    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => <div></div>,
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => handleGetData(selectedRows)}
            >
              <FormattedMessage {...messages.getData} />
            </Button>
          </Grid>
        </Grid>
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
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(DataFromAllDevices);
