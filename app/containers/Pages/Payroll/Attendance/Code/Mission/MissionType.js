/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../../../../../../components/Tables/messages';
import payrollMessages from '../../../messages';
import { EditTable } from '../../../../../Tables/demos';
import MissionTypeData from '../../api/MissionTypeData';

import PayrollTable from '../../../Component/PayrollTable';
import api from '../../api/MissionTypeData';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function MissionType(props) {
  const title = localStorage.getItem('MenuName');
  const { classes } = useStyles();
  const { intl } = props;

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageTitle = localStorage.getItem('MenuName');
  const locale = useSelector((state) => state.language.locale);

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
      type: 'static',
      initialValue: '',
      hidden: false,
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
      name: 'transportaion',
      label: 'transportaion',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },

    {
      name: 'reqAfterDays',
      label: 'ReqAfterDays',
      type: 'number',
      initialValue: 0,
      width: 'auto',
      hidden: false,
    },

    {
      name: 'reqBeforeDays',
      label: 'ReqBeforeDays',
      type: 'number',
      initialValue: 0,
      width: 'auto',
      hidden: false,
    },

    {
      name: 'reqInSameDay',
      label: 'ReqInSameDay',
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


  const columns = [
    {
      name: 'id',
      // label: "id",
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'arName',
      // label: "arName",
      label: intl.formatMessage(payrollMessages.arName),
    },
    {
      name: 'enName',
      // name: 'label',
      label: intl.formatMessage(payrollMessages.enName),
    },
    {
      name: 'transportaion',
      // label: "phone",
      label: intl.formatMessage(messages.transportaion),
    },
    {
      name: 'reqAfterDays',
      // label: "email",
      label: intl.formatMessage(messages.ReqAfterDays),
    },
    {
      name: 'reqBeforeDays',
      // label: "email",
      label: intl.formatMessage(messages.ReqBeforeDays),
    },
    {
      name: 'reqInSameDay',
      // label: "email",
      label: intl.formatMessage(messages.ReqInSameDay),
    },
    // {
    //   name: 'action',
    //   // label: "email",
    //   label: intl.formatMessage(messages.action),
    // },
  ];

  const actions = {
    // add: {
    //   url: '/app/Pages/Att/MissionTypeCreate',
    // },
    // edit: {
    //   url: '/app/Pages/MainData/GuarantorEdit',
    // },
    // delete: {
    //   api: deleteRow,
    // },
  };


  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const data = await api(locale).GetList();

      console.log("data =", data);
      

      setDataTable(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchNeededData();
  }, []);

  return (
    <div>
      <PapperBlock whiteBg icon="border_color"  desc="">
        <div className={classes.root}>
          {/* <EditTable
            anchorTable={anchorTable}
            title={title}
            API={MissionTypeData()}
          /> */}

          <PayrollTable
            isLoading={isLoading}
            showLoader
            title={pageTitle}
            data={dataTable}
            columns={columns}
            actions={actions}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(MissionType);
