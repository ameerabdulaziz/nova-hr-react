import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import AlertPopup from '../../Component/AlertPopup';
import NameList from '../../Component/NameList';
import PayRollLoader from '../../Component/PayRollLoader';
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
  const [isValueRounding, setIsValueRounding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    try {
      await api(locale).save(formData, dataList.filter((row) => row?.isSelected).map(item => item.id));

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const isLimitBiggerThanSalary = dataList.filter((row) => row?.isSelected).every(item => parseFloat(formInfo.NewMainSal) > item?.fixedElementsSilimit);

    if (isLimitBiggerThanSalary) {
      saveInsurance();
    } else {
      setOpenParentPopup(true);
    }
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={intl.formatMessage(messages.saveConfirmMessage)}
        callFun={saveInsurance}
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
                    fullWidth
                    variant='outlined'
                    InputProps={{
                      endAdornment:
                        updateBy === 'percent' ? (
                          <InputAdornment position='end'>%</InputAdornment>
                        ) : (
                          <></>
                        ),
                    }}
                    autoComplete='off'
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
                  <SaveButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

UpdateInsuranceSalary.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UpdateInsuranceSalary);
