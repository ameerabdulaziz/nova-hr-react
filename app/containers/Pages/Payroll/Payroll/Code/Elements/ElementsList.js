import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import Payrollmessages from '../../../messages';
import messages from "../../messages";
import ApiData from '../../api/ElementsData';

function ElementsList(props) {
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
  useEffect(() => {
    fetchData();
  }, []);

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  const ElemType = (value) => {
    return (
      <div>
        {value==1 ? (
          intl.formatMessage(messages.Allowance)
        ) : (
          intl.formatMessage(messages.Deduct)
        )}
      </div>
    );
  };
  const CalcMethod = (value) => {
    return (
      <div>
        {value==1 ? (
          intl.formatMessage(messages.Value)
        ) : (
          intl.formatMessage(messages.Percentage)
        )}
      </div>
    );
  };
  
  const ElementMode = (value) => {
    return (
      <div>
        {value==1 ? (
          intl.formatMessage(messages.constant)
        ) : (
          intl.formatMessage(messages.variable)
        )}
      </div>
    );
  };
  
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
      options: {
        filter: true,
      },
    },

    {
      name: 'enName',
      label: intl.formatMessage(Payrollmessages.enName),
      options: {
        filter: true,
      },
    },
    {
      name: 'elementTypeId',
      label: intl.formatMessage(Payrollmessages.type),
      options: {
        filter: true,
        customBodyRender: (value) => ElemType(value),
      },
    },
    {
      name: 'elementCalcMethodId',
      label: intl.formatMessage(messages.CalcMethod),
      options: {
        filter: true,
        customBodyRender: (value) => CalcMethod(value),
      },
    },
    {
      name: 'elementModeId',
      label: intl.formatMessage(messages.elementMode),
      options: {
        filter: true,
        customBodyRender: (value) => ElementMode(value),
      },
    },
  ];

  const actions = {
    add: {
      url: '/app/Pages/Payroll/ElementsCreate',
    },
    edit: {
      url: '/app/Pages/Payroll/ElementsEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={data}
      columns={columns}
      actions={actions}
    />
  );
}

ElementsList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ElementsList);
