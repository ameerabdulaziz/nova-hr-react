import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import { ServerURL } from '../../api/ServerConfig';
import payrollMessages from '../../messages';
import api from '../api/JobDataBankData';
import messages from '../messages';

function JobDataBank(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [openedDropdown, setOpenedDropdown] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
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

  const onDropdownClose = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const onSaveBtnClick = async (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;

    setIsLoading(true);

    try {
      await api(locale).save(id);
    } catch (error) {
      //
    } finally {
      fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.candidateName),
      options: {
        filter: true,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
      options: {
        filter: true,
      },
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{formateDate(value)}</pre>),
      },
    },

    {
      name: 'dataBnkJobName',
      label: intl.formatMessage(messages.jobName),
      options: {
        filter: true,
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          return (
            <div>
              <IconButton
                onClick={(evt) => {
                  setOpenedDropdown((prev) => ({
                    ...prev,
                    [tableMeta.rowIndex]: evt.currentTarget,
                  }));
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={openedDropdown[tableMeta.rowIndex]}
                open={Boolean(openedDropdown[tableMeta.rowIndex])}
                onClose={() => onDropdownClose(tableMeta.rowIndex)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => onSaveBtnClick(tableMeta.rowIndex)}>
                  <ListItemIcon>
                    <SystemUpdateAltIcon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText>
                    {intl.formatMessage(payrollMessages.save)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  component='a'
                  target='_blank'
                  disabled={!row.cVfile}
                  href={ServerURL + 'Doc/CVDoc/' + row.cVfile}
                  onClick={() => onDropdownClose(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <DownloadIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    {intl.formatMessage(messages.downloadCV)}
                  </ListItemText>
                </MenuItem>
              </Menu>
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
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: 'none',
    searchOpen: false,
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=''
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

JobDataBank.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobDataBank);
