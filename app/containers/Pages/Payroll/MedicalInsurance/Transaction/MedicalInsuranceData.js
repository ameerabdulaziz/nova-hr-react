import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import { formateDate } from '../../helpers';
import api from '../api/MedicalInsuranceData';
import messages from '../messages';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { format } from "date-fns";
import Payrollmessages from "../../messages";

function MedicalInsuranceData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const { classes } = useStyles();

  const [hasMedicalCert, setHasMedicalCert] = useState(false);
  const [hasGovernmentInsurance, setHasGovernmentInsurance] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: '',
    medInsNotes: '',
    minsuranceSubscriptionModel: [],
  });

  const [governmentState, setGovernmentState] = useState({
    govMedCareEnd: null,
    medicalNumber: '',
  });

  const [certState, setCertState] = useState({
    medCertExpDate: null,
    medCertIssueDate: null,
  });


  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  const handleEmpChange = useCallback((id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    }
  }, []);

  const onGovernmentNumericInputChange = (evt) => {
    setGovernmentState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const GetEmployeeInfo = async () => {
    try {
      setIsLoading(true);
      const response = await api(locale).GetEmployeeById(formInfo.employeeId);

      setHasGovernmentInsurance(response.govMedicallyInsured);
      setHasMedicalCert(response.hasMedCert);

      setGovernmentState({
        govMedCareEnd: response.govMedCareEnd ?? null,
        medicalNumber: response.govMediCardNumber ?? '',
      });

      setCertState({
        medCertIssueDate: dateFormatFun(response.medCertIssueDate) ?? null,
        medCertExpDate: dateFormatFun(response.medCertExpDate) ?? null,
      });

      setFormInfo((prev) => ({
        ...prev,
        medInsNotes: response.medInsNotes ?? '',
        minsuranceSubscriptionModel: response.minsuranceSubscriptionModel ?? [],
      }));
    } catch (error) {
      setHasGovernmentInsurance(false);
      setHasMedicalCert(false);

      setGovernmentState({
        govMedCareEnd: null,
        medicalNumber: '',
      });

      setCertState({
        medCertIssueDate: null,
        medCertExpDate: null,
      });

      setFormInfo((prev) => ({
        ...prev,
        medInsNotes: '',
        minsuranceSubscriptionModel: [],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    let formData = {
      ...formInfo,
      govMedicallyInsured: hasGovernmentInsurance,
      hasMedCert: hasMedicalCert,
    };

    setIsLoading(true);

    if (hasMedicalCert) {
      certState.medCertExpDate = dateFormatFun(certState.medCertExpDate)
      certState.medCertIssueDate = dateFormatFun(certState.medCertIssueDate)

      formData = { ...formData, ...certState };
    }

    if (hasGovernmentInsurance) {
      governmentState.govMedCareEnd = dateFormatFun(governmentState.govMedCareEnd)

      formData = {
        ...formData,
        govMediCardNumber: governmentState.medicalNumber,
        govMedCareEnd: governmentState.govMedCareEnd
      };
    }

    try {
      await api(locale).Save(formData);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formInfo.employeeId) {
      GetEmployeeInfo();
    }
  }, [formInfo.employeeId]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const getFamilyCount = (row) => (row.fathersNo ?? 0) + (row.wivesNo ?? 0) + (row.childrenNo ?? 0);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2} direction='row'>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.employeeId}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className={classes.card} sx={{ mt: '0!important' }}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasGovernmentInsurance}
                        onChange={(evt) => setHasGovernmentInsurance(evt.target.checked)
                        }
                      />
                    }
                    label={intl.formatMessage(
                      messages.governmentMedicalInsurance
                    )}
                  />

                  <Grid
                    container
                    spacing={2}
                    mt={0}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={6}>
                      <TextField
                        name='medicalNumber'
                        value={governmentState.medicalNumber}
                        disabled={!hasGovernmentInsurance}
                        required
                        onChange={onGovernmentNumericInputChange}
                        label={intl.formatMessage(messages.medicalCardNumber)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                  <Grid item xs={12} md={6}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.cardExpireDate)}
                          value={governmentState.govMedCareEnd ? dayjs(governmentState.govMedCareEnd) : null}
                          disabled={!hasGovernmentInsurance}
                          onChange={(date) => {
                            setGovernmentState((prevFilters) => ({
                              ...prevFilters,
                              govMedCareEnd: date,
                            }));
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`govMedCareEnd`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`govMedCareEnd`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className={classes.card} sx={{ mt: '0!important' }}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasMedicalCert}
                        onChange={(evt) => setHasMedicalCert(evt.target.checked)
                        }
                      />
                    }
                    label={intl.formatMessage(messages.medicalCert)}
                  />

                  <Grid
                    container
                    spacing={2}
                    mt={0}
                    alignItems='flex-start'
                    direction='row'
                  >
                  <Grid item xs={12} md={6}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(
                          messages.certificateIssuedDate
                        )}
                          value={certState.medCertIssueDate ? dayjs(certState.medCertIssueDate) : null}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertIssueDate: date,
                            }));
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`medCertIssueDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`medCertIssueDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(
                          messages.certificateExpireDate
                        )}
                          value={certState.medCertExpDate ? dayjs(certState.medCertExpDate) : null}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertExpDate: date,
                            }));
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`medCertExpDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`medCertExpDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: true,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='medInsNotes'
                value={formInfo.medInsNotes}
                onChange={onInputChange}
                label={intl.formatMessage(messages.hrNotes)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            {formInfo.minsuranceSubscriptionModel.length > 0 && (
              <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {intl.formatMessage(messages.insuranceCompany)}
                        </TableCell>
                        <TableCell>
                          {intl.formatMessage(messages.insuranceCategory)}
                        </TableCell>
                        <TableCell>
                          {intl.formatMessage(messages.medicalCardNumber)}
                        </TableCell>
                        <TableCell>
                          {intl.formatMessage(messages.medicalEndDate)}
                        </TableCell>
                        <TableCell>
                          {intl.formatMessage(messages.familyCount)}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formInfo.minsuranceSubscriptionModel.map(
                        (row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell>{row.insuCompanyName}</TableCell>
                            <TableCell>{row.medInsuCatName}</TableCell>
                            <TableCell>{row.privlMedCareNumber}</TableCell>
                            <TableCell>
                              {formateDate(row.medCareEndDate)}
                            </TableCell>
                            <TableCell>{getFamilyCount(row)}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <SaveButton processing={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

MedicalInsuranceData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MedicalInsuranceData);
