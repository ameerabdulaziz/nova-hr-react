import { Backdrop, Box, CircularProgress } from "@mui/material";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import style from "../../../../../styles/styles.scss";
import AddButton from "../../Component/AddButton";
import DeleteButton from "../../Component/DeleteButton";
import EditButton from "../../Component/EditButton";
import useStyles from "../../Style";
import payrollMessages from "../../messages";
import api from "../api/GovernmentSickLeaveData";
import messages from "../messages";

function GovernmentSickLeave(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      const response = await api(locale).delete(id);

      if (response.status === 200) {
        toast.success(notif.saved);

        fetchTableData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "employeeId",
      label: <FormattedMessage {...messages.employeeCode} />,
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: <FormattedMessage {...messages.employeeName} />,
      options: {
        filter: true,
      },
    },

    {
      name: "vacationName",
      label: <FormattedMessage {...messages.LeaveType} />,
      options: {
        filter: true,
      },
    },
    {
      name: "daysCount",
      label: <FormattedMessage {...messages.daysCount} />,
      options: {
        filter: true,
      },
    },
    {
      name: "fromDate",
      label: <FormattedMessage {...messages.fromdate} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "toDate",
      label: <FormattedMessage {...messages.todate} />,
      options: {
        filter: true,
      },
    },
    {
      name: "trxDate",
      label: <FormattedMessage {...messages.transactionDate} />,
      options: {
        filter: true,
      },
    },
    {
      name: "Actions",
      label: <FormattedMessage {...messages.actions} />,
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className={style.actionsSty}>
            <EditButton
              param={{ id: tableMeta.rowData[0] }}
              url={"/app/Pages/vac/GovernmentSickLeaveEdit"}
            />

            <DeleteButton clickfnc={() => deleteRow(tableMeta.rowData[0])} />
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: "none",
    onSearchClose: () => {
      // some logic
    },
    customToolbar: () => (
      <AddButton url={"/app/Pages/vac/GovernmentSickLeaveCreate"} />
    ),
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.69)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </PapperBlock>{" "}
    </Box>
  );
}

export default injectIntl(GovernmentSickLeave);
