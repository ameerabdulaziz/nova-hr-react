import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { getCheckboxIcon } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/PayTemplateData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function PayTemplateList(props) {
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
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },

    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },

    {
      name: 'calcInsuranceWithThisTemplate',
      label: intl.formatMessage(messages.calcInsuranceWithThisTemplate),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: 'rptDetails',
      label: intl.formatMessage(messages.rPT_details),
    },
    {
      name: 'smsmsg',
      label: intl.formatMessage(messages.sMSMSG),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.payroll.PayTemplateCreate.route,
    },
    edit: {
      url: SITEMAP.payroll.PayTemplateEdit.route,
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

PayTemplateList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PayTemplateList);
