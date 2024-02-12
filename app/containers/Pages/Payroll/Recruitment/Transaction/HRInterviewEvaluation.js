import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import api from '../api/HRInterviewEvaluationData';
import RowDropdown from '../components/HRInterviewEvaluation/RowDropdown';
import messages from '../messages';

function HRInterviewEvaluation(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicationDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrStatus),
    },

    {
      name: 'techStatus',
      label: intl.formatMessage(messages.technicalStatus),
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return '';
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              onSendRejectMailBtnClick={onSendRejectMailBtnClick}
            />
          );
        },
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

HRInterviewEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HRInterviewEvaluation);
