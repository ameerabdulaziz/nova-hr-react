/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
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
  const description = brand.desc;
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
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
