/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { EditTable } from '../../../../Tables/demos';
import TrainingCenterData from '../api/TrainingCenterData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function TrainingCenter() {
  const title = localStorage.getItem("MenuName");
  const { classes } = useStyles();

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'name',
      label: 'name',
      type: 'text',
      initialValue: '',
      width: 'auto',
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
      name: 'phone',
      label: 'phone',
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
            title={'TrainingCenter Data'}
            API={TrainingCenterData()}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(TrainingCenter);
