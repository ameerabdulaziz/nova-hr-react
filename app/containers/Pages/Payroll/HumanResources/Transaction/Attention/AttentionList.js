import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import payrollMessages from '../../../messages';
import ApiData from '../../api/AttentionData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';

function AttentionList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

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

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      name: 'attentionDate',
      label: intl.formatMessage(messages.date),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'reason',
      label: intl.formatMessage(messages.reason),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.AttentionCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.AttentionEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

AttentionList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AttentionList);
