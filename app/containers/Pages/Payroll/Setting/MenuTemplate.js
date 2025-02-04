import React,{useState,useEffect } from 'react';
import { injectIntl,FormattedMessage } from 'react-intl';
import GeneralListApis from '../api/GeneralListApis';
import { useSelector } from 'react-redux';
import useStyles from '../Style';
import Payrollmessages from '../messages';
import messages from './messages';
import { PapperBlock } from 'enl-components';
import PayRollLoaderInForms from "../Component/PayRollLoaderInForms";
import UserMenuData from './api/UserMenuData';
import MenuTemplateData from './api/MenuTemplateData';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import MenuTemplatePopup from './Components/MenuTemplatePopup';
import AddIcon from '@mui/icons-material/Add';
import {
    Button ,
    Grid,
    TextField,
    Autocomplete,
    Checkbox,
    InputAdornment,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,FormControl,
    Input,
  } from "@mui/material";



const MenuTemplate = (props) => {

        const {intl} = props;

      const {classes,cx} = useStyles();  
      const [query, setQuery] = useState("");  
      const [dataList, setdataList] = useState([]);
      const [page, setPage] = useState(0);
      const [limit, setLimit] = useState(25);
      const [menuTemplate, setMenuTemplate] = useState();  
      const [menuTemplateList, setMenuTemplateList] = useState([]);  
      const [MenuList, setMenuList] = useState([]);
      const [menu, setmenu] = useState();
      const locale = useSelector(state => state.language.locale);
      const Title = localStorage.getItem("MenuName");  
      const [isLoading, setIsLoading] = useState(true);
      const [filteredData, setFilteredData] = useState([]);
      const [paginatedData, setPaginatedData] = useState([]);
      const [openMenuTemplatePopup, setOpenMenuTemplatePopup] = useState(false);
      const [menuTemplateForPopup, setMenuTemplateForPopup] = useState(null);
      const [menuTemplateForm, setOpenMenuTemplateForm] = useState({
        id:0,
        enName:"",
        arName:"",
      });



    const getDataFun = async () => {

        try{

            const menuTemplateData =  await GeneralListApis(locale).GetTemplateMenuList();
            const data = await UserMenuData().GetUserMenuLookup(locale);

            setMenuList(data.parentMenu || []);
            setMenuTemplateList(menuTemplateData)
        }
        catch(err){

        }
        finally{
            setIsLoading(false);
        }

    }


    useEffect(()=>{
        getDataFun()
    },[])

    const GetMenuTemplateList = async () => {
        try {
            setIsLoading(true);

            const data = await MenuTemplateData(locale).GetMenuTemplateList(menuTemplate.id);
          
            setdataList(data || []);

        } catch (err) {
        }
        finally{setIsLoading(false);}
      };
    
    
    
      useEffect(() => {
        if(menuTemplate)
        {
            GetMenuTemplateList();
        }
      }, [menuTemplate]);


    const applyFilters = (data, query, menu) =>{

        let datafiltered = data;

        if(menu)
        {
            datafiltered = data.filter((item) =>item.parentID==menu) ;
        }

        if (query.length !== 0)
        {
            datafiltered = datafiltered.filter((item) =>  item.menuName.toString().toLowerCase().includes(query.toLowerCase()) ) ;
        }
       
          return datafiltered ;
      }
      
      const applyPagination = (dataList, page, limit) => {
      
        let result = [];

        if (dataList && dataList.length !== 0) {

            result = dataList.slice(page * limit, page * limit + limit);
        }

        return result;
      };

    useEffect(()=>{
        if(dataList.length !== 0)
        {
            setFilteredData(
                 applyFilters(dataList, query, menu)
            )
        }

    },[dataList, query, menu,page,limit])

    
     
useEffect(()=>{
    if(filteredData.length !== 0)
    {
        setPaginatedData(
                    applyPagination(filteredData, page, limit)
                )
    }
},[filteredData])
    
    
    
    
    
    useEffect(() => {
        setPage(0);
      }, [query, limit]);


    const on_submit = async () => {
        if (!menuTemplate){
            toast.error("Please Select Menu Template")
            return
          }
          try {
            setIsLoading(true);

            let response = await  MenuTemplateData().SaveMenuTemplate(menuTemplate.id,dataList)

            
            if (response.status == 200) {
                toast.success(notif.saved);
            } else {
                toast.error(response.statusText);
            }
          } catch (err) {
            
          }
          finally {
            setIsLoading(false);
        }
    }

    const handlePageChange = (event, newPage) => {
            setPage(newPage);
        };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
        };


        const handleDeleteCheckbox = (event, row) => {
  
            setdataList(
                dataList.map((x) => {
                  if (x.menuID == row.menuID) {
                    x.isDelete = event.target.checked;
          
                    // not check anything if column is checked
                    if (event.target.checked && !x.isUpdate && !x.isAdd && !x.isView && !x.isPrint) {
                      x.isUpdate = true;
                      x.isAdd = true;
                      x.isPrint = true;
                      x.isView = true;
                    }
                  }
                  return x;
                })
              );
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


            const handleClickOpen = () => {
                setOpenMenuTemplatePopup(true);
              };
            
              const handleClose = () => {
                setOpenMenuTemplatePopup(false);

                setMenuTemplateForPopup(null)
                setOpenMenuTemplateForm({
                    id:0,
                    enName:"",
                    arName:"",
                  });
              };

              const onFieldChangeFun = (e,name) => {
                setOpenMenuTemplateForm((prev)=>({
                    ...prev,
                    [name]:  e.target.value
                }))
              }


              const onSubmitMenuTemplate = async () => {

                if (menuTemplateForm.enName === "" || menuTemplateForm.arName === ""){
                    toast.error("Please Select Menu Template")
                    return
                  }

                  let response 

                  try {
                    setIsLoading(true);

                    if(menuTemplateForm.id === 0)
                    {
                        response = await  MenuTemplateData().SaveMenuTemplateNewElements(menuTemplateForm)
                    }
                    else
                    {
                        response = await  MenuTemplateData().updateMenuTemplateData(menuTemplateForPopup.id,menuTemplateForm)
                    }
        

                    if (response.status == 200) {
                        toast.success(notif.saved);
                        getDataFun()
                    } else {
                        toast.error(response.statusText);
                    }
                  } catch (err) {
                    
                  }
                  finally {
                    setIsLoading(false);
                }
            }


            const getMenuTemplateDataById = async () => {
                try {
                    setIsLoading(true);
        
                    const data = await MenuTemplateData(locale).GetMenuTemplateById(menuTemplateForPopup.id);
                  
                    setOpenMenuTemplateForm({
                        id: data.id,
                        enName: data.enName,
                        arName: data.arName,
                    })

                    // setdataList(data || []);
        
                } catch (err) {
                    
                }
                finally{setIsLoading(false);}
            }


            useEffect(() => {
                if(menuTemplateForPopup)
                {
                    getMenuTemplateDataById();
                }
                else
                {
                    setOpenMenuTemplateForm({
                        id: 0,
                        enName: "",
                        arName: "",
                    })
                }
              }, [menuTemplateForPopup]);



              const deleteFun = async () => {
                try {
                    setIsLoading(true);
        
                    const response = await MenuTemplateData(locale).delete(menuTemplateForPopup.id);
                  

                    if (response === "Success") {
                        toast.success(notif.saved);
                        handleClose()
                        getDataFun()
                    } 
        
                } catch (err) {
                    
                }
                finally{setIsLoading(false);}
            }


    return (
        <PayRollLoaderInForms isLoading={isLoading}>
              <PapperBlock whiteBg icon="border_color" title={Title} desc="">

                <MenuTemplatePopup
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    openMenuTemplatePopup={openMenuTemplatePopup}
                    menuTemplateList={menuTemplateList}
                    setMenuTemplate={setMenuTemplate}
                    menuTemplate={menuTemplate}
                    menuTemplateForm={menuTemplateForm}
                    onFieldChangeFun={onFieldChangeFun}
                    onSubmitMenuTemplate={onSubmitMenuTemplate}
                    menuTemplateForPopup={menuTemplateForPopup}
                    setMenuTemplateForPopup={setMenuTemplateForPopup}
                    getMenuTemplateDataById={getMenuTemplateDataById}
                    deleteFun={deleteFun}
                />
                
                    <div>
                        <Grid container spacing={3} mb={3}>            
                            <Grid item xs={6} lg={3}>
                                <Autocomplete
                                    id="ddlEmp"                        
                                    options={menuTemplateList}
                                    renderOption={(props, option) => {
                                    return (
                                    <li {...props} key={option.id}>
                                        {option.name}
                                    </li>
                                    );
                                }}                  
                                    getOptionLabel={(option) =>option.name}
                                    onChange={(event, value) => {
                                    
                                        setMenuTemplate(value !== null ? value : null);
                                }}
                                    renderInput={(params) => (
                                    <TextField
                                        variant="outlined"                            
                                        {...params}
                                        name="menuTemplate"
                                        value={menuTemplate}
                                        // label="Menu Template"
                                        label={intl.formatMessage(Payrollmessages.menuTemplate)}
                                    />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} lg={3}>
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
                            <Grid item xs={6} lg={3} >
                            
                                <FormControl variant="filled">
                                    <Input
                                    id="search_filter"
                                    type="text"
                                    placeholder={intl.formatMessage(messages.search)}
                                    onChange={(e) =>setQuery(e.target.value)}
                                    value={query}
                                    fullWidth
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
                            <Grid item>
                                
                                <Button variant="contained" size="medium" color="primary" onClick={on_submit} >
                                    <FormattedMessage {...Payrollmessages.save} />
                                </Button>
                            </Grid>   

                            <Grid item>
                                
                                <Button 
                                    variant="contained" 
                                    size="medium" 
                                    color="primary" 
                                    onClick={handleClickOpen} >
                                        <AddIcon />
                                        &nbsp;
                                        <FormattedMessage {...Payrollmessages.menuTemplate} />
                                </Button>
                            </Grid>   
                        </Grid>
                    </div>

                    <div className={classes.rootTable}>
                        <TableContainer component={Paper} >
                        <Table >
                            <TableHead>
                                <TableRow>               
                                    <TableCell style={{whiteSpace:"nowrap", padding:"16px 7px"}}><FormattedMessage {...messages.parentName} /></TableCell>
                                    <TableCell style={{whiteSpace:"nowrap", padding:"16px 7px"}}><FormattedMessage {...messages.menuName}/></TableCell>
                                    <TableCell  style={{whiteSpace:"nowrap", padding:"16px 7px"}}>
                                        <Checkbox
                                            checked={filteredData.length > 0 &&  filteredData.filter((crow) => crow.isDelete==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllDelete"
                                            indeterminate={filteredData.filter((crow) => crow.isDelete==true).length > 0 && filteredData.filter((crow) => crow.isDelete==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.delete}/>                    
                                    </TableCell>
                                    <TableCell   style={{whiteSpace:"nowrap", padding:"16px 7px"}}>
                                        <Checkbox
                                            checked={filteredData.length > 0 && filteredData.filter((crow) => crow.isUpdate==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllUpdate"
                                            indeterminate={filteredData.filter((crow) => crow.isUpdate==true).length > 0 && filteredData.filter((crow) => crow.isUpdate==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.update}/>
                                    </TableCell>
                                    <TableCell  style={{whiteSpace:"nowrap", padding:"16px 7px"}}>
                                        <Checkbox
                                            checked={filteredData.length > 0 && filteredData.filter((crow) => crow.isAdd==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllAdd"
                                            indeterminate={filteredData.filter((crow) => crow.isAdd==true).length > 0 && filteredData.filter((crow) => crow.isAdd==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.add}/> 
                                    </TableCell>
                                    <TableCell style={{whiteSpace:"nowrap", padding:"16px 7px"}}>
                                        <Checkbox
                                            checked={filteredData.length > 0 && filteredData.filter((crow) => crow.isView==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllView"
                                            indeterminate={filteredData.filter((crow) => crow.isView==true).length > 0 && filteredData.filter((crow) => crow.isView==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.view}/> 
                                    </TableCell>
                                    <TableCell  style={{whiteSpace:"nowrap", padding:"16px 7px"}} >
                                        <Checkbox
                                            checked={filteredData.length > 0 && filteredData.filter((crow) => crow.isPrint==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllPrint"
                                            indeterminate={filteredData.filter((crow) => crow.isPrint==true).length > 0 && filteredData.filter((crow) => crow.isPrint==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.print}/> 
                                    </TableCell>
                                    <TableCell  style={{whiteSpace:"nowrap", padding:"16px 7px"}}>
                                        <Checkbox
                                            checked={filteredData.length > 0 && filteredData.filter((crow) => crow.isFav==true).length === filteredData.length?true:false}
                                            color="primary"
                                            name="AllFav"
                                            indeterminate={filteredData.filter((crow) => crow.isFav==true).length > 0 && filteredData.filter((crow) => crow.isFav==true).length < filteredData.length?true:false}
                                            onChange={handlepermcheckboxAll}
                                        />
                                        <FormattedMessage {...messages.favorites}/> 
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                            {paginatedData.length !== 0 &&
                                paginatedData.map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        key={row.menuID}
                                    >
                                        <TableCell sx={{p: '0 10px'}} >
                                            <pre>{row.parentName}</pre> 
                                        </TableCell>      
                                        <TableCell sx={{p: '0 10px'}} >
                                            <pre>{row.menuName}</pre>
                                        </TableCell>
                                        <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isDelete}
                                            color="primary"
                                            name="isdelete"
                                            onChange={(event) => handleDeleteCheckbox(event, row)}
                                            value={row.isDelete}
                                            />
                                        </TableCell>
                                        <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isUpdate}
                                            color="primary"
                                            name="isupdate"
                                            onChange={(event) => handleEnableOne(event, row)}
                                            value={row.isUpdate}
                                            />
                                        </TableCell>
                                        <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isAdd}
                                            color="primary"
                                            name="isadd"
                                            onChange={(event) => handleEnableOne(event, row)}
                                            value={row.isAdd}
                                            />
                                        </TableCell>
                                        <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isView}
                                            color="primary"
                                            name="isview"
                                            onChange={(event) => handleEnableOne(event, row)}
                                            value={row.isView}
                                            />
                                        </TableCell>
                                        <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isPrint}
                                            color="primary"
                                            name="isprint"
                                            onChange={(event) => handleEnableOne(event, row)}
                                            value={row.isPrint}
                                            />
                                        </TableCell>
                                            <TableCell sx={{p: '0 10px'}} >
                                            <Checkbox
                                            checked={row.isFav}
                                            color="primary"
                                            name="isfav"
                                            onChange={(event) => handleEnableOne(event, row)}
                                            value={row.isFav}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={filteredData.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[25, 50, 100]}
                        />  
                    </div>
              </PapperBlock>
        </PayRollLoaderInForms>
    )
}



export default injectIntl(MenuTemplate);