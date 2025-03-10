import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import api from '../api/PeerAppraisalSettingData';
import payrollMessages from '../../messages';
import messages from '../messages';
import { Button } from "@mui/material";
import {  useHistory  } from 'react-router-dom';
import SITEMAP from '../../../../App/routes/sitemap';

function PeerAppraisalList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const history = useHistory(); 
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetPeerAppraisalData();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'employeeId',
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(payrollMessages.employeeName),
    },
    {
      name: 'peerAppraisalSettingId',
      label: intl.formatMessage(messages.evaluatedEmployee),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(payrollMessages.organizationName),
    },
    {
      name: 'month',
      label: intl.formatMessage(messages.month),
    },
    {
      name: 'totalDegree',
      label: intl.formatMessage(messages.totalDegree),
    },
    {
      name: '',
      label: "",
      options: {
        filter: false,
        print: false,
        customBodyRender: (value, tableMeta) => (
          <Button 
            variant="contained" 
            size="medium" 
            color="primary" 
            onClick={()=>history.push(SITEMAP.assessment.EmployeePeerAppraisal.route, {
              peerAppraisalId: tableMeta.rowData[0],
              id: tableMeta.rowData[1],
            })}
            >
            {intl.formatMessage(messages.Appraisal)}
          </Button>
        ),
      },
    },
  ];

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={tableData}
      columns={columns}
    />
  );
}

PeerAppraisalList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PeerAppraisalList);
