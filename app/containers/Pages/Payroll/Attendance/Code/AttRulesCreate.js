import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/AttRulesData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AbsenceRules from "./Component/AbsenceRules";
import DelayRules from "./Component/DelayRules";
import OverTiemRules from "./Component/OverTiemRules";
import MaxOverTiemRules from "./Component/MaxOverTiemRules";
import OtherRules from "./Component/OtherRules";
import TimeDelayRules from "./Component/TimeDelayRules";
import VacationsRules from "./Component/VacationsRules";
import WorkhoursRules from "./Component/workhoursRules";
import GeneralListApis from "../../api/GeneralListApis";
import PayRollLoader from "../../Component/PayRollLoader";

function AttRulesCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);

  const [group1ElemList, setgroup1ElemList] = useState([]);

  const [group2ElemList, setgroup2ElemList] = useState([]);
  const [group3ElemList, setgroup3ElemList] = useState([]);
  const [group4ElemList, setgroup4ElemList] = useState([]);
  const [group5ElemList, setgroup5ElemList] = useState([]);

  const ChoiceList = [
    { id: -1, name: "غير معرف" },
    { id: 2, name: "استهلاك بدل الراحات" },
    { id: 3, name: "استهلاك رصيد الاجازه" },
    { id: 4, name: "ترحيل على عنصر الخصم المحدد" },
  ];
  const VacChoiceList = [
    { id: 3, name: "3 شهور من بداية العمل" },
    { id: 6, name: "6 شهور من بداية العمل" },
  ];

  const [controlParaLateList, setControlParaLateList] = useState([]);
  const [controlParaOvertimeList, setcontrolParaOvertimeList] = useState([]);
  const [controlParaVacList, setcontrolParaVacList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",

    absenceSecondElem: "",
    conAbsenceAsOneDay: false,
    absFstElDayOne: "",
    absSecElDayOne: "",
    absFstElDayTwo: "",
    absSecElDayTwo: "",
    absFstElDayThree: "",
    absSecElDayThree: "",
    absFstElDayFour: "",
    absSecElDayFour: "",
    absFstElDay5: "",
    absSecElDay5: "",
    absenceFirstElem: "",
    absence3more: false,
    absChoiceOne: "",
    absChoiceTwo: "",
    absChoiceThree: "",
    absChoiceFour: "",

    perDelayFirstElem: "",
    calcLate: false,
    calclateTimeWithCount: false,
    lateafterAllowed: false,
    calcLessTimeOnWeekEnd: false,
    lateinWeekEndMiss: false,
    delFstElDayOne: "",
    delFstElDayTwo: "",
    delFstElDayThree: "",
    delFstElDayFour: "",
    delFstElDayFive: "",
    perDelaySecondElem: "",
    lessTimestartFromMin: "",
    minusMinuteFrom: "",
    delSecElDayOne: "",
    delSecElDayTwo: "",
    delSecElDayThree: "",
    delSecElDayFour: "",
    delSecElDayFive: "",
    delChoiceOne: "",
    delChoiceTwo: "",
    delChoiceThree: "",
    delChoiceFour: "",

    lateTimeEle: "",
    lateTimeMinusEl: "",
    lateTimeMinusElVal: "",
    perRoll: "",
    calcLateByTime: false,
    lessAsLate: false,
    lateTimeOnMonth: false,
    perCompensated: false,
    maxLatePerMinutes: "",
    maxLatePerNo: "",
    maxPerRoll1: "",
    lateAfterOver: false,
    lateAfterOverMaxTime: "",
    lateAfterMinOver: "",
    lateTimeEle: "",
    lateTimeMinusEl: "",
    lateTimeMinusElVal: false,

    penaltyElem: "",
    allowForForgetAtt: "",
    penaltyDayVal: "",
    penaltyDayVal2: "",
    penaltyDayVal3: "",
    penaltyDayVal4: "",
    penaltyDayVal5: "",
    penaltyDayValOut: "",
    penaltyDayValOut2: "",
    penaltyDayValOut3: "",
    penaltyDayValOut4: "",
    penaltyDayValOut5: "",
    stoppageElem: "",
    stoppageDayVal: "",
    deletionElem: "",
    deletionDayVal: "",
    missionTime: "",
    trnsportaionEle: "",
    branchTransportaionEl: "",

    overTimeElem: "",
    usualOverTimeH:"",
    usualOverTimeHNight: "",
    shiftvacOverTimeEl: "",
    shiftVacOverTimeH: "",
    vacOverTimeEl: "",
    vacOverTimeH: "",
    worKNighElem: "",
    worKNighDayVal: "",
    overtimestartFromMin: "",
    morOverTime:false,
    shift24: false,
    init_RepVacBalance_EveryMonth: false,
    overTimeOnShift: false,

    overTimeApprov: false,
    maxOvertimeHrsOrdinaryDay:"",
    maxOvertimeHrsPerMonth:"",
    maxOvertimeHrsShiftVacDay:"",
    calcShiftOverTAsDay:false,
    maxOvertimeHrsOfficialVacDay:"",
    calcOfficialOverTAsDay:false,
    overTimeApprDown:false,
    overTimeAppr:false,
    ovTiFromOut:false,

    vacPenEle:"",
    vacPen:"",
    vacBalanceFromMonth:"",
    annualBal:"",
    trainingPeriodHasBalance:false,
    excludeVacDays:false,
    vacBalaMonthly:false,
    weekendSalary:false,
    vac_before_SD:"",
    vac_before_OV:"",
    vac_after_SD:"",
    vac_after_OV:"",
    calcVacAuto:false,
    workDays:"",
    vacEquiv:"",


    salaryOnWorkD: false,
    hoursPerDay: "",
    monthDays: "",
    UpdateInAfter: "",
    updateOutBefore: "",
  });

  const handleTabChange = (event, val) => {
    debugger;
    setValue(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      data.attControlParaLate = controlParaLateList.map((obj, i) => ({
        ...obj,
        id: 0,
      }));
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/Rules`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const group1data = await GeneralListApis(locale).GetElementListByType(
        2,
        2
      );
      setgroup1ElemList(group1data);

      const group2data = await GeneralListApis(locale).GetElementListByType(
        2,
        1
      );
      setgroup2ElemList(group2data);

      const group3data = await GeneralListApis(locale).GetElementListByType(2);
      setgroup3ElemList(group3data);

      const group4data = await GeneralListApis(locale).GetElementListByType(1,1);
      setgroup4ElemList(group4data);

      const group5data = await GeneralListApis(locale).GetElementListByType(1,2);
      setgroup5ElemList(group5data);

      const dataApi = await ApiData(locale).Get(id ?? 0);
      setdata(dataApi);

      
      setControlParaLateList(dataApi.attControlParaLate);
      setcontrolParaOvertimeList(dataApi.attControlParaOverTime);

      const Vacdata = await ApiData(locale).GetControlParaVac(id ?? 0);
      setcontrolParaVacList(Vacdata);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function TabContainer(props) {
    const { children } = props;
    return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
  }
  const style = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& label": {
      color: "white",
    },
    "& MuiInputBase-root": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  };
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.AttRulesCreateTitle)
            : intl.formatMessage(messages.AttRulesUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <div className={classes.cover}>
            <div className={classes.headercontent}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
              >
                <Grid container item md={6} xs={12} direction="row" spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="arName"
                      name="arName"
                      value={data.arName}
                      onChange={(e) =>
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          arName: event.target.value,
                        }))
                      }
                      label={intl.formatMessage(Payrollmessages.arName)}
                      className={classes.field}
                      sx={style}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="enName"
                      name="enName"
                      value={data.enName}
                      onChange={(e) =>
                        setdata((prevFilters) => ({
                          ...prevFilters,
                          enName: event.target.value,
                        }))
                      }
                      label={intl.formatMessage(Payrollmessages.enName)}
                      sx={style}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    spacing={3}
                    container
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="center"
                  >
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.save} />
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.cancel} />
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        color="secondary"
                      >
                        <FormattedMessage {...Payrollmessages.employees} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <AppBar position="static" className={classes.profileTab}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={intl.formatMessage(messages.AbsenceRules)} />
              <Tab label={intl.formatMessage(messages.DelayRules)} />
              <Tab label={intl.formatMessage(messages.TimeDelayRules)} />
              <Tab label={intl.formatMessage(messages.OtherRules)} />
              <Tab label={intl.formatMessage(messages.OverTiemRules)} />
              <Tab label={intl.formatMessage(messages.MaxOverTiemRules)} />
              <Tab label={intl.formatMessage(messages.VacationsRules)} />
              <Tab label={intl.formatMessage(messages.workhoursRules)} />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <AbsenceRules
                data={data}
                setdata={setdata}
                ChoiceList={ChoiceList}
                group1ElemList={group1ElemList}
              />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <DelayRules
                data={data}
                setdata={setdata}
                ChoiceList={ChoiceList}
                group1ElemList={group1ElemList}
              />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <TimeDelayRules
                data={data}
                setdata={setdata}
                group1ElemList={group1ElemList}
                group2ElemList={group2ElemList}
                controlParaLateList={controlParaLateList}
                setControlParaLateList={setControlParaLateList}
              />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <OtherRules
                data={data}
                setdata={setdata}
                group1ElemList={group1ElemList}
                group4ElemList={group4ElemList}
                group3ElemList={group3ElemList}
                controlParaLateList={controlParaLateList}
                setControlParaLateList={setControlParaLateList}
              />
            </TabContainer>
          )}
          {value === 4 && (
            <TabContainer>
              <OverTiemRules
                data={data}
                setdata={setdata}
                group1ElemList={group1ElemList}
                group5ElemList={group5ElemList}
                controlParaOvertimeList={controlParaOvertimeList}
                setcontrolParaOvertimeList={setcontrolParaOvertimeList}
              />
            </TabContainer>
          )}
          {value === 5 && (
            <TabContainer>
              <MaxOverTiemRules
                data={data}
                setdata={setdata}
                group1ElemList={group1ElemList}
                group2ElemList={group2ElemList}
                controlParaOvertimeList={controlParaOvertimeList}
                setcontrolParaOvertimeList={setcontrolParaOvertimeList}
              />
            </TabContainer>
          )}
          {value === 6 && (
            <TabContainer>
              <VacationsRules
                data={data}
                setdata={setdata}
                group1ElemList={group1ElemList}
                VacChoiceList={VacChoiceList}
                controlParaVacList={controlParaVacList}
                setcontrolParaVacList={setcontrolParaOvertimeList}
              />
            </TabContainer>
          )}
          {value === 7 && (
            <TabContainer>
              <WorkhoursRules data={data} setdata={setdata} />
            </TabContainer>
          )}
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
AttRulesCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(AttRulesCreate);
