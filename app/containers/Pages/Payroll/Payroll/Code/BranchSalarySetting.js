import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import BranchSalarySettingData from "../api/BranchSalarySettingData";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../messages";
import PropTypes from "prop-types";
import GeneralListApis from "../../api/GeneralListApis";
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import { Box, Card, CardContent, InputAdornment, Checkbox } from "@mui/material";
import Payrollmessages from "../../messages";

function BranchSalarySetting(props) {
  const [id, setid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const locale = useSelector((state) => state.language.locale);
  const { intl } = props;
  const { classes } = useStyles();
  const [BranchList, setBranchList] = useState([]);
  const [brCode, setBrCode] = useState(null);
  const [group1ElemList, setgroup1ElemList] = useState([]);
  const [MedInsElemList, setMedInsElemList] = useState([]);
  const [GrossElemList, setGrossElemList] = useState([]);
  const [eleOfCalcVacList, setEleOfCalcVacList] = useState([]);
  
  const [data, setdata] = useState({
    PersonalExemption: "",
    specialNeedsExemption: "",
    FirstBracketLimit: "",
    FirstBracketTax: "",
    SecondBracketLimit: "",
    SecondBracketTax: "",
    ThirdBracketLimit: "",
    ThirdBracketTax: "",
    FourthBracketLimit: "",
    FourthBracketTax: "",
    FifthBracketLimit: "",
    FifthBracketTax: "",
    SixthBracketLimit: "",
    SixthBracketTax: "",
    seventhBracketLimit: "",
    seventhBracketTax: "",
    EighthBracketLimit: "",
    EighthBracketTax: "",
    EpidemicsContribution: "",
    DisplayName: "",
    FixedElementsSILimit: "",
    CompanyShare: "",
    TheEmployeesShareOfSI: "",
    NewEmpDedEl: "",
    GrossElementId:"",
    MedInsElement:"",
    eleOfCalcVac: [],
    smartObjectiveElementId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProcessing(true);

    const apiData = {
      brCode: brCode,
      personalexemption: data.PersonalExemption,
      personalexemption2: data.specialNeedsExemption,
      firstbracketlimit: data.FirstBracketLimit,
      firstbrackettax: data.FirstBracketTax,
      secondbracketlimit: data.SecondBracketLimit,
      secondbrackettax: data.SecondBracketTax,
      thirdbracketlimit: data.ThirdBracketLimit,
      thirdbrackettax: data.ThirdBracketTax,
      fourthbracketlimit: data.FourthBracketLimit,
      fourthbracketTax: data.FourthBracketTax,
      fifthbracketlimit: data.FifthBracketLimit,
      fifthbracketTax: data.FifthBracketTax,
      bracketlimit6: data.SixthBracketLimit,
      bracketTax6: data.SixthBracketTax,
      bracketlimit7: data.seventhBracketLimit,
      bracketTax7: data.seventhBracketTax,
      bracketlimit8: data.EighthBracketLimit,
      bracketTax8: data.EighthBracketTax,
      covidP: data.EpidemicsContribution,
      covidLbl: data.DisplayName,
      fixedElementsSilimit: data.FixedElementsSILimit,
      fixedElementsCompRate: data.CompanyShare,
      fixedElementsEmpRate: data.TheEmployeesShareOfSI,
      newEmpDedEl: data.NewEmpDedEl,
      grossElementId:data.GrossElementId,
      medInsElement:data.MedInsElement,
      VacBalCostElementIds: data.eleOfCalcVac.length !== 0 ? `,${data.eleOfCalcVac.map((item) => item.id).join(",")},` : "",
      smartObjectiveElementId: data.smartObjectiveElementId ? data.smartObjectiveElementId : ""
    };

    try {
      let response = await BranchSalarySettingData().Save(apiData);

      if (response.status == 200) {
        toast.success(notif.saved);
        setBrCode(null);
        setdata({
          PersonalExemption: "",
          specialNeedsExemption: "",
          FirstBracketLimit: "",
          FirstBracketTax: "",
          SecondBracketLimit: "",
          SecondBracketTax: "",
          ThirdBracketLimit: "",
          ThirdBracketTax: "",
          FourthBracketLimit: "",
          FourthBracketTax: "",
          FifthBracketLimit: "",
          FifthBracketTax: "",
          SixthBracketLimit: "",
          SixthBracketTax: "",
          seventhBracketLimit: "",
          seventhBracketTax: "",
          EighthBracketLimit: "",
          EighthBracketTax: "",
          EpidemicsContribution: "",
          DisplayName: "",
          FixedElementsSILimit: "",
          CompanyShare: "",
          TheEmployeesShareOfSI: "",
          eleOfCalcVac: [],
          smartObjectiveElementId: "",
        });
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false);
      setProcessing(false);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
      setProcessing(false);
    }
  };

  async function fetchData() {
    try {
      debugger;
      const list1 = await GeneralListApis(locale).GetBranchList(true);
      setBranchList(list1);

      const group1data = await GeneralListApis(locale).GetElementListByTemplate(
        1,
        2,
        2
      );

      const meddata = await GeneralListApis(locale).GetElementListByTemplate(
        1,
        2,
        1
      );

      const grossdata = await GeneralListApis(locale).GetElementListByTemplate(
        1,
        1,
        1
      );
     

      const eleOfCalcVacData = await GeneralListApis(locale).GetElementList(0,1,0,1);


      setgroup1ElemList(group1data);
      setMedInsElemList(meddata);
      setGrossElemList(grossdata);
      setEleOfCalcVacList(eleOfCalcVacData);


    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const departmentChangeFun = async (id) => {
    if (id) {
      const dataList = await BranchSalarySettingData().Get(id);

      setdata((prev) => ({
        ...prev,
        PersonalExemption: dataList.personalexemption
          ? dataList.personalexemption
          : "0",
        specialNeedsExemption: dataList.personalexemption2
          ? dataList.personalexemption2
          : "0",
        FirstBracketLimit: dataList.firstbracketlimit
          ? dataList.firstbracketlimit
          : "0",
        FirstBracketTax: dataList.firstbrackettax
          ? dataList.firstbrackettax
          : "0",
        SecondBracketLimit: dataList.secondbracketlimit
          ? dataList.secondbracketlimit
          : "0",
        SecondBracketTax: dataList.secondbrackettax
          ? dataList.secondbrackettax
          : "0",
        ThirdBracketLimit: dataList.thirdbracketlimit
          ? dataList.thirdbracketlimit
          : "0",
        ThirdBracketTax: dataList.thirdbrackettax
          ? dataList.thirdbrackettax
          : "0",
        FourthBracketLimit: dataList.fourthbracketlimit
          ? dataList.fourthbracketlimit
          : "0",
        FourthBracketTax: dataList.fourthbracketTax
          ? dataList.fourthbracketTax
          : "0",
        FifthBracketLimit: dataList.fifthbracketlimit
          ? dataList.fifthbracketlimit
          : "0",
        FifthBracketTax: dataList.fifthbracketTax
          ? dataList.fifthbracketTax
          : "0",
        SixthBracketLimit: dataList.bracketlimit6 ? dataList.bracketlimit6 : "0",
        SixthBracketTax: dataList.bracketTax6 ? dataList.bracketTax6 : "0",
        seventhBracketLimit: dataList.bracketlimit7
          ? dataList.bracketlimit7
          : "0",
        seventhBracketTax: dataList.bracketTax7 ? dataList.bracketTax7 : "0",
        EighthBracketLimit: dataList.bracketlimit8
          ? dataList.bracketlimit8
          : "0",
        EighthBracketTax: dataList.bracketTax8 ? dataList.bracketTax8 : "0",
        EpidemicsContribution: dataList.covidP ? dataList.covidP : "",
        DisplayName: dataList.covidLbl ? dataList.covidLbl : "",
        FixedElementsSILimit: dataList.fixedElementsSilimit
          ? dataList.fixedElementsSilimit
          : "0",
        CompanyShare: dataList.fixedElementsCompRate
          ? dataList.fixedElementsCompRate
          : "0",
        TheEmployeesShareOfSI: dataList.fixedElementsEmpRate
          ? dataList.fixedElementsEmpRate
          : "0",
          NewEmpDedEl: dataList.newEmpDedEl
          ? dataList.newEmpDedEl
          : "0",
          GrossElementId: dataList.grossElementId
          ? dataList.grossElementId
          : "",
          MedInsElement: dataList.medInsElement
          ? dataList.medInsElement
          : "",
          smartObjectiveElementId: dataList.smartObjectiveElementId
          ? dataList.smartObjectiveElementId
          : "",
          
      }));
    }
  };

  async function onCopy() {
    try {
      setIsLoading(true);
      let response = await BranchSalarySettingData().CopyToAllBranches(brCode);

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }




  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={intl.formatMessage(messages.payrollMainParameters)}
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row" mt={2}>
            <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2.2}>
              <Autocomplete
                id="brCode"
                options={BranchList}
                value={BranchList.find((item) => item.id === brCode) || null}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setBrCode(value !== null ? value.id : null);
                  departmentChangeFun(value !== null ? value.id : null);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="brCode"
                    required
                    label={intl.formatMessage(Payrollmessages.company)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box           
            component="fieldset"
            style={{
              border: "1px solid #c4c4c4",
              padding: "30px",
              paddingTop: "40px",
              marginTop: "25px",
            }}
          >
            <legend>
              <FormattedMessage {...messages.TaxeParameters} />
            </legend>

            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid
                item
                xs={12}
                md={12}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <TextField
                      name="PersonalExemption"
                      id="PersonalExemption"
                      type="number"
                      placeholder={intl.formatMessage(
                        messages.PersonalExemption
                      )}
                      label={intl.formatMessage(messages.PersonalExemption)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.PersonalExemption}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          PersonalExemption: e.target.value,
                        }));
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <TextField
                      name="specialNeedsExemption"
                      id="specialNeedsExemption"
                      type="number"
                      placeholder={intl.formatMessage(
                        messages.specialNeedsExemption
                      )}
                      label={intl.formatMessage(messages.specialNeedsExemption)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.specialNeedsExemption}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          specialNeedsExemption: e.target.value,
                        }));
                      }}
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Card className={classes.card}>
                    <CardContent className={style.CardContentSty}>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                      >
                        <Grid item xs={12}  md={8}  xl={4}>
                          <TextField
                            name="FirstBracketLimit"
                            id="FirstBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FirstBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.FirstBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FirstBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FirstBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="FirstBracketTax"
                            id="FirstBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FirstBracketTax
                            )}
                            label={intl.formatMessage(messages.FirstBracketTax)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FirstBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FirstBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="SecondBracketLimit"
                            id="SecondBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.SecondBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.SecondBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.SecondBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                SecondBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={6}   md={4} xl={2}>
                          <TextField
                            name="SecondBracketTax"
                            id="SecondBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.SecondBracketTax
                            )}
                            label={intl.formatMessage(
                              messages.SecondBracketTax
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.SecondBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                SecondBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="ThirdBracketLimit"
                            id="ThirdBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.ThirdBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.ThirdBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.ThirdBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                ThirdBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="ThirdBracketTax"
                            id="ThirdBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.ThirdBracketTax
                            )}
                            label={intl.formatMessage(messages.ThirdBracketTax)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.ThirdBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                ThirdBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="FourthBracketLimit"
                            id="FourthBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FourthBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.FourthBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FourthBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FourthBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="FourthBracketTax"
                            id="FourthBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FourthBracketTax
                            )}
                            label={intl.formatMessage(
                              messages.FourthBracketTax
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FourthBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FourthBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="FifthBracketLimit"
                            id="FifthBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FifthBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.FifthBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FifthBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FifthBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="FifthBracketTax"
                            id="FifthBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.FifthBracketTax
                            )}
                            label={intl.formatMessage(messages.FifthBracketTax)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.FifthBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                FifthBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="SixthBracketLimit"
                            id="SixthBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.SixthBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.SixthBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.SixthBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                SixthBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="SixthBracketTax"
                            id="SixthBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.SixthBracketTax
                            )}
                            label={intl.formatMessage(messages.SixthBracketTax)}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.SixthBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                SixthBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="seventhBracketLimit"
                            id="seventhBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.seventhBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.seventhBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.seventhBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                seventhBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="seventhBracketTax"
                            id="seventhBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.seventhBracketTax
                            )}
                            label={intl.formatMessage(
                              messages.seventhBracketTax
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.seventhBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                seventhBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item  xs={12}  md={8} xl={4}>
                          <TextField
                            name="EighthBracketLimit"
                            id="EighthBracketLimit"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.EighthBracketLimit
                            )}
                            label={intl.formatMessage(
                              messages.EighthBracketLimit
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.EighthBracketLimit}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                EighthBracketLimit: e.target.value,
                              }));
                            }}
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={6}  md={4} xl={2}>
                          <TextField
                            name="EighthBracketTax"
                            id="EighthBracketTax"
                            type="number"
                            placeholder={intl.formatMessage(
                              messages.EighthBracketTax
                            )}
                            label={intl.formatMessage(
                              messages.EighthBracketTax
                            )}
                            className={`${classes.field} ${style.fieldsSty}`}
                            margin="normal"
                            variant="outlined"
                            value={data.EighthBracketTax}
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                EighthBracketTax: e.target.value,
                              }));
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            autoComplete='off'
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  sx={{marginTop:"1px"}}
                >
                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <Autocomplete
                      id="ddlNewEmpDedEl"
                      options={group1ElemList}
                      value={
                        group1ElemList.find(
                          (item) => item.id === data.NewEmpDedEl
                        ) || null
                      }
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          NewEmpDedEl: value !== null ? value.id : null,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="NewEmpDedEl"
                          label={intl.formatMessage(messages.NewEmpDedEl)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <Autocomplete
                      id="ddlGrossElementId"
                      options={GrossElemList}
                      value={
                        GrossElemList.find(
                          (item) => item.id === data.GrossElementId
                        ) || null
                      }
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          GrossElementId: value !== null ? value.id : null,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="GrossElementId"
                          label={intl.formatMessage(messages.GrossElement)}
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <Autocomplete
                      id="ddlMedInsElement"
                      options={MedInsElemList}
                      value={
                        MedInsElemList.find(
                          (item) => item.id === data.MedInsElement
                        ) || null
                      }
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          MedInsElement: value !== null ? value.id : null,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="NewEmpDedEl"
                          label={intl.formatMessage(messages.MedInsElement)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <Autocomplete
                      options={eleOfCalcVacList}
                      value={ eleOfCalcVacList.find((item) => item.id === data.smartObjectiveElementId) || null}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 || value.id === "" || option.id === value.id
                      }
                      getOptionLabel={(option) => (option.name ? option.name : "")}
                      onChange={(event, value) => {
                        setdata((prev) => ({
                          ...prev,
                          smartObjectiveElementId: value !== null ? value.id : null,
                        }))
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="smartObjectiveElementId"
                          label={intl.formatMessage(messages.Smartobjectiveelement)}
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <TextField
                      name="EpidemicsContribution"
                      id="EpidemicsContribution"
                      type="number"
                      placeholder={intl.formatMessage(
                        messages.EpidemicsContribution
                      )}
                      label={intl.formatMessage(messages.EpidemicsContribution)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.EpidemicsContribution}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          EpidemicsContribution: e.target.value,
                        }));
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}  md={4} lg={3} xl={2}>
                    <TextField
                      name="DisplayName"
                      id="DisplayName"
                      placeholder={intl.formatMessage(messages.DisplayName)}
                      label={intl.formatMessage(messages.DisplayName)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.DisplayName}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          DisplayName: e.target.value,
                        }));
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12}  md={8} lg={6} xl={4}>
                    <Autocomplete
                      options={eleOfCalcVacList}
                      multiple
                      disableCloseOnSelect
                      className={`${style.AutocompleteMulSty} ${
                        locale !== "er" ? style.AutocompleteMulStyAR : null
                      }`}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      value={data.eleOfCalcVac}
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
                        setdata((prev) => ({
                          ...prev,
                          eleOfCalcVac: value,
                        }))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.eleOfCalcValOfVac)}
                        />
                      )}
                    />
                  </Grid>

                  
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box
            component="fieldset"
            maxWidth="lg"
            style={{
              border: "1px solid #c4c4c4",
              padding: "30px",
              paddingTop: "40px",
              marginTop: "20px",
            }}
          >
            <legend>
              <FormattedMessage {...messages.SocialInsuranceParameters} />
            </legend>

            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid
                item
                xs={12}
                md={12}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={6} xl={4}>
                    <TextField
                      name="FixedElementsSILimit"
                      id="FixedElementsSILimit"
                      type="number"
                      placeholder={intl.formatMessage(
                        messages.FixedElementsSILimit
                      )}
                      label={intl.formatMessage(messages.FixedElementsSILimit)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.FixedElementsSILimit}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          FixedElementsSILimit: e.target.value,
                        }));
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} md={3} xl={2.5}>
                    <TextField
                      name="CompanyShare"
                      id="CompanyShare"
                      type="number"
                      placeholder={intl.formatMessage(messages.CompanyShare)}
                      label={intl.formatMessage(messages.CompanyShare)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.CompanyShare}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          CompanyShare: e.target.value,
                        }));
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={6} md={3} xl={2.5}>
                    <TextField
                      name="TheEmployeesShareOfSI"
                      id="TheEmployeesShareOfSI"
                      type="number"
                      placeholder={intl.formatMessage(
                        messages.TheEmployeesShareOfSI
                      )}
                      label={intl.formatMessage(messages.TheEmployeesShareOfSI)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      value={data.TheEmployeesShareOfSI}
                      onChange={(e) => {
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          TheEmployeesShareOfSI: e.target.value,
                        }));
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              className={style.itemsStyle}
            >
              <Grid item xs={3} md={5} lg={3}>
                <SaveButton Id={id} processing={processing} />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={onCopy}
                  disabled={brCode ? false : true}
                >
                  <FormattedMessage {...messages.copytoAllBr} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

BranchSalarySetting.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BranchSalarySetting);
