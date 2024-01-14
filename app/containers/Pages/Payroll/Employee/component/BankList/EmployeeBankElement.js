/* eslint-disable no-unused-vars */
import React from 'react';
import { injectIntl } from 'react-intl';
import { EditTable } from '../../../../../Tables/demos';
import EmployeeBankElementData from '../../api/EmployeeBankElementData';

function EmployeeBankElement(props) {
  const { ids } = props;

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'EmpBankId',
      label: 'code',
      type: 'text',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'templateName',
      label: 'templateName',
      type: 'selection',
      // type: 'text',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'elementId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'currencyName',
      label: 'currency',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'currencyId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  return (
    <div>
      <EditTable
        anchorTable={anchorTable}
        title={ids.toString()}
        API={EmployeeBankElementData(ids)}
        IsNotSave={true}
      />
    </div>
  );
}

export default injectIntl(EmployeeBankElement);
