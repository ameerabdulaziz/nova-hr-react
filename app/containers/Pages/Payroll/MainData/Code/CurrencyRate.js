import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { EditTable } from '../../../../Tables/demos';
import CurrencyRateApis from '../api/CurrencyRateData';
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function CurrencyRate() {
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');
  const description = brand.desc;
  const { classes } = useStyles();

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
    // {
    //       name: 'name',
    //       label: 'ArName',
    //       type: 'text',
    //       width: 'auto',
    //       hidden: false,
    //     },
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
      name: 'yearName',
      label: 'year',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },
    {
      name: 'monthName',
      label: 'month',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },
    {
      name: 'rate',
      label: 'rate',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'currencyId',
      label: 'code',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'yearId',
      label: 'code',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'monthId',
      label: 'code',
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
          {
            <EditTable
              anchorTable={anchorTable}
              title={title ?? ''}
              API={CurrencyRateApis(locale)}
            />
          }
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(CurrencyRate);
