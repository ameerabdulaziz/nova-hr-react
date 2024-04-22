
import { PapperBlock } from 'enl-components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import GovernmentData from '../api/GovernmentData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function Government() {
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
      name: 'generalCode',
      label: 'generalCode',
      type: 'number',
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
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <div className={classes.root}>
          <EditTable
            anchorTable={anchorTable}
            title={title}
            API={GovernmentData()}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Government);
