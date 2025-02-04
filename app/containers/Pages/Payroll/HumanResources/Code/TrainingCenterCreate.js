import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  DrawingManager,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import style from "../../../../../styles/styles.scss";
import GeneralListApis from "../../api/GeneralListApis";
import deleteIcon from "../../Assets/Attendance-imgs/remove.png";
import attendanceMessages from "../../Attendance/messages";
import PayRollLoader from "../../Component/PayRollLoader";
import SaveButton from "../../Component/SaveButton";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import api from "../api/TrainingCenterData";
import messages from "../messages";
import SITEMAP from "../../../../App/routes/sitemap";

const libraries = ["places", "drawing"];

function TrainingCenterCreate(props) {
  const pageTitle = localStorage.getItem("MenuName");

  const [id, setid] = useState(0);
  const [ArName, setArName] = useState("");
  const [EnName, setEnName] = useState("");
  const [address, setAddress] = useState("");
  const [attendanceNotes, setAttendanceNotes] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const locale = useSelector((state) => state.language.locale);

  const { state } = useLocation();

  const ID = state?.id;

  const history = useHistory();

  const { intl } = props;

  const { classes } = useStyles();

  const [location, setLocation] = useState();
  const [polygons, setPolygons] = useState([]);

  const mapRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const autocompleteRef = useRef();
  const drawingManagerRef = useRef();

  const defaultCenter = {
    lat: 30.0444,
    lng: 31.2357,
  };

  const [center, setCenter] = useState(defaultCenter);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const autocompleteStyle = {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "240px",
    height: "38px",
    padding: "0 12px",
    borderRadius: "3px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipses",
    position: "absolute",
    right: "8%",
    top: "11px",
    marginLeft: "-120px",
  };

  const deleteIconStyle = {
    cursor: "pointer",
    backgroundImage: `url(${deleteIcon})`,
    height: "24px",
    width: "24px",
    marginTop: "5px",
    backgroundColor: "#fff",
    position: "absolute",
    top: "2px",
    left: "52%",
    zIndex: 99999,
  };

  const polygonOptions = {
    fillColor: "#2196F3",
    fillOpacity: 0.5,
    strokeColor: "#2196F3",
    clickable: true,
    strokeWeight: 2,
    draggable: true,
    editable: true,
    zIndex: 1,
  };

  const drawingManagerOptions = {
    polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
  };

  const onLoadPolygon = (polygon, index) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  };

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const { geometry } = autocompleteRef.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();

    setLocation(geometry.location);
    setAddress(autocompleteRef.current.getPlace().formatted_address);
    setLat(geometry.location.lat());
    setLng(geometry.location.lng());

    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    mapRef.current.fitBounds(bounds);
  };

  const onLoadDrawingManager = (drawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const onOverlayComplete = ($overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({
          id: 0,
          locationId: id,
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);

      const polygonCoordinates = new window.google.maps.Polygon({
        paths: newPolygon,
      });

      const checkPointInsidePolygon = location
        ? window?.google?.maps?.geometry?.poly?.containsLocation(
            location,
            polygonCoordinates
          )
        : false;
      if (!checkPointInsidePolygon) {
        toast.error(
          intl.formatMessage(
            attendanceMessages.MustToMakeThePointInsideTheDrawnArea
          )
        );
      } else {
        setPolygons([newPolygon]);
      }
    }
  };

  const onDeleteDrawing = () => {
    const filtered = polygons.filter(
      (polygon, index) => index !== activePolygonIndex.current
    );
    setPolygons(filtered);
    // clear activePolygonIndex.current after delete
    activePolygonIndex.current = undefined;
  };

  const onEditPolygon = (index) => {
    const polygonRef = polygonRefs.current[index];
    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map((latLng) => ({
          id: 0,
          locationId: id,
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

      const allPolygons = [...polygons];
      allPolygons[index] = coordinates;

      const polygonCoordinates = new window.google.maps.Polygon({
        paths: coordinates,
      });

      const checkPointInsidePolygon =
        window?.google?.maps?.geometry?.poly?.containsLocation(
          location,
          polygonCoordinates
        );
      if (!checkPointInsidePolygon) {
        toast.error(
          intl.formatMessage(
            attendanceMessages.MustToMakeThePointInsideTheDrawnArea
          )
        );
        setPolygons([]);
      } else {
        polygons[0] = coordinates;
        setPolygons(polygons);
      }
    }
  };

  // control on zoom buttons
  const OPTIONS = {
    minZoom: 3,
  };

  const getLocationDataFun = async (lan, lng) => {
    const Addressdata = await api(locale).GoogleMapsGetData(lan, lng);
    setAddress(Addressdata.results[0].formatted_address);
    setLat(lan);
    setLng(lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      id,
      arName: ArName || "",
      enName: EnName || "",
      address: address || "",
      locLat: lat || "",
      locLong: lng || "",
      phone: phone ?? "",
      attendanceNotes: attendanceNotes ?? "",
      seatNo: seatNumber ?? "",
    };

    try {
      const response = await api(locale).save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.TrainingCenterList.route);
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getdata = async () => {
    setIsLoading(true);

    try {
      const elements = await GeneralListApis(locale).GetControlParameterList();

      setElementsData(elements);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    setIsLoading(true);

    try {
      const data = await api(locale).getById(ID);

      data?.polygons?.map((item, index) => {
        data.polygons[index].lat = Number(data.polygons[index].lat);
        data.polygons[index].lng = Number(data.polygons[index].lng);
      });

      setid(data.id);
      setArName(data.arName);
      setEnName(data.enName);
      setAddress(data.address);
      setLat(data.locLat);
      setLng(data.locLong);
      setPhone(data.phone);
      setAttendanceNotes(data.attendanceNotes);
      setSeatNumber(data.seatNo);
      setCenter({ lat: Number(data.locLat), lng: Number(data.locLong) });
      setLocation({ lat: Number(data.locLat), lng: Number(data.locLong) });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (ID) {
      getEditdata();
    }
  }, [ID]);

  function oncancel() {
    history.push(SITEMAP.humanResources.TrainingCenterList.route);
  }

  return (
    
      <PayRollLoader isLoading={isLoading}>
        <PapperBlock whiteBg icon="border_color" title={pageTitle} desc="">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid
                item
                xs={12}
                md={12}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                
              >
                <Grid item xs={6} md={4} lg={3} lg={3} xl={2}>
                  <TextField
                    name="arName"
                    id="arName"
                    placeholder={intl.formatMessage(payrollMessages.arName)}
                    label={intl.formatMessage(payrollMessages.arName)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={ArName}
                    required
                    onChange={(e) => setArName(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <TextField
                    name="enName"
                    id="enName"
                    placeholder={intl.formatMessage(payrollMessages.enName)}
                    label={intl.formatMessage(payrollMessages.enName)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={EnName}
                    required
                    onChange={(e) => setEnName(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <TextField
                    name="Address"
                    id="Address"
                    placeholder={intl.formatMessage(attendanceMessages.Address)}
                    label={intl.formatMessage(attendanceMessages.Address)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2.5}>
                  <TextField
                    name="Latitude"
                    id="Latitude"
                    placeholder={intl.formatMessage(
                      attendanceMessages.Latitude
                    )}
                    label={intl.formatMessage(attendanceMessages.Latitude)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2.5}>
                  <TextField
                    name="Longitude"
                    id="Longitude"
                    placeholder={intl.formatMessage(
                      attendanceMessages.longitude
                    )}
                    label={intl.formatMessage(attendanceMessages.longitude)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <TextField
                    name="phone"
                    id="phone"
                    placeholder={intl.formatMessage(messages.phone)}
                    label={intl.formatMessage(messages.phone)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={phone || ""}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <TextField
                    name="seatNo"
                    id="seatNo"
                    placeholder={intl.formatMessage(messages.seatNumber)}
                    label={intl.formatMessage(messages.seatNumber)}
                    className={`${classes.field} ${style.fieldsSty}`}
                    margin="normal"
                    variant="outlined"
                    value={seatNumber || ""}
                    required
                    onChange={(e) => setSeatNumber(e.target.value)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="attendanceNotes"
                    value={attendanceNotes}
                    onChange={(evt) => setAttendanceNotes(evt.target.value)}
                    label={intl.formatMessage(messages.attendanceNotes)}
                    fullWidth
                    variant="outlined"
                    required
                    multiline
                    rows={1}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <div
                    className="map-container"
                    style={{ position: "relative", marginBottom: "50px" }}
                  >
                    {drawingManagerRef.current && (
                      <Tooltip
                        title={intl.formatMessage(
                          attendanceMessages.selectShapeFiristToDeleteIt
                        )}
                      >
                        <div
                          onClick={onDeleteDrawing}
                          // title='Delete shape'
                          style={deleteIconStyle}
                          className={style.deleteIcon}
                        ></div>
                      </Tooltip>
                    )}

                    <LoadScript
                      id="script-loader"
                      googleMapsApiKey={
                        "AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc"
                      }
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
                          setLocation({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                          });

                          setPolygons([]);
                          getLocationDataFun(e.latLng.lat(), e.latLng.lng());
                        }}
                      >
                        <DrawingManager
                          onLoad={onLoadDrawingManager}
                          onOverlayComplete={onOverlayComplete}
                          options={drawingManagerOptions}
                        />
                        {polygons.map((iterator, index) => (
                          <Polygon
                            key={index}
                            onLoad={(event) => onLoadPolygon(event, index)}
                            onMouseDown={() => {
                              onClickPolygon(index);
                            }}
                            onMouseUp={() => onEditPolygon(index)}
                            // onDragEnd={() => onEditPolygon(index)}
                            options={polygonOptions}
                            paths={iterator}
                            draggable
                            editable
                          />
                        ))}
                        <Autocomplete
                          onLoad={onLoadAutocomplete}
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            type="text"
                            placeholder={intl.formatMessage(
                              attendanceMessages.SearchLocation
                            )}
                            style={autocompleteStyle}
                            className={style.searchSty}
                          />
                        </Autocomplete>

                        {location && <Marker position={location} />}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </Grid>
              </Grid>
            </Grid>


            <Grid container spacing={3} alignItems="flex-start" direction="row">
              <Grid item xs={12} md={12}></Grid>
              <Grid
                item
                xs={12}
                md={4}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.itemsStyle}
              >
                <Grid item >
                  <SaveButton Id={id} processing={isLoading} />
                </Grid>
                <Grid item >
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={oncancel}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>
      </PayRollLoader>
      
  );
}

TrainingCenterCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrainingCenterCreate);
