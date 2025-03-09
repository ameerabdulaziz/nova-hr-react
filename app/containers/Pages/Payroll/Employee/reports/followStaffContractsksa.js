import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/EmployeeReportsApiData";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { toast } from "react-hot-toast";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";
import XLSX from "xlsx-js-style";
import massagePayrollMoudel from "../../Payroll/messages";



function followStaffContractsksa(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });

  const [printFilterData, setPrintFilterData] = useState({
        FromDate: null,
        ToDate: null,
        Employee: '',
        EmpStatus: "",
        Organization: '',
        Branch: "",
      });

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    setFilterHighlights(highlights);
  };



  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      var formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmpStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetReportKsa(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: "organizationName",
      label: intl.formatMessage(payrollMessages.organizationName),
      options: {
        filter: true,
      },
    },

    {
      name: "hiringDate",
      label: intl.formatMessage(messages.hiringDate),
      options: getDateColumnOptions(intl.formatMessage(messages.hiringDate), {
        minDateLabel: intl.formatMessage(payrollMessages.minDate),
        maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
      }),
    },

    {
      name: "sourceName",
      label: intl.formatMessage(messages.sourceName),
      options: {
        filter: true,
      },
    },

    {
      name: "guarantorName",
      label: intl.formatMessage(messages.guarantorName),
      options: {
        filter: true,
      },
    },

    {
      name: "contractType",
      label: intl.formatMessage(messages.contractType),
      options: {
        filter: true,
      },
    },

    {
      name: "contractStartDate",
      label: intl.formatMessage(messages.contractStartDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.contractStartDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: "contractEndDate",
      label: intl.formatMessage(messages.contractEndDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.contractEndDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: "startWorkingDate",
      label: intl.formatMessage(messages.startWorkingDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.startWorkingDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),

    },

    {
      name: "vacBalance",
      label: intl.formatMessage(payrollMessages.vacationBalance),
      options: {
        filter: true,
      },
    },

    {
      name: "borderNumber",
      label: intl.formatMessage(messages.BorderNumber),
      options: {
        filter: true,
      },
    },

    {
      name: "borderIssuingDate",
      label: intl.formatMessage(messages.borderIssuingDate),
      options: {
        filter: true,
      },
    },

    {
      name: "borderExpiry",
      label: intl.formatMessage(messages.borderExpiry),
      options: {
        filter: true,
      },
    },

    {
      name: "residencyNumber",
      label: intl.formatMessage(messages.residencyNumber),
      options: {
        filter: true,
      },
    },

    {
      name: "residencyIssuingDate",
      label: intl.formatMessage(messages.residencyIssuingDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.residencyIssuingDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: "residencyExpiry",
      label: intl.formatMessage(messages.residencyExpiry),
      options: getDateColumnOptions(
        intl.formatMessage(messages.residencyExpiry),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];

  const openMonthDateWithCompanyChangeFun = async (BranchId, EmployeeId) => {
    let OpenMonthData;

    try {
      if (!EmployeeId) {
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(BranchId, 0);
      } else {
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(
          0,
          EmployeeId
        );
      }

      setSearchData((prev) => ({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }));

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))

    } catch (err) {}
  };

  useEffect(() => {
    if (searchData.BranchId !== "" && searchData.EmployeeId === "") {
      openMonthDateWithCompanyChangeFun(searchData.BranchId);
    }

    if (searchData.BranchId === "" && searchData.EmployeeId !== "") {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId);
    }

    if (searchData.BranchId === "" && searchData.EmployeeId === "") {
      setSearchData((prev) => ({
        ...prev,
        FromDate: null,
        ToDate: null,
      }));

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))

    }
  }, [searchData.BranchId, searchData.EmployeeId]);

  const getTemplate = () => {
    const headers = [
      intl.formatMessage(messages.EmpCode),
      intl.formatMessage(messages.sourceName),
      intl.formatMessage(messages.guarantorName),
      intl.formatMessage(messages.contractType),
      intl.formatMessage(messages.contractStartDate),
      intl.formatMessage(messages.contractEndDate),
      intl.formatMessage(messages.startWorkingDate),
      intl.formatMessage(payrollMessages.vacationBalance),
      intl.formatMessage(messages.BorderNumber),
      intl.formatMessage(messages.borderIssuingDate),
      intl.formatMessage(messages.borderExpiry),
      intl.formatMessage(messages.residencyNumber),
      intl.formatMessage(messages.residencyIssuingDate),
      intl.formatMessage(messages.residencyExpiry),
    ];

    const rows = data.map((item) => [
      item.employeeCode,
      item.sourceName,
      item.guarantorName,
      item.contractType,
      item.contractStartDate ? item.contractStartDate.split("T")[0] : "N/A",
      item.contractEndDate ? item.contractEndDate.split("T")[0] : "N/A",
      item.startWorkingDate ? item.startWorkingDate.split("T")[0] : "N/A",
      item.vacBalance,
      item.borderNumber,
      item.borderIssuingDate ? item.borderIssuingDate.split("T")[0] : "N/A",
      item.borderExpiry ? item.borderExpiry.split("T")[0] : "N/A",
      item.residencyNumber,
      item.residencyIssuingDate ? item.residencyIssuingDate.split("T")[0] : "N/A",
      item.residencyExpiry ? item.residencyExpiry.split("T")[0] : "N/A",
    ]);

    return [headers, ...rows];
  };

  const exportJsonToXLSX = (rows = [], sheetName = "employee", sheetSty) => {
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    const workbook = XLSX.utils.book_new();
    const startRowNumSty = sheetSty === "headerSty" ? 4 : 0;

    // Calculate column widths dynamically
    const colWidths = rows[startRowNumSty].map((_, colIndex) => {
      const colContent = rows.map((row) =>
        (row[colIndex]?.v || row[colIndex] || "").toString()
      );
      const maxLength = Math.max(...colContent.map((str) => str.length), 10); // Minimum width of 10
      return { wch: maxLength };
    });

    if (sheetSty === "headerSty") {
      // Set row height for a specific row (e.g., Row 5)
      worksheet["!rows"] = [
        undefined, // Row 1: No height adjustment
        undefined, // Row 2: No height adjustment
        undefined, // Row 3: No height adjustment
        undefined, // Row 4: No height adjustment
        { hpt: 25 }, // Row 5: Height in points
      ];
    }

    // Assign calculated widths to the worksheet
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, "followStaffContractsksa.xlsx");
  };

  const onExportBtnClick = () => {
    exportJsonToXLSX(getTemplate(), "Report");
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={10} lg={9} xl={7.5}>
            <Search
              setsearchData={setSearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={handleSearch}
                >
                  <FormattedMessage {...payrollMessages.search} />
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={onExportBtnClick}
                  disabled={data.length > 0 ? false : true}
                >
                  <FormattedMessage {...massagePayrollMoudel.export} />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

followStaffContractsksa.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(followStaffContractsksa);
