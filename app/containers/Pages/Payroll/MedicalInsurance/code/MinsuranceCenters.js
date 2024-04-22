/* eslint-disable no-unused-vars */
import { PapperBlock } from 'enl-components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import MinsuranceCentersData from '../api/MinsuranceCentersData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function MinsuranceCenters() {
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
      name: 'phone',
      label: 'MedicalCenterPhoneNumber',
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
    <>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.root}>
          <EditTable
            anchorTable={anchorTable}
            title={title}
            API={MinsuranceCentersData()}
          />
        </div>
      </PapperBlock>
    </>
  );
}

export default injectIntl(MinsuranceCenters);
