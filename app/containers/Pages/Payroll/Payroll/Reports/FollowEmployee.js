import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";

function FollowEmployee(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });


  const [ElementsList, setElementsList] = useState([]);
  const [Element, setElement] = useState(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSearch = async (e) => {

    if(searchData.EmployeeId.length !== 0 && Element)
    {

    try {
      setIsLoading(true);

      let formData = {
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,

      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      
      const dataApi = await ApiData(locale).FollowEmployeeReport(searchData.EmployeeId,Element,formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.youMustToChooseEmployeeAndElement));
    }
  };

  async function fetchData() {
    try {
      const elements = await GeneralListApis(locale).GetElementListByType(1);
    
    setElementsList(elements)

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "mindate",
      label: intl.formatMessage(messages.FromMonth),
      options: {
        filter: true,
      },
    },
    {
        name: "maxdate",
        label: intl.formatMessage(messages.ToMonth),
      options: {
        filter: true,
      },
    },
    {
        name: "elemVal",
        label: intl.formatMessage(messages.Trx_Value),
      options: {
        filter: true,
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
            ></Search>
          </Grid>


           <Grid item xs={12} md={3}>
           
           <Autocomplete
               id="ddlMenu"   
               isOptionEqualToValue={(option, value) => option.id === value.id}                      
               options={ElementsList.length != 0 ? ElementsList: []}
               getOptionLabel={(option) =>(
                   option  ? option.name : ""
               )
               }
               renderOption={(props, option) => {
                   return (
                   <li {...props} key={option.id}>
                       {option.name}
                   </li>
                   );
               }}
               onChange={(event, value) => {
                   if (value !== null) {
                    setElement(value);
                   } else {
                    setElement("");
                   }
               }}
               renderInput={(params) => (
               <TextField
                   {...params}
                   name="Element"
                      label={intl.formatMessage(messages.element)}
                   margin="normal" 
                   className={style.fieldsSty}
                   
                   />

               )}
               /> 
           </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

FollowEmployee.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(FollowEmployee);
