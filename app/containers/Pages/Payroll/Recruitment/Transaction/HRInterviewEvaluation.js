import EditIcon from '@mui/icons-material/Create';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/HRInterviewEvaluationData';
import messages from '../messages';

function HRInterviewEvaluation(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
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

  const onUpdateStatusBtnClick = (id) => {
    history.push('/app/Pages/Recruitment/HRInterviewEvaluationEdit', {
      id,
    });
  };

  const onSendRejectMailBtnClick = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).SendRejectionMail(id);
      toast.success(notif.sent);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);

      await fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
      options: {
        filter: true,
      },
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: {
        filter: true,
        customBodyRender: formateDate,
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
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'techStatus',
      label: intl.formatMessage(messages.technicalStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'Actions',
      label: intl.formatMessage(payrollMessages.Actions),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];
          const isSendMailDisabled = row.mailSend
            || (row.appFirstStatus !== 2
            && row.techStatus !== 2
            && row.secStatus !== 2);

          return (
            <Grid container>
              <Grid item>
                <IconButton onClick={() => onUpdateStatusBtnClick(row.id)}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton
                  onClick={() => onSendRejectMailBtnClick(row.id)}
                  disabled={isSendMailDisabled}
                >
                  <UnsubscribeIcon fontSize='small' />
                </IconButton>
              </Grid>
            </Grid>
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

HRInterviewEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HRInterviewEvaluation);
