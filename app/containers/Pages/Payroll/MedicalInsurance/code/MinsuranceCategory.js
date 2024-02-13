/* eslint-disable no-unused-vars */
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import React from 'react';
import { Helmet } from 'react-helmet';
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
            API={MinsuranceCategoryData()}
          />
        </div>
      </PapperBlock>
    </>
  );
}

export default injectIntl(MinsuranceCategory);
