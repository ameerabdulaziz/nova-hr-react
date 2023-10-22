import React,{useState,useCallback,useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import css from 'enl-styles/Table.scss';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button ,
    Grid,
    TextField,
    Autocomplete,
    Checkbox,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,FormControl ,Input 
  } from "@mui/material";
  
import messages from './messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import UserMenuData from './api/UserMenuData';
import { toast } from 'react-hot-toast';
import useStyles from '../Style';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import Payrollmessages from '../messages';
import PayRollLoader from "../Component/PayRollLoader";

function UserMenu(props) {
  
  const {intl} = props;
  const {classes,cx} = useStyles();  
  const [query, setQuery] = useState("");  
  const [dataList, setdataList] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [employee, setEmployee] = useState();  
  const [employeeList, setEmployeeList] = useState([]);  
  const [MenuList, setMenuList] = useState([]);
  const [menu, setmenu] = useState();
  const locale = useSelector(state => state.language.locale);
  const Title = localStorage.getItem("MenuName");  
  const [isLoading, setIsLoading] = useState(true);
  

const handlepermcheckboxAll = (event) => {
  
  
setdataList(
  
  dataList.map((x) => {
    
    if (filteredData.includes(x)) {
        if (event.target.name == "AllDelete") {
        x.isDelete = event.target.checked;
        } else if (event.target.name == "AllUpdate") {
        x.isUpdate = event.target.checked;
        } else if (event.target.name == "AllAdd") {
        x.isAdd = event.target.checked;
        } 
        else if (event.target.name == "AllView") {
        x.isView = event.target.checked;
        }
        else if (event.target.name == "AllPrint") {
        x.isPrint = event.target.checked;
        }
        else if (event.target.name == "AllFav") {
        x.isFav = event.target.checked;
        }
      }

    return x;
    })
);

};

const handlePageChange = (event, newPage) => {
    setPage(newPage);
    };

const handleLimitChange = (event) => {
setLimit(parseInt(event.target.value, 10));
};

const applyFilters = (data, query, menu) =>{
  
  let datafiltered=data;
  if(menu)
    datafiltered = data.filter((item) =>item.parentID==menu) ;
  if (query.length !== 0)
  datafiltered = datafiltered.filter((item) =>
        item.parentName.toString().toLowerCase().includes(query.toLowerCase())||
        item.menuName.toString().toLowerCase().includes(query.toLowerCase())
  ) ;
 
    return datafiltered ;
}

const applyPagination = (dataList, page, limit) => {
  let result = [];
  if (dataList && dataList.length !== 0) {
    // console.log(dataList);
    result = dataList.slice(page * limit, page * limit + limit);
  }
  return result;
};

const handleEnableOne = (event, row) => {
  
    setdataList(
        dataList.map((x) => {
          if (x.menuID == row.menuID) {
            if (event.target.name == "isdelete") {
              x.isDelete = event.target.checked;
            } else if (event.target.name == "isupdate") {
              x.isUpdate = event.target.checked;
            } else if (event.target.name == "isadd") {
              x.isAdd = event.target.checked;
            } 
            else if (event.target.name == "isview") {
                x.isView = event.target.checked;
              }
              else if (event.target.name == "isprint") {
                x.isPrint = event.target.checked;
              }
              else if (event.target.name == "isfav") {
                x.isFav = event.target.checked;
              }
          }
          return x;
        })
      );

    
};

const filteredData = applyFilters(dataList, query, menu);
const paginatedData = applyPagination(filteredData, page, limit);

async function on_submit() {
    if (!employee){
      toast.error("Please Select Employee")
      return
    }
    try {
      setIsLoading(true);
      let response = await  UserMenuData().SaveUserMenu({
        'employee':employee,
        'dataList':dataList,
      });
      
      if (response.status==200) {
        toast.success(notif.saved);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
    }
    finally {setIsLoading(false);}
  }

  const GetUserMenuList = useCallback(async () => {
    try {
      
      
      if (!employee){
        setdataList([]);
        return
      }
      setIsLoading(true);
      const data = await UserMenuData().GetUserMenuList(locale,employee);
      setdataList(data || []);
    } catch (err) {
    }
    finally{setIsLoading(false);}
  });


  const GetUserMenuLookup = useCallback(async () => {
    try {
      
      const data = await UserMenuData().GetUserMenuLookup(locale);
      setEmployeeList(data.employees || []);
      
      setMenuList(data.parentMenu || []);
      
    } catch (err) {
    }
    finally{setIsLoading(false);}
  }, []);

  useEffect(() => {
    
    GetUserMenuList();
  }, [employee]);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <div>
            <Grid container spacing={3}>            
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        id="ddlEmp"                        
                        options={employeeList}                        
                        getOptionLabel={(option) =>option.name}
                        onChange={(event, value) => {
                          
                            setEmployee(value !== null?value.id:null);
                      }}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"                            
                            {...params}
                            name="employee"
                            value={employee}
                            label={intl.formatMessage(Payrollmessages.chooseEmp)}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        id="ddlMenu"                        
                        options={MenuList}
                        getOptionLabel={(option) =>option.name}
                        onChange={(event, value) => setmenu(value !== null?value.id:null)}
                        renderInput={(params) => (
                        <TextField
                            variant="outlined"
                            {...params}
                            name="menu"
                            value={menu}
                            label={intl.formatMessage(messages.chooseMenu)}
                        />
                            
                        )}
                    />
                </Grid>
                <Grid item xs={6} md={4} >
                
                    <FormControl variant="filled" className={classes.searchtext} >
                        <Input
                        id="search_filter"
                        //style={{height:"50px"}}
                        type="text"
                        placeholder={intl.formatMessage(messages.search)}
                        onChange={(e) =>setQuery(e.target.value)}
                        value={query}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton aria-label="Search filter" size="large">
                                <SearchIcon />
                            </IconButton>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={2}>
                    
                <Button variant="contained" size="medium" color="primary" onClick={on_submit} >
                  <FormattedMessage {...Payrollmessages.save} />
                </Button>
                </Grid>   
            </Grid>
            <div className={classes.rootTable}>
                <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
                    <TableHead>
                    <TableRow>               
                        <TableCell ><FormattedMessage {...messages.parentName} /></TableCell>
                        <TableCell ><FormattedMessage {...messages.menuName}/></TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}}>
                        <FormattedMessage {...messages.delete}/>                        
                        <Checkbox
                            checked={filteredData.length > 0 &&  dataList.filter((crow) => crow.isDelete==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllDelete"
                            indeterminate={dataList.filter((crow) => crow.isDelete==true).length > 0 && dataList.filter((crow) => crow.isDelete==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}} >
                        <FormattedMessage {...messages.update}/>
                        <Checkbox
                            checked={filteredData.length > 0 && dataList.filter((crow) => crow.isUpdate==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllUpdate"
                            indeterminate={dataList.filter((crow) => crow.isUpdate==true).length > 0 && dataList.filter((crow) => crow.isUpdate==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}}>
                        <FormattedMessage {...messages.add}/>
                        <Checkbox
                            checked={filteredData.length > 0 && dataList.filter((crow) => crow.isAdd==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllAdd"
                            indeterminate={dataList.filter((crow) => crow.isAdd==true).length > 0 && dataList.filter((crow) => crow.isAdd==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}}>
                        <FormattedMessage {...messages.view}/>
                        <Checkbox
                            checked={filteredData.length > 0 && dataList.filter((crow) => crow.isView==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllView"
                            indeterminate={dataList.filter((crow) => crow.isView==true).length > 0 && dataList.filter((crow) => crow.isView==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}} >
                        <FormattedMessage {...messages.print}/>
                        <Checkbox
                            checked={filteredData.length > 0 && dataList.filter((crow) => crow.isPrint==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllPrint"
                            indeterminate={dataList.filter((crow) => crow.isPrint==true).length > 0 && dataList.filter((crow) => crow.isPrint==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell  style={{textWrap: 'balance',width: '70px',textAlign:'center'}}>
                        <FormattedMessage {...messages.favorites}/>
                        <Checkbox
                            checked={filteredData.length > 0 && dataList.filter((crow) => crow.isFav==true).length === filteredData.length?true:false}
                            color="primary"
                            name="AllFav"
                            indeterminate={dataList.filter((crow) => crow.isFav==true).length > 0 && dataList.filter((crow) => crow.isFav==true).length < filteredData.length?true:false}
                            onChange={handlepermcheckboxAll}
                        />
                        </TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {paginatedData.length !== 0 &&
                        paginatedData.map((row) => {
                        return (
                            <TableRow
                            hover
                            key={row.menuID}
                            sx={{ height: 1 }}
                            >
                            <TableCell>{row.parentName}</TableCell>
                            
                            <TableCell>{row.menuName}</TableCell>
                            <TableCell>
                                <Checkbox
                                checked={row.isDelete}
                                color="primary"
                                name="isdelete"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isDelete}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                checked={row.isUpdate}
                                color="primary"
                                name="isupdate"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isUpdate}
                                />
                            </TableCell>

                            <TableCell>
                                <Checkbox
                                checked={row.isAdd}
                                color="primary"
                                name="isadd"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isAdd}
                                />
                            </TableCell>

                            <TableCell>
                                <Checkbox
                                checked={row.isView}
                                color="primary"
                                name="isview"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isView}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                checked={row.isPrint}
                                color="primary"
                                name="isprint"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isPrint}
                                />
                            </TableCell>
                                <TableCell>
                                <Checkbox
                                checked={row.isFav}
                                color="primary"
                                name="isfav"
                                onChange={(event) => handleEnableOne(event, row)}
                                value={row.isFav}
                                />
                            </TableCell>
                            <TableCell></TableCell>

                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />  
            </div>
        </div>       
      </PapperBlock>
      </PayRollLoader>
  );
}
  
export default injectIntl(UserMenu);