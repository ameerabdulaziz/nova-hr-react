import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/SalaryStructureData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import glApis from "../../../api/GeneralListApis";
import NamePopup from "../../../Component/NamePopup";
import PayRollLoader from "../../../Component/PayRollLoader";
import ElementTable from "../PayTemplate/ElementTable";
import NameList from "../../../Component/NameList";

function SalaryStructureCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [ElemList, setElemList] = useState([]);
  const [employees, setemployees] = useState([]);
  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    mainElementId: 0,
    elements: [],
    employees: [],
  });

  const history = useHistory();

  const [Type, setType] = useState(0);

  const handleCloseNamePopup = useCallback(
    async (datalist) => {
      
      setOpenPopup(false);
      try {
        setIsLoading(true);
        var elements = [];
        for (var i = 0; i < data.elements.length; i++) {
          elements.push(data.elements[i]);
        }
        for (var i = 0; i < datalist.length; i++) {
          if (
            elements.filter((x) => x.elementId == datalist[i].id).length == 0
          ) {
            elements.push({
              id: 0,
              elementId: datalist[i].id,
              elementName: datalist[i].name,
              salaryStructureId: data.salaryStructureId,
              elePercent: 0,
              isSelected: true,
            });
          }
        }

        setdata((prevFilters) => ({
          ...prevFilters,
          elements: elements,
        }));
      } catch (err) {
      } finally {
        setIsLoading(false);
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
      data.elements = data.elements.filter((x) => x.isSelected == true);

      if(data.elements.filter((x) => x.elementId == data.mainElementId).length > 0)
      {
        toast.error("لا يمكن اختيار عنصر المرتب الاساسي كعنصر فرعي");
        return;
      }      

      var total = data.elements.reduce((n, { elePercent }) => parseInt(n) + parseInt(elePercent), 0);

      if(total!==100)
      {
        toast.error("Total Percentage Must Equal 100");
        return;
      }
      data.employees = employees.filter((x) => x.isSelected == true);

      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Payroll/SalaryStructure`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Payroll/SalaryStructure`);
  }
  async function fetchData() {
    try {
      const list2 = await glApis(locale).GetElementList(0, 0);
      setElemList(list2);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);
        setemployees(
          dataApi.employees.map((obj) => {
            return {
              ...obj,
              isSelected: true,
            };
          })
        );
        var elements = dataApi.elements.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        });
        dataApi.elements=elements ;
        setdata(dataApi);
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
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.SalaryStructureCreateTitle)
            : intl.formatMessage(messages.SalaryStructureUpdateTitle)
        }
        desc={""}
      >
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Element"}
          ElementType={0}
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="ElemList"
                options={ElemList}
                value={
                  ElemList.find((item) => item.id === data.mainElementId) ||
                  null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    mainElementId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="DebtElem"
                    required
                    label={intl.formatMessage(Payrollmessages.element)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
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
                          onClick={() => handleClickOpenNamePopup(5)}
                        >
                          <FormattedMessage {...messages.addElement2} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ElementTable
                          dataList={data.elements}
                          setdataList={setdata}
                          Type={5}
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
                    <NameList
                      dataList={employees}
                      setdataList={setemployees}
                      Key={"Employee"}
                      withoutSalaryStructure={true}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
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
    </PayRollLoader>
  );
}
SalaryStructureCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(SalaryStructureCreate);
