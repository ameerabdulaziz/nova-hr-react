import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import ExceptionVacDaysData from '../api/ExceptionVacDaysData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function ExceptionVacDays() {
  const title = localStorage.getItem('MenuName');
  const description = brand.desc;
  const { classes } = useStyles();

  const locale = useSelector(state => state.language.locale);

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
      type: 'static',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'arName',
      label: 'arName',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'enName',
      label: 'enName',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'expDate',
      label: 'expDate',
      type: 'date',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },

    {
      name: 'branchName',
      label: 'branchName',
      type: 'selection',
      initialValue: '',
      options: [],
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
    <>
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
            title={title}
            API={ExceptionVacDaysData(locale)}
          />
        </div>
      </PapperBlock>
    </>
  );
}

export default injectIntl(ExceptionVacDays);
