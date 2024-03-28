import { Button, Grid, Autocomplete,TextField } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../Component/PayRollLoader';
import PayrollTable from '../Component/PayrollTable';
import Search from '../Component/Search';
import { formateDate } from '../helpers';
import API from './api/KPI_API_Data';
import messages from './messages';
import classes2 from "../../../../styles/styles.scss";
import { toast } from "react-hot-toast";
import Payrollmessages from "../messages";
import GeneralListApis from '../api/GeneralListApis';

function KpiData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
  });

  const [kpiTypeList, setkpiTypeList] = useState([])
  const [kpiType, setKpiType] = useState();
  const [cols, setCols] = useState("");
  const [DateError, setDateError] = useState({});


  const [isLoading, setIsLoading] = useState(true);
  let mainColumns = [
    {
      name: 'employeeName',
      label: 'Employee Name',
    },
    {
      name: 'teamLeader',
      label: 'Team Leader',
    },
    {
      name: 'transactionDate',
      label: 'Transaction Date',
    },
  ]

  const [columns, setColumns] = useState(mainColumns);

  const absenteeismColumns = [
    {
      name: 'scheduledHours',
      label: 'Scheduled Hours',
    },
    {
      name: 'absenteeismHours',
      label: 'Absenteeism Hours',
    },
    {
      name: 'finalLostHours',
      label: 'Final Lost Hours',
    },
  ]

  const AHT_Columns = [
    {
      name: 'charts',
      label: 'Charts',
    },
    {
      name: 'acw',
      label: 'ACW',
    },
    {
      name: 'chatDuration',
      label: 'Chat Duration',
    },
    {
      name: 'handleTime',
      label: 'Handle Time',
    },
  ]

  const CSAT_Columns = [
    {
      name: 'transactionDate',
      label: 'Transaction Date',
    },
    {
      name: 'csat',
      label: 'CSAT',
    },
    {
      name: 'caseNumber',
      label: 'Case Number',
    },
    {
      name: 'contactReason',
      label: 'Contact Reason',
    },
    {
      name: 'country',
      label: 'Country',
    },
  ]

  const IC_Columns = [
    {
      name: 'transactionDate',
      label: 'Transaction Date',
    },
    {
      name: 'combinedPass',
      label: 'Combined Pass',
    },

    {
      name: 'combinedTotal',
      label: 'Combined Total',
    },
    {
      name: 'elevatedPass',
      label: 'Elevated Pass',
    },
    {
      name: 'elevatedTotal',
      label: 'Elevated Total',
    },
    {
      name: 'carePass',
      label: 'Care Pass',
    },
    {
      name: 'careTotal',
      label: 'Care Total',
    },
  ]

  const QA_Columns = [
    {
      name: 'reference',
      label: 'Reference',
    },
    {
      name: 'evaluatedBy',
      label: 'Evaluated By',
    },
    {
      name: 'workloadName',
      label: 'Workload Name',
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'evaluationTime',
      label: 'Evaluation Time',
    },
    {
      name: 'points',
      label: 'Points',
    },
    {
      name: 'maxScore',
      label: 'Max Score',
    },
    {
      name: 'qaScore',
      label: 'QA Score',
    },
    {
      name: 'goal',
      label: 'Goal',
    },
    {
      name: 'achieved',
      label: 'Achieved',
    },
  ]

  const utilizationColumns = [
    {
      name: 'scheduledHours',
      label: 'Scheduled Hours',
    },
    {
      name: 'staffedHours',
      label: 'Staffed Hours',
    },
    {
      name: 'auxAbuseHours',
      label: 'Aux Abuse Hours',
    },
    {
      name: 'breaksExceedingHours',
      label: 'Breaks Exceeding Hours',
    },
    {
      name: 'onlineHours',
      label: 'Online Hours',
    },
  ]

  const fetchTableData = async () => {

     // used to stop call api if user select wrong date
     if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    if(kpiType)
    {

      let URL 

      if(kpiType.id === 1)
      {
        URL = "KpiAbsenteeism"
      }

      if(kpiType.id === 2)
      {
        URL = "KpiAht"
      }

      if(kpiType.id === 3)
      {
        URL = "KpiCsat"
      }

      if(kpiType.id === 4)
      {
        URL = "KpiIc"
      }

      if(kpiType.id === 5)
      {
        URL = "KpiQa"
      }

      if(kpiType.id === 6)
      {
        URL = "KpiUtilization"
      }


      try {
        setIsLoading(true);
        const formData = {
          ...formInfo,
          FromDate: formInfo.FromDate ? formateDate(formInfo.FromDate) : "",
          ToDate: formInfo.ToDate ? formateDate(formInfo.ToDate) : "",
        };
        const dataApi = await API(locale).GetList(URL,formData);
        setTableData(dataApi);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
    else
    {
      toast.error("Choose KPI type");
    }
  };

  const onSearchBtnClick = () => {
    fetchTableData();
  };


  const  kpiTypeGetDataFun = async () => {
    setIsLoading(true); 

    try {
      const kpiTypeData = await GeneralListApis(locale).GetKpiTypeList();
      setkpiTypeList(kpiTypeData);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    kpiTypeGetDataFun()
  },[])


  const kpiTypeFun = (val) => {
    setKpiType(val)
    setTableData([]);
    let newColumns = []

    if(val)
    {

      if(val.id === 1)
      {
        newColumns = mainColumns.concat(absenteeismColumns)
        setColumns(newColumns)
      }

      if(val.id === 2)
      {
        newColumns = mainColumns.concat(AHT_Columns)
        setColumns(newColumns)
      }

      if(val.id === 3)
      {
        newColumns = mainColumns.concat(CSAT_Columns)
        setColumns(newColumns)
      }
      if(val.id === 4)
      {
        setColumns(IC_Columns)
      }
      
      if(val.id === 5)
      {
        newColumns = mainColumns.concat(QA_Columns)
        setColumns(newColumns)
      }

      if(val.id === 6)
      {
        newColumns = mainColumns.concat(utilizationColumns)
        setColumns(newColumns)
      }
    }
    else
    {
      setColumns(mainColumns)
    }
  }

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={DateError}
               setDateError={setDateError}
            />
          </Grid>

          <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlMenu"
                    className={classes2.kpiComboBoxSty2}
                    value={kpiType ? kpiType : null}
                    options={kpiTypeList}
                    sx={{ margin: "0px" }}
                    getOptionLabel={(option) =>
                      option.name || ""
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      if (value !== null) {
                        kpiTypeFun(value)
                      } else {
                        kpiTypeFun(null)
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="KPI_Type"
                        label="KPI Type"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>

          <Grid item md={3}>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onSearchBtnClick}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

KpiData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(KpiData);
