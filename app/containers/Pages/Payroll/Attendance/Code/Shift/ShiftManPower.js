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
import Payrollmessages from "../../../messages";
import messages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import ShiftManPowerData from "../../api/ShiftManPowerData";
import { toast } from "react-hot-toast";
import useStyles from "../../../Style";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import GeneralListApis from "../../../api/GeneralListApis";
import NamePopup from "../../../Component/NamePopup";
import PayRollLoader from "../../../Component/PayRollLoader";
import OrganizationData from "../../../MainData/api/OrganizationData";
import { useReactToPrint } from 'react-to-print';
import PrintableTable from "../../components/ShiftManPower/PrintableTable";
import { formateDate } from "../../../helpers";

function ShiftManPower(props) {
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
        if (dataList.filter((x) => x.shiftId == row.id).length == 0) {
          setdataList((prev) => [
            ...prev,
            {
              shiftId: row.id,
              shiftName: row.name,
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
        if (x.shiftId == row.shiftId) {
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
    debugger;
    
    if (!organization) {
      toast.error("Please Select organization");
      return;
    }
   
    
    try {
      setIsLoading(true);
      let response = await ShiftManPowerData().Save({
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
      const data = await ShiftManPowerData().GetList(locale, organization);
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

  const GetorganizationList = useCallback(async () => {
    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setorganizationList(organizations);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);
  
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
          <Typography>{intl.formatMessage(Payrollmessages.organizationName)} : </Typography>
          <Typography fontWeight='bold'>{organizationList.find((x) => x.id === organization)?.name}</Typography>
        </Stack>

        <PrintableTable rows={dataList}/>
      </Box>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <NamePopup handleClose={handleClose} open={OpenPopup} Key="shift" />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
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
                    label={intl.formatMessage(Payrollmessages.organizationName)}
                  />
                )}
              />
            </Grid>
            
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleClickOpen}
              >
                <FormattedMessage {...Payrollmessages.chooseShift} />
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
                        <FormattedMessage {...messages.id} />
                      </TableCell>
                      <TableCell style={{ width: "20px", padding: "0px" }}>
                        <FormattedMessage {...messages.shift} />
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
                            key={row.shiftId}
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
                              {row.shiftId}
                            </TableCell>
                            <TableCell
                              style={{ width: "20px", padding: "0px" }}
                            >
                              {row.shiftName}
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

export default injectIntl(ShiftManPower);
