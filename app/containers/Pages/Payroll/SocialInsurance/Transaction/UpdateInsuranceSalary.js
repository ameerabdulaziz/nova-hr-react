import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import AlertPopup from '../../Component/AlertPopup';
import NameList from '../../Component/NameList';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import api from '../api/UpdateInsuranceSalaryData';
import messages from '../messages';

function UpdateInsuranceSalary(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const { classes } = useStyles();

  const [openParentPopup, setOpenParentPopup] = useState(false);

  const [updateBy, setUpdateBy] = useState('value');
  const [maxLimit, setMaxLimit] = useState(0);
  const [isValueRounding, setIsValueRounding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    NewMainSal: '',
  });

  const [dataList, setDataList] = useState([]);

  const saveInsurance = async () => {
    const formData = {
      ...formInfo,
      ChkPerc: updateBy === 'percent',
      chkRound: isValueRounding,
    };

    setProcessing(true);
    setIsLoading(true);

    try {
      await api(locale).save(formData, dataList.map(item => item.id));

      toast.success(notif.saved);
    } catch (error) {
      // toast.error(JSON.stringify(error.response.data ?? error));
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (parseFloat(formInfo.NewMainSal) > maxLimit) {
      setOpenParentPopup(true);
    } else {
      saveInsurance();
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const office = await api(locale).GetInsuMaxLimits();
      setMaxLimit(office);
    } catch (err) {
      // toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >
      <Backdrop
        sx={{
          color: 'primary.main',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.69)',
        }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={intl.formatMessage(messages.saveConfirmMessage)}
        callFun={saveInsurance}
        processing={processing}
      />

      <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={6}>
              <RadioGroup
                value={updateBy}
                onChange={(evt) => setUpdateBy(evt.target.value)}
                sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  sx={{ mx: 0 }}
                  value='value'
                  control={<Radio />}
                  label={intl.formatMessage(messages.updateByValue)}
                />
                <FormControlLabel
                  sx={{ mx: 0 }}
                  value='percent'
                  control={<Radio />}
                  label={intl.formatMessage(messages.updateByPercent)}
                />
              </RadioGroup>

              <Card className={classes.card}>
                <CardContent>
                  <TextField
                    name='NewMainSal'
                    value={formInfo.NewMainSal}
                    onChange={onNumericInputChange}
                    label={intl.formatMessage(messages.insuranceSalary)}
                    className={classes.field}
                    variant='outlined'
                    InputProps={{
                      endAdornment:
                        updateBy === 'percent' ? (
                          <InputAdornment position='end'>%</InputAdornment>
                        ) : (
                          <></>
                        ),
                    }}
                  />

                  {/* <FormControlLabel
                    sx={{ mt: 3 }}
                    control={
                      <Checkbox
                        checked={updateBy === 'value' ? false : isValueRounding}
                        disabled={updateBy === 'value'}
                        onChange={(evt) => setIsValueRounding(evt.target.checked)
                        }
                      />
                    }
                    label={intl.formatMessage(messages.updateSalaryRoundingMessage)}
                  /> */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <NameList
                      dataList={dataList}
                      setdataList={setDataList}
                      Key={'Employee'}
                      IsInsured
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton processing={processing} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </Box>
  );
}

export default injectIntl(UpdateInsuranceSalary);
