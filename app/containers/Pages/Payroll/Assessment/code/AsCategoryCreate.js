import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import axiosInstance from '../../api/axios';
import { TextField } from '@mui/material';
import PayRollLoader from '../../Component/PayRollLoader';
import { PapperBlock } from 'enl-components';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import payrollMessages from "../../messages";
import { Button } from '@mui/material';
import api from '../api/AsCategoryCreateData';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function AsCategoryCreate(props) {
    const { intl } = props;
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const locale = useSelector((state) => state.language.locale);
    const title = localStorage.getItem('MenuName');
    const id = location.state?.id ?? 0;
    const [listJop, setListJop] = useState([])
    const [personName, setPersonName] = React.useState([]);
    const [nameAr, setNameAr] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [personNameId, setPersonNameId] = useState(null);

    const handleChange = (event) => {
        const { target: { value } } = event;
        const newPersonName = typeof value === 'string' ? value.split(',') : value;
        setPersonName(newPersonName);
        setPersonNameId(newPersonName.map((el) => `${el.id}`).join());
    };

    const dataListJop = async () => {
        const data = await api(locale).ListJop()
        setListJop(data)
    }

    async function checkPage() {
        if (id == 0) {
            return
        }
        setIsLoading(true)
        try {
            const data = await api().getList(id)
            setNameAr(data.arName)
            setNameEn(data.enName)
            const selectedJobs = data.jobIds.split(",").map((el) => listJop.find((ele) => String(ele.id) === el)).filter(Boolean); 
            setPersonName(selectedJobs); 

        } catch (err) {
            toast.error("Error")
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }


    }

    const save = async () => {
        setIsLoading(true)
        try {
            const dataInput = {
                id: id,
                arName: nameAr,
                enName: nameEn,
                jobids: personNameId,
            }
            const data = await api().save(dataInput)
            console.log(data)
            toast.success(intl.formatMessage(payrollMessages.save))
        } catch (err) {
            toast.error("Error")
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        dataListJop()
    }, [])
    useEffect(() => {
        checkPage()
    }, [listJop])


    return (<>

        <PayRollLoader isLoading={isLoading}>
            <PapperBlock whiteBg icon='border_color' title={title} desc=''>
                <Grid container spacing={3}>
                    <Grid item  >
                        <TextField value={nameAr} onChange={(el) => setNameAr(el.target.value)} id="outlined-basic" label={intl.formatMessage(payrollMessages.arName)} variant="outlined" />
                    </Grid>
                    <Grid item >
                        <TextField value={nameEn} onChange={(el) => setNameEn(el.target.value)} id="outlined-basic" label={intl.formatMessage(payrollMessages.enName)} variant="outlined" />
                    </Grid>
                    <Grid item >
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">
                                {intl.formatMessage(payrollMessages.job)}
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName} 
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((job) => (
                                            <Chip key={job.id} label={job.name} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {listJop.map((el) => (
                                    <MenuItem key={el.id} value={el}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <Button onClick={save} variant="contained"> {id == 0 ? intl.formatMessage(payrollMessages.add) : intl.formatMessage(payrollMessages.save)} </Button>
                    </Grid>
                </Grid>







            </PapperBlock>
        </PayRollLoader>  </>

    )
}

AsCategoryCreate.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(AsCategoryCreate);