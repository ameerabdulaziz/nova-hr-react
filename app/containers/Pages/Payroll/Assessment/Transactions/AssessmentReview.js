import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import AssessmentReviewData from "../api/AssessmentReviewData";
import MUIDataTable from "mui-datatables";
import messages from "../messages";
import Payrollmessages from '../../messages';
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import PayRollLoader from "../../Component/PayRollLoader";
import {
    Button,
    Grid,
    TextField,
    Autocomplete
  } from "@mui/material";
  import { PapperBlock } from "enl-components";
  import { injectIntl, FormattedMessage } from "react-intl";
  import GeneralListApis from "../../api/GeneralListApis";
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import IconButton from '@mui/material/IconButton';
  import Tooltip from '@mui/material/Tooltip';
  import { Link } from "react-router-dom";

function AssessmentReview({ intl }) {
  const title = brand.name + " - AssessmentReview";
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem("MenuName");

  const [EmployeeList, setEmployeeList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Employee, setEmployee] = useState(null);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      setEmployeeList(empolyees)
      setMonthList(months)
      setYearList(years)

    //   let newData = data.map((items) => {
    //     Object.keys(items).forEach((val) => {
    //       // used to make table read date Data as a date
    //       if (val === "vacationDate") {
    //         items[val] = new Date(items[val]).toLocaleDateString();
    //       }
    //     });
    //     return items;
    //   });

    //   setDataTable(newData);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: "assessmentId",
      label: "id",
      options: {
        display: false,
      },
    },
    {
      name: "employeeName",
      label: "employeeName",
    //   label: intl.formatMessage(messages.arName),
      options: {
        filter: true,
      },
    },
    {
      name: "assessmentDate",
      label: "Assessment Date",
    //   label: intl.formatMessage(messages.enName),
      options: {
        filter: true,
      },
    },
    {
        name: "mgrcomment",
        label: "Over all assessment",
      //   label: intl.formatMessage(messages.enName),
        options: {
          filter: true,
        },
      },
      {
        name: "status",
        label: "status",
      //   label: intl.formatMessage(messages.enName),
        options: {
          filter: true,
        },
      },
    // {
    //   name: "deducted",
    //   label: intl.formatMessage(messages.deducted),
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return (
    //         <div className={style.actionsSty}>
    //           {value ? (
    //             <CheckIcon style={{ color: "#3f51b5" }} />
    //           ) : (
    //             <CloseIcon style={{ color: "#717171" }} />
    //           )}
    //         </div>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "hasBalance",
    //   label: intl.formatMessage(messages.hasBalance),
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return (
    //         <div className={style.actionsSty}>
    //           {value ? (
    //             <CheckIcon style={{ color: "#3f51b5" }} />
    //           ) : (
    //             <CloseIcon style={{ color: "#717171" }} />
    //           )}
    //         </div>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "isYearBalance",
    //   label: intl.formatMessage(messages.isYearBalance),
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return (
    //         <div className={style.actionsSty}>
    //           {value ? (
    //             <CheckIcon style={{ color: "#3f51b5" }} />
    //           ) : (
    //             <CloseIcon style={{ color: "#717171" }} />
    //           )}
    //         </div>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "app",
    //   label: intl.formatMessage(messages.shortcut),
    //   options: {
    //     filter: true,
    //   },
    // },
    // {
    //   name: "halfDay",
    //   label: intl.formatMessage(messages.halfDay),
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return (
    //         <div className={style.actionsSty}>
    //           {value ? (
    //             <CheckIcon style={{ color: "#3f51b5" }} />
    //           ) : (
    //             <CloseIcon style={{ color: "#717171" }} />
    //           )}
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      name: "Actions",
      label: intl.formatMessage(messages.actions),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
                <Tooltip title={intl.formatMessage(Payrollmessages.review)} cursor="pointer" className="mr-6">     
                    <IconButton
                        // disabled={!Menu.isUpdate||disabled}
                        aria-label={intl.formatMessage(Payrollmessages.review)}
                        size="large"
                        color="secondary"
                        className={classes.button}
                    >
                        {/* <Link  to='/app/Pages/Assessment/AssessmentReviewEdit' color="secondary"> */}
                        <Link to={{ pathname: '/app/Pages/Assessment/AssessmentReviewEdit', state: { id: tableMeta.rowData[0] },}} color="secondary">
                            <VisibilityIcon color="secondary"/>             
                        </Link>
                    </IconButton>
                    </Tooltip>
              {/* <EditButton
                param={{ id: tableMeta.rowData[0] }}
                url={"/app/Pages/vac/VacationsTypesEdit"}
              ></EditButton> */}

              {/* <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData)}
              ></DeleteButton> */}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    // searchOpen: true,
    selectableRows: "none",
    // customToolbar: () => (
    //   <div className={style.customToolbarBtn}>
    //     <AddButton url={"/app/Pages/vac/VacationsTypesCreate"}></AddButton>
    //   </div>
    // ),
  };

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const DeleteFun = async () => {
    setIsLoading(true);

    try {
      let response = await VacationsTypesData().Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        getdata();
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };



  const handleSearch = async (e) => {
    if(Month !== null && Year !== null )
    {
    try {
      setIsLoading(true);
     
      const dataApi = await AssessmentReviewData(locale).Get(Employee,Month,Year);
      setDataTable(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.monthAndYearErrorMes));
    }
  };




  return (
    <PayRollLoader isLoading={isLoading}>

      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>


      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            
                <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                      
                options={EmployeeList.length != 0 ? EmployeeList: []}
                getOptionLabel={(option) =>(
                    option  ? option.name : ""
                )
                }
                renderOption={(props, option) => {
                    return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                    );
                }}
                onChange={(event, value) => {
                    if (value !== null) {
                        setEmployee(value);
                    } else {
                        setEmployee(null);
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="VacationType"
                    label="Employee Name"
                    //   label={intl.formatMessage(messages.VacationType) }
                    margin="normal" 
                    className={style.fieldsSty}
                    
                    />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
           
            <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                      
                options={MonthList.length != 0 ? MonthList: []}
                getOptionLabel={(option) =>(
                    option  ? option.name : ""
                )
                }
                renderOption={(props, option) => {
                    return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                    );
                }}
                onChange={(event, value) => {
                    if (value !== null) {
                        setMonth(value);
                    } else {
                        setMonth(null);
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="VacationType"
                    label="Months"
                    //   label={intl.formatMessage(messages.VacationType) }
                    margin="normal" 
                    className={style.fieldsSty}
                    
                    />

                )}
                /> 
          </Grid>
          <Grid item xs={12} md={2}>
            
                 <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                      
                options={YearList.length != 0 ? YearList: []}
                getOptionLabel={(option) =>(
                    option  ? option.name : ""
                )
                }
                renderOption={(props, option) => {
                    return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                    );
                }}
                onChange={(event, value) => {
                    if (value !== null) {
                        setYear(value);
                    } else {
                        setYear(null);
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="VacationType"
                    label="Years"
                    //   label={intl.formatMessage(messages.VacationType) }
                    margin="normal" 
                    className={style.fieldsSty}
                    
                    />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.root}>
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=""
            // title={intl.formatMessage(messages.vacationsTypes)}
            data={dataTable}
            columns={columns}
            options={options}
            className={style.tableSty}
          />
        </div>
      </div>

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData=""
        // messageData={`${intl.formatMessage(Payrollmessages.deleteMessage)}${deleteItem[1]}`}
        callFun={DeleteFun}
      />
    </PayRollLoader>
  );
}

export default injectIntl(AssessmentReview);
