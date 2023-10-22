import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { injectIntl } from "react-intl";
import EmployeeDataReportData from "../api/EmployeeDataReportData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { PapperBlock } from "enl-components";
import Payrollmessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";

function EmployeeDataReport({ intl }) {
  const title = localStorage.getItem("MenuName");
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    try {
      const data = await EmployeeDataReportData(locale).GetList();

      setDataTable(data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
      },
    },
    {
      name: "employeeId",
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
      name: "birthDate",
      label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.Department),
      options: {
        filter: true,
      },
    },
    {
      name: "mainSalary",
      label: intl.formatMessage(messages.InsuranceSalary),
      options: {
        filter: true,
      },
    },
    {
      name: "variableSalary",
      label: intl.formatMessage(messages.BasicSalary),
      options: {
        filter: true,
      },
    },
    {
      name: "jobName",
      label: intl.formatMessage(messages.Job),
      options: {
        filter: true,
      },
    },
    {
      name: "gender",
      label: intl.formatMessage(messages.Gendar),
      options: {
        filter: true,
      },
    },
    {
      name: "hiringDate",
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "qualification",
      label: intl.formatMessage(messages.Qualification),
      options: {
        filter: true,
      },
    },
    {
      name: "address",
      label: intl.formatMessage(messages.Address),
      options: {
        filter: true,
      },
    },
    {
      name: "isBnkTransfer",
      label: intl.formatMessage(messages.BankTransfere),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? (
                <CheckIcon style={{ color: "#3f51b5" }} />
              ) : (
                <CloseIcon style={{ color: "#717171" }} />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "insured",
      label: intl.formatMessage(messages.Insured),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? (
                <CheckIcon style={{ color: "#3f51b5" }} />
              ) : (
                <CloseIcon style={{ color: "#717171" }} />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "taxable",
      label: intl.formatMessage(messages.TaxableEmployee),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? (
                <CheckIcon style={{ color: "#3f51b5" }} />
              ) : (
                <CloseIcon style={{ color: "#717171" }} />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "postOverTime",
      label: intl.formatMessage(messages.postOverTime),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              {value ? (
                <CheckIcon style={{ color: "#3f51b5" }} />
              ) : (
                <CloseIcon style={{ color: "#717171" }} />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "religion",
      label: intl.formatMessage(messages.Religion),
      options: {
        filter: true,
      },
    },
    {
      name: "government",
      label: intl.formatMessage(messages.Governorate),
      options: {
        filter: true,
      },
    },
    {
      name: "city",
      label: intl.formatMessage(messages.City),
      options: {
        filter: true,
      },
    },
    {
      name: "nationality",
      label: intl.formatMessage(messages.Nationality),
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: intl.formatMessage(messages.StopEmployee),
      options: {
        filter: true,
      },
    },
    {
      name: "bank",
      label: intl.formatMessage(messages.BankName),
      options: {
        filter: true,
      },
    },
    {
      name: "insuJob",
      label: intl.formatMessage(messages.InsuranceJob),
      options: {
        filter: true,
      },
    },
    {
      name: "medInsuCat",
      label: intl.formatMessage(messages.MedicalInsuranceCategory),
      options: {
        filter: true,
      },
    },
    {
      name: "qualificationDate",
      label: intl.formatMessage(messages.GraduationDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "idCardNumber",
      label: intl.formatMessage(messages.IDCardNumber),
      options: {
        filter: true,
      },
    },
    {
      name: "jobType",
      label: intl.formatMessage(messages.JobType),
      options: {
        filter: true,
      },
    },
    {
      name: "bookNo",
      label: intl.formatMessage(messages.BookNo),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    page: 0,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title={""}
            data={dataTable}
            columns={columns}
            options={options}
            className={style.tableSty}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(EmployeeDataReport);
