import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PersonalData';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox, IndeterminateCheckBoxRounded } from '@mui/icons-material';

import messages from '../messages';
import { FormattedMessage } from 'react-intl';
const useStyles = makeStyles()((theme) => ({
  table: {
    '& > div': {
      overflow: 'auto',
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all',
      },
      [theme.breakpoints.down('lg')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  },
}));

function Personal() {
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [changedata, setchangedata] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const dataApi = await ApiData(locale).GetList();
      setdata(dataApi);
    }
    fetchData();
    // if (!data.length) { fetchData(); }
  }, [changedata]);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: 'false',
      },
    },
    {
      name: 'employeeCode',
      label: <FormattedMessage {...messages['employeeCode']} />,
      options: {
        filter: true,
      },
    },
    {
      name: locale == 'en' ? 'enName' : 'arName',
      label: <FormattedMessage {...messages['employeename']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'statusName',
      label: <FormattedMessage {...messages['status']} />,
      options: {
        filter: true,
      },
    },

    {
      name: 'identityNumber',
      label: <FormattedMessage {...messages['identitynumber']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'organizationName',
      label: <FormattedMessage {...messages['organization']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'reportToName',
      label: <FormattedMessage {...messages['reportto']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'jobName',
      label: <FormattedMessage {...messages['jobname']} />,
      options: {
        filter: true,
      },
    },
    {
      name: 'isInsured',
      label: <FormattedMessage {...messages['isinsured']} />,
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === true) {
            return <CheckBox />;
          }
          if (value === false) {
            return <IndeterminateCheckBoxRounded />;
          }
          return <Chip label="Unknown" />;
        },
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
  };

  const { classes } = useStyles();

  return (
    <div className={classes.table}>
      <MUIDataTable
        title="Employee List"
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default Personal;
