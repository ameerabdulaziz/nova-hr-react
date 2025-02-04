import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import hrResignRuleData from '../api/hrResignRuleData';
import Payrollmessages from "../../messages";
import messages from "../messages";
import SITEMAP from '../../../../App/routes/sitemap';

function hrResignRule({ intl }) {
  const menuName = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const data = await hrResignRuleData(locale).GetList();

      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(Payrollmessages.code),
    },
    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
    },
    {
      name: 'arName',
      label: intl.formatMessage(Payrollmessages.arName),
    },
    {
       name: 'firstYear',
        label: intl.formatMessage(messages.firstYear),
    },
    {
      name: 'from2To5',
       label: intl.formatMessage(messages.between2To5Years),
    },
    {
     name: 'more5',
      label: intl.formatMessage(messages.moreThan5Years),
    },
    {
     name: 'maxYear',
      label: intl.formatMessage(messages.SettlementYears),
    },
  ];

  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await hrResignRuleData().Delete(id);

      toast.success(notif.saved);
      getdata();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const actions = {
    add: {
      url: SITEMAP.humanResources.HrResignRuleCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.HrResignRuleEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };

  return (
    <SimplifiedPayrollTable
      isLoading={isLoading}
      showLoader
      title={menuName}
      data={dataTable}
      columns={columns}
      actions={actions}
    />
  );
}

hrResignRule.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(hrResignRule);
