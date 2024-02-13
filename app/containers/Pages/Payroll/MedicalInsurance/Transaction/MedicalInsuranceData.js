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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
    govMediCardNumber: '',
  });

  const [certState, setCertState] = useState({
    medCertExpDate: null,
    medCertIssueDate: null,
  });

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
        govMediCardNumber: response.govMediCardNumber ?? '',
      });

      setCertState({
        medCertIssueDate: response.medCertIssueDate ?? null,
        medCertExpDate: response.medCertExpDate ?? null,
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
        govMediCardNumber: '',
      });

      setCertState({
        medCertIssueDate: null,
        medCertExpDate: null,
      });

      setFormInfo((prev) => ({
        ...prev,
        medInsNotes: '',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    let formData = {
      ...formInfo,
      govMedicallyInsured: hasGovernmentInsurance,
      hasMedCert: hasMedicalCert,
    };

    setIsLoading(true);

    if (hasMedicalCert) {
      formData = { ...formData, ...certState };
    }

    if (hasGovernmentInsurance) {
      formData = { ...formData, ...governmentState };
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
                        name='govMediCardNumber'
                        value={governmentState.govMediCardNumber}
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
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.cardExpireDate)}
                          value={governmentState.govMedCareEnd}
                          disabled={!hasGovernmentInsurance}
                          onChange={(date) => {
                            setGovernmentState((prevFilters) => ({
                              ...prevFilters,
                              govMedCareEnd: date,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                              fullWidth
                            />
                          )}
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
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(
                            messages.certificateIssuedDate
                          )}
                          value={certState.medCertIssueDate}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertIssueDate: date,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                              fullWidth
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(
                            messages.certificateExpireDate
                          )}
                          value={certState.medCertExpDate}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertExpDate: date,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                              fullWidth
                            />
                          )}
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
