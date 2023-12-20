import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import elementApi from "../../api/ElementsData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import AddButton from "../../../Component/AddButton";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ElementValData";
import style from "../../../../../../../app/styles/styles.scss";
import DeleteButton from "../../../Component/DeleteButton";
import EditButton from "../../../Component/EditButton";
import NamePopup from "../../../Component/NamePopup";
import AlertPopup from "../../../Component/AlertPopup";
import PayRollLoader from "../../../Component/PayRollLoader";

function ElementValList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [notes, setnotes] = useState("");
  const [newValue, setNewValue] = useState("");
  const [elementData, setElementData] = useState({
    id: 0,
    elementMaxVal: "",
    elementMinVal: "",
    elementModeId: "",
    defaultVal: "",
  });
  const [OpenPopup, setOpenPopup] = useState(false);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [PayTemplateId, setPayTemplateId] = useState(0);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(0);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [elementList, setElementList] = useState([]);
  const [OpenMonth, setOpenMonth] = useState({
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
  });
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [elementCalcMethodId, setelementCalcMethodId] = useState(1);
  const [newElemVal, setnewElemVal] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);
      try {
        debugger;
        setIsLoading(true);
        const data = Employeesdata.map((obj) => ({
          id: 0,
          employeeId: obj.id,
          payTemplateId: PayTemplateId,
          elementId: elementData.id,
          yearId: OpenMonth.yearId,
          monthId: OpenMonth.monthId,
          transDate: format(new Date(), "yyyy-MM-dd"),
          elemVal: newValue,
          notes: notes,
          trxSorce: "GRB",
        }));
        let response = await ApiData(locale).SaveList(data);

        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [elementData, notes, newValue, PayTemplateId]
  );

  const handleClickOpenNamePopup = () => {
    setOpenPopup(true);
  };

  const handleClickOpen = (item) => {
    debugger;
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
      debugger;
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getShiftData(elementData.id);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(selectedRows) {
    try {
      const ids = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        ids.push(dataList[selectedRows.data[i].dataIndex].id);
      }
      if (ids.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).UpdateList(
          ids,
          newElemVal,
          elementCalcMethodId
        );
        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function Getookup() {
    try {
      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);

      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(PayList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  async function getOpenMonth(id) {
    try {
      if (!id) {
        setOpenMonth({
          monthId: "",
          yearId: "",
        });
        setdataList([]);
        setEmployeeList([]);
        return;
      }
      setIsLoading(true);
      const EmpList = await GeneralListApis(locale).GetEmployeeList(
        false,
        false,
        id
      );
      setEmployeeList(EmpList);
      const result = await GeneralListApis(locale).getOpenMonth(id, 0);
      debugger;
      setOpenMonth({
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
      });
      const result1 = await ApiData(locale).GetList(
        id,
        EmployeeId,
        PayTemplateId,
        elementData.id
      );
      setdataList(result1 || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function changeEmployee(id) {
    try {
      setIsLoading(true);
      setEmployeeId(id);
      const result1 = await ApiData(locale).GetList(
        BranchId,
        id,
        PayTemplateId,
        elementData.id
      );
      setdataList(result1 || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementList(id) {
    try {
      debugger;

      setIsLoading(true);
      if (!id) {
        setElementList([]);
      } else {
        const result = await GeneralListApis(locale).GetElementListByTemplate(
          id
        );
        setElementList(result);
      }
      const result1 = await ApiData(locale).GetList(
        BranchId,
        EmployeeId,
        id,
        elementData.id
      );
      setdataList(result1 || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementData(id) {
    try {
      setIsLoading(true);
      if (!id) {
        setElementData({
          id: 0,
          elementMaxVal: 0,
          elementMinVal: 0,
          elementModeId: 0,
          defaultVal: 0,
        });
      } else {
        const result = await elementApi(locale).Get(id);

        setElementData({
          id: result.id,
          elementMaxVal: result.elementMaxVal,
          elementMinVal: result.elementMinVal,
          elementModeId: result.elementModeId,
          defaultVal: result.defaultVal,
        });
      }
      const result1 = await ApiData(locale).GetList(
        BranchId,
        EmployeeId,
        PayTemplateId,
        id
      );
      setdataList(result1 || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "employeeId",
      label: <FormattedMessage {...Payrollmessages["employeeId"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: <FormattedMessage {...Payrollmessages["employeeName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "transDate",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "payTemplateName",
      label: <FormattedMessage {...messages["payTemplate"]} />,
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
      name: "elementType",
      label: <FormattedMessage {...messages["elementType"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "elementMode",
      label: <FormattedMessage {...messages["elementMode"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "elemVal",
      label: <FormattedMessage {...messages["val"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "trxSorce",
      label: <FormattedMessage {...messages["source"]} />,
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
      name: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log("tableMeta =", tableMeta);
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/Payroll/ElementValEdit"}
              ></EditButton>
              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData[0])}
              ></DeleteButton>
            </div>
          );
        },
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
    customToolbar: () => (
      <AddButton url={"/app/Pages/Payroll/ElementValCreate"}></AddButton>
    ),

    customToolbarSelect: (selectedRows) => (
      <div style={{ width: "80%" }}>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item md={3} xs={12}>
            <FormControl variant="standard" component="fieldset" required>
              <RadioGroup
                row
                name="elementCalcMethodId"
                aria-label="Direction"
                value={elementCalcMethodId || null}
                onChange={(e) => {
                  debugger;
                  setelementCalcMethodId(e.target.value);
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={intl.formatMessage(messages.Value)}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={intl.formatMessage(messages.Percentage)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextField
              id="newElemVal"
              name="newElemVal"
              value={newElemVal}
              label={intl.formatMessage(messages.val)}
              className={classes.field}
              variant="outlined"
              onChange={(e) => {
                setnewElemVal(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className="mr-6"
              onClick={() => handleUpdate(selectedRows)}
            >
              <FormattedMessage {...Payrollmessages.apply} />
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
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Employee"}
          branchId={BranchId}
        />
        <Grid container spacing={2} alignItems="flex-start" direction="row">
          <Grid item container direction="row" xs={12} md={12}>
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
                    md={6}
                  >
                    <Grid item xs={12} md={6}>
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
                        value={
                          BranchId
                            ? BranchList.find((item) => item.id === BranchId)
                            : null
                        }
                        onChange={(event, value) => {
                          setBranchId(value !== null ? value.id : 0);
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
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="YearId"
                        name="YearId"
                        value={OpenMonth.yearName}
                        label={intl.formatMessage(Payrollmessages.year)}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="MonthId"
                        name="MonthId"
                        value={OpenMonth.monthName}
                        label={intl.formatMessage(Payrollmessages.month)}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Autocomplete
                        id="employeeId"
                        options={EmployeeList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        value={
                          EmployeeId
                            ? EmployeeList.find(
                                (item) => item.id === EmployeeId
                              )
                            : null
                        }
                        onChange={(event, value) => {
                          debugger;
                          changeEmployee(value !== null ? value.id : 0);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="employeeId"
                            required
                            label={intl.formatMessage(
                              Payrollmessages.employeeId
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    xs={12}
                    md={6}
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
                                PayTemplateId
                                  ? PayTemplateList.find(
                                      (item) => item.id === PayTemplateId
                                    )
                                  : null
                              }
                              onChange={(event, value) => {
                                debugger;
                                if (!BranchId) {
                                  setPayTemplateId(0);
                                  toast.error("choose branch first");
                                } else {
                                  setPayTemplateId(
                                    value !== null ? value.id : 0
                                  );
                                  getElementList(value !== null ? value.id : 0);
                                }
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
                                elementData.id
                                  ? elementList.find(
                                      (item) => item.id === elementData.id
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
                                elementData.elementModeId == 1
                                  ? intl.formatMessage(messages.constant)
                                  : elementData.elementModeId == 2
                                  ? intl.formatMessage(messages.variable)
                                  : ""
                              }
                              label={intl.formatMessage(messages.elementMode)}
                              className={classes.field}
                              variant="outlined"
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              id="ElementMaxVal"
                              name="ElementMaxVal"
                              value={elementData.elementMaxVal}
                              label={intl.formatMessage(messages.max)}
                              disabled
                              className={classes.field}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              id="ElementMinVal"
                              name="ElementMinVal"
                              value={elementData.elementMinVal}
                              label={intl.formatMessage(messages.min)}
                              disabled
                              className={classes.field}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              id="DefaultVal"
                              name="DefaultVal"
                              value={elementData.defaultVal}
                              label={intl.formatMessage(messages.defaultValue)}
                              className={classes.field}
                              variant="outlined"
                              disabled
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

          {elementData.id ? (
            <Grid item xs={12} md={12}>
              <Box
                component="fieldset"
                style={{
                  border: "1px solid #c4c4c4",
                  borderRadius: "10px",
                  padding: "30px",
                  paddingTop: "40px",
                  width: "100%",
                }}
              >
                <legend>{intl.formatMessage(messages.newval)}</legend>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="Val"
                      name="Val"
                      value={newValue}
                      label={intl.formatMessage(messages.val)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => {
                        debugger;
                        setNewValue(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="Notes"
                      name="Notes"
                      value={notes}
                      label={intl.formatMessage(Payrollmessages.notes)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => {
                        setnotes(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      onClick={handleClickOpenNamePopup}
                      disabled={newValue ? false : true}
                    >
                      <FormattedMessage {...Payrollmessages.chooseEmp} />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12} md={12}>
            <div className={classes.CustomMUIDataTable}>
              {/* <ThemeProvider theme={theme}> */}
              <MUIDataTable
                title=""
                data={dataList}
                columns={columns}
                options={options}
              />
              {/* </ThemeProvider> */}
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(
          Payrollmessages.deleteMessage
        )}${deleteItem}`}
        callFun={deleterow}
      />
    </PayRollLoader>
  );
}
ElementValList.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementValList);
