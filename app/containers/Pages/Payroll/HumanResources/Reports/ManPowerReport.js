import React, {  useState, useEffect } from "react";
import ApiData from "../api/ManPowerReportData";
import { useSelector } from "react-redux";
import { 
  Button, 
  Grid,
  TableCell, 
  TableRow, 
  Autocomplete, 
  TextField ,
  FormGroup,
  FormLabel,
  FormControl,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import PayrollTable from "../../Component/PayrollTable";
import { toast } from 'react-hot-toast';
import MUIDataTable, { ExpandButton } from "mui-datatables";
import GeneralListApis from "../../api/GeneralListApis";

function ManPowerReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [newData, setNewData] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    OrganizationId: "",
    BranchId: "",
    jobId: ""
  });

  const [JobsData, setJobsData] = useState([]);
  const [DateError, setDateError] = useState({});
  const newDataArr = []


  const handleSearch = async (e) => {
    e.preventDefault()
      // used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }


    try {
      setIsLoading(true);
      let formData = {
        DepartmentId: searchData.OrganizationId,
        JobId: searchData.jobId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetReport(searchData.BranchId,formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getdataFun = async () => {
    const Jobs = await GeneralListApis(locale).GetJobsList();

    setJobsData(Jobs)
  }

  useEffect(()=>{
    getdataFun()
  },[])


const columns = [

    {
      name: 'departmentName',
      label: intl.formatMessage(messages.departmentName),
      options: {
        noFormatOnPrint:true,
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(!newDataArr?.[tableMeta?.rowIndex]?.header && {
                  display: 'none',
                }),
                
              }}
            >
              {value}
            </div>
          );
        },
        setCellProps: (value, rowIndex) => ({
          style: {
            paddingTop: '10px',
            paddingBottom: '10px',
          },
        }),
      },
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.job),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(newDataArr?.[tableMeta?.rowIndex]?.header && {
                  visibility: "hidden",
                }), 
              }}
            >
              <pre> {value} </pre>
            </div>
          );
        },
      },
    },
    {
      name: 'planedManPower',
      label: intl.formatMessage(messages.planedManPower),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(newDataArr?.[tableMeta?.rowIndex]?.header && {
                  visibility: "hidden",
                }), 
              }}
            >
                <pre>{value}</pre>
            </div>
          );
        },
      },
    },
    {
      name: 'vacancies',
      label: intl.formatMessage(messages.vacancies),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(newDataArr?.[tableMeta?.rowIndex]?.header && {
                  visibility: "hidden",
                }), 
              }}
            >
              <pre>{value}</pre>
            </div>
          );
        },
      },
    },
    {
      name: 'percent',
      label: intl.formatMessage(messages.percent),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(newDataArr?.[tableMeta?.rowIndex]?.header && {
                  visibility: "hidden",
                }), 
              }}
            >
              <pre>{value}</pre>
            </div>
          );
        },

      },
    },
    {
      name: 'actualManPower',
      label: intl.formatMessage(messages.actualManPower),
      options: {
        filter: false,
        noFormatOnPrint:true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div
              style={{
                ...(!newDataArr?.[tableMeta?.rowIndex]?.header && {
                  display: 'none',
                }),
              }}
            >
              {value}
            </div>
          );
        },
        setCellProps: (value, rowIndex) => ({
          style: {
            paddingTop: '10px',
            paddingBottom: '10px',
          },
        }),
      },
    },
  ];


data.map((item)=>{
    const Headers = newDataArr.find((header) => header.departmentName === item.departmentName);
    if(!Headers)
    {
      newDataArr.push(
        {
          departmentName: item.departmentName,
          actualManPower: item.actualManPower,
          header: true
        }
      )
    }
      newDataArr.push(item)
})


  const options = {
    selectableRows: "none",
    setRowProps: (row, dataIndex, rowIndex) => { 
        return { style: newDataArr[rowIndex].header ? {backgroundColor: "#c7c7c7"} : {}} 
    },
    isRowSelectable: (dataIndex, selectedRows) => {
        return dataIndex === 0 ? false : true
      }
}

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              notShowDate={true}
              notShowStatus={true}
              notShowEmployeeName={true}
              BranchIdRequired={true}
            ></Search>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              options={JobsData}
              onChange={(_, value) => {
                setsearchData((prev) => ({
                  ...prev,
                  jobId: value?.id ? value?.id : null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.job)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
        </form>
      </PapperBlock>

      <PayrollTable
        title=""
        data={newDataArr}
        columns={columns}
        options={options}
      />
    </PayRollLoader>
  );
}

ManPowerReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ManPowerReport);
