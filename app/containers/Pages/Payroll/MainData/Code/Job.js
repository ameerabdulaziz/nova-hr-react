import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { EditTable } from '../../../../Tables/demos';
import JobData from '../api/JobData';
//import  AdvancedTable  from '../../../../../components/Tables/AdvancedTable';
import MUIDataTable from 'mui-datatables';
import { jobs } from './messages';
// import messages from './messages';
import messagesSec from '../../../../../components/Tables/messages';
import { FormattedMessage } from 'react-intl';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from '../../../../../components/Tables/tableStyle-jss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import style from '../../../../../styles/Styles.scss';
import EditIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  fetchAction,
  fetchJobsAction,
} from '../../../../../containers/Tables/reducers/crudTbActions';
import { async } from '@dabeng/react-orgchart';

// const useStyles = makeStyles()(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

function Job({ intl }) {
  const title = brand.name + ' - Job';
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const [search, setsearch] = useState('');
  const [test, setTest] = useState('');

  const fetchData = useDispatch();
  // const branch = 'crudTableDemo' ;
  const dataTable = useSelector((state) => state.jobs.jobsData);

  // const anchorTable = [
  //   {
  //     name: 'id',
  //     label: 'code',
  //     type: 'static',
  //     initialValue: '',
  //     hidden: true,
  //   },

  //   {
  //     name: 'name',
  //     label: 'name',
  //     type: 'text',
  //     width: 'auto',
  //     hidden: false,
  //   },
  //   {
  //     name: 'EnName',
  //     label: 'enname',
  //     type: 'text',
  //     initialValue: '',
  //     width: 'auto',
  //     hidden: false,
  //   },
  //   {
  //     name: 'edited',
  //     label: '',
  //     type: 'static',
  //     initialValue: '',
  //     hidden: true,
  //   },
  //   {
  //     name: 'action',
  //     label: 'action',
  //     type: 'static',
  //     initialValue: '',
  //     hidden: false,
  //   },
  // ];

  const getdata = async () => {
    const data = await JobData(locale).GetList();

    // this used to convert boolean values to string before store it in redux until table can read the values
    let newData = data.map((items) => {
      Object.keys(items).forEach((val) => {
        if (typeof items[val] == 'boolean') {
          items[val] = String(items[val]);
        }
      });
      return items;
    });

    fetchData(fetchJobsAction(newData));
    // fetchData(fetchAction(data,"",branch));
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = Object.keys(jobs).map((item) => ({
    name: item,
    label: intl.formatMessage(jobs[item]),
    options: {
      filter: true,
    },
  }));

  columns.push({
    name: 'Actions',
    options: {
      filter: false,

      customBodyRender: (value, tableMeta) => {
        console.log('tableMeta =', tableMeta);
        return (
          <div className={style.actionsSty}>
            <IconButton
              // onClick={() => eventEdit(this)}
              // className={cx((item.edited ? css.hideAction : ''), classes.button)}
              aria-label="Edit"
              size="large"
            >
              <Link to={`/app/Pages/MainData/EditJob${tableMeta.rowData[0]}`}>
                <EditIcon />
              </Link>
            </IconButton>

            <IconButton
              // onClick={() => eventDel(this)}
              className={classes.button}
              aria-label="Delete"
              size="large"
              onClick={() => {
                console.log(`rowsDeleted2222 = ${tableMeta.rowData[0]}`);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          // <Link
          //   style={{ textDecoration: "none" }}
          //   to={`/user/${tableMeta.rowData[0]}`}
          // >
          //   {value}
          // </Link>
        );
      },
    },
  });

  columns.unshift({
    name: 'id',
    label: 'Id',
    options: {
      display: false,
    },
  });

  // const columns = [
  //   {
  //     name: 'Arabic Name',
  //     options: {
  //       filter: true
  //     }
  //   },
  //   {
  //       name: 'English Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Leadership Position',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Job Code',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Job Nature Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Job Type Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Medical Insurance Start Day',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Organization Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Parent Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'Sanc Level Name',
  //       options: {
  //         filter: true
  //       }
  //     },
  // ];

  // const data = [
  //   ['Gabby George', 'Business Analyst', 30, 'active', 100000],
  //   ['Aiden Lloyd', 'Business Consultant', 55, 'active', 200000],
  //   ['Jaden Collins', 'Attorney', 27, 'non-active', 500000],
  //   ['Franky Rees', 'Business Analyst', 90, 'active', 50000],
  //   ['Aaren Rose', 'Business Consultant', 28, 'unknown', 75000],
  //   ['Blake Duncan', 'Business Management Analyst', 65, 'active', 94000],
  //   ['Frankie Parry', 'Agency Legal Counsel', 71, 'non-active', 210000],
  //   ['Lane Wilson', 'Commercial Specialist', 19, 'active', 65000],
  //   ['Robin Duncan', 'Business Analyst', 20, 'unknown', 77000],
  //   ['Mel Brooks', 'Business Consultant', 89, 'active', 135000],
  //   ['Harper White', 'Attorney', 52, 'non-active', 420000],
  //   ['Kris Humphrey', 'Agency Legal Counsel', 80, 'active', 150000],
  //   ['Frankie Long', 'Industrial Analyst', 31, 'active', 170000],
  //   ['Brynn Robbins', 'Business Analyst', 22, 'active', 90000],
  //   ['Justice Mann', 'Business Consultant', 76, 'non-active', 33000],
  //   ['Addison Navarro', 'Business Management Analyst', 50, 'non-active', 295000],
  //   ['Jesse Welch', 'Agency Legal Counsel', 28, 'active', 100000],
  //   ['Eli Mejia', 'Commercial Specialist', 65, 'active', 400000],
  //   ['Gene Leblanc', 'Industrial Analyst', 100, 'active', 110000],
  //   ['Danny Leon', 'Computer Scientist', 60, 'non-active', 220000],
  //   ['Lane Lee', 'Corporate Counselor', 52, 'unknown', 180000],
  //   ['Jesse Hall', 'Business Analyst', 44, 'active', 99000],
  //   ['Danni Hudson', 'Agency Legal Counsel', 37, 'active', 90000],
  //   ['Terry Macdonald', 'Commercial Specialist', 39, 'active', 140000],
  //   ['Justice Mccarthy', 'Attorney', 26, 'active', 330000],
  //   ['Silver Carey', 'Computer Scientist', 10, 'active', 250000],
  //   ['Franky Miles', 'Industrial Analyst', 49, 'active', 190000],
  //   ['Glen Nixon', 'Corporate Counselor', 15, 'non-active', 80000],
  //   ['Gabby Strickland', 'Business Process Consultant', 26, 'unknown', 45000],
  //   ['Mason Ray', 'Computer Scientist', 39, 'active', 142000]
  // ];

  // const data2 = [
  //   {
  //     name: "Gabby George",
  //     enname: "Business Analyst",
  //     isleadership: 100000,
  //     medicalinsurancestartday: 30,
  //     jobcode: "active",
  //     sanclevel: 100000,
  //     jobtype: 100000,
  //     jobnature: 100000,
  //     organization: 100000,
  //     parent: 100000,

  //   }
  // ]

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    // customToolbar: () => (
    //   <IconButton style={{ order: -1 }} onClick={() => window.alert('ADD')}>
    //     <AddIcon />
    //   </IconButton>
    // ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div>
        {console.log('selectedRows =', selectedRows)}
        {console.log('displayData =', displayData)}
        <Tooltip title={'Deleteeeeee'} cursor="pointer" className="mr-6">
          <IconButton
            onClick={() => {
              console.log('rowsDeleted');
            }}
          >
            <DeleteIcon></DeleteIcon>
            {/* <ActionDelete></ActionDelete> */}
          </IconButton>
        </Tooltip>
        {/* {selectedRows.data.length === 1 ? (
          <Tooltip title={'Edit'} cursor="pointer" className="mr-6">
            <IconButton onClick={() => window.alert(displayData)}>
              <EditIcon></EditIcon>
            </IconButton>
          </Tooltip>
        ) : (
          <span></span>
        )} */}
      </div>
    ),
  };

  const getSearchData = (searchVal) => {
    let searchData = '';
    if (searchVal.length !== 0 && dataTable.length !== 0) {
      searchData = dataTable.filter((item) =>
        Object.keys(item).some((key) =>
          item[key] !== null
            ? item[key]
                .toString()
                .toLowerCase()
                .includes(searchVal.toLowerCase())
            : null
        )
      );
      setsearch(searchData);
    } else {
      setsearch(searchData);
    }
  };

  console.log('dataTable =', dataTable);

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
      <PapperBlock whiteBg icon="border_color" title="" desc="">
        <div className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <FormControl variant="standard" className={cx(classes.textField)}>
                <Input
                  id="search_filter"
                  type="text"
                  // value={x}
                  onChange={(e) => {
                    getSearchData(e.target.value);
                    // console.log("val =",e.target.value);
                    // setTest(e.target.value)
                  }}
                  // onChange={(e) => input1.current = e.target.value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="Search filter" size="large">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Tooltip title="Add Item">
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push(`/app/Pages/MainData/CreateJob`);
                  }}
                  color="secondary"
                  className={classes.button}
                >
                  <AddIcon
                    className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                  />
                  {smUp && ' '} <FormattedMessage {...messagesSec.add} />
                </Button>
              </Tooltip>
            </div>
          </Toolbar>

          <div
            className={`${locale === 'ar' ? style.tableContainerStyAr : ''}`}
          >
            <MUIDataTable
              title="Jobs list"
              // data={data2}
              data={search ? search : dataTable}
              // columns={columns}
              columns={columns}
              options={options}
              className={style.tableSty}
            />
          </div>
          {/* <AdvancedTable /> */}
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Job);
