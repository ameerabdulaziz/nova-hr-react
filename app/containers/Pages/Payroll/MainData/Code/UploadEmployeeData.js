import React, { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import MUIDataTable from "mui-datatables";
import { FormattedMessage } from "react-intl";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "../../Style";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import classes2 from "../../../../../styles/styles.scss";

import { read, utils, writeFile } from "xlsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import messages from "../messages";

function UploadEmployeeData({ intl }) {
  const title = brand.name + " - Job";
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [search, setsearch] = useState("");
  const [cols, setCols] = useState("");
  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");

  let columns = [];

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
    rowsPerPage: 10,
    page: 0,
    selectableRowsHeader: false,
    selectableRows: "none",
  };

  //////////////////

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
          console.log("file2 =", rows);
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

  const submitFun = () => {
    console.log("Data =", [{ data: fileData }]);
  };

  console.log("fileData =", fileData);

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
      <PapperBlock whiteBg icon="border_color" title="" desc="">
        <div className={`${classes.root} ${classes2.btnsContainer}`}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.spacer} />

            <div className={`${classes.title} ${classes2.importBtn}`}>
              <FormControl
                variant="standard"
                className={`${cx(classes.textField)}`}
              >
                <div className={classes.actions}>
                  <Tooltip title="Download">
                    {/* <Tooltip title={<FormattedMessage {...messages.Download} />}> */}
                    <span>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        //   onClick={submitFun}
                      >
                        {smUp && " "} Download
                        {/* {smUp && ' '} <FormattedMessage {...messages.Download} /> */}
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </FormControl>

              <FormControl
                variant="standard"
                className={`${cx(classes.textField)}`}
              >
                <div className={classes.actions}>
                  <Tooltip title="Import Excel File To Can Submit">
                    {/* <Tooltip title={<FormattedMessage {...messages.SubmitEmployeeTooltip} />}> */}
                    <span>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={submitFun}
                        disabled={fileData.length !== 0 ? false : true}
                      >
                        {smUp && " "} Submit
                        {/* {smUp && ' '} <FormattedMessage {...messages.Submit} /> */}
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </FormControl>

              <FormControl
                variant="standard"
                className={`${cx(classes.textField)}`}
              >
                <div className={classes.actions}>
                  <Tooltip title="Reset">
                    {/* <Tooltip title={<FormattedMessage {...messages.Reset} />}> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={resetDataFun}
                    >
                      {smUp && " "} Reset
                      {/* {smUp && ' '} <FormattedMessage {...messages.Reset} /> */}
                    </Button>
                  </Tooltip>
                </div>
              </FormControl>

              <FormControl variant="standard" className={cx(classes.textField)}>
                <div className={classes.actions}>
                  <Tooltip title="Import">
                    {/* <Tooltip title={<FormattedMessage {...messages.Import} />}> */}
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
                      {smUp && " "} Import
                      {/* {smUp && ' '} <FormattedMessage {...messages.Import} /> */}
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
              </FormControl>
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
          {/* <AdvancedTable /> */}
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(UploadEmployeeData);
