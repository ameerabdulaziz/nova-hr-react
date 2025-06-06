import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/NewsData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import useMediaQuery from "@mui/material/useMediaQuery";
import NameList from "../../../Component/NameList";
import useStyles from "../../../Style";
import SaveButton from "../../../Component/SaveButton";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PayRollLoaderInForms from "../../../Component/PayRollLoaderInForms";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import FileViewerPopup from "../../../../../../components/Popup/fileViewerPopup";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SITEMAP from "../../../../../App/routes/sitemap";

function NewsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [data, setdata] = useState({
    id: 0,
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
    header: "",
    details: "",
    newsTypeId: "",
    newsTypeName: "",
    image: "",
    photo: "",
    videoFile: "",
  });
  const [TypeList, setTypeList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [DateError, setDateError] = useState({});
  const [validImageTypes, setValidImageTypes] = useState([
      "image/jpg",
      "jpg",
      "image/jpeg",
      "jpeg",
      "image/png",
      "png",
      "image/apng",
      "apng",
      "image/webp",
      "webp",
      "image/svg+xml",
      "svg+xml",
    ]);
    const [validPDFTypes, setValidPDFTypes] = useState([
      "application/pdf",
      ".pdf",
      "pdf",
    ]);
    const [validVideoTypes, setValidVideoTypes] = useState([
      "video/mp4",
      "mp4",
      "video/mov",
      "mov",
      "video/webm",
      "webm",
      "video/m4v",
      "m4v",
      "video/3gp",
      "3gp",
      "video/mkv",
      "mkv",
      "video/wmv",
      "wmv",
    ]);
  
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
    
    try {
      setIsLoading(true);

      data.fromDate = dateFormatFun(data.fromDate)
      data.toDate = dateFormatFun(data.toDate)


      let response = await ApiData(locale).Save(data, EmployeeList);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.News.route);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(SITEMAP.humanResources.News.route);
  }

  async function fetchData() {
    try {
      const types = await GeneralListApis(locale).GetNewsTypeList(locale);
      setTypeList(types);

      if (id) {
        const result = await ApiData(locale).Get(id ?? 0);
        if (result.employees) {
          setEmployeeList(
            result.employees.map((obj) => {
              return {
                ...obj,
                isSelected: true,
              };
            })
          );
        }

        result.videoFile = result.video
        
        setUploadedFileType(
          result && result.video
                  ? result.video.split('.').pop()
                  : null
              );

        setdata(result);
      }
    } catch (err) {
      
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleClickOpen = (item) => {
    setOpenParentPopup(true);

    // setUploadedFileType(item.type);
    setUploadedFile(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };


  const uploadFileFun = (e) => {

      // check if uploaded file is larger than 500MB
      if (e.target.files[0]) {
          if (e.target.files[0].size < 4000000000) {
            if (validVideoTypes.includes(e.target.files[0].type)) {
              setUploadedFileType(e.target.files[0].type);

              setdata((prevState) => ({
                  ...prevState,
                  videoFile: e.target.files[0],
                }));
            } else {
              toast.error(intl.formatMessage(messages.videoTypeErrorMes));
              
            }
  
        } else {
          toast.error(intl.formatMessage(messages.uploadFileSizeErrorMes));
        }
      }
    };


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.NewsCreateTitle)
            : intl.formatMessage(messages.NewsUpdateTitle)
        }
        desc={""}
      >

      <FileViewerPopup
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
        validVideoTypes={validVideoTypes}
      />

        <form onSubmit={handleSubmit}>
          <Grid container alignItems={"initial"} spacing={3}>
            <Grid
              container
              item
              xl={6}
              xs={12}
              direction="row"
              style={{ maxHeight: "200vh" }}
              spacing={3}
            >
                  <Grid item md={4} xs={6} lg={2.5} xl={3.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={data.fromDate ? dayjs(data.fromDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              fromDate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromDate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item md={4} xs={6} lg={2.5} xl={3.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                         label={intl.formatMessage(Payrollmessages.todate)}
                          value={data.toDate ? dayjs(data.toDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              toDate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`toDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`toDate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

              <Grid item  xs={12} md={6} lg={3} xl={5}>
                <Autocomplete
                  id="newsTypeId"
                  options={TypeList}
                  value={{ id: data.newsTypeId, name: data.newsTypeName }}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      newsTypeId: value !== null ? value.id : 0,
                      newsTypeName: value !== null ? value.name : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="newsTypeId"
                      required
                      label={intl.formatMessage(Payrollmessages.type)}
                    />
                  )}
                />
              </Grid>

              <Grid item  xs={12} md={6} lg={4} xl={12}>
                <TextField
                  id="title"
                  name="title"
                  value={data.header}
                  label={intl.formatMessage(Payrollmessages.title)}
                  className={classes.field}
                  variant="outlined"
                  onChange={(e) =>
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      header: e.target.value,
                    }))
                  }
                  autoComplete='off'
                />
              </Grid>
              
              <Grid item  xs={12} >
                <TextField
                  id="details"
                  name="details"
                  multiline
                  required
                  rows={2}
                  value={data.details}
                  onChange={(e) =>
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      details: e.target.value,
                    }))
                  }
                  label={intl.formatMessage(Payrollmessages.details)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                />
              </Grid>
            </Grid>

            <Grid container item  xs={12} xl={6} direction="row">
              <section className={classes.content}>
                <Grid container item  xs={12} direction="row">
                  <Grid 
                    item 
                    xs={12} 
                    md={6}
                    >
                    {data.image && (
                      <img
                        style={{ width: "150px" }}
                        src={URL.createObjectURL(data.image)}
                        loading="lazy"
                      />
                    )}
                    {data.photo && (
                      <img
                        style={{ width: "150px" }}
                        src={`data:image/jpeg;base64,${data.photo}`}
                        loading="lazy"
                      />
                    )}
                  </Grid>

                  <Grid 
                    item 
                    xs={12} 
                    md={6}  
                    sx={{cursor:"pointer"}}
                    onClick={() => {
                    if (data.videoFile && data.videoFile.length !== 0) {
                      handleClickOpen(data.videoFile);
                    }
                  }}>
                    {data.videoFile && (
                      <img
                        style={{ width: "150px"}}
                        src={`/images/videoIcon.webp`}
                        loading="lazy"
                      />
                    )}
                  </Grid>
                </Grid>

                <Grid container item  xs={12} direction="row">
                  <Grid item xs={12} md={6}>
                      <div className={classes.actions}>
                        <Tooltip title="Upload">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            component="label"
                          >
                            <PhotoCameraIcon  />
                            
                            <input
                              hidden
                              type="file"
                              name="file"
                              className="custom-file-input"
                              id="inputGroupFile"
                              onChange={(e) => {
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  image: e.target.files[0],
                                  photo: "",
                                }));
                              }}
                              accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml"
                            />
                          </Button>
                        </Tooltip>
                      </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                      <div className={classes.actions}>
                        <Tooltip title="Upload">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            component="label"
                          >
                            <VideoCallIcon  />
                            
                            <input
                              hidden
                              type="file"
                              name="file"
                              className="custom-file-input"
                              id="inputGroupFile"
                              onChange={(e) => {
                                uploadFileFun(e)
                              }}
                              accept="video/*"
                            />
                          </Button>
                        </Tooltip>
                      </div>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                  <hr className={classes.hr} />
                </Grid>

                <Grid item xs={12} md={12}>
                  <NameList
                    dataList={EmployeeList}
                    setdataList={setEmployeeList}
                    Key={"Employee"}
                    removeEmpCode ={"hidden"}
                  />
                </Grid>
              </section>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>

            <Grid item >
              <SaveButton Id={id} />
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>

              </Grid>
            </Grid>

          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}
NewsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewsCreate);
