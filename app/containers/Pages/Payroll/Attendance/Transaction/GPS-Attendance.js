import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import GPSAttendanceData from '../api/GPSAttendanceData';
import RegisterLocationData from '../api/RegisterLocationData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveButton from '../../Component/SaveButton';
import PayRollLoader from '../../Component/PayRollLoader';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


import { Loader } from '@googlemaps/js-api-loader';






function GPSAttendance(props) {
  const [id, setid] = useState(0);
  const [vacationDesEN, setVacationDesEN] = useState('');
  const [vacationDesAR, setVacationDesAR] = useState('');
  const [element, setElement] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
 
  const [date, setDate] = useState(null);
  const { state } = useLocation()
  const  ID  = state?.id
  const history=useHistory(); 
  const { intl } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { classes } = useStyles();


  const [attLocations, setAttLocations] = useState([]);
  const [checkINCheckOutList, setCheckINCheckOutList] = useState([]);


  const [DateError, setDateError] = useState({});


  
 

  const [locatonDistance, setLocatonDistance] = useState();
  const [time, setTime] = useState(new Date());


  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    setIsLoading(true)
    setProcessing(true)

    let elementsData = ""
// used to reformat elements data ( combobox ) before send it to api
    element.map((ele, index)=>{
      elementsData+= `${ele.id}`
      if(index + 1 !== element.length)
      {
        elementsData+= ","
      }
    })


    const data = {
      id: id,
      arName: vacationDesAR ? vacationDesAR : "",
      enName: vacationDesEN ? vacationDesEN : "",
      vacationDate: dateFormatFun(date),
      parsId: elementsData,
    };




    try {
    //   let response = await OfficialVacationsData().Save(data);

    //   if (response.status==200) {
    //     toast.success(notif.saved);
    //     history.push(`/app/Pages/vac/OfficialVacations`);
    //   } else {
    //       toast.error(response.statusText);
    //   }
    //   setIsLoading(false)
    //   setProcessing(false)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }
    
  };
 


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

// const getEditdata =  async () => {
//   setIsLoading(true);

//   try {
//     // const data =  await OfficialVacationsData().GetDataById(ID,locale);


//     // setid(data ? data.id : "")
//     // setDate(data ? data.vacationDate : "") 
//     // setVacationDesAR(data ? data.arName : "")
//     // setVacationDesEN(data ? data.enName : "")
//     // setElement(data ? data.controlParameterList: "")
//   } catch (error) {
//     //
//   } finally {
//     setIsLoading(false);
//   }
// };


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

// useEffect(() => {
//   if(ID)
//   {
//     getEditdata()
//   }
//   }, [ID]);



  function oncancel(){
    history.push(`/app/Pages/vac/OfficialVacations`);
  }


  const checkInCheckOutFun = async (flag,locationData,currentLoc,distanceData) => {

    console.log("flag =", flag);
    console.log("locationData =",locationData);
    console.log("currentLoc =",currentLoc);
    
    try
    {

      const Addressdata = await RegisterLocationData().GoogleMapsGetData(currentLoc.latitude,currentLoc.longitude);  
      // setAddress(Addressdata.results[0].formatted_address)

      const data = {
        locationId: locationData.locationId,
        locLat: currentLoc.latitude,
        locLong: currentLoc.longitude,
        locAddress: Addressdata.results[0].formatted_address,
        flag: flag,
        distance: distanceData ? distanceData : 0 
      }
  
  
      console.log("data =", data);




      // const data =  await GPSAttendanceData().Save(data);
    }
    catch(err)
    {

    }
  }



  const loadGoogleMapsApi = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc&libraries=geometry";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  useEffect(()=>{
    // loadGoogleMapsApi()



    // const loader = new Loader({
    //     apiKey: 'AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc',
    //     libraries: ['places'],
    //   });


    //   loader.load()

},[])



function isPointInPolygon(point, polygon) {
  // const { latitude: x, longitude: y } = point;
  const x = point.latitude;
  const y = point.longitude;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lng;
      const xj = polygon[j].lat, yj = polygon[j].lng;


       // Log points being compared
      //  console.log(`Checking edge (${xi}, ${yi}) -> (${xj}, ${yj})`);
      
      const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect)
        {
         inside = !inside;
        //  console.log(`Intersection detected! Current inside status: ${inside}`);
        }
  }


  // console.log(`Final inside status: ${inside}`);
  
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
    console.log("Latitude =", position.coords.latitude );
    console.log("Longitude =", position.coords.longitude );
    console.log("checkKeyNum =", checkKeyNum);

    let Latitude = position.coords.latitude
    let Longitude = position.coords.longitude
    let currentLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude}



    let locations = attLocations.map(location => ({
        ...location,
        lcationPolygons: location.lcationPolygons.map(coord => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng)
        })),
        locLat: parseFloat(location.locLat),
        locLong: parseFloat(location.locLong)
    }));


    console.log("locations =", locations);
    
let loc;
let shouldBreak = false;  

    
for(let location = 0; location < locations.length; location++)
{

  loc = locations[location]


        

        if(loc.lcationPolygons && loc.lcationPolygons.length !== 0)
        {


          const isInside = isPointInPolygon(currentLocation, loc.lcationPolygons);

          console.log("isInside =",isInside);

          // if(isInside)
          //   {
          //     checkInCheckOutFun(checkKeyNum,loc,currentLocation)
          //     break;
          //   }
          

          
     
               // Create a LatLng object for the point
            // const pointLatLng = new window.google.maps.LatLng(Latitude, Longitude);
      
            // // Create a polygon using the coordinates
            // const polygon = new window.google.maps.Polygon({
            //   paths: loc.lcationPolygons,
            // });
      
            // // Check if the point is inside the polygon
            // const isInside = window.google.maps.geometry.poly.containsLocation(pointLatLng, polygon);
            
            // console.log("isInside =", isInside);

        }
        else
        if(loc.distance !== 0)
          // if(loc.locLat && loc.locLong)
        {
          console.log("loc 888 =", loc);


          const distance = haversineDistance(currentLocation.latitude, currentLocation.longitude, loc.locLat, loc.locLong);
console.log(`Distance: ${distance} meters`);

          if(distance <= loc.distance)
          {
            checkInCheckOutFun(checkKeyNum,loc,currentLocation, distance)
            break;
          }
          

          // if(shouldBreak)
          //   // if(distance <= loc.distance)
          //   {
          //     console.log("distance =", distance);
          //     console.log("loc.distance =", loc.distance);
              
             
          //     break;
          //   }

          // const service = new window.google.maps.DistanceMatrixService();

          // service.getDistanceMatrix(
          //     {
          //       origins: [{ lat: loc.locLat, lng: loc.locLong }],
          //       destinations: [{ lat: Latitude, lng: Longitude }],
          //       travelMode: 'WALKING',
          //     },
          //     (response, status) => {
          //       if (status === 'OK') {
          //         const distanceInMeters = response.rows[0].elements[0].distance.value;

          //         console.log("distanceInMeters =", distanceInMeters);
          //         console.log("loc222 =", loc);
          //         console.log("loc.distance =", loc.distance);
          //         console.log("check 666");

          //         // if (distanceInMeters <= loc.distance) 
          //         //   {
          //         //     console.log("check true");
          //         //     setLocatonDistance(distanceInMeters)
                      
          //         //     shouldBreak = true;
          //         //   }
                  
                  
          //         // setDistance(distanceInMeters);
          //       } else {
          //         console.error('Error fetching distance:', status);
          //       }
          //     }
          //   );

            
        }
        else if(loc.distance === 0)
        {
          checkInCheckOutFun(checkKeyNum,loc,currentLocation)
        }


        
        
    // })
      }
  
  }



  




  function getLocation(checkKeyNum) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>showPosition(position,checkKeyNum));
    } else { 
      console.log("err = Geolocation is not supported by this browser.");
      
      // x.innerHTML = "Geolocation is not supported by this browser.";
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




useEffect(()=>{
  if(locatonDistance)
  {
    checkInCheckOutFun()
  }
},[locatonDistance])



  console.log("attLocations =",attLocations);
  console.log("checkINCheckOutList =",checkINCheckOutList);
  


  return (
    <PayRollLoader isLoading={isLoading}>

      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
            "EditOfficialVacation"
                    // intl.formatMessage(messages.EditOfficialVacation)
                  :  
                  "GPS Attendance"
                    // intl.formatMessage(messages.CreateOfficialVacation)
               } 
          desc={""}>
            <form onSubmit={handleSubmit}>

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


       
<Grid item xs={12} md={5}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >          
<Grid item xs={3}  md={5} lg={3}>
                        <Button variant="contained" size="medium" color="primary" 
                        onClick={()=>{getLocationFun(1)}}
                        >
                          Check In
                          {/* <FormattedMessage {...Payrollmessages.cancel} />  */}
                        </Button>
                    </Grid>

                    <Grid item xs={3}  md={5} lg={3}>
                        <Button variant="contained" size="medium" color="primary" 
                        onClick={()=>{getLocationFun(2)}}
                        >
                          Check Out
                          {/* <FormattedMessage {...Payrollmessages.cancel} />  */}
                        </Button>
                    </Grid>
                    </Grid>
                    
            </Grid>


              {/* <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"> */}
                 
                  {/* <Grid item xs={12} md={12}></Grid> */}
                  {/* <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                    <SaveButton Id={id} processing={processing} />
                </Grid>
                <Grid item xs={3}  md={5} lg={3}>
                    <Button variant="contained" size="medium" color="primary" 
                    onClick={oncancel}
                     >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                </Grid> */}
              {/* </Grid> */}
          </form>
      </PapperBlock>         

    </PayRollLoader>
  );
}

GPSAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GPSAttendance); 
