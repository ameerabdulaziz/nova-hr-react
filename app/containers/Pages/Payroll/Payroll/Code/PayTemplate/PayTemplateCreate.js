import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PayTemplateData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Checkbox ,Card,CardContent,Autocomplete} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import NamePopup from "../../../Component/NamePopup";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import ElementTable from "./ElementTable";
import SITEMAP from "../../../../../App/routes/sitemap";
import GeneralListApis from '../../../api/GeneralListApis';
import style from "../../../../../../styles/styles.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function PayTemplateCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    calcInsuranceWithThisTemplate: false,
    isCritical:false,
    hrIds:[],
    rptDetails: "",
    smsmsg: "",
    addElement: [],
    deductElements: [],
  });

  const history = useHistory();

  const [Type, setType] = useState(0);

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);
      try {
        setIsLoading(true);
        if (Type === 1) {
          var addElement = [];
          for (var i = 0; i < data.addElement.length; i++) {
            addElement.push(data.addElement[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              addElement.filter((x) => x.elementId == Employeesdata[i].id)
                .length == 0
            ) {
              addElement.push({
                id: 0,
                elementId: Employeesdata[i].id,
                elementName: Employeesdata[i].name,
                PayTemplateId: data.id,
                sort: 0,
                isSelected: true,
              });
            }
          }

          setdata((prevFilters) => ({
            ...prevFilters,
            addElement: addElement,
          }));
        } else {
          var deductElements = [];
          for (var i = 0; i < data.deductElements.length; i++) {
            deductElements.push(data.deductElements[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              deductElements.filter((x) => x.elementId == Employeesdata[i].id)
                .length == 0
            ) {
              deductElements.push({
                id: 0,
                elementId: Employeesdata[i].id,
                elementName: Employeesdata[i].name,
                PayTemplateId: data.id,
                sort: 0,
                isSelected: true,
              });
            }
          }
          setdata((prevFilters) => ({
            ...prevFilters,
            deductElements: deductElements,
          }));
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
        setOpenPopup(false);
      }
    },
    [data, Type]
  );

  const handleClickOpenNamePopup = (type) => {
    setType(type);
    setOpenPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      var deductElements = data.deductElements.filter(
        (x) => x.isSelected == true
      );
      var addElement = data.addElement.filter((x) => x.isSelected == true);
      data.addElement = addElement.map((item, index) =>({
        ...item,
        sort: item.sort === 0 || item.sort === '' ? index + 1 : item.sort
      }));
      data.deductElements = deductElements.map((item, index) =>({
        ...item,
        sort: item.sort === 0 || item.sort === '' ? index + 1 : item.sort
      }));

      
      data.hrIds = data.hrIds.length !== 0 ? `,${data.hrIds.map((item) => item.id).join(",")},`  : null;
      let response = await ApiData(locale).Save(data);
debugger;
      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.payroll.PayTemplate.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.payroll.PayTemplate.route);
  }
  async function fetchData() {
    try {
      if (id) {

        const employees = await GeneralListApis(locale).GetHrList();
        setEmployeeList(employees || []);

        const dataApi = await ApiData(locale).Get(id ?? 0);
        debugger;
        // used to convert notificationUsers string into array of objects to use it in autocomplete
      const hrData = dataApi.hrIds
      ? dataApi.hrIds.slice(1, -1).split(",").map((user,index) => {

        const userData = employees.find((item) => item.id == user);

          return {
            id: userData.id,
            name: userData.name,
          };

        })
      : [];

      
        setdata((prevState) => ({
          ...prevState,
            id : dataApi ? dataApi.id : 0,
            arName: dataApi ? dataApi.arName : "",
            enName: dataApi ? dataApi.enName : "",
            calcInsuranceWithThisTemplate: dataApi ? dataApi.calcInsuranceWithThisTemplate : false,
            isCritical: dataApi ? dataApi.isCritical : false,
            hrIds: hrData && hrData.length !== 0  ? hrData : [],
            rptDetails : dataApi ? dataApi.rptDetails : "",
            smsmsg : dataApi ? dataApi.smsmsg : "",
            addElement : dataApi ? dataApi.addElement : [],
            deductElements : dataApi ? dataApi.deductElements :[],
        }))
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.PayTemplateCreateTitle)
            : intl.formatMessage(messages.PayTemplateUpdateTitle)
        }
        desc={""}
      >
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Element"}
          ElementType={Type}
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3}>
              <TextField
                id="arName"
                name="arName"
                value={data.arName}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    arName: e.target.value,
                  }))
                }
                label={intl.formatMessage(Payrollmessages.arName)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                id="enName"
                name="enName"
                value={data.enName}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    enName: e.target.value,
                  }))
                }
                label={intl.formatMessage(Payrollmessages.enName)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                id="smsmsg"
                name="smsmsg"
                value={data.smsmsg}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    smsmsg: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.sMSMSG)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                id="rptDetails"
                name="rptDetails"
                value={data.rptDetails}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    rptDetails: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.rPT_details)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.calcInsuranceWithThisTemplate || null}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        calcInsuranceWithThisTemplate: e.target.checked,
                      }))
                    }
                    value={data.calcInsuranceWithThisTemplate || null}
                    color="primary"
                  />
                }
                label={intl.formatMessage(
                  messages.calcInsuranceWithThisTemplate
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isCritical || null}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        isCritical: e.target.checked,
                      }))
                    }
                    value={data.isCritical || null}
                    color="primary"
                  />
                }
                label={intl.formatMessage(
                  messages.isCritical
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={5} xl={3}>
              <Autocomplete
                options={employeeList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === "ar" ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={data.hrIds}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : "")}
                onChange={(_, value) =>
                  setdata((prev) => ({ ...prev, hrIds: value }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(Payrollmessages.chooseEmp)}
                  />
                )}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={2}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="secondary"
                          onClick={() => handleClickOpenNamePopup(1)}
                        >
                          <FormattedMessage {...messages.addElement2} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ElementTable
                          dataList={data.addElement}
                          setdataList={setdata}
                          Type={1}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={2}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="secondary"
                          onClick={() => handleClickOpenNamePopup(2)}
                        >
                          <FormattedMessage {...messages.deductElement2} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ElementTable
                          dataList={data.deductElements}
                          setdataList={setdata}
                          Type={2}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
PayTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PayTemplateCreate);
