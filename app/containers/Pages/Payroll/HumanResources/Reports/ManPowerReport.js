import React, {  useState, useEffect } from "react";
import ApiData from "../api/ManPowerReportData";
import { useSelector } from "react-redux";
import { 
  Button, 
  Grid,
  Autocomplete, 
  TextField ,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { toast } from 'react-hot-toast';
import GeneralListApis from "../../api/GeneralListApis";
import { getAutoCompleteValue } from "../../helpers";

function ManPowerReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    OrganizationId: "",
    BranchId: branchId,
    jobId: ""
  });

  const [printFilterData, setPrintFilterData] = useState({
     Organization: '',
     Branch: "",
   });

  const [filterHighlights, setFilterHighlights] = useState([]);

  const [JobsData, setJobsData] = useState([]);
  const [DateError, setDateError] = useState({});
  const [totalActualManPoweArr, setTotalActualManPoweArr] = useState([]);
  const newDataArr = []

  const getFilterHighlights = () => {
    const highlights = [];

    const job = getAutoCompleteValue(JobsData, searchData.jobId);

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (job) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.job),
        value: job.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {
    e.preventDefault()
      // used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
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

      getFilterHighlights();
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
            <div>
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
            <div>
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
            <div>
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
            <div>
              <pre>{value?.toFixed(2)}</pre>
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
            <div>
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

    // used to calculate total ActualManPower for each rows group with same departmentName to show it in header 
    useEffect(()=>{

      let departmentName = ""
      let totalActualManPower = 0
      let arr = []
      
      data.map((item, index)=>{
      
        if(departmentName !== item.departmentName)
          {
            if(departmentName !== "")
              {
                arr.push({
                  departmentName: departmentName,
                  totalActualManPower: totalActualManPower
                })
              }
            departmentName = item.departmentName
            totalActualManPower = 0
          }

        if(departmentName === item.departmentName)
          {
            totalActualManPower = totalActualManPower + item.actualManPower
          }

          if(index === data.length - 1)
            {
              arr.push({
                departmentName: departmentName,
                totalActualManPower: totalActualManPower
            })
            }
          
          setTotalActualManPoweArr(arr)
      })

    },[data])

    // used to generate header for each rows group with same departmentName
    useEffect(()=>{
      let totalObj 
      
        data.map((item)=>{
        const Headers = newDataArr.find((header) => header.departmentName === item.departmentName);
        if(!Headers)
        {
          totalObj = totalActualManPoweArr.find(objItem => objItem.departmentName === item.departmentName);

          newDataArr.push(
            {
              departmentName: item.departmentName,
              actualManPower: totalObj?.totalActualManPower,
              header: true
            }
          )
        }
          newDataArr.push(item)
    })
    },[totalActualManPoweArr])



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
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={8} xl={7}>
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
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
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
          <Grid item xs={12} xl={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={newDataArr}
        columns={columns}
        options={options}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

ManPowerReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ManPowerReport);
