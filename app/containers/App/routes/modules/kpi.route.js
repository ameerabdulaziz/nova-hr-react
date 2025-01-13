import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const UploadFileWithKPI = loadable(
  () => import('../../../Pages/Payroll/KPI/UploadFileWithKPI'),
  {
    fallback: <Loading />,
  }
);

const KpiData = loadable(() => import('../../../Pages/Payroll/KPI/KpiData'), {
  fallback: <Loading />,
});

const KPI_LOB_Report = loadable(
  () => import('../../../Pages/Payroll/KPI/Reports/KPI_LOB_Report'),
  {
    fallback: <Loading />,
  }
);

const KPI_SupervisorReport = loadable(
  () => import('../../../Pages/Payroll/KPI/Reports/KPI_SupervisorReport'),
  {
    fallback: <Loading />,
  }
);

const kpi = {
  KPI_LOB_Report,
  KPI_SupervisorReport,
  KpiData,
  UploadFileWithKPI,
};

export default kpi;
