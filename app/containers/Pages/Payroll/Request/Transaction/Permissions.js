import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { injectIntl } from "react-intl";
import PermissionsData from "../api/PermissionsData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { FormattedMessage } from "react-intl";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "../../Style";
// import useStyles from '../../../../../components/Tables/tableStyle-jss';
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import style from "../../../../../styles/styles.scss";
import EditIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertPopup from "../../../../../components/Popup/AlertDeletePopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { format } from "date-fns";

function Permissions({ intl }) {
  const title = brand.name + " - Permissions";
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [search, setsearch] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);

  const getdata = async () => {
    const data = await PermissionsData(locale).GetList();

    let newData = data.map((items) => {
      Object.keys(items).forEach((val) => {
        // this used to convert boolean values to string until table can read the values
        if (typeof items[val] == "boolean") {
          items[val] = String(items[val]);
        }

        // used to make table read date Data as a date
        if (val === "date") {
          items[val] = new Date(items[val]).toLocaleDateString();
        }

        // used to convert Time from 24H to 12H
        if (val === "startTime" || val === "endTime") {
          const [hours, minutes, seconds] = items[val].split(":");
          const timeObj = new Date();
          timeObj.setHours(hours);
          timeObj.setMinutes(minutes);
          timeObj.setSeconds(seconds);
          const ampm = timeObj.getHours() >= 12 ? "PM" : "AM";
          let hours12 = timeObj.getHours() % 12;
          hours12 = hours12 ? hours12 : 12; // convert 0 to 12

          items[val] = `${hours12}:${minutes}:${seconds} ${ampm}`;
        }
      });
      return items;
    });

    setDataTable(newData);
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
      name: "employeeId",
      label: intl.formatMessage(messages.employeeId),
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },
    {
      name: "permissionName",
      label: intl.formatMessage(messages.permissionType),
      options: {
        filter: true,
      },
    },

    {
      name: "date",
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "startTime",
      label: intl.formatMessage(messages.startTime),
      options: {
        filter: true,
      },
    },
    {
      name: "endTime",
      label: intl.formatMessage(messages.endTime),
      options: {
        filter: true,
      },
    },
    {
      name: "minutesCount",
      label: intl.formatMessage(messages.minutesCount),
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
              <IconButton aria-label="Edit" size="large">
                {/* <Link to={`/app/Pages/MainData/EditJob${tableMeta.rowData[0]}`}> */}
                <Link
                  to={{
                    pathname: "/app/Pages/Request/PermissionsEdit",
                    state: { id: tableMeta.rowData[0] },
                  }}
                >
                  <EditIcon />
                </Link>
              </IconButton>

              <IconButton
                aria-label="Delete"
                size="large"
                onClick={() => {
                  handleClickOpen(tableMeta.rowData);
                }}
              >
                <DeleteIcon />
              </IconButton>
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
    // searchOpen: true,
    selectableRows: "none",
    customToolbar: () => (
      <Tooltip title="Add New">
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/app/Pages/Request/PermissionsCreate`);
          }}
          color="secondary"
          className={classes.button}
        >
          <AddIcon />
          <FormattedMessage {...Payrollmessages.add} />
        </Button>
      </Tooltip>
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
    setProcessing(true);

    try {
      let response = await PermissionsData().Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getdata();
      } else {
        toast.error(response.statusText);
      }

      setSubmitting(false);
      setProcessing(false);
    } catch (err) {
      toast.error(notif.error);
      setSubmitting(false);
      setProcessing(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.root}>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title={intl.formatMessage(messages.PermissionsList)}
            data={search ? search : dataTable}
            columns={columns}
            options={options}
            className={style.tableSty}
          />
        </div>
      </div>

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={deleteItem[2]}
        callFun={DeleteFun}
        submitting={submitting}
        processing={processing}
      />
    </div>
  );
}

export default injectIntl(Permissions);
