import React, { useState, useEffect, useCallback, useRef } from "react";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import MUIDataTable from "mui-datatables";
import { FormattedMessage } from "react-intl";
import elementApi from "../../api/ElementsData";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "../../../Style";
import { useSelector } from "react-redux";
import classes2 from "../../../../../../styles/styles.scss";
import ApiData from "../../api/ElementValData";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { read, utils } from "xlsx";
import PayRollLoader from "../../../Component/PayRollLoader";
import messages from "../../messages";
import Payrollmessages from "../../../messages";

import GeneralListApis from "../../../api/GeneralListApis";
import PayrollTable from "../../../Component/PayrollTable";
import { ServerURL } from "../../../api/ServerConfig";

function ElementVlaImport({ intl }) {
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [cols, setCols] = useState("");
  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [elementList, setElementList] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    branchId: branchId ?? 0,
    payTemplateId: 1,
    elementId: 0,
    elementMaxVal: "",
    elementMinVal: "",
    elementModeId: "",
    defaultVal: "",
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
    isNotUpdate: false,
    elementValColNum: 4
  });

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
          // check if EmployeeId and ElemVal columns in file not valid delete them
         let filtedRows = rows.filter(object => {
            return (!isNaN(object.ElemVal) && object.ElemVal.trim().length !== 0) 
              && (!isNaN(object.EmployeeId) && object.EmployeeId.trim().length !== 0) 
          });
          setFileData(filtedRows);
          setCols(Object.keys(rows[0]).map((item) => ({
            name: item,
            label: item,
            options: {
              filter: true,
            },
          })));
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

  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault();
      setIsLoading(true);

      const dataParam = fileData.map((obj) => ({
        id: 0,
        branchId: data.branchId,
        employeeId: obj.EmployeeId,
        payTemplateId: data.payTemplateId,
        elementId: data.elementId,
        elementModeId: data.elementModeId,
        yearId: data.yearId,
        monthId: data.monthId,
        transDate: obj.TransDate,
        elemVal: data.elementValColNum.length !== 0 ? 
        obj[Object.keys(obj)[data.elementValColNum - 1]]
        :  obj.ElemVal,
        notes: obj.Notes,
        trxSorce: "EXL",
        isNotUpdate: data.isNotUpdate,
      }));

      
      let response = await ApiData(locale).SaveListFromImport(dataParam);

      if (response.status == 200) {
        if (response.data == "Success") toast.success(notif.saved);
        else toast.success("Employees Ids :" + response.data + " not inserted");
        resetDataFun();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function getOpenMonth(id) {
    try {
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          monthId: "",
          yearId: "",
          yearName: "",
          monthName: "",
        }));
        return;
      }
      setIsLoading(true);
      const result = await GeneralListApis(locale).getOpenMonth(id, 0);
      

      setdata((prevFilters) => ({
        ...prevFilters,
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getElementList(id) {
    try {
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: 0,
        elementMaxVal: "",
        elementMinVal: "",
        elementModeId: "",
        defaultVal: "",
      }));
      if (!id) {
        setElementList([]);
        return;
      }
      setIsLoading(true);
      const result = await GeneralListApis(locale).GetElementListByTemplate(id, '');

      setElementList(result);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementData(id) {
    try {
      
      if (!id) {
        setdata((prevFilters) => ({
          ...prevFilters,
          elementId: 0,
          elementMaxVal: "",
          elementMinVal: "",
          elementModeId: "",
          defaultVal: "",
        }));

        return;
      }
      setIsLoading(true);
      const result = await elementApi(locale).Get(id);

      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: result.id,
        elementMaxVal: result.elementMaxVal ?? "",
        elementMinVal: result.elementMinVal ?? "",
        elementModeId: result.elementModeId ?? "",
        defaultVal: result.defaultVal ?? "",
      }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function GetLookup() {
    try {
      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);
      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(PayList);

      getElementList(1);

      if (data.branchId) {
        getOpenMonth(data.branchId);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetLookup();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                    alignItems="flex-start"
                    direction="row"
                    item
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={2}
                      xs={12}
                      md={4}
                    >
                      <Grid item xs={12} md={12}>
                        <Autocomplete
                          id="branchId"
                          options={BranchList}
                          isOptionEqualToValue={(option, value) =>
                            value.id === 0 ||
                            value.id === "" ||
                            option.id === value.id
                          }
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          value={BranchList.find(
                                  (item) => item.id === data.branchId
                                ) ?? null
                          }
                          onChange={(event, value) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              branchId: value !== null ? value.id : 0,
                            }));
                            getOpenMonth(value !== null ? value.id : 0);
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              {...params}
                              name="branchId"
                              required
                              label={intl.formatMessage(Payrollmessages.branch)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="YearId"
                          name="YearId"
                          value={data.yearName ? data.yearName : ""}
                          label={intl.formatMessage(Payrollmessages.year)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="MonthId"
                          name="MonthId"
                          value={data.monthName ? data.monthName : ""}
                          label={intl.formatMessage(Payrollmessages.month)}
                          className={classes.field}
                          variant="outlined"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.isNotUpdate || null}
                              onChange={(e) =>
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  isNotUpdate: e.target.checked,
                                }))
                              }
                              value={data.isNotUpdate || null}
                              color="primary"
                            />
                          }
                          label={intl.formatMessage(messages.isNotUpdate)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <TextField
                            id="elementValColNum"
                            name="elementValColNum"
                            value={data.elementValColNum}
                            label={intl.formatMessage(
                              messages.elementValColNum
                            )}
                            onChange={(e)=>{
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                elementValColNum: e.target.value,
                              }))
                            }}
                            type="number"
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                          />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={2}
                      xs={12}
                      md={8}
                    >
                      <Card className={classes.card}>
                        <CardContent>
                          <Grid
                            container
                            spacing={1}
                            alignItems="flex-start"
                            direction="row"
                          >
                            <Grid item xs={12} md={6}>
                              <Autocomplete
                                id="PayTemplateId"
                                options={PayTemplateList}
                                isOptionEqualToValue={(option, value) =>
                                  value.id === 0 ||
                                  value.id === "" ||
                                  option.id === value.id
                                }
                                getOptionLabel={(option) =>
                                  option.name ? option.name : ""
                                }
                                value={
                                  data.payTemplateId
                                    ? PayTemplateList.find(
                                        (item) => item.id === data.payTemplateId
                                      ) ?? null
                                    : null
                                }
                                onChange={(event, value) => {
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    payTemplateId:
                                      value !== null ? value.id : 0,
                                  }));
                                  getElementList(value !== null ? value.id : 0);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    variant="outlined"
                                    {...params}
                                    name="PayTemplateId"
                                    required
                                    label={intl.formatMessage(
                                      messages.payTemplate
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Autocomplete
                                id="elementId"
                                options={elementList}
                                isOptionEqualToValue={(option, value) =>
                                  value.id === 0 ||
                                  value.id === "" ||
                                  option.id === value.id
                                }
                                getOptionLabel={(option) =>
                                  option.name ? option.name : ""
                                }
                                value={
                                  data.elementId
                                    ? elementList.find(
                                        (item) => item.id === data.elementId
                                      )
                                    : null
                                }
                                onChange={(event, value) => {
                                  getElementData(value !== null ? value.id : 0);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    variant="outlined"
                                    {...params}
                                    name="elementId"
                                    required
                                    label={intl.formatMessage(
                                      Payrollmessages.element
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMode"
                                name="ElementMode"
                                value={
                                  data.elementModeId == 1
                                    ? intl.formatMessage(messages.constant)
                                    : data.elementModeId == 2
                                    ? intl.formatMessage(messages.variable)
                                    : ""
                                }
                                label={intl.formatMessage(messages.elementMode)}
                                className={classes.field}
                                variant="outlined"
                                disabled
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMaxVal"
                                name="ElementMaxVal"
                                value={data.elementMaxVal}
                                label={intl.formatMessage(messages.max)}
                                disabled
                                className={classes.field}
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="ElementMinVal"
                                name="ElementMinVal"
                                value={data.elementMinVal}
                                label={intl.formatMessage(messages.min)}
                                disabled
                                className={classes.field}
                                autoComplete='off'
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                id="DefaultVal"
                                name="DefaultVal"
                                value={data.defaultVal}
                                label={intl.formatMessage(
                                  messages.defaultValue
                                )}
                                className={classes.field}
                                variant="outlined"
                                disabled
                                autoComplete='off'
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
                disabled={fileData.length !== 0 ? false : true}
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="contained" color="secondary" component="label">
                <AddIcon
                  className={cx(smUp && classes.leftIcon, classes.iconSmall)}
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
            </Grid>

            <Grid item xs={12} md={2} >
                  <div className={classes.actions}>
                      <a
                        href={`${ServerURL}Doc/ExcelForm/ElementsValue.xlsx`}
                        target="_blank"
                        rel="noreferrer"
                        download
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                        >
                          <FormattedMessage {...Payrollmessages.Download} />
                        </Button>
                      </a>
                  </div>
                </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={resetDataFun}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
            {fileData.length !== 0 && (
              <Grid item xs={12} md={12}>
                <PayrollTable
                  title={fileTitle}
                  data={fileData}
                  columns={cols}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(ElementVlaImport);
