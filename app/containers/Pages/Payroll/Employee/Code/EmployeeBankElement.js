/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../../../../Tables/messages';
import { EditTable } from '../../../../Tables/demos';
import EmployeeBankElementData from '../api/EmployeeBankElementData';

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
      name: 'elementName',
      label: 'elementName',
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
