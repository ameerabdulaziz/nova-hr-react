import React, { useState, useCallback, useEffect, useRef } from "react";
import { PapperBlock } from "enl-components";
import css from "enl-styles/Table.scss";
import {
  Grid,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Box,
  Stack,
} from "@mui/material";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import UserMenuData from "./api/UserMenuData";
import useStyles from "../Style";
import { useSelector } from "react-redux";
import Payrollmessages from "../messages";
import PayRollLoader from "../Component/PayRollLoader";
import DoneIcon from "@mui/icons-material/Done";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useReactToPrint } from "react-to-print";
import UserMenuReportPrint from "./Print/UserMenuReportPrint";
import massagePayroll from "../Payroll/messages"
import XLSX from 'xlsx-js-style';
import { formatNumber, formateDate, getAutoCompleteValue } from '../helpers';


function UserMenuReport(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [dataList, setdataList] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const [employee, setEmployee] = useState();
  const [employeeList, setEmployeeList] = useState([]);
  const [MenuList, setMenuList] = useState([]);
  const [menu, setmenu] = useState();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const printDivRef = useRef(null);
  const company = useSelector((state) => state.authReducer.companyInfo);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    setPage(0);
  }, [limit]);

  const GetUserMenuList = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await UserMenuData().GetUserMenuReport(
        locale,
        menu,
        employee
      );
      setdataList(data || []);
    } catch (err) {
      setdataList([]);
    } finally {
      setIsLoading(false);
    }
  });

  const GetUserMenuLookup = useCallback(async () => {
    try {
      const data = await UserMenuData().GetUserMenuLookup(locale);
      setEmployeeList(data.employees || []);

      setMenuList(data.parentMenu || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (employee || menu) {
      GetUserMenuList();
    } else {
      setdataList([]);
    }
  }, [employee, menu]);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: "UserMenuReport",
  });

  const onPrint = () => {
    printJS();
  };

  const applyFilters = (data, menu) => {

    let datafiltered = data;
    if (menu)
      datafiltered = data.filter((item) => item.parentID == menu);


    return datafiltered;
  }

  const filteredData = applyFilters(dataList, menu);



  const getDefaultTemplate = () => {

    const headers = [
      'Employee Code',
      'Employee Name',
      'Parent Menu',
      'Menu Names',
      'Delete',
      'Update',
      'Add',
      'View',
    ];


    const rows = dataList.map((item) => [
      item.employeeCode,
      item.employeeName,
      item.parentName,
      item.menuName,
      item.isDelete ? "✅" : "❌",
      item.isUpdate ? "✅" : "❌",
      item.isAdd ? "✅" : "❌",
      item.isView ? "✅" : "❌",
    ])


    return [headers, ...rows];
  };

  const exportJsonToXLSX = (rows = [], sheetName = 'Payroll', sheetSty) => {
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    const workbook = XLSX.utils.book_new();
    const startRowNumSty = sheetSty === "headerSty" ? 4 : 0

    // Calculate column widths dynamically
    const colWidths = rows[startRowNumSty].map((_, colIndex) => {
      const colContent = rows.map(row => (row[colIndex]?.v || row[colIndex] || "").toString());
      const maxLength = Math.max(...colContent.map(str => str.length), 10); // Minimum width of 10
      return { wch: maxLength };
    });

    if (sheetSty === "headerSty") {
      // Set row height for a specific row (e.g., Row 5)
      worksheet["!rows"] = [
        undefined,         // Row 1: No height adjustment
        undefined,         // Row 2: No height adjustment
        undefined,         // Row 3: No height adjustment
        undefined,         // Row 4: No height adjustment
        { hpt: 25 },       // Row 5: Height in points
      ];
    }


    // Assign calculated widths to the worksheet
    worksheet["!cols"] = colWidths;


    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, 'UserMenuReport.xlsx');

  };

  const onExportBtnClick = () => {
    exportJsonToXLSX(getDefaultTemplate(), 'Report');
  };


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        {dataList && <Box
          ref={printDivRef}
          sx={{
            height: "0px",
            visibility: "hidden",
            px: 4,
            pt: 4,
            "@media print": {
              height: "100%",
              visibility: "visible",
              direction: "ltr",
            },
            "p.MuiTypography-root, .MuiTableCell-root": {
              fontSize: "7px",
              color: "#000",
            },
          }}
        >
          <Stack spacing={2} mb={2}>
            <div>
              <img src={company?.logo} alt="" height={45} />
            </div>
          </Stack>
          <div>
            <UserMenuReportPrint data={dataList} />
          </div>
        </Box>}

        <div>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <Autocomplete
                id="ddlEmp"
                options={employeeList}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
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
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <Autocomplete
                id="ddlMenu"
                options={MenuList}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) =>
                  setmenu(value !== null ? value.id : null)
                }
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="menu"
                    value={menu}
                    label={intl.formatMessage(messages.chooseMenu)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item >
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    disabled={dataList.length > 0 ? false : true}
                    onClick={onPrint}
                  >
                    <FormattedMessage {...Payrollmessages.Print} />
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onExportBtnClick}
                    disabled={dataList.length > 0 ? false : true}
                  >
                    {intl.formatMessage(massagePayroll.export)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{ overflowX: "auto", width: "100%" }}
            className={classes.rootTable}
          >
            <Table
              small
              className={cx(css.tableCrud, classes.table, classes.stripped)}
            >
              <TableHead>
                <TableRow sx={{ height: "55px" }}>
                  <TableCell sx={{ height: "auto" }}>
                    <FormattedMessage {...Payrollmessages.employeeCode} />
                  </TableCell>
                  <TableCell sx={{ height: "auto" }}>
                    <FormattedMessage {...Payrollmessages.employeeName} />
                  </TableCell>

                  <TableCell sx={{ height: "auto" }}>
                    <FormattedMessage {...messages.parentName} />
                  </TableCell>
                  <TableCell sx={{ height: "auto" }}>
                    <FormattedMessage {...messages.menuName} />
                  </TableCell>
                  <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                    <FormattedMessage {...messages.delete} />
                  </TableCell>
                  <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                    <FormattedMessage {...messages.update} />
                  </TableCell>
                  <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                    <FormattedMessage {...messages.add} />
                  </TableCell>
                  <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                    <FormattedMessage {...messages.view} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList
                  .slice(page * limit, page * limit + limit)
                  .map((row) => (
                    <TableRow sx={{ height: "50px" }} hover key={row.menuID}>
                      <TableCell>{row.employeeCode}</TableCell>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.parentName}</TableCell>
                      <TableCell>{row.menuName}</TableCell>
                      <TableCell>
                        {row.isDelete ? <DoneIcon /> : <CloseSharpIcon />}
                      </TableCell>
                      <TableCell>
                        {row.isUpdate ? <DoneIcon /> : <CloseSharpIcon />}
                      </TableCell>
                      <TableCell>
                        {row.isAdd ? <DoneIcon /> : <CloseSharpIcon />}
                      </TableCell>
                      <TableCell>
                        {row.isView ? <DoneIcon /> : <CloseSharpIcon />}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredData.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[25, 50, 100]}
            />
          </div>
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(UserMenuReport);
