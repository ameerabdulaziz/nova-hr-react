import React, { useState, useEffect, useMemo } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/LoanSettingData";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useStyles from "../../Style";
import PropTypes from "prop-types";
import glApis from "../../api/GeneralListApis";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";

function LoanSetting(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    brCode: null,
    payTemplateId: null,
    payTemplateElementId: null,
    debtElemId: null,
    purchElemId: null,
    safeId: null,
    smalloanLimit: "",
    autoToSafe: false,
  });

  const [BranchList, setBranchList] = useState([]);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [PayElementList, setPayElementList] = useState([]);
  const [DebtElemList, setDebtElemList] = useState([]);
  const [PurchElemList, setPurchElemList] = useState([]);
  const [SafeList, setSafeList] = useState([]);

  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem("MenuName");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data);

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
  async function onCopy() {
    
    try {
      setIsLoading(true);
      let response = await ApiData(locale).CopyToAllBranches(data.brCode);

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

  async function getPayElement(id) {
    
    if (id) {
      const list = await glApis(locale).GetElementListByTemplate(id,1,1);
      setPayElementList(list);
    } else setPayElementList([]);
  }

  async function getLoanSetting(id) {
    if (id) {
        
      const list = await ApiData(locale).Get(id);
      getPayElement(list.payTemplateId);
      setdata(list);
    } else
      setdata({
        brCode: 0,
        payTemplateId: 0,
        payTemplateElementId: 0,
        debtElemId: 0,
        purchElemId: 0,
        safeId: 0,
        smalloanLimit: "",
        autoToSafe: false,
      });
  }

  async function fetchData() {
    try {
      
      const list1 = await glApis(locale).GetBranchList(true);
      setBranchList(list1);

      const  list= await glApis(locale).GetPayTemplateList();
      
      
      setPayTemplateList(list.filter((item)=>item.id != 1)
      );

      const list2 = await glApis(locale).GetElementList(0,1, "",2);
      setDebtElemList(list2);
      setPurchElemList(list2);

      const list3 = await glApis(locale).GetSafeList();
      setSafeList(list3);
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
        title={Title}
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4} lg={3}>
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
                  getLoanSetting(value !== null ? value.id : null);
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
                    label={intl.formatMessage(Payrollmessages.company)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Autocomplete
                id="payTemplateId"
                options={PayTemplateList}
                value={
                  PayTemplateList.find(
                    (item) => item.id === data.payTemplateId
                  ) || null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  getPayElement(value !== null ? value.id : null);
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    payTemplateId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="payTemplateId"
                    required
                    label={intl.formatMessage(messages.payTemplate)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Autocomplete
                id="payTemplateElementId"
                options={PayElementList}
                value={
                  PayElementList.find(
                    (item) => item.id === data.payTemplateElementId
                  ) || null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    payTemplateElementId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="payTemplateElementId"
                    required
                    label={intl.formatMessage(messages.payTemplateElement)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Autocomplete
                id="DebtElem"
                options={DebtElemList}
                value={
                  DebtElemList.find((item) => item.id === data.debtElemId) ||
                  null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    debtElemId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="DebtElem"
                    required
                    label={intl.formatMessage(messages.deductElement)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Autocomplete
                id="PurchElem"
                options={PurchElemList}
                value={
                  PurchElemList.find((item) => item.id === data.purchElemId) ||
                  null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    purchElemId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="PurchElem"
                    label={intl.formatMessage(messages.deductPurchaseElement)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Autocomplete
                id="safe"
                options={SafeList}
                value={SafeList.find((item) => item.id === data.safeId) || null}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    safeId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="safe"
                    label={intl.formatMessage(messages.safe)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2.2} xl={1.5}>
              <TextField
                id="SmalloanLimit"
                name="SmalloanLimit"
                value={data.smalloanLimit}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    smalloanLimit: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.maxLoan)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.autoToSafe}
                    onChange={(e) =>
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        autoToSafe: e.target.checked,
                      }))
                    }
                    value={data.autoToSafe}
                    color="primary"
                  />
                }
                label={intl.formatMessage(messages.safeLoan)}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
            <Grid item >
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>

            <Grid item >
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={onCopy}
              >
                <FormattedMessage {...messages.copytoAllBr} />
              </Button>
            </Grid>
              </Grid>
            </Grid>

          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
LoanSetting.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(LoanSetting);
