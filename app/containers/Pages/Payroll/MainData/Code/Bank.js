/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../../../../Tables/messages';
import { EditTable } from '../../../../Tables/demos';
import BankData from '../api/BankData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function Bank() {
  const title = localStorage.getItem('MenuName');
  const { classes } = useStyles();

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
      type: 'static',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'name',
      label: 'name',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },
    {
      name: 'EnName',
      label: 'enname',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'address',
      label: 'address',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'accNo',
      label: 'accno',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'note',
      label: 'note',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
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
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.root}>
          <EditTable
            anchorTable={anchorTable}
            title={title ?? ''}
            API={BankData()}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Bank);
