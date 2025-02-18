import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RegisterLocationData from '../../api/RegisterLocationData';
import { useSelector } from 'react-redux';
import style from '../../../../../../styles/styles.scss'
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../messages';
import Payrollmessages from '../../../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../../api/GeneralListApis';
import { PapperBlock } from 'enl-components';
import useStyles from '../../../Style';
import SaveButton from '../../../Component/SaveButton';
import PayRollLoader from '../../../Component/PayRollLoader';
import { Tooltip, Autocomplete } from "@mui/material";
import massageSI from "../../../SocialInsurance/messages"

import {
  Autocomplete as GoogleAutocomplete,
  DrawingManager,
  GoogleMap,
  Polygon,
  Marker,
  LoadScript,
  Circle
} from '@react-google-maps/api';
import deleteIcon from '../../../Assets/Attendance-imgs/remove.png';
import SITEMAP from '../../../../../App/routes/sitemap';

const libraries = ['places', 'drawing'];


function RegisterLocationCreate(props) {
  const [id, setid] = useState(0);
  const [ArName, setArName] = useState('');
  const [EnName, setEnName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [siteAdministratorName , setSiteAdministratorName] = useState('')
  const [websiteAdministratorPhone , setWebsiteAdministratorPhone] = useState('')
  const [anotherNumber , setAnotherNumber] = useState('')
  const [governmentList ,setGovernmentList] = useState([])
  const [government ,setGovernment] = useState("")
  const [locationTypeList ,setLocationTypeList] = useState([])
  const [locationType ,setLocationType] = useState("")
  const [distance, setDistance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const { state } = useLocation()
  const ID = state?.id
  const history = useHistory();
  const { intl } = props;
  const { classes } = useStyles();
  const [polygons, setPolygons] = useState([]);
  const [location, setLocation] = useState()
  const [devicesData, setDevicesData] = useState([]);
  const [device, setDevice] = useState("");
  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const autocompleteRef = useRef();
  const drawingManagerRef = useRef();
  const defaultCenter = {
    lat: 30.0444,
    lng: 31.2357,
  }


  const [center, setCenter] = useState(defaultCenter);

  const GetGovernmentList =async ()=> {
     const data = await GeneralListApis(locale).GetGovernmentList()
     setGovernmentList(data)
  }

  const GetLocationTypeList = async ()=> {
    const data = await GeneralListApis(locale).locationTypeList()
    setLocationTypeList(data)
 }

  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const autocompleteStyle = {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '38px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses',
    position: 'absolute',
    right: '8%',
    top: '11px',
    marginLeft: '-120px',
  }

  const deleteIconStyle = {
    cursor: 'pointer',
    backgroundImage: `url(${deleteIcon})`,
    height: '24px',
    width: '24px',
    marginTop: '5px',
    backgroundColor: '#fff',
    position: 'absolute',
    top: "2px",
    left: "52%",
    zIndex: 99999
  }

  const polygonOptions = {
    fillColor: `#2196F3`,
    fillOpacity: 0.5,
    strokeColor: `#2196F3`,
    clickable: true,
    strokeWeight: 2,
    draggable: true,
    editable: true,
    zIndex: 1,
  }

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [
        window.google?.maps?.drawing?.OverlayType?.POLYGON,
      ]
    }
  }

  const onLoadMap = (map) => {
    mapRef.current = map;
  }

  const onLoadPolygon = (polygon, index) => {
    polygonRefs.current[index] = polygon;
  }

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  }

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  }

  const onPlaceChanged = () => {
    const { geometry } = autocompleteRef.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();

    setLocation(geometry.location)
    setAddress(autocompleteRef.current.getPlace().formatted_address)
    setLat(geometry.location.lat())
    setLng(geometry.location.lng())


    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    mapRef.current.fitBounds(bounds);
  }

  const onLoadDrawingManager = drawingManager => {
    drawingManagerRef.current = drawingManager;
  }

  const onOverlayComplete = ($overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay.getPath()
        .getArray()
        .map(latLng => ({ id: 0, locationId: id, lat: latLng.lat(), lng: latLng.lng() }))

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);

      const polygonCoordinates = new window.google.maps.Polygon({
        paths: newPolygon,
      });

      const checkPointInsidePolygon = location ? window?.google?.maps?.geometry?.poly?.containsLocation(location, polygonCoordinates) : false
      if (!checkPointInsidePolygon) {
        toast.error(intl.formatMessage(messages.MustToMakeThePointInsideTheDrawnArea));
      }
      else {
        setPolygons([newPolygon]);
      }
    }

  }

  const onDeleteDrawing = () => {
    const filtered = polygons.filter((polygon, index) => index !== activePolygonIndex.current)
    setPolygons(filtered)
    // clear activePolygonIndex.current after delete
    activePolygonIndex.current = undefined
  }

  const onEditPolygon = (index) => {
    const polygonRef = polygonRefs.current[index];
    if (polygonRef) {
      const coordinates = polygonRef.getPath()
        .getArray()
        .map(latLng => ({ id: 0, locationId: id, lat: latLng.lat(), lng: latLng.lng() }));

      const allPolygons = [...polygons];
      allPolygons[index] = coordinates;

      const polygonCoordinates = new window.google.maps.Polygon({
        paths: coordinates,
      });

      const checkPointInsidePolygon = window?.google?.maps?.geometry?.poly?.containsLocation(location, polygonCoordinates)
      if (!checkPointInsidePolygon) {
        toast.error(intl.formatMessage(messages.MustToMakeThePointInsideTheDrawnArea));
        setPolygons([])
      }
      else {
        polygons[0] = coordinates
        setPolygons(polygons);
      }
    }
  }


  // controll on zoom buttons
  const OPTIONS = {
    minZoom: 3,
  }


  const getLocationDataFun = async (lan, lng) => {
    const Addressdata = await RegisterLocationData().GoogleMapsGetData(lan, lng);
    setAddress(Addressdata.results[0].formatted_address)
    setLat(lan)
    setLng(lng)
  }




  ////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setProcessing(true)

    const data = {
      id: id,
      arName: ArName ? ArName : "",
      enName: EnName ? EnName : "",
      address: address ? address : "",
      locLat: lat ? lat : "",
      locLong: lng ? lng : "",
      distance: distance ? Number(distance) : "",
      polygons: polygons.length === 0 ? [] : polygons[0],
      deviceId: device.length !== 0 ? device.id : "" ,
      Responsible : siteAdministratorName ? siteAdministratorName : "",
      Tel1 : websiteAdministratorPhone ? websiteAdministratorPhone : "",
      Tel2 : anotherNumber ? anotherNumber : "",
      GovernmentId : government.length !== 0 ? government.id : "" ,
      LocationTypeId : locationType.length  !==0 ? locationType.id : "" ,

    };

    console.log(data)

    try {
      let response = await RegisterLocationData().Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.attendance.RegisterLocation.route);
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false)
      setProcessing(false)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }

  };



  const getdata = async () => {
    setIsLoading(true);

    try {
      const Devices = await GeneralListApis(locale).GetDeviceList(locale);

      setDevicesData(Devices)
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    setIsLoading(true);

    try {
      const data = await RegisterLocationData().GetDataById(ID, locale);

      data.polygons.map((item, index) => {
        data.polygons[index].lat = Number(data.polygons[index].lat)
        data.polygons[index].lng = Number(data.polygons[index].lng)
      })

      setid(data.id)
      setArName(data.arName)
      setEnName(data.enName)
      setAddress(data.address)
      setLat(data.locLat)
      setLng(data.locLong)
      setDistance(data.distance)
      setCenter({ lat: Number(data.locLat), lng: Number(data.locLong) })
      setLocation({ lat: Number(data.locLat), lng: Number(data.locLong) })
      setPolygons([data.polygons])
      setDevice(data.deviceId ? devicesData.find((item) => item.id === data.deviceId) : "")
      setSiteAdministratorName(data.responsible)
      setWebsiteAdministratorPhone(data.tel1)
      setAnotherNumber(data.tel2)
      setGovernment(data.governmentId ? governmentList.find((item) => item.id === data.governmentId) : "")
      setLocationType(data.locationTypeId ? locationTypeList.find((item) => item.id === data.locationTypeId) : "")

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getdata();
    GetGovernmentList();
    GetLocationTypeList();
  }, []);

  useEffect(() => {
    if (ID && devicesData.length !== 0) {
      getEditdata()
    }
  }, [ID, devicesData]);



  function oncancel() {
    history.push(SITEMAP.attendance.RegisterLocation.route);
  }


  useEffect(() => {
    if (distance !== "" && lat !== "" && lng !== "" && polygons.length === 0) {
      setCenter({
        lat: lat,
        lng: lng,
      })
    }
  }, [distance, lat, lng, polygons])


  return (
    <div>
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon="border_color"
          title={
            ID ?
              intl.formatMessage(messages.RegisterLocationEdit)
              :
              intl.formatMessage(messages.RegisterLocationCreate)
          }
          desc={""}>

          {

            <div className='map-container' style={{ position: 'relative', marginBottom: "50px" }}>
              {
                drawingManagerRef.current
                &&
                <Tooltip title={intl.formatMessage(messages.selectShapeFiristToDeleteIt)}>
                  <div
                    onClick={onDeleteDrawing}
                    // title='Delete shape'
                    style={deleteIconStyle}
                    className={style.deleteIcon}
                  >
                  </div>
                </Tooltip>
              }


              <LoadScript
                id="script-loader"
                googleMapsApiKey={"AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc"}
                language={locale}
                region="EN"
                version="weekly"
                libraries={libraries}
              >
                <GoogleMap
                  zoom={16}
                  options={OPTIONS}
                  center={center}
                  onLoad={onLoadMap}
                  mapContainerStyle={containerStyle}
                  // onTilesLoaded={() => setCenter(null)}
                  onClick={(e) => {
                    // get lat and lng onclick on point
                    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })

                    setPolygons([])
                    getLocationDataFun(e.latLng.lat(), e.latLng.lng())
                  }}
                >
                  <DrawingManager
                    onLoad={onLoadDrawingManager}
                    onOverlayComplete={onOverlayComplete}
                    options={drawingManagerOptions}
                  />
                  {
                    polygons.map((iterator, index) => (
                      <Polygon
                        key={index}
                        onLoad={(event) => onLoadPolygon(event, index)}
                        onMouseDown={() => {
                          onClickPolygon(index)
                        }}
                        onMouseUp={() => onEditPolygon(index)}
                        // onDragEnd={() => onEditPolygon(index)}
                        options={polygonOptions}
                        paths={iterator}
                        draggable
                        editable
                      />
                    ))
                  }
                  <GoogleAutocomplete
                    onLoad={onLoadAutocomplete}
                    onPlaceChanged={onPlaceChanged}

                  >
                    <input
                      type='text'
                      placeholder={intl.formatMessage(messages.SearchLocation)}
                      style={autocompleteStyle}
                      className={style.searchSty}
                    />
                  </GoogleAutocomplete>

                  {location && (
                    <Marker
                      position={location}
                    />
                  )}

                  {polygons.length === 0 && (

                    <Circle
                      center={center}
                      radius={distance === "" ? null : parseFloat(distance)}
                      options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                      }}
                    />
                  )}

                </GoogleMap>
              </LoadScript>
            </div>
          }


          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row">
              <Grid item xs={12} md={12}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.gridSty}
              >
                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="arName"
                    id="arName"
                    placeholder={intl.formatMessage(Payrollmessages.arName)}
                    label={intl.formatMessage(Payrollmessages.arName)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={ArName}
                    onChange={(e) => setArName(e.target.value)}
                    autoComplete='off'
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="enName"
                    id="enName"
                    placeholder={intl.formatMessage(Payrollmessages.enName)}
                    label={intl.formatMessage(Payrollmessages.enName)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={EnName}
                    onChange={(e) => setEnName(e.target.value)}
                    autoComplete='off'
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="Address"
                    id="Address"
                    placeholder={intl.formatMessage(messages.Address)}
                    label={intl.formatMessage(messages.Address)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="Latitude"
                    id="Latitude"
                    placeholder={intl.formatMessage(messages.Latitude)}
                    label={intl.formatMessage(messages.Latitude)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="Longitude"
                    id="Longitude"
                    placeholder={intl.formatMessage(messages.longitude)}
                    label={intl.formatMessage(messages.longitude)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="Distance"
                    id="Distance"
                    placeholder={intl.formatMessage(messages.Distance)}
                    label={intl.formatMessage(messages.Distance)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={distance ? distance : ""}
                    onChange={(e) => setDistance(e.target.value)}
                    required={polygons.length === 0 ? true : false}
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <Autocomplete
                    id='employeeId'
                    options={devicesData}
                    value={device}
                    isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    onChange={(event, value) => {
                      setDevice(value == null ? '' : value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant='outlined'
                        {...params}
                        name='deviceList'
                        required
                        label={intl.formatMessage(messages.device)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="siteAdministratorName"
                    id="siteAdministratorName"
                    placeholder={intl.formatMessage(messages.siteAdministratorName)}
                    label={intl.formatMessage(messages.siteAdministratorName)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={siteAdministratorName}
                    onChange={(e) => setSiteAdministratorName(e.target.value)}
                    autoComplete='off' 
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="websiteAdministratorPhone "
                    id="websiteAdministratorPhone"
                    placeholder={intl.formatMessage(messages.websiteAdministratorPhone)}
                    label={intl.formatMessage(messages.websiteAdministratorPhone)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={websiteAdministratorPhone}
                    onChange={(e) => setWebsiteAdministratorPhone(e.target.value)}
                    autoComplete='off'  
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <TextField
                    name="anotherNumber"
                    id="anotherNumber"
                    placeholder={intl.formatMessage(messages.anotherNumber)}
                    label={intl.formatMessage(messages.anotherNumber)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={anotherNumber}
                    onChange={(e) => setAnotherNumber(e.target.value)}
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <Autocomplete
                    id='government'
                    options={governmentList}
                    value={government}
                    isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    onChange={(event, value) => {
                      setGovernment(value == null ? '' : value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant='outlined'
                        {...params}
                        name='government'
                        label={intl.formatMessage(massageSI.government)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <Autocomplete
                    id='locationType'
                    options={locationTypeList}
                    value={locationType}
                    isOptionEqualToValue={(option, value) => value.id === 0 || value.id === '' || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    onChange={(event, value) => {
                      setLocationType(value == null ? '' : value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant='outlined'
                        {...params}
                        name='locationType'
                        label={intl.formatMessage(messages.locationType)}
                      />
                    )}
                  />
                </Grid>             

              </Grid>

            </Grid>


            <Grid item xs={12} mt={2}>
              <Grid container spacing={3}  >
                <Grid item >
                  <SaveButton Id={id} processing={processing} />
                </Grid>
                <Grid item >
                  <Button variant="contained" size="medium" color="primary"
                    onClick={oncancel}
                  >
                    <FormattedMessage {...Payrollmessages.cancel} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>

      </PayRollLoader>
    </div>
  );
}

RegisterLocationCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RegisterLocationCreate); 
