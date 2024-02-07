import React, { useState, useEffect, useCallback, useRef } from "react";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import MUIDataTable from "mui-datatables";
import { FormattedMessage } from "react-intl";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "../../../Style";
import { useSelector } from "react-redux";
import classes2 from "../../../../../../styles/styles.scss";
import ApiData from "../../api/PermissionTrxData";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { read, utils } from "xlsx";
import PayRollLoader from "../../../Component/PayRollLoader";
import { Grid } from "@mui/material";
import Payrollmessages from "../../../messages";
import { ServerURL } from "../../../api/ServerConfig";

function PermissionTrxImport({ intl }) {
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const [cols, setCols] = useState("");
  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const Title = localStorage.getItem("MenuName");
  let columns = [];
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = ($event) => {
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
            raw: false,
          });
          setFileData(rows);
          rows.map((item) => setCols(Object.keys(item)));
        }
      };
      reader.readAsArrayBuffer(file);
      setFileTitle(file.name.split(".")[0]);
    }
  };
  const resetDataFun = () => {
    setFileData([]);
    setFileTitle("");
    setCols("");
    setFile("");
  };

  const submitFun = async (e) => {
    try {
      setIsLoading(true);
      let response = await ApiData(locale).SaveList(fileData);

      if (response.status == 200) {
        toast.success(notif.saved);
        resetDataFun();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  columns =
    cols.length !== 0
      ? cols.map((item) => ({
          name: item,
          label: item,
          options: {
            filter: true,
          },
        }))
      : [];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
    selectableRowsHeader: false,
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <div className={`${classes.root} ${classes2.btnsContainer}`}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.spacer} />

            <div className={`${classes.title} `} style={{ width: "100%" }}>
            <Grid
                item
                xs={12}
                md={12}
                container
                spacing={3}
                direction="row"
                className={`${classes2.itemsStyle}   ${
                  locale === "en" ? classes2.btnsStyle : classes2.btnsStyleAr
                } `}
              >
                  <Grid item xs={12} md={6} lg={2}>
                  <div className={classes.actions}>
                    <Tooltip title="Download">
                      <a
                        href={`${ServerURL}Doc/ExcelForm/Permission.xlsx`}
                        target="_blank"
                        rel="noreferrer"
                        download
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                        >
                          <FormattedMessage {...Payrollmessages.Download} />
                        </Button>
                      </a>
                    </Tooltip>
                  </div>
                </Grid>

              <Grid item xs={12} md={6} lg={2}>
                <div className={classes.actions}>
                  <Tooltip title="Import">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      component="label"
                    >
                      <AddIcon
                        className={cx(
                          smUp && classes.leftIcon,
                          classes.iconSmall
                        )}
                      />

                      <FormattedMessage {...Payrollmessages.Import} />
                      <input
                        hidden
                        value={file}
                        type="file"
                        name="file"
                        className="custom-file-input"
                        id="inputGroupFile"
                        onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                    </Button>
                  </Tooltip>
                </div>
                </Grid>

              <Grid item xs={12} md={6} lg={2}>

                <div className={classes.actions}>
                  <Tooltip title="Reset">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={resetDataFun}
                    >

                      <FormattedMessage {...Payrollmessages.reset} />
                    </Button>
                  </Tooltip>
                </div>

              </Grid>

               <Grid item xs={12} md={6} lg={2}>
                <div className={classes.actions}>
                  <Tooltip title="Import Excel File To Can Submit">
                    <span>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={submitFun}
                        disabled={fileData.length !== 0 ? false : true}
                      >

                        <FormattedMessage {...Payrollmessages.save} />
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </Grid>
              </Grid>
            </div>
          </Toolbar>

          {fileData.length !== 0 && (
            <div className={classes.CustomMUIDataTable}>
              <MUIDataTable
                title={fileTitle}
                data={fileData}
                columns={columns}
                options={options}
                className={classes2.tableSty}
              />
            </div>
          )}
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(PermissionTrxImport);
