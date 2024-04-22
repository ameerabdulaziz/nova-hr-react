/* eslint-disable no-unused-vars */
import { PapperBlock } from 'enl-components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import MinsuranceCategoryData from '../api/MinsuranceCategoryData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function MinsuranceCategory() {
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
      name: 'employeeShare',
      label: 'employeeShare',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'familyMemberValue',
      label: 'familyMemberValue',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'cmpShare',
      label: 'companyShare',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    // {
    //   name: 'registrationPrice',
    //   label: 'registrationPrice',
    //   type: 'text',
    //   initialValue: '',
    //   width: 'auto',
    //   hidden: false,
    // },
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
            API={MinsuranceCategoryData()}
          />
        </div>
      </PapperBlock>
    </>
  );
}

export default injectIntl(MinsuranceCategory);
