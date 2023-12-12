import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/ElementsData";
import messages from "../messages";
import Payrollmessages from "../../messages";
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
import useStyles from "../../Style";
import PropTypes from "prop-types";
import NamePopup from "../../Component/NamePopup";
import PayRollLoader from "../../Component/PayRollLoader";
import ElementTable from "../Code/PayTemplate/ElementTable";
import glApis from "../../api/GeneralListApis";

function ElementTaxIns(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const [BranchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [data, setdata] = useState({
    brCode: 0,
    taxElements: [],
    insElements: [],
  });

  const Title = localStorage.getItem("MenuName");
  const [Type, setType] = useState(0);

  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      debugger;
      setOpenPopup(false);
      try {
        setIsLoading(true);
        if (Type === 3) {
          var taxElements = [];
          for (var i = 0; i < data.taxElements.length; i++) {
            taxElements.push(data.taxElements[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              taxElements.filter((x) => x.id == Employeesdata[i].id).length == 0
            ) {
              taxElements.push({
                id: Employeesdata[i].id,
                name: Employeesdata[i].name,
                isSelected: true,
              });
            }
          }

          setdata((prevFilters) => ({
            ...prevFilters,
            taxElements: taxElements,
          }));
        } else {
          var insElements = [];
          for (var i = 0; i < data.insElements.length; i++) {
            insElements.push(data.insElements[i]);
          }
          for (var i = 0; i < Employeesdata.length; i++) {
            if (
              insElements.filter((x) => x.id == Employeesdata[i].id).length == 0
            ) {
              insElements.push({
                id: Employeesdata[i].id,
                name: Employeesdata[i].name,
                isSelected: true,
              });
            }
          }
          setdata((prevFilters) => ({
            ...prevFilters,
            insElements: insElements,
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
    debugger;
    setType(type);
    setOpenPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      var insElements = data.insElements.filter((x) => x.isSelected == true);
      var taxElements = data.taxElements.filter((x) => x.isSelected == true);
      data.taxElements = taxElements;
      data.insElements = insElements;

      let response = await ApiData(locale).SaveElementTaxAndIns(data);

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function getData(id) {
    if (id) {
      debugger;
      const list = await ApiData(locale).GetElementTaxAndIns(id);
      var insElements = list.insElements.map((obj) => {
        return {
          ...obj,
          isSelected: true,
        };
      });
      var taxElements = list.taxElements.map((obj) => {
        return {
          ...obj,
          isSelected: true,
        };
      });
      list.insElements = insElements;
      list.taxElements = taxElements;
      setdata(list);
    } else
      setdata({
        brCode: 0,
        taxElements: [],
        insElements: [],
      });
  }
  async function fetchData() {
    try {
      debugger;
      const list1 = await glApis(locale).GetBranchList();
      setBranchList(list1);
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
      <PapperBlock whiteBg icon="border_color" title={Title} desc={""}>
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Element"}
          ElementType={0}
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="brCode"
                options={BranchList}
                value={
                  BranchList.find((item) => item.id === data.brCode) || null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  getData(value !== null ? value.id : null);
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    brCode: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="brCode"
                    required
                    label={intl.formatMessage(Payrollmessages.organizationName)}
                  />
                )}
              />
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
                          disabled={data.brCode == 0 ? true : false}
                          onClick={() => handleClickOpenNamePopup(3)}
                        >
                          <FormattedMessage {...messages.Taxelement} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ElementTable
                          dataList={data.taxElements}
                          setdataList={setdata}
                          Type={3}
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
                          disabled={data.brCode == 0 ? true : false}
                          onClick={() => handleClickOpenNamePopup(4)}
                        >
                          <FormattedMessage {...messages.Inselement} />
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <ElementTable
                          dataList={data.insElements}
                          setdataList={setdata}
                          Type={4}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
ElementTaxIns.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementTaxIns);
