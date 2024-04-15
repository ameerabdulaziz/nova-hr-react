import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "../Style";
import { useSelector } from "react-redux";
import classes2 from "../../../../styles/styles.scss";
import { read, utils, writeFile } from "xlsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import PayrollTable from "../Component/PayrollTable";
import GeneralListApis from '../api/GeneralListApis';
import Payrollmessages from "../messages";
import { ServerURL } from "../api/ServerConfig";
import api from './api/KPI_API_Data';
import { toast } from "react-hot-toast";
import notif from 'enl-api/ui/notifMessage';
import messages from './messages';

function ImportFileWithKPI({ intl }) {
  const title = brand.name + " - KPI";
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const [cols, setCols] = useState("");
  const [kpiTypeList, setkpiTypeList] = useState([])
  const [kpiType, setKpiType] = useState();

  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const [processing, setprocessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // let columns = [];

  // columns =
  //   cols.length !== 0
  //     ? cols.map((item) => ({
  //         name: item,
  //         label: item,
  //         options: {
  //           customBodyRender: value => value
  //         },
  //       }))
  //     : [];

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
            defval:"",
          });
          // add id to each row before sent it to API
          const newRows = rows.map(row => ({...row, id: 0}))
          setFileData(newRows);
          setCols(Object.keys(rows[0]).map((item) => ({
            name: item,
            label: item,
            options: {
              customBodyRender: value => value
            },
          })));
          // rows.map((item) => setCols(Object.keys(item)));
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
    setKpiType()
  };

  const submitFun = async () => {

    let URL 

    if(kpiType.id === 1)
    {
      URL = "KpiAbsenteeism"
    }

    if(kpiType.id === 2)
    {
      URL = "KpiAht"
    }

    if(kpiType.id === 3)
    {
      URL = "KpiCsat"
    }

    if(kpiType.id === 4)
    {
      URL = "KpiIc"
    }

    if(kpiType.id === 5)
    {
      URL = "KpiQa"
    }

    if(kpiType.id === 6)
    {
      URL = "KpiUtilization"
    }

    try {
      await api(locale).Save(URL, fileData);
      toast.success(notif.saved);
      resetDataFun()
    } catch (error) {
      //
      if(error.response.data && !error.response.data.status)
      {
        toast.error(intl.formatMessage(messages.uploadErrorMess));
        setFileData(error.response.data)
      }
    } finally {
      setIsLoading(false);
    }


  };

    const  kpiTypeFun = async () => {
    setIsLoading(true); 

    try {
      const kpiTypeData = await GeneralListApis(locale).GetKpiTypeList();
      setkpiTypeList(kpiTypeData);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    kpiTypeFun()
  },[])

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
      
          <Toolbar 
            className={classes.toolbar}
          >
            <Grid
              item
              xs={12}
              md={12}
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
              className={`${classes2.itemsStyle} ${classes2.kpiBtnsSty}`}
              >
                <Grid item xs={12} md={12} lg={4} >
                  <Autocomplete
                    id="ddlMenu"
                    className={classes2.kpiComboBoxSty}
                    value={kpiType ? kpiType : null}
                    options={kpiTypeList}
                    sx={{ margin: "0px" }}
                    getOptionLabel={(option) =>
                      option.name || ""
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setKpiType(value);
                        setFileData([])
                      } else {
                        setKpiType("");
                        setFileData([])
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="KPI_Type"
                        label="KPI Type"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                  <div className={classes.actions}>
                    <Tooltip title="Download">
                      <a href={`${kpiType ? `${ServerURL}/Doc/ExcelForm/${kpiType.excellForm}`: "#"}`}
                        target="_blank"
                        rel="noreferrer"
                        download
                        style={!kpiType ? {pointerEvents: "none", cursor: "default"} : null}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          disabled={kpiType ? false : true}
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

              <Grid item xs={12} md={6} lg={2} >
                  <div className={classes.actions}>
                  <Tooltip title="Import Excel File And Choose Transactions Type To Can Submit">
                      <span>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          onClick={submitFun}
                          disabled={
                            kpiType && fileData.length !== 0 && !processing ? false : true
                          }
                        >
                          {processing && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                          <FormattedMessage {...Payrollmessages.save} />
                        </Button>
                      </span>
                    </Tooltip>
                  </div>
              </Grid>
            </Grid>
          </Toolbar>

          {fileData.length !== 0 && (
            <div className={classes.CustomMUIDataTable} style={{marginTop: "40px"}}>
              <PayrollTable
              title={fileTitle}
              data={fileData}
              columns={cols}
            />
            </div>
          )}
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(ImportFileWithKPI);
