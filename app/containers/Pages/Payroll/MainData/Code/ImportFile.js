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
// import { ImportFiles } from './messages';
import messages from "../messages";
import { Card, CardContent } from "@mui/material";

function ImportFile({ intl }) {
  const title = brand.name + " - Job";
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [search, setsearch] = useState("");
  const [cols, setCols] = useState("");
  const [comboBoxOptions, setComboBoxOptions] = useState([
    { id: 1, name: "CSAT" },
    { id: 2, name: "QA" },
    { id: 2, name: "AHT" },
    { id: 2, name: "Absenteeism" },
    { id: 2, name: "Utilization" },
  ]);
  const [comboBoxVal, setComboBoxVal] = useState("");

  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState("");

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
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
    selectableRowsHeader: false,
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
    comboBoxOptions.map((val) => {
      // console.log("id =", val.id);
      // console.log("name =",  val.name );
      if (comboBoxVal === val.id) {
        console.log("Data =", [{ type: val.name, data: fileData }]);
      }
    });
  };

  const uploadFun = (e) => {
    const files = e.target.files[0];
    if (
      files.type === ".csv" ||
      files.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      files.type === "application/vnd.ms-excel" ||
      files.type === "image/png" ||
      files.type === "image/jpeg" ||
      files.type === "image/jpg" ||
      files.type === "image/apng" ||
      files.type === "image/webp" ||
      files.type === "image/svg+xml" ||
      files.type === "application/pdf" ||
      files.type === ".pdf" ||
      files.type === ".doc" ||
      files.type === ".docx"
    ) {
      // call Api here
      console.log("file in =", files);
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
      <PapperBlock whiteBg icon="border_color" title="" desc="">
        <div className={`${classes.root} ${classes2.btnsContainer}`}>
          {/* <Card className={classes.card}>  */}

          <Toolbar className={classes.toolbar}>
            <Autocomplete
              id="ddlMenu"
              className={classes2.comboBoxSty}
              options={comboBoxOptions}
              // options={topFilms}
              sx={{ width: "300px", paddingTop: "0px" }}
              getOptionLabel={(option) =>
                option.name || ""
                // option ? option.name : ""
                // option ? option.title : ""
                // locale=="en"?option.enName:option.arName
              }
              renderOption={(props, option) => {
                console.log("options =", option);
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setComboBoxVal(value.id);
                } else {
                  setComboBoxVal("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  // variant="standard"
                  {...params}
                  name="Transactions_Types"
                  // value={parent}
                  //  label={ImportFiles.TransactionsTypes.defaultMessage}
                  //  label= {intl.formatMessage(messages.TransactionsTypes)}
                  label="KPI Type"
                  margin="normal"
                  // required
                />
              )}
            />

            <div className={classes.spacer} />

            <div className={`${classes.title} ${classes2.importBtn}`}>
              <FormControl
                variant="standard"
                className={`${cx(classes.textField)}`}
              >
                <div className={classes.actions}>
                  <Tooltip title="Upload">
                    {/* <Tooltip title= {<FormattedMessage {...messages.Upload} />}> */}
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
                      {smUp && " "} Upload
                      {/* {smUp && ' '} <FormattedMessage {...messages.Upload} /> */}
                      {/* {smUp && ' '} <FormattedMessage {...ImportFiles.Upload} /> */}
                      <input
                        hidden
                        value={upload}
                        type="file"
                        name="file"
                        className="custom-file-input"
                        id="inputGroupFile"
                        onChange={uploadFun}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml, .pdf ,.doc, .docx"
                      />
                    </Button>
                  </Tooltip>
                </div>
              </FormControl>

              <FormControl
                variant="standard"
                className={`${cx(classes.textField)}`}
              >
                <div className={classes.actions}>
                  <Tooltip title="Import Excel File And Choose Transactions Type To Can Submit">
                    {/* <Tooltip title={<FormattedMessage {...messages.SubmitTooltip} />}> */}
                    <span>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={submitFun}
                        disabled={
                          comboBoxVal.length !== 0 && fileData.length !== 0
                            ? false
                            : true
                        }
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
          {/* </Card> */}
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

export default injectIntl(ImportFile);
