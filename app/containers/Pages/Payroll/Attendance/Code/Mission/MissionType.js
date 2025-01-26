/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import messages from '../../../../../../components/Tables/messages';
import payrollMessages from '../../../messages';
import PayrollTable from '../../../Component/PayrollTable';
import api from '../../api/MissionTypeData';
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import SITEMAP from '../../../../../App/routes/sitemap';

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

  
  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'arName',
      label: intl.formatMessage(payrollMessages.arName),
    },
    {
      name: 'enName',
      label: intl.formatMessage(payrollMessages.enName),
    },
    {
      name: 'transportaion',
      label: intl.formatMessage(messages.transportaion),
    },
  ];


  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const data = await api(locale).GetList();

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


  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).Delete(id);

      toast.success(notif.saved);
      fetchNeededData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  const actions = {
    add: {
      url: SITEMAP.attendance.MissionTypeCreate.route,
    },
    edit: {
      url: SITEMAP.attendance.MissionTypeEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  return (
    <div>
        <div className={classes.root}>
          <PayrollTable
            isLoading={isLoading}
            showLoader
            title={pageTitle}
            data={dataTable}
            columns={columns}
            actions={actions}
          />
        </div>
    </div>
  );
}

export default injectIntl(MissionType);
