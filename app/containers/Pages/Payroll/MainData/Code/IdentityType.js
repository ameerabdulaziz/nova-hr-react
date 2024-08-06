
import { PapperBlock } from 'enl-components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import IdentityTypeData from '../api/IdentityTypeData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function IdentityType() {
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
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'expiredPeriod',
      label: 'expirePeriod',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },

    {
      name: 'validLength',
      label: 'validLength',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'isCharcter',
      label: 'isCharcter',
      type: 'toggle',
      initialValue: false,
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
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <div className={classes.root}>
          <EditTable
            anchorTable={anchorTable}
            title={title}
            API={IdentityTypeData()}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(IdentityType);
