import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import api from '../api/PeerAppraisalSettingData';
import payrollMessages from '../../messages';
import messages from '../messages';
import { Button } from "@mui/material";

function PeerAppraisalList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

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
          <Button variant="contained" size="medium" color="primary" >
            {intl.formatMessage(messages.Appraisal)}
          </Button>
        ),
      },
    },
  ];

  return (
    <PayrollTable
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
