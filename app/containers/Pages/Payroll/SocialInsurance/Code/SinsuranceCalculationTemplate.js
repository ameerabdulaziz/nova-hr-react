import notif from 'enl-api/ui/notifMessage';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import api from '../api/SinsuranceCalculationTemplateData';
import payrollMessages from '../../messages';
import messages from '../../../../../components/Tables/messages';
import SITEMAP from '../../../../App/routes/sitemap';
import { getCheckboxIcon } from "../../helpers";


function SinsuranceCalculationTemplate(props) {

  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);


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

  const deleteRow = async (id) => {    
    setIsLoading(true);

    try {
      await api(locale).Delete({id:id});

      toast.success(notif.saved);

      fetchTableData();
    } catch (err) {
      //      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      // options: {
      //   filter: false,
      //   display: false,
      //   print: false,
      // },
    },
    {
      name: 'name',
      label: intl.formatMessage(payrollMessages.arName),
    },

    {
      name: 'EnName',
      label: intl.formatMessage(payrollMessages.enName),
    },

    {
      name: 'salaryLimit',
      label: intl.formatMessage(messages.salaryLimit),
    },

    {
      name: 'companyShare',
      label: intl.formatMessage(messages.companyShare),
    },
    {
      name: 'employeeShare',
      label: intl.formatMessage(messages.employeeShare),
    },
    {
      name: 'newSalaryLimit',
      label: intl.formatMessage(messages.newSalaryLimit),
    },
    {
      name: 'isPercentage',
      label: intl.formatMessage(messages.isPercentage),
      options: {
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.socialInsurance.SinsuranceCalculationTemplateCreate.route,
    },
    edit: {
      url: SITEMAP.socialInsurance.SinsuranceCalculationTemplateEdit.route,
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
          data={tableData}
          columns={columns}
          actions={actions}
        />
  );
}

export default injectIntl(SinsuranceCalculationTemplate);
