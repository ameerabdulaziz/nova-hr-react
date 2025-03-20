import React, { useState, useCallback, useEffect } from "react";
import { PapperBlock } from "enl-components";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import DirectMangerData from "../api/DirectMangerData";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import GeneralListApis from "../../api/GeneralListApis";
import NameList from "../../Component/NameList";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import EmployeeDataSmall from "../../Component/EmployeeDataSmall";
import { format } from "date-fns";

function DirectManager(props) {
  const { intl } = props;
  const [dataList, setdataList] = useState([]);
  const [employee, setEmployee] = useState();
  const [employeeList, setEmployeeList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState({
    id: 0,
    noticeDate: format(new Date(), "yyyy-MM-dd"),
    reason: "",
    employeeId: "",
  });

  async function on_submit() {
    if (!employee) {
      toast.error("Please Select Employee");
      return;
    }
    try {
      setIsLoading(true);
      let response = await DirectMangerData().Save({
        employee: employee,
        dataList: dataList,
      });

      if (response.status == 200) {
        toast.success(notif.saved);
        GetList();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const GetList = useCallback(async () => {
    try {
      if (!employee) {
        setdataList([]);
        return;
      }
      setIsLoading(true);
      const data = await DirectMangerData().GetList(locale, employee);
      setdataList(
        data.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        }) || []
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  });


  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
      setdata((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const GetEmployeeList = useCallback(async () => {
    try {
      setIsLoading(true);
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetList();
  }, [employee]);

  useEffect(() => {
    GetEmployeeList();
  }, []);

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <Autocomplete
              id="ddlEmp"
              options={employeeList}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setEmployee(value !== null ? value.id : null);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="employee"
                  value={employee}
                  label={intl.formatMessage(Payrollmessages.chooseEmp)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={on_submit}
            >
              <FormattedMessage {...Payrollmessages.save} />
            </Button>
          </Grid>

          <Grid item xs={1} lg={2} xl={7}></Grid>
          <Grid item xs={12} lg={10.5} xl={7}>

            <EmployeeDataSmall handleEmpChange={handleEmpChange} id={data.employeeId}></EmployeeDataSmall>
          </Grid>
          <Grid item xs={12} >
            <NameList
              dataList={dataList}
              setdataList={setdataList}
              Key={"Employee"}
            />
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

export default injectIntl(DirectManager);
