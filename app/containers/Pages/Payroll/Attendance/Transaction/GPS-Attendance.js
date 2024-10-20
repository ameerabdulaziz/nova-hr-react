import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import GPSAttendanceData from '../api/GPSAttendanceData';
import RegisterLocationData from '../api/RegisterLocationData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import PropTypes from 'prop-types';
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import PayRollLoader from '../../Component/PayRollLoader';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';






function GPSAttendance(props) {
  const [isLoading, setIsLoading] = useState(false);
  const locale = useSelector(state => state.language.locale);
  const { intl } = props;
  const { classes } = useStyles();
  const [attLocations, setAttLocations] = useState([]);
  const [checkINCheckOutList, setCheckINCheckOutList] = useState([]);
  const [time, setTime] = useState(new Date());


const getdata =  async () => {
  setIsLoading(true);

  try {
    const attendenceLocatons = await GPSAttendanceData(locale).GetList();    
  
    setAttLocations(attendenceLocatons)
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};


const checkInCheckOutHistoryListFun = async () => {
  setIsLoading(true);

  try {
    const history = await GPSAttendanceData(locale).GetHistoryList();    
  
    setCheckINCheckOutList(history)
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
}


useEffect(() => {
  getdata();
  checkInCheckOutHistoryListFun();
}, []);

  const checkInCheckOutFun = async (flag,locationData,currentLoc,distanceData) => {
    setIsLoading(true);
    
    try
    {

      const Addressdata = await RegisterLocationData().GoogleMapsGetData(currentLoc.latitude,currentLoc.longitude);  

      const bodyData = {
        locationId: locationData.locationId,
        locLat: currentLoc.latitude,
        locLong: currentLoc.longitude,
        locAddress: Addressdata.results[0].formatted_address,
        flag: flag,
        distance: distanceData ? distanceData : 0 
      }
  

      const response =  await GPSAttendanceData().Save(bodyData);

      if (response.status==200) {
            toast.success(notif.saved);
            checkInCheckOutHistoryListFun()
          } else {
              toast.error(response.statusText);
          }
          setIsLoading(false)

      
    }
    catch(err)
    {}
    finally {
      setIsLoading(false);
    }
  }


function isPointInPolygon(point, polygon) {

  const x = point.latitude;
  const y = point.longitude;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lng;
      const xj = polygon[j].lat, yj = polygon[j].lng;

      const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect)
        {
         inside = !inside;
        }
  }

  return inside;
}



function haversineDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = 6371000; // Radius of the Earth in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return distance;
}


  function showPosition(position,checkKeyNum) {

    let currentLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude}

    // take copy of data to convert latitude and longitude into numbers
    let locations = attLocations.map(location => ({
        ...location,
        lcationPolygons: location.lcationPolygons.map(coord => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng)
        })),
        locLat: parseFloat(location.locLat),
        locLong: parseFloat(location.locLong)
    }));


    
let loc;
let shouldBreak = true;  

    
for(let location = 0; location < locations.length; location++)
{

  loc = locations[location]

        if(loc.lcationPolygons && loc.lcationPolygons.length !== 0)
        {
          const isInside = isPointInPolygon(currentLocation, loc.lcationPolygons);

          if(isInside)
            {
              checkInCheckOutFun(checkKeyNum,loc,currentLocation)
              shouldBreak = false
              break;
            }
        }
        else
        if(loc.distance !== 0)
        {
          const distance = haversineDistance(currentLocation.latitude, currentLocation.longitude, loc.locLat, loc.locLong);

          if(distance <= loc.distance)
          {
            checkInCheckOutFun(checkKeyNum,loc,currentLocation, distance)
            shouldBreak = false
            break;
          }
              
        }
        else if(loc.distance === 0)
        {
          checkInCheckOutFun(checkKeyNum,loc,currentLocation)
          shouldBreak = false
        }

      }

      // print error of the user out of the range of register attendance
      if(shouldBreak)
      {
        toast.error(intl.formatMessage(messages.outOfTheRangeMesss))
      }

  }


  function getLocation(checkKeyNum) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>showPosition(position,checkKeyNum));
    } else { 
      console.log("err = Geolocation is not supported by this browser.");
    }
  }


  const getLocationFun = (checkKeyNum) => {
    getLocation(checkKeyNum)
  }

  useEffect(() => {
    // timer updation logic
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <PayRollLoader isLoading={isLoading}>

      <PapperBlock whiteBg icon="border_color" 
          title={ intl.formatMessage(messages.GPSAttendance)} 
          desc={""}>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row">

                  <Grid item xs={12}  >
                    <div className={`${style.clockSty} ${classes.backgroundColorSty}`}>
                      {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                    </div>
                  </Grid>


       
                  <Grid item xs={12} 
                    container
                    spacing={3}
                    alignItems="flex-start"
                    justifyContent="center"
                    direction="row"
                    className={style.itemsStyle}
                    >          
                        <Grid item xs={3}  md={5} lg={3}  style={{display:"flex",justifyContent:"end"}}>
                          <Button variant="contained" size="medium" color="primary" 
                          className={style.attBtnSty}
                          onClick={()=>{getLocationFun(1)}}
                          >
                            
                            <FormattedMessage {...messages.In} /> 
                          </Button>
                      </Grid>

                      <Grid item xs={3}  md={5} lg={3} style={{display:"flex",justifyContent:"start"}}>
                          <Button variant="contained" size="medium" color="primary" className={style.attBtnSty}
                          onClick={()=>{getLocationFun(2)}}
                          >
                            
                            <FormattedMessage {...messages.Out} /> 
                          </Button>
                      </Grid>
                    </Grid>


                    <Grid item xs={12} 
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row"
                      className={style.itemsStyle}
                      >  
                        { checkINCheckOutList.length !== 0 && (
                          checkINCheckOutList.attendancelist.map((item,index)=>{

                          return <Grid item xs={12} key={index}>
                                    <div 
                                      className={style.historyCardSty}
                                      >
                                        <Grid item xs={12} 
                                          container
                                          spacing={3}
                                          alignItems="flex-start"
                                          direction="row"
                                          className={style.itemsStyle}
                                          style={{marginLeft:"0"}}
                                          >  
                                          <Grid item xs={12} md={11} style={{paddingLeft:"0"}}>
                                            <span className={classes.colorSty}>{item.attType}</span>
                                          </Grid>
                                          <Grid item xs={12} md={1} style={{paddingLeft:"0"}}>
                                            {
                                              item.flag === 1 ? 
                                              <LoginIcon style={{color:"#23ad00"}}/>
                                              :
                                              <LogoutIcon  style={{color:"#ff0c00"}}/>
                                            }
                                          </Grid>
                                        </Grid>
                                    </div>
                                  </Grid>
                        }))}
                      
                    </Grid>
                     
            </Grid>
      </PapperBlock>         

    </PayRollLoader>
  );
}

GPSAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GPSAttendance); 
