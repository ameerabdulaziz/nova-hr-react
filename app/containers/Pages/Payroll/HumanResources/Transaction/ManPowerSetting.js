import React, { useState, useCallback, useEffect, useRef } from "react";
import { PapperBlock } from "enl-components";
import css from "enl-styles/Table.scss";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import Payrollmessages from "../../messages";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import ManPowerSettingData from "../api/ManPowerSettingData";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import GeneralListApis from "../../api/GeneralListApis";
import NamePopup from "../../Component/NamePopup";
import PayRollLoader from "../../Component/PayRollLoader";
import OrganizationData from "../../MainData/api/OrganizationData";
import { useReactToPrint } from 'react-to-print';
import PrintableTable from "../components/ManPowerSetting/PrintableTable";
import { formateDate } from "../../helpers";

function ManPowerSetting(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [dataList, setdataList] = useState([]);
  const [organization, setorganization] = useState();
  const [organizationList, setorganizationList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const [OpenPopup, setOpenPopup] = useState(false);
  const Title = localStorage.getItem("MenuName");
  const [totalIdealManPower, settotalIdealManPower] = useState("");
  const [isLoading, setIsLoading] = useState(true);  

  const menuName = localStorage.getItem('MenuName');

  const company = useSelector((state) => state.authReducer.companyInfo);
  const printContainerRef = useRef(null);
  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  // Document title for printing & export
  const documentTitle = `${menuName || 'Man Power Report'} ${today}`;

  const printJS = useReactToPrint({
    documentTitle,
    content: () => printContainerRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const handleClose = useCallback(
    (data) => {
      data.map((row) => {
        if (dataList.filter((x) => x.jobId == row.id).length == 0) {
          setdataList((prev) => [
            ...prev,
            {
              jobId: row.id,
              jobName: row.name,
              idealManPower: 0,
              isSelected: true,
            },
          ]);
        }
      });
      setOpenPopup(false);
    },
    [dataList]
  );

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handlepermcheckboxAll = (event) => {
    setdataList(
      dataList.map((x) => {
        x.isSelected = event.target.checked;
        return x;
      })
    );
  };

  const handleEnableOne = (event, row) => {
    
    setdataList(
      dataList.map((x) => {
        if (x.jobId == row.jobId) {
          if (event.target.name == "isselected") {
            x.isSelected = event.target.checked;
          } else if (event.target.name == "idealManPower") {
            x.idealManPower = event.target.value
              ? parseInt(event.target.value)
              : 0;
          }
        }
        return x;
      })
    );
  };

  async function on_submit() {
    var total = dataList.reduce((n, { idealManPower }) => parseInt(n) + parseInt(idealManPower), 0);

    if(total!==totalIdealManPower)
    {
      toast.error("Total IdealManPower for jobs  Must Equal "+totalIdealManPower);
      return;
    }
    if (!organization) {
      toast.error("Please Select organization");
      return;
    }
    try {
      setIsLoading(true);
      let response = await ManPowerSettingData().Save({
        organization: organization,
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
      if (!organization) {
        setdataList([]);
        return;
      }
      setIsLoading(true);
      const data = await ManPowerSettingData().GetList(locale, organization);
      setdataList(
        data.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        }) || []
      );

      const result = await OrganizationData().GetDataById(organization, locale);      
      settotalIdealManPower(result ? result[0].manPower : "");

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  });

  const GetorganizationList = useCallback(async () => {
    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setorganizationList(organizations);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

 /*  useEffect(() => {
    var temp = dataList.filter((row) => row.isSelected == true);
    var total = temp.reduce((n, { idealManPower }) => parseInt(n) + parseInt(idealManPower), 0);
    settotalIdealManPower(total);
  }, [dataList]); */

  useEffect(() => {
    GetList();
  }, [organization]);

  useEffect(() => {
    GetorganizationList();
  }, []);

  const onPrintBtnClick = () => {
    printJS();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Box
        ref={printContainerRef}
        sx={{
          display: 'none',
          pageBreakBefore: 'always',
          direction: 'ltr',
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '7px',
            color: '#000',
          },
          '@page': {
            margin: 4,
          },
          svg: {
            fontSize: '0.7rem',
          },
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography fontWeight='bold' variant='subtitle1'>
            {menuName}
          </Typography>

          <img src={company?.logo} alt='' height={45} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1} mb={1} >
          <Typography>{intl.formatMessage(messages.organization)} : </Typography>
          <Typography fontWeight='bold'>{organizationList.find((x) => x.id === organization)?.name}</Typography>
        </Stack>

        <Stack direction='row' alignItems='center' gap={1} mb={2} >
          <Typography>{intl.formatMessage(Payrollmessages.total)} : </Typography>
          <Typography fontWeight='bold'>{totalIdealManPower}</Typography>
        </Stack>

        <PrintableTable rows={dataList}/>
      </Box>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <NamePopup handleClose={handleClose} open={OpenPopup} Key="Job" />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Autocomplete
                id="ddlOrganization"
                options={organizationList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setorganization(value !== null ? value.id : null);
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="organization"
                    required
                    label={intl.formatMessage(messages.organization)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="totalIdealManPower"
                name="totalIdealManPower"
                value={totalIdealManPower}
                label={intl.formatMessage(Payrollmessages.total)}
                className={classes.field}
                variant="outlined"
                disabled
                autoComplete='off'
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleClickOpen}
              >
                <FormattedMessage {...Payrollmessages.chooseJob} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={on_submit}
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onPrintBtnClick} disabled={!organization} >
                <FormattedMessage {...Payrollmessages.Print} />
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className={classes.rootTable}>
                <Table
                  className={cx(css.tableCrud, classes.table, classes.stripped)}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "5px", padding: "0px" }}>
                        <Checkbox
                          checked={
                            dataList.length > 0 &&
                            dataList.filter((crow) => crow.isSelected == true)
                              .length === dataList.length
                              ? true
                              : false
                          }
                          color="primary"
                          name="AllSelect"
                          indeterminate={
                            dataList.filter((crow) => crow.isSelected == true)
                              .length > 0 &&
                            dataList.filter((crow) => crow.isSelected == true)
                              .length < dataList.length
                              ? true
                              : false
                          }
                          onChange={handlepermcheckboxAll}
                        />
                      </TableCell>
                      <TableCell style={{ width: "5px", padding: "0px" }}>
                        <FormattedMessage {...Payrollmessages.id} />
                      </TableCell>
                      <TableCell style={{ width: "20px", padding: "0px" }}>
                        <FormattedMessage {...messages.job} />
                      </TableCell>
                      <TableCell style={{ width: "20px", padding: "0px" }}>
                        <FormattedMessage {...messages.idealManPower} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataList.length !== 0 &&
                      dataList.map((row) => {
                        return (
                          <TableRow
                            hover
                            key={row.jobId}
                            sx={{ height: 1 }}
                            style={{ padding: "0px" }}
                          >
                            <TableCell style={{ width: "5px", padding: "0px" }}>
                              <Checkbox
                                checked={row.isSelected}
                                color="primary"
                                name="isselected"
                                onChange={(event) =>
                                  handleEnableOne(event, row)
                                }
                                value={row.isSelected}
                              />
                            </TableCell>
                            <TableCell style={{ width: "5px", padding: "0px" }}>
                              {row.jobId}
                            </TableCell>
                            <TableCell
                              style={{ width: "20px", padding: "0px" }}
                            >
                              {row.jobName}
                            </TableCell>
                            <TableCell
                              style={{ width: "20px", padding: "0px" }}
                            >
                              <input
                                name="idealManPower"
                                type="text"
                                value={row.idealManPower}
                                onChange={(event) =>
                                  handleEnableOne(event, row)
                                }
                              ></input>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(ManPowerSetting);
