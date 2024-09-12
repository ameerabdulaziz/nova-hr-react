import React, { useState, useEffect, useMemo } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/MissionTypeData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { Button, Grid, TextField, Autocomplete, Checkbox } from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { useLocation } from "react-router-dom";
import PayRollLoader from "../../../Component/PayRollLoader";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import style from '../../../../../../styles/styles.scss';

function MissionTypeCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    transportaion: "",
    notificationUsers: [],
    transportationType: {id: 1 , name: "All Days"}
  });
  const [EmployeeList, setEmployeeList] = useState([]);
  const [transportationTypeList, setTransportationTypeList] = useState([
    {id: 1 , name: "All Days"},
    {id: 2 , name: "One Day"},
  ]);

  const history = useHistory();
  const pageTitle = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event,value) => {

    if (event.target.name == "arName")
      setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));

    if (event.target.name == "enName")
      setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));

      if (event.target.name == "transportaion") {
        setdata((prevFilters) => ({
          ...prevFilters,
          transportaion: event.target.value,
        }));
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const bodyData = {
        id: data.id,
        arName: data.arName,
        enName: data.enName,
        transportaion: data.transportaion,
        notificationUsers: data.notificationUsers.length !== 0 ? `,${data.notificationUsers.map((item) => item.id).join(",")},`  : null,
        transportationType: data.transportationType ? data.transportationType.id : null
      }

      
      let response = await ApiData(locale).Save(bodyData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/MissionType`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/MissionType`);
  }

 
  async function fetchData() {
    try {

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees)

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const getEditdata =  async () => {
    setIsLoading(true);

    try {
      const data =  await ApiData(locale).GetDataById(id); 

      // used to convert notificationUsers string into array of objects to use it in autocomplete
      const notificationUsersData = data.notificationUsers
          ? data.notificationUsers.slice(1, -1).split(",").map((user,index) => {

            const userData = EmployeeList.find((item) => item.id == user);

              return {
                id: userData.id,
                name: userData.name,
              };

            })
          : [];

        setdata((prevState) => ({
          ...prevState,
            id : data ? data.id : "",
            arName: data ? data.arName : "",
            enName: data ? data.enName : "",
            transportaion: data ? data.transportaion : "",
            notificationUsers: notificationUsersData && notificationUsersData.length !== 0  ? notificationUsersData : [],
            transportationType: data && data.transportationType ? transportationTypeList.find((item)=> item.id === data.transportationType) : "",
        }))

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  
  };


  useEffect(() => {
    
    if(id && EmployeeList.length !== 0)
      {
      
      getEditdata();
    }
  }, [id,EmployeeList]);


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={pageTitle}
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item container spacing={3} alignItems="flex-start" direction="row">
              <Grid item xs={12} md={3}>
                <TextField
                  id="arName"
                  name="arName"
                  value={data.arName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(Payrollmessages.arName)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="enName"
                  name="enName"
                  value={data.enName}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(Payrollmessages.enName)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="transportaion"
                  name="transportaion"
                  value={data.transportaion}
                  onChange={(e) => handleChange(e)}
                  label={intl.formatMessage(messages.transportaion)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete='off'
                  required
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3} alignItems="flex-start" direction="row">
              <Grid item xs={12} md={3}>
              <Autocomplete
              id="notificationUsers"
                        options={EmployeeList}
                        multiple
                        disableCloseOnSelect
                        className={`${style.AutocompleteMulSty} ${
                          locale === 'ar' ? style.AutocompleteMulStyAR : null
                        }`}
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        value={ data.notificationUsers }
                        renderOption={(props, option, { selected }) => (
                          <li {...props} key={props.id} name="notificationUsers" >
                            <Checkbox
                            name="notificationUsers"
                              icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                              checkedIcon={<CheckBoxIcon fontSize='small' />}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.name}
                          </li>
                        )}
                        getOptionLabel={(option) => (option ? option.name : '')}

                        onChange={(event, value) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              notificationUsers: value !== null ? value : null,
                            }));
                          }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.notificationUsers)}
                            name="notificationUsers"
                          />
                        )}
                      />
              </Grid>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  id="transportationType"
                  options={transportationTypeList}
                  value={
                      data.transportationType
                  }
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {                  
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      transportationType: value !== null ? value : null,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="transportationType"
                      label={intl.formatMessage(messages.transportationType)}            
                      required               
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>

            <Grid item xs={12} md={2}>
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
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
MissionTypeCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(MissionTypeCreate);
