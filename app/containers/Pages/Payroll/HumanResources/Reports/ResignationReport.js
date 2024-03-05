import { Print } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef, useState
} from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ResignationReportData';
import PrintableRow from '../components/ResignationReport/PrintableRow';
import messages from '../messages';

function ResignationReport(props) {
  const { intl } = props;

  const Title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [statusList, setStatusList] = useState([]);
  const [resignList, setResignList] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [dateError, setDateError] = useState({});

  const [printRow, setPrintRow] = useState(null);
  const documentTitle = Title + ' ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const printDivRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    statusId: null,
    resignReasonId: null,
  });

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    documentTitle,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const onPrintBtnClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await api(locale).print(id);
      setPrintRow(response);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      const formData = {
        ...formInfo,
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
      };

      const dataApi = await api(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const status = await GeneralListApis(locale).GetActionByDocList(9);
      setStatusList(status);

      const resigns = await GeneralListApis(locale).GetResignReasonList();
      setResignList(resigns);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      label: intl.formatMessage(payrollMessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'date',
      label: intl.formatMessage(messages.resignationDate),
    },

    {
      name: 'lworkingDay',
      label: intl.formatMessage(messages.lastWorkingDay),
      options: {
        customBodyRender: (value) => formateDate(value),
      },
    },

    {
      name: 'resignReasonName',
      label: intl.formatMessage(messages.reason),
    },

    {
      name: 'statusName',
      label: intl.formatMessage(payrollMessages.status),
    },

    {
      name: 'print',
      label: intl.formatMessage(payrollMessages.Print),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (_, tableMeta) => (
          <IconButton onClick={() => onPrintBtnClick(tableMeta.rowData[0])}>
            <Print sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        ),
      },
    },
  ];

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
          },
          '@page': {
            margin: 4,
          },
        }}
      >
        {printRow && <PrintableRow rowData={printRow} />}
      </Box>

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                DateError={dateError}
                setDateError={setDateError}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={statusList}
                value={getAutoCompleteValue(statusList, formInfo.statusId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'statusId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.status)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={resignList}
                value={getAutoCompleteValue(resignList, formInfo.resignReasonId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'resignReasonId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.resignReasonName)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PayrollTable title='' data={tableData} columns={columns} />
    </PayRollLoader>
  );
}

ResignationReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResignationReport);
