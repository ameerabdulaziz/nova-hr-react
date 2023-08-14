import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import LinearProgress from '@mui/material/LinearProgress';

import IconButton from '@mui/material/IconButton';
import ActionDelete from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Create';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from '../api/PersonalData';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox, IndeterminateCheckBoxRounded } from '@mui/icons-material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import style from '../../../../../styles/Styles.scss';
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

function EmployeeList() {
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const [changedata, setchangedata] = useState(1);

  const title = localStorage.getItem('MenuName');
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
      name: 'arName',
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

    {
      name: 'Actions',
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log('tableMeta =', tableMeta);
          return (
            <div className={style.actionsSty}>
              <IconButton
                // onClick={() => eventEdit(this)}
                // className={cx((item.edited ? css.hideAction : ''), classes.button)}
                aria-label="Edit"
                size="large"
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className={classes.button}
                aria-label="Delete"
                size="large"
                onClick={() => {
                  console.log(`rowsDeleted2222 = ${tableMeta.rowData[0]}`);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
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
    searchOpen: true,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <Tooltip title="Add New">
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/app/Pages/MainData/CreateJob`);
          }}
          color="secondary"
          className={classes.button}
        >
          <AddIcon />
          Add new
        </Button>
      </Tooltip>
    ),
  };

  const { classes } = useStyles();

  return (
    <div className={classes.table}>
      <MUIDataTable
        title={title ?? ''}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default EmployeeList;
