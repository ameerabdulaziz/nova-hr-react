import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate, getCheckboxIcon } from '../../helpers';
import ApiData from '../api/PersonalData';
import RowDropdown from '../component/EmployeeList/RowDropdown';
import messages from '../messages';

function EmployeeList(props) {
  const { intl } = props;
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem('MenuName');

  async function fetchData() {
    try {
      const dataApi = await ApiData(locale).GetList();
      setdata(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeCode),
    },
    {
      name: 'enName',
      label: intl.formatMessage(messages.employeename),
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/app/Pages/Employee/Personal', {
                empid: tableMeta.rowData[0],
              });
            }}
          >
            {value}
          </Box>
        ),
      },
    },
    {
      name: 'statusName',
      label: intl.formatMessage(messages.status),
    },

    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'reportToName',
      label: intl.formatMessage(messages.reportto),
    },
    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobname),
    },
    {
      name: 'isInsured',
      label: intl.formatMessage(messages.isinsured),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        print: false,

        customBodyRender: (_, tableMeta) => (
          <RowDropdown tableMeta={tableMeta} />
        ),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Employee/Personal',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeList);
