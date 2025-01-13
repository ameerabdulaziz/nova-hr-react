import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import ApiData from '../../api/PenaltyData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function PenaltyList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);

    try {
      const dataApi = await ApiData(locale).GetPenaltyList();
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
      //
    } finally {
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
      name: 'enName',
      label: intl.formatMessage(messages.enName),
    },
    {
      name: 'arName',
      label: intl.formatMessage(messages.arName),
    },
    {
      name: 'elementName',
      label: intl.formatMessage(messages.elementName),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.PenaltyCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.PenaltyEdit.route,
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

PenaltyList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PenaltyList);
