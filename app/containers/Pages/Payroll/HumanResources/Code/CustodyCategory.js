import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { PapperBlock } from 'enl-components';

import { EditTable } from '../../../../Tables/demos';
import CustodyCategoryApis from '../api/CustodyCategoryData';
//import messages from '../messages';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function CustodyCategory(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');
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
      width: 'auto',
      hidden: false,
      initialValue: '',
    },
    {
      name: 'enName',
      label: 'enname',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,

    },
    {
      name: 'jobName',
      label: 'job',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'jobId',
      label: 'id',
      type: 'text',
      width: 'auto',
      hidden: true,
    },
    {
      name: 'receiverJobInResignation',
      label: 'receiverJobInResignation',
      type: 'text',
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
      <PapperBlock whiteBg icon="border_color" title={title ?? ''} desc="">
        <div className={classes.root}>
          {
            <EditTable
              anchorTable={anchorTable}
              title={title}
              API={CustodyCategoryApis(locale)}
            />
          }
        </div>
      </PapperBlock>
    </div>
  );
}
CustodyCategory.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CustodyCategory);
