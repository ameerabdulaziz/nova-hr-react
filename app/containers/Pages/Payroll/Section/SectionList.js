import React, { useState, useEffect,useCallback }  from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import {PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import messages from '../../../Tables/messages';
import { EditTable } from '../../../Tables/demos';
import { useSelector, useDispatch } from 'react-redux';
import SectionApis from '../api/SectionApis'

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  }
}));

function Section() {
  const title = brand.name + ' - Section';
  const description = brand.desc;
  const {classes } = useStyles();

  let anchorTable = [
    {
      name: 'id',
      label: 'Id',
      type: 'static',
      initialValue: '',
      hidden: true
    }, 
    {
      name: 'Section_ID',
      label: 'Section_ID',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false
    },    
    {
      name: 'Department_Name',
      label: 'Department_Name',      
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false
    }, 
    {
      name: 'Department_ID',
      label: 'Department_ID',      
      type: 'text',      
      width: 'auto',
      hidden: true
    },          
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      initialValue: 'section in dep2',
      width: 'auto',
      hidden: false
    },
    {
      name: 'Section_NameEn',
      label: 'En Name',
      type: 'text',
      initialValue: 'section in dep2',
      width: 'auto',
      hidden: false
    },
    {
      name: 'Section_Name',
      label: 'Name',
      type: 'text',
      initialValue: 'section in dep2',
      width: 'auto',
      hidden: true
    },
    {
      name: 'Br_code',
      label: 'Br_code',
      type: 'text',
      initialValue: '1',
      width: 'auto',
      hidden: true
    },
    {
      name: 'Cmp_code',
      label: 'Cmp_code',
      type: 'text',
      initialValue: '1',
      width: 'auto',
      hidden: true
    },
    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true
    }, 
    {
      name: 'action',
      label: 'Action',
      type: 'static',
      initialValue: '',
      hidden: false
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
      <PapperBlock
        whiteBg
        icon="border_color"
        title=""
        desc=""
      >   
        <div className={classes.root}>
         {
          <EditTable  anchorTable={anchorTable}   title={"Section Data"}  API={SectionApis()}/>
         }
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Section);
