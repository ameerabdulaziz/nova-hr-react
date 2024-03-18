import React, { useEffect, useState } from "react";
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
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ApiData from "../api/EmployeeReportsApiData";
import PayRollLoader from "../../Component/PayRollLoader";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate } from "../../helpers";

function EmploymentDocsDetails(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [DocumentTypesList, setDocumentTypesList] = useState([]);
  const [DocumentType, setDocumentType] = useState(null);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [Bank, setBank] = useState(false);
  const [Cash, setCash] = useState(false);
  const [SoftCopy, setSoftCopy] = useState(false);
  const [HardCopy, setHardCopy] = useState(false);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSearch = async (e) => {


    let DocumentTypeData = []
    if(DocumentType !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    DocumentType.map((ele, index)=>{
            DocumentTypeData.push(ele.id)
        })
    }
    

    try {
      setIsLoading(true);

      let formData = {
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmpStatusId: searchData.EmpStatusId,
        Bank: Bank,
        Cash: Cash,
        SoftCopy: SoftCopy,
        HardCopy: HardCopy,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      
      const dataApi = await ApiData(locale).GetEmploymentDocsDetailsReport(formData, DocumentTypeData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const Documents = await GeneralListApis(locale).GetDocumentList();

      setDocumentTypesList(Documents)
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
      name: "organizationName",
      label: intl.formatMessage(messages.organization),
      options: {
        filter: true,
      },
    },

    {
        name: "employeeCode",
        label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },

    {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
        name: "birthDate",
        label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
        name: "hiringDate",
        label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: "job",
      label: intl.formatMessage(messages.job),
    options: {
      filter: true,
    },
    },
    {
      name: "documentName",
      label: intl.formatMessage(messages.document),
      options: {
        filter: true,
      },
    },
    {
      name: "issueDate",
      label: intl.formatMessage(messages.IDCardIssuingDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: "expDate",
      label: intl.formatMessage(messages.expireDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: "notes",
      label: intl.formatMessage(messages.notes),
      options: {
        filter: true,
        noWrap:true
      },
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              notShowDate={true}
              setIsLoading={setIsLoading}
            ></Search>
          </Grid>

          <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={DocumentTypesList.length != 0 ? DocumentTypesList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setDocumentType(value);
                          } else {
                            setDocumentType(null);
                          }
                      }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.name}
                            </li>
                          )}
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label={intl.formatMessage(messages.DocumentTypes)}
                            />
                          )}
                        />
              
                  </Grid>

                    <Grid item xs={12}  md={2}> 
                      <FormControlLabel  
                        control={ 
                          <Switch  
                          checked={Bank} 
                          onChange={() => 
                            setBank(!Bank)
                          }
                          color="primary" 
                          />} 
                        label={intl.formatMessage(messages.Bank) }
                        />
                    </Grid>

                    <Grid item xs={12}  md={2}> 
                      <FormControlLabel  
                        control={ 
                          <Switch  
                          checked={Cash} 
                          onChange={() => 
                            setCash(!Cash)
                          }
                          color="primary" 
                          />} 
                        label={intl.formatMessage(messages.Cash) }
                        />
                    </Grid>

                    <Grid item xs={12}  md={2}> 
                      <FormControlLabel  
                        control={ 
                          <Switch  
                          checked={SoftCopy} 
                          onChange={() => 
                            setSoftCopy(!SoftCopy)
                          }
                          color="primary" 
                          />} 
                        label={intl.formatMessage(messages.SoftCopy) }
                        />
                    </Grid>

                    <Grid item xs={12}  md={2}> 
                      <FormControlLabel  
                        control={ 
                          <Switch  
                          checked={HardCopy} 
                          onChange={() => 
                            setHardCopy(!HardCopy)
                          }
                          color="primary" 
                          />} 
                        label={intl.formatMessage(messages.HardCopy) }
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

      <PayrollTable
        title=""
        data={data}
        columns={columns}
      />
    </PayRollLoader>
  );
}

EmploymentDocsDetails.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmploymentDocsDetails);
