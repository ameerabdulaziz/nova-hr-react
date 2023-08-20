import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';

import { EditTable } from '../../../../Tables/demos';
import Apis from '../api/OrganizationManagerData';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function OrganizationManager(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem("MenuName");
  const description = brand.desc;
  const { classes } = useStyles();

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
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
      name: 'employeeName',
      label: 'employeeName',
      type: 'selection',
      initialValue: '',
      options: [],
      orignaldata:[],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'employeeId',
      label: 'id',
      type: 'number',
      initialValue: '0',
      width: 'auto',
      hidden: true,
    },
    {
        name: 'newEmployeeName',
        label: 'newEmployeeName',
        type: 'selection',
        initialValue: '',
        options: [],
        orignaldata:[],
        width: 'auto',
        hidden: false,
      },
  
      {
        name: 'newEmployeeId',
        label: 'id',
        type: 'number',
        initialValue: '0',
        width: 'auto',
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
      <PapperBlock whiteBg icon="border_color" title={title??""} desc={""}>
        <div className={classes.root}>
          {
            <EditTable
              anchorTable={anchorTable}
              title={title}
              API={Apis(locale)}
              isNotAdd={true}
            />
          }
        </div>
      </PapperBlock>
    </div>
  );
}
OrganizationManager.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(OrganizationManager);

