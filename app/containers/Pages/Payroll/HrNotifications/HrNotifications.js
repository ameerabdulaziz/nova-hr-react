import React, { useEffect, useState } from "react";
import ApiData from "./api/HrNotificationsData";
import { useSelector } from "react-redux";
import messages from "./messages";
import payrollMessages from "../messages";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import PayRollLoader from "../Component/PayRollLoader";
import SimplifiedPayrollTable from "../Component/SimplifiedPayrollTable";
import { useLocation  } from 'react-router-dom';
import { format } from "date-fns";

function HrNotifications(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation()
  const  NotificationTypeId  = state?.NotificationTypeId
  const NotificationTypeId2 = JSON.parse(sessionStorage.getItem("hrNotificationsId"))
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);


  async function fetchData() {
    try {
      const response = await ApiData(locale).GetList(NotificationTypeId2);
      // const response = await ApiData(locale).GetList(NotificationTypeId);
      setdata(response);

      let newCols = [ 
        {
        name: "id",
          label: intl.formatMessage(payrollMessages.id),
        options: {
          display: false,
          print: false,
          download: false,
        },
      },
      {
        name: "employeeCode",
        label: intl.formatMessage(payrollMessages.employeeCode),
      },
      {
        name: "employeeName",
        label: intl.formatMessage(payrollMessages.employeeName),
      },
      {
        name: "hiringDate",
        label: intl.formatMessage(payrollMessages.hiringDate),
        options: {
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
        }
      },
      {
        name: "organizationName",
        label: intl.formatMessage(payrollMessages.organizationName),
      },  
      {
        name: "jobName",
        label: intl.formatMessage(messages.jobName),
      },
     ]

      if(response)
      {
        Object.keys(response[0]).map((item)=>{
          if(item !== "employeeId" && item !== "employeeCode" && item !== "employeeName" && item !== "hiringDate" && item !== "organizationName" && item !== "jobName" && item !== "stopProcd")
          {
            newCols.push({
              name: item,
              label: intl.formatMessage(messages[item]),
              ...((item === "birthDate" || item === "txDate" ) && { 
                options: {
                  customBodyRender: (value) => (<pre>{value ? format(new Date(value), "yyyy-MM-dd") : ""}</pre>),
                }
               }),
            })
          }
        })
        
        setColumns(newCols)        
      }

    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [NotificationTypeId2]);


  console.log("columns =", columns);
  
   

  return (
    <PayRollLoader isLoading={isLoading}>
        <SimplifiedPayrollTable
          title={Title}
          data={data}
          columns={columns}
        />
    </PayRollLoader>
  );
}

HrNotifications.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(HrNotifications);
