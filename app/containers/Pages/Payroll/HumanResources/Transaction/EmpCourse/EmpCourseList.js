import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayrollTable from '../../../Component/PayrollTable';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/EmpCourseData';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function EmpCourseList(props) {
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
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'courseName',
      label: intl.formatMessage(messages.courseName),
    },
    {
      name: 'startDate',
      label: intl.formatMessage(Payrollmessages.fromdate),
    },
    {
      name: 'finishDate',
      label: intl.formatMessage(Payrollmessages.todate),
    },
    {
      name: 'CourseCost',
      label: intl.formatMessage(Payrollmessages.price),
    },
    {
      name: 'notes',
      label: intl.formatMessage(Payrollmessages.notes),
      options: {
        noWrap: true,
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.EmpCourseCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.EmpCourseEdit.route,
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

EmpCourseList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmpCourseList);
