import React, { useState } from "react";
import { 
    Box, 
    Button, 
    Autocomplete, 
    Grid, 
    TextField, 
    Stack ,
    Popover
  } from '@mui/material';
  import FilterListIcon from '@mui/icons-material/FilterList';
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const FilterBtn = ({
    filterList,
    // filterType,
    // setFilterType,
    // filterValslist,
    // setFilterVal,
    // filterVal,
    // filterMinDatVal,
    // setFilterMinDatVal,
    // filterMaxDatVal,
    // setFilterMaxDatVal,
    // setFilterValslistApi,
    // setFilterValslist,

    filterData,
    setFilterData
}) => {

      const [anchorEl, setAnchorEl] = useState(null);
      const [openFilter, setOpenFilter] = useState(false);



      const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
        setOpenFilter(true)
      };


      const handleClose = () => {
        setAnchorEl(null);
        setOpenFilter(false)
      };



      const applyFilterFun = () => {
        // console.log("innnnnn222");
        if(filterData.filterVal.length !== 0 || (filterData.filterMinDateVal || filterData.filterMaxDateVal))
            // if(filterData.filterVal.length !== 0 || (filterData.filterMinDatVal || filterData.filterMaxDatVal))
        {
          let filterTypeWithVal = {...filterData.filterType}
  
          
          if(filterData.filterType.type === "date")
          {

            
            if(filterData.filterMinDateVal)
            {
              filterTypeWithVal[`from${filterData.filterType.name}`] = filterData.filterMinDateVal
            }
  
            if(filterData.filterMaxDateVal)
              {
                filterTypeWithVal[`to${filterData.filterType.name}`] = filterData.filterMaxDateVal
              }
            

  
  
            // setFilterValslistApi((prev)=>[
            //   ...prev,
            //   ...( filterMinDatVal ? [{[`from${filterData.filterType.name}`]: filterMinDatVal}] : []),
            //   ...( filterMaxDatVal ? [{[`to${filterData.filterType.name}`]: filterMaxDatVal}] : []),
            // ])



            setFilterData((prevState)=>({
                ...prevState,
                filterValslistApi: [
                    ...prevState.filterValslistApi,
                    ...(filterData.filterMinDateVal ? [{ [`from${filterData.filterType?.name}`]: filterData.filterMinDateVal }] : []),
                    ...(filterData.filterMaxDateVal ? [{ [`to${filterData.filterType?.name}`]: filterData.filterMaxDateVal }] : []),
                  ],
              }))


          }
          else
          {
            filterTypeWithVal.value = filterData.filterVal
  
            // setFilterValslistApi((prev)=>[
            //   ...prev,
            //   {[filterType.name]: filterData.filterVal},
            // ])


              setFilterData((prevState)=>({
                ...prevState,
                filterValslistApi: [...prevState.filterValslistApi, {[filterData.filterType.name]: filterData.filterVal}],
              }))
          }
  
         
  
  
          // console.log("filterTypeWithVal =", filterTypeWithVal);
          
          // setFilterValslist((prev)=>([
          //   ...prev,
          //   filterTypeWithVal
          // ]))
  
          setFilterData((prevState)=>({
            ...prevState,
            filterValslist: [...prevState.filterValslist, filterTypeWithVal],
        }))
  
        }
        
        // setFilterType(null)
        // setFilterVal("")
        // setFilterMinDatVal(null)
        // setFilterMaxDatVal(null)


        setFilterData((prevState)=>({
            ...prevState,
            filterType: null,
            filterVal: "",
            filterMinDateVal: null,
            filterMaxDateVal: null,
        }))
    }

      // console.log("filterData =", filterData);
      

    return(
        <div>
            <Button 
            // aria-describedby={id} 
            // variant="contained" 
            // startIcon={<FilterListIcon />}
            onClick={handleClick} 
            >
                {/* Filter */}
                <FilterListIcon />
            </Button>



            <Popover
              // id={id}
              open={openFilter}
              // open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              style={{marginTop:"10px"}}
            >
              <div style={{textAlign:"center", padding:"10px" , width:"250px"}}>

                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <Autocomplete
                        options={filterList}
                        value={filterData.filterType}
                      //  options={filterList}
                      //  value={filterType}
                      // options={companyList}
                      // value={searchData.BranchId ? companyList.find(item => item.id === searchData.BranchId) ?? null : null}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      getOptionDisabled={(option) =>{
                        // option === filterType
                        // console.log("jhdjdj =",filterValslist.some(obj => obj.id === option.id));
                        
                      //  return filterValslist.some(obj => obj.id === option.id)
                       return filterData.filterValslist.some(obj => obj.id === option.id)

                      // console.log("jhdjdj =",filterValslistApi.some(obj => obj.id === option.id));
                        
                      // return filterValslistApi.some(obj => obj.id === option.id)
                      }}
                      // onChange={(e, value) => onAutoCompleteChange(value ? value : "", 'BranchId')
                      // }
                      onChange={(e, value) => {
                        // setFilterType(value)
                        // setFilterVal("")

                        setFilterData((prevState)=>({
                            ...prevState,
                            filterType: value,
                            filterVal: "",
                          }))
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          // label={intl.formatMessage(Payrollmessages.company)}
                        />
                      )}
                    />
                    </Grid>

                      {filterData.filterType && filterData.filterType.type === "text" && (
                        <Grid item xs={12} >
                          <TextField 
                            id="outlined-basic" 
                            label={filterData.filterType.name}
                            variant="outlined" 
                            value={filterData.filterVal}
                            onChange={(e)=>{
                              // setFilterVal(e.target.value)
                              
                              setFilterData((prevState)=>({
                                ...prevState,
                                filterVal: e.target.value,
                              }))
                            }}
                            />
                        </Grid>
                      )}

                      {filterData.filterType && filterData.filterType.type === "number" && (
                        <Grid item xs={12} >
                          <TextField 
                            id="outlined-basic" 
                            type='number'
                            label={filterData.filterType.name}
                            variant="outlined" 
                            value={filterData.filterVal}
                            onChange={(e)=>{
                              // setFilterVal(e.target.value)

                              setFilterData((prevState)=>({
                                ...prevState,
                                filterVal: e.target.value,
                              }))
                            }}
                            />
                        </Grid>
                      )}


                      {filterData.filterType && filterData.filterType.type === "date" && (
                        <>
                          <Grid item xs={12} >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Min Date"
                                  value={filterData.filterMinDatVal ? dayjs(filterData.filterMinDatVal) : null}
                                  // className={classes.field}
                                  onChange={(date) => {
                                    // setdata((prevFilters) => ({
                                    //   ...prevFilters,
                                    //   lworkingDay: date,
                                    // }));

                                    // setFilterMinDatVal(date)


                                    setFilterData((prevState)=>({
                                        ...prevState,
                                        filterMinDateVal: date,
                                      }))
                                  }}
                                  onError={(error, value) => {
                                    if (error !== null) {
                                      setDateError((prevState) => ({
                                        ...prevState,
                                        [`MinDate`]: true,
                                      }));
                                    } else {
                                      setDateError((prevState) => ({
                                        ...prevState,
                                        [`MinDate`]: false,
                                      }));
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Max Date"
                                value={filterData.filterMaxDatVal ? dayjs(filterData.filterMaxDatVal) : null}
                                // className={classes.field}
                                onChange={(date) => {
                                  // setdata((prevFilters) => ({
                                  //   ...prevFilters,
                                  //   lworkingDay: date,
                                  // }));

                                  // setFilterMaxDatVal(date)


                                  setFilterData((prevState)=>({
                                    ...prevState,
                                    filterMaxDateVal: date,
                                  }))
                                }}
                                onError={(error, value) => {
                                  if (error !== null) {
                                    setDateError((prevState) => ({
                                      ...prevState,
                                      [`MaxDate`]: true,
                                    }));
                                  } else {
                                    setDateError((prevState) => ({
                                      ...prevState,
                                      [`MaxDate`]: false,
                                    }));
                                  }
                                }}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </>
                      )}


                    {filterData.filterType && filterData.filterType.type === "boolean" && (
                        <>
                          <Grid item xs={12} >
                            <FormControl>

                              <RadioGroup
                                // aria-labelledby="demo-controlled-radio-buttons-group"
                                // name="controlled-radio-buttons-group"
                                value={filterData.filterVal}
                                // onChange={handleChange}
                                onChange={(e)=>{
                                  // setFilterVal(e.target.value)

                                  setFilterData((prevState)=>({
                                    ...prevState,
                                    filterVal: e.target.value,
                                  }))
                                }}
                              >
                                <FormControlLabel 
                                  value="true" 
                                  control={<Radio />} 
                                  label="true" />

                                <FormControlLabel 
                                  value="false" 
                                  control={<Radio />} 
                                  label="false" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                    <Grid item xs={6} >
                      <Button
                        //  aria-describedby={id} 
                        style={{width:"100%"}}
                         variant="contained" 
                         onClick={()=>{
                          // applyFilterFun()
                          // handleClose()
                          }}>
                           Save
                      </Button>

                       
                    </Grid>

                    <Grid item xs={6} >
                      <Button
                        //  aria-describedby={id} 
                        style={{width:"100%"}}
                         variant="contained" 
                         onClick={()=>{
                          applyFilterFun()
                          // handleClose()
                          }}>
                           Apply
                      </Button>

                       
                    </Grid>
              </Grid>
              </div>

            </Popover>
        </div>
    )
}


export default FilterBtn;

