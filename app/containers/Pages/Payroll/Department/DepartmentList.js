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
import DepartmentApis from '../api/DepartmentApis'

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  }
}));

function Department() {
  const title = brand.name + ' - Department';
  const description = brand.desc;
  const {classes} = useStyles();

  

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  },  
  {
    name: 'Department_ID',
    label: 'DeptId',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    initialValue: 'dept1',
    width: 'auto',
    hidden: false
  },
   {
    name: 'Department_Name',
    label: 'Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: true
  },
  {
    name: 'Department_NameEn',
    label: 'En Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },  {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
]; 

/*const dataApi = [
  {Department_ID: 1, Department_Name: 'ادارة الخدمات gg', Department_NameEn: 'ادارة الخدمات ggg', InsDate: '2022-08-01T00:00:00', id: 1,name  : "ادارة الخدمات gg"}
,
{Department_ID: 2, Department_Name: 'ادارة الشركة', Department_NameEn: 'ادارة الشركة', InsDate: '2022-07-04T00:00:00', id: 2,name  : "ادارة الخدمات gg"}
,
{Department_ID: 3, Department_Name: 'ادارة داركوف', Department_NameEn: 'ادارة داركوف', InsDate: '2022-06-01T00:00:00', id: 3,name  : "ادارة الخدمات gg"}
,
{Department_ID: 4, Department_Name: 'ادارة سعادة', Department_NameEn: 'ادارة سعادة', InsDate: '2022-08-04T00:00:00', id: 4,name  : "ادارة الخدمات gg"}
,
{Department_ID: 5, Department_Name: 'noha', Department_NameEn: 'jghg', InsDate: '2022-02-12T00:00:00', id: 5,name  : "ادارة الخدمات gg"}
,
{Department_ID: 6, Department_Name: 'الدعم الفنى', Department_NameEn: 'الدعم الفنى', InsDate: '2022-01-05T00:00:00', id: 6,name  : "ادارة الخدمات gg"}
,
{Department_ID: 8, Department_Name: 'dddd', Department_NameEn: 'ffffff', InsDate: '2023-06-06T16:59:03.7129482', id: 8,name  : "ادارة الخدمات gg"}
,
{Department_ID: 9, Department_Name: 'dept2', Department_NameEn: 'dept2', InsDate: '2023-06-06T16:59:03.7129482', id: 9,name  : "ادارة الخدمات gg"}
,
{Department_ID: 33, Department_Name: 'dept1', Department_NameEn: 'fffff', InsDate: '2023-06-06T16:59:03.7129482', id: 33,name  : "ادارة الخدمات gg"}
,
{Department_ID: 99, Department_Name: 'dept1', Department_NameEn: 'kkkkk', InsDate: '2023-06-06T16:59:03.7129482', id: 99,name  : "ادارة الخدمات gg"}
];*/
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
        
          <EditTable   anchorTable={anchorTable}  title={"Department Data"}  API={DepartmentApis()}/>
         
        </div>
      </PapperBlock>
    </div>
  );
}



export default injectIntl(Department);
