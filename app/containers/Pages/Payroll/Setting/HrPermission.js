import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PapperBlock } from 'enl-components';
import css from 'enl-styles/Table.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import OrganizationTree from '../Component/OrganizationTree/Tree';
import OrganizationTreePopup from '../Component/OrganizationTree/TreePopup';
import PayRollLoader from '../Component/PayRollLoader';
import useStyles from '../Style';
import GeneralListApis from '../api/GeneralListApis';
import payrollMessages from '../messages';
import api from './api/HrPermissionData';
import messages from './messages';
import NameList from "../Component/NameList";

function HrPermission(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [query, setQuery] = useState('');
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [employee, setEmployee] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [NotAllowedEmps, setNotAllowedEmployeesData] = useState([]);
  const [notAllowedEmployeesList, setNotAllowedEmployeesList] = useState([]);
  const [notAllowedPayrollEmployeesList, setNotAllowedPayrollEmployeesList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const [isLoading, setIsLoading] = useState(true);
  const [isTreePopupOpen, setIsTreePopupOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [tree, setTree] = useState(OrganizationTree.buildTreeFromArray(null));

  const Title = localStorage.getItem('MenuName');

  const onAllCheckboxChange = (event) => {
    setDataList(
      dataList.map((item) => {
        if (filteredData.includes(item)) {
          if (event.target.name == 'AllPermission') {
            item.isSubmitPermission = event.target.checked;
          } else if (event.target.name == 'AllMission') {
            item.isSubmitMission = event.target.checked;
          } else if (event.target.name == 'AllVacation') {
            item.isSubmitVacation = event.target.checked;
          } else if (event.target.name == 'AllPenalty') {
            item.isSubmitPenalty = event.target.checked;
          } else if (event.target.name == 'AllOvertime') {
            item.isSubmitOverTime = event.target.checked;
          } else if (event.target.name == 'AllReward') {
            item.isSubmitReward = event.target.checked;
          } else if (event.target.name == 'AllSelect') {
            item.isSelected = event.target.checked;
          } else if (event.target.name == 'AllUniformTrx') {
            item.isSubmitUniformTrx = event.target.checked;
          } else if (event.target.name == 'AllLoan') {
            item.isSubmitLoan = event.target.checked;
          } else if (event.target.name == 'AllResign') {
            item.isSubmitResign = event.target.checked;
          }
        }

        return item;
      })
    );
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const applyFilters = (data, query) => {
    let filteredData = data;

    if (query.length !== 0) {
      filteredData = filteredData.filter((item) => item.organizationName
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase())
      );
    }

    return filteredData;
  };

  const applyPagination = (dataList, page, limit) => {
    let result = [];
    if (dataList && dataList.length !== 0) {
      result = dataList.slice(page * limit, page * limit + limit);
    }

    return result;
  };

  const onSingleCheckboxSelect = (event, row) => {
    setDataList(
      dataList.map((item) => {
        if (item.organizationId === row.organizationId) {
          if (event.target.name === 'isSubmitPermission') {
            item.isSubmitPermission = event.target.checked;
          } else if (event.target.name === 'isSubmitMission') {
            item.isSubmitMission = event.target.checked;
          } else if (event.target.name === 'isSubmitVacation') {
            item.isSubmitVacation = event.target.checked;
          } else if (event.target.name === 'isSubmitPenalty') {
            item.isSubmitPenalty = event.target.checked;
          } else if (event.target.name === 'isSubmitOverTime') {
            item.isSubmitOverTime = event.target.checked;
          } else if (event.target.name === 'isSubmitReward') {
            item.isSubmitReward = event.target.checked;
          } else if (event.target.name === 'isSelected') {
            item.isSelected = event.target.checked;
          } else if (event.target.name === 'isSubmitUniformTrx') {
            item.isSubmitUniformTrx = event.target.checked;
          } else if (event.target.name === 'isSubmitLoan') {
            item.isSubmitLoan = event.target.checked;
          } else if (event.target.name === 'isSubmitResign') {
            item.isSubmitResign = event.target.checked;
          }
        }

        return item;
      })
    );
  };

  const filteredData = applyFilters(dataList, query);

  const paginatedData = applyPagination(filteredData, page, limit);

  async function onSaveBtnClick() {
    if (!employee) {
      toast.error(intl.formatMessage(messages.pleaseSelectEmployee));
      return;
    }

    try {
      setIsLoading(true);

      await api(locale).save({
        employee,
        dataList: dataList.map((item) => ({
          isSelected: item.isSelected,
          isSubmitMission: item.isSubmitMission,
          isSubmitOverTime: item.isSubmitOverTime,
          isSubmitPenalty: item.isSubmitPenalty,
          isSubmitPermission: item.isSubmitPermission,
          isSubmitReward: item.isSubmitReward,
          isSubmitUniformTrx: item.isSubmitUniformTrx,
          isSubmitLoan: item.isSubmitLoan,
          isSubmitVacation: item.isSubmitVacation,
          isSubmitResign: item.isSubmitResign,
          organizationId: item.organizationId,
          organizationName: item.organizationName,
        })),
      });
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const fetchTableData = async () => {
    if (!employee) {
      setDataList([]);
      setNotAllowedPayrollEmployeesList([])
      setNotAllowedEmployeesList([])
      return;
    }

    try {
      setIsLoading(true);

      const NotAllowedEmps = await api(locale).GetNotAllowedEmpsList(employee);

      setNotAllowedEmployeesData(NotAllowedEmps)

    // add isSelected into api data
      setNotAllowedEmployeesList(
        NotAllowedEmps.notAllowedEmployeeList.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        })
      );

      // add isSelected into api data
      setNotAllowedPayrollEmployeesList(
        NotAllowedEmps.notAllowedPayrollEmployeeList.map((obj) => {
          return {
            ...obj,
            isSelected: true,
          };
        })
      );


      const data = await api(locale).getList(employee);
      setDataList(data || []);

      if (data) {
        const clonedTree = OrganizationTree.buildTreeFromArray(chartData);
        data.forEach((item) => {
          clonedTree.addIsCheckProperty(String(item.organizationId), true);
        });
        setTree(clonedTree);
      } else {
        setTree(OrganizationTree.buildTreeFromArray(chartData));
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    try {
      const employees = await api(locale).GetHrList();
      setEmployeeList(employees || []);

      const chart = await GeneralListApis(locale).GetSimpleOrganizationChart();

      if (chart?.[0]) {
        setChartData(chart[0]);
        setTree(OrganizationTree.buildTreeFromArray(chart[0]));
      } else {
        setTree(OrganizationTree.buildTreeFromArray(chartData));
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [employee]);

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onTreePopupSave = (changedTree) => {
    setTree(changedTree.clone());
    setDataList(
      changedTree.getCheckedLeafNodes().map((item) => {
        const existOrganization = dataList.find(
          (org) => String(org.organizationId) === item.id
        );

        if (existOrganization) {
          return existOrganization;
        }

        return {
          id: item.id,
          organizationName: item.value,
          organizationId: item.id,
          isSubmitPermission: false,
          isSubmitMission: false,
          isSubmitVacation: false,
          isSubmitPenalty: false,
          isSubmitOverTime: false,
          isSubmitReward: false,
          isSubmitUniformTrx: false,
          isSubmitLoan: false,
          isSubmitResign: false,
          isSelected: true,
        };
      })
    );
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;




  const notAllowedEmpsFun = async () => {
    if (!employee) {
      toast.error(intl.formatMessage(messages.pleaseSelectEmployee));
      return;
    }

    try {
      setIsLoading(true);

      // used to delete unselected rows from table
      let notAllowedPayroll = notAllowedPayrollEmployeesList.filter((item)=>item.isSelected === true)
      let notAllowedEmployees = notAllowedEmployeesList.filter((item)=>item.isSelected === true)

      const bodyData = {
        id: NotAllowedEmps.id,
        employeeId: employee,
        NotAllowedPayrollEmployeeList: notAllowedPayroll,
        NotAllowedEmployeeList: notAllowedEmployees,
      }

      await api(locale).saveNotAllowedEmps(bodyData)

    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <>
    <PayRollLoader isLoading={isLoading}>
      {chartData && Object.keys(chartData).length > 0 && (
        <OrganizationTreePopup
          isOpen={isTreePopupOpen}
          tree={tree.clone()}
          chartData={chartData}
          setIsOpen={setIsTreePopupOpen}
          onSave={onTreePopupSave}
        />
      )}

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container mb={5} spacing={3}>
          <Grid item xs={6} md={3}>
            <Autocomplete
              options={employeeList}
              value={getAutoCompleteValue(employeeList, employee)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? `${option.id}-  ${option.name}` : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.id}- &nbsp; {option.name}
                </li>
              )}
              onChange={(_, value) => {
                setEmployee(value ? value.id : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(payrollMessages.chooseEmp)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <FormControl variant='filled' className={classes.searchtext}>
              <Input
                type='text'
                placeholder={intl.formatMessage(messages.search)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='Search filter' size='large'>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={onSaveBtnClick}
            >
              <FormattedMessage {...payrollMessages.save} />
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              disabled={employee === null || !(chartData && Object.keys(chartData).length > 0)}
              onClick={() => setIsTreePopupOpen(true)}
            >
              {intl.formatMessage(payrollMessages.organizationTree)}
            </Button>
          </Grid>
        </Grid>

        <div className={classes.rootTable}>
          <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage {...messages.organization} />
                </TableCell>

                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.select} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSelected == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllSelect'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSelected == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSelected == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.permission} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter(
                          (crow) => crow.isSubmitPermission == true
                        ).length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllPermission'
                    indeterminate={
                      !!(
                        dataList.filter(
                          (crow) => crow.isSubmitPermission == true
                        ).length > 0
                        && dataList.filter(
                          (crow) => crow.isSubmitPermission == true
                        ).length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.mission} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitMission == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllMission'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitMission == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitMission == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.vacation} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitVacation == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllVacation'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitVacation == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitVacation == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.penalty} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitPenalty == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllPenalty'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitPenalty == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitPenalty == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.overTime} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitOverTime == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllOvertime'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitOverTime == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitOverTime == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.reward} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitReward == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllReward'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitReward == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitReward == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.submitUniform} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter(
                          (crow) => crow.isSubmitUniformTrx == true
                        ).length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllUniformTrx'
                    indeterminate={
                      !!(
                        dataList.filter(
                          (crow) => crow.isSubmitUniformTrx == true
                        ).length > 0
                        && dataList.filter(
                          (crow) => crow.isSubmitUniformTrx == true
                        ).length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.loan} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitLoan == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllLoan'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitLoan == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitLoan == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
                <TableCell
                  style={{
                    textWrap: 'balance',
                    textAlign: 'center',
                  }}
                >
                  <FormattedMessage {...messages.resign} />
                  <br />
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length > 0
                        && dataList.filter((crow) => crow.isSubmitResign == true)
                          .length === filteredData.length
                      )
                    }
                    color='primary'
                    name='AllResign'
                    indeterminate={
                      !!(
                        dataList.filter((crow) => crow.isSubmitResign == true)
                          .length > 0
                        && dataList.filter((crow) => crow.isSubmitResign == true)
                          .length < filteredData.length
                      )
                    }
                    onChange={onAllCheckboxChange}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length !== 0
                && paginatedData.map((row) => (
                  <TableRow hover key={row.organizationId} sx={{ height: 1 }}>
                    <TableCell>{row.organizationName}</TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSelected}
                        color='primary'
                        name='isSelected'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSelected}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitPermission}
                        color='primary'
                        name='isSubmitPermission'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitPermission}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitMission}
                        color='primary'
                        name='isSubmitMission'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitMission}
                      />
                    </TableCell>

                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitVacation}
                        color='primary'
                        name='isSubmitVacation'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitVacation}
                      />
                    </TableCell>

                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitPenalty}
                        color='primary'
                        name='isSubmitPenalty'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitPenalty}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitOverTime}
                        color='primary'
                        name='isSubmitOverTime'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitOverTime}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',

                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitReward}
                        color='primary'
                        name='isSubmitReward'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitReward}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        textWrap: 'balance',

                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitUniformTrx}
                        color='primary'
                        name='isSubmitUniformTrx'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitUniformTrx}
                      />
                    </TableCell>

                    <TableCell
                      style={{
                        textWrap: 'balance',

                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitLoan}
                        color='primary'
                        name='isSubmitLoan'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitLoan}
                      />
                    </TableCell>

                    <TableCell
                      style={{
                        textWrap: 'balance',

                        textAlign: 'center',
                      }}
                    >
                      <Checkbox
                        checked={row.isSubmitResign}
                        color='primary'
                        name='isSubmitResign'
                        onChange={(event) => onSingleCheckboxSelect(event, row)}
                        value={row.isSubmitResign}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component='div'
            count={filteredData.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>


    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={intl.formatMessage(messages.notAllowedEmployees)} desc=''>
        <Grid container mb={5} spacing={3}>
          <Grid item xs={6} md={6}>
            <NameList
                dataList={notAllowedPayrollEmployeesList}
                setdataList={setNotAllowedPayrollEmployeesList}
                Key={"Employee"}
              />
          </Grid>
          <Grid item xs={6} md={6}>
            <NameList
                dataList={notAllowedEmployeesList}
                setdataList={setNotAllowedEmployeesList}
                Key={"payrollEmployee"}
              />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={notAllowedEmpsFun}
            >
              <FormattedMessage {...payrollMessages.save} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>

    </>
  );
}

HrPermission.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HrPermission);
