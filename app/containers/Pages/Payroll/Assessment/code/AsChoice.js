
import { PapperBlock } from 'enl-components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import AsChoiceData from '../api/AsChoiceData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function AsChoice() {
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
      name: 'choiceGrade',
      label: 'choiceGrade',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'fromPer',
      label: 'from',
      type: 'number',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'toPer',
      label: 'to',
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
    <>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.root}>
          <EditTable
            anchorTable={anchorTable}
            title={title}
            API={AsChoiceData()}
          />
        </div>
      </PapperBlock>
    </>
  );
}

export default injectIntl(AsChoice);
