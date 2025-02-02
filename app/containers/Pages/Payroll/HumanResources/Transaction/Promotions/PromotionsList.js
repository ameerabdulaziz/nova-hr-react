import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../../helpers';
import ApiData from '../../api/PromotionsData';
import messages from '../../messages';
import payrollMessages from '../../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';

function PromotionsList(props) {
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
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'date',
      label: intl.formatMessage(messages.date),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'promotionDate',
      label: intl.formatMessage(messages.actualPromotionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.actualPromotionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'decisionDate',
      label: intl.formatMessage(messages.decisionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.decisionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'job',
      label: intl.formatMessage(messages.oldJob),
    },
    {
      name: 'oldElemVal',
      label: intl.formatMessage(messages.oldElemVal),
    },
    {
      name: 'newJob',
      label: intl.formatMessage(messages.job),
    },
    {
      name: 'elemVal',
      label: intl.formatMessage(messages.value),
    },
    {
      name: 'reason',
      label: intl.formatMessage(messages.reason),
      options: {
        noWrap: true,
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.PromotionsCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.PromotionsEdit.route,
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

PromotionsList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PromotionsList);
