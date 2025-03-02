import React from "react";
import { 
    Box, 
    Button, 
    Autocomplete, 
    Grid, 
    TextField, 
    Stack 
  } from '@mui/material';
  import HighlightOffIcon from '@mui/icons-material/HighlightOff';
  import FilterListOffIcon from '@mui/icons-material/FilterListOff';
  import { useSelector } from 'react-redux';
  import style from '../../../../../../styles/styles.scss';
  import useStyles from '../../../Style';
  import { format } from "date-fns";


const tabletoolBar = ({
    components,
    filterData,
    setFilterData
}) => {


      const darkLightMode = useSelector((state) => state.ui.type);
      const { classes } = useStyles();


      const removeFilterItem = (removeItem) => {

            if(removeItem.type !== "date")
            {
                 setFilterData((prevState)=>({
                ...prevState,
                filterValslist: prevState.filterValslist.filter(item => item.name !== removeItem.name),
                filterValslistApi: prevState.filterValslistApi.filter(obj => !obj.hasOwnProperty(removeItem.name)),
              }))

            }
            else
            {
              setFilterData(prevData => ({
                  ...prevData,
                  filterValslist: prevData.filterValslist.filter(item => item.name !== removeItem.name),
                  filterValslistApi: prevData.filterValslistApi.filter(obj => !obj.hasOwnProperty([`from${removeItem.name}`]) && !obj.hasOwnProperty([`to${removeItem.name}`])),
                }));
            }
          }


    return (
        <div>
            <Grid container spacing={2} style={{marginTop:"0"}}>
                <Grid item xs={12} >
                    <div style={{display:"flex",justifyContent:"end", backgroundColor:"#8ba0fb",padding:"10px",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                       {components()}
                    </div>
                </Grid>
            </Grid>

            {filterData.filterValslist.length !== 0 && (
              <Grid item xs={12} style={{paddingTop:"0"}}>
                  <div className={darkLightMode === "light" ? style.filterContainerLightSty : style.filterContainerDarkSty } style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 15px"}}>
                    <div style={{display:"flex"}}>
                      {filterData.filterValslist.map((item,index)=>{

                          return   <div 
                                style={{
                                  border: "2px solid #bdbdbd",
                                  width: "fit-content",
                                  padding: "3px 9px",
                                  borderRadius: "20px",
                                  fontSize: "11px",
                                  margin:"5px 7px",
                                  color:"#727272",
                                  
                                }}
                                key={index}
                              >
                                    <HighlightOffIcon style={{fontSize: "21px", cursor:"pointer"}} onClick={()=>{removeFilterItem(item)}} /> &nbsp;
                                    <span style={{borderRight: "1px solid #bdbdbd", fontWeight:"bolder"}}>{item.lable} &nbsp;</span> &nbsp;
                                    <span className={classes.colorSty} style={{fontWeight:"bolder"}}>
                                      {item.type !== "date" ? 
                                        item.value 
                                          :
                                            ` ${item[`from${item.name}`] ? format(new Date( item[`from${item.name}`] ), "yyyy-MM-dd") : ""}
                                              ${item[`from${item.name}`] && item[`to${item.name}`] ? "-" : ""}
                                              ${item[`to${item.name}`] ? format(new Date( item[`to${item.name}`] ), "yyyy-MM-dd") : ""}`
                                      }
                                    </span>
                              </div>
                      })}
                    </div>
                    <FilterListOffIcon />
    
                  </div>
              </Grid>
            )}
        </div>
    )
}



export default tabletoolBar;