import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/NewsData';
import SITEMAP from '../../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';

function NewsList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);

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
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'fromDate',
      label: intl.formatMessage(Payrollmessages.fromdate),
      options: getDateColumnOptions(
        intl.formatMessage(Payrollmessages.fromdate),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },
    {
      name: 'toDate',
      label: intl.formatMessage(Payrollmessages.todate),
      options: getDateColumnOptions(
        intl.formatMessage(Payrollmessages.todate),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },
    {
      name: 'header',
      label: intl.formatMessage(Payrollmessages.title),
    },
    {
      name: 'details',
      label: intl.formatMessage(Payrollmessages.details),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'newsTypeName',
      label: intl.formatMessage(Payrollmessages.type),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.NewsCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.NewsEdit.route,
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

NewsList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(NewsList);
