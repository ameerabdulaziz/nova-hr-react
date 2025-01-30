import React, { useEffect, useRef, useState } from 'react'
import messages from '../messages'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import API from '../api/SurveyResultReportData';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Box, Button, Grid } from '@mui/material';
import PayRollLoader from '../../Component/PayRollLoader';
import { PapperBlock } from 'enl-components';
import { useReactToPrint } from 'react-to-print';
import SurveyResultReportPrint from '../report-tamplate/SurveyResultReportPrint';
import Gmassage from '../../messages'
import toast from 'react-hot-toast';
import SITEMAP, { DOMAIN_NAME } from '../../../../App/routes/sitemap';

  
function SurveyResultReport(props) {
    const { intl } = props;
    const printDivRef = useRef(null);
    const title = localStorage.getItem('MenuName');
    const locale = useSelector((state) => state.language.locale);
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [printData, setPrintData] = useState(null)
    const [id, setId] = useState(null);


    const getTableData = async () => {
        setIsLoading(true);
        try {
            const data = await API(locale).getDataList()
            setTableData(data.map((el) => ({
                id: el.id,
                name: el.name
            })))

        } catch (err) {
            //
        } finally {
            setIsLoading(false);

        }
    }

    const getReportData = async () => {

        setIsLoading(true);

        try {
            const data = await API(locale).getDataPrint(id)
            setPrintData(data)
            if (data == null) {
                toast.error(intl.formatMessage(messages.nofound))
                setId(null)
            }
        } catch (err) {
            //
        } finally {
            setIsLoading(false);
        }
    }

    const openReview = () => {

        window.open(`/${DOMAIN_NAME}${SITEMAP.survey.SurveySummaryReview.route}`, "_blank")?.focus()
    }

    const printJS = useReactToPrint({
        content: () => printDivRef?.current,
        documentTitle: intl.formatMessage(messages.Choosequestionnaire),
        onBeforeGetContent: () => {
            setIsLoading(false);
        },
        onAfterPrint: () => {s
            setIsLoading(false);
            setSurveyInfo(null);
            setGroupedQuestion({});
        },
        onPrintError: () => {
            setIsLoading(false);
            setSurveyInfo(null);
            setGroupedQuestion({});
        },
    });

    const setid = (id) => {
        setId(id)
        window.sessionStorage.setItem("idPrviewSurvay", `${id}`)
    }

    useEffect(() => {
        getTableData()
    }, [])

    useEffect(() => {
        if (printData !== null) {
            printJS();
        }

    }, [printData])


    return (<PayRollLoader isLoading={isLoading}>
        <Box
            sx={{
                fontSize: "16px",
                height: "0px",
                visibility: "hidden",
                textAlign: 'left',
                direction: 'rtl',
                ...(locale === 'en' ? { textAlign: 'right', direction: 'ltr', } : {}),
                '@media print': {
                    height: "100%",
                    visibility: "visible",
                },
                'p.MuiTypography-root, .MuiTableCell-root': {
                    fontSize: '12px',
                },
            }}
            ref={printDivRef}>

            <SurveyResultReportPrint data={printData} />

        </Box>

        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
            <Grid container mt={2} ml={2} spacing={4}>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        disablePortal
                        options={tableData}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: '80%' }}
                        onChange={(_, value) => setid(value.id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label={intl.formatMessage(messages.Choosequestionnaire)}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} justifyContent="flex-start">
                        {id != null && (
                            <>
                                <Grid item xs={6} sm={3} md={3}>
                                    <Button
                                        onClick={getReportData}
                                        sx={{ width: '100%', height: 40 }}
                                        variant="contained"
                                    >
                                        {intl.formatMessage(Gmassage.Print)}
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3}>
                                    <Button
                                        onClick={openReview}
                                        sx={{ width: '100%', height: 40 }}
                                        variant="contained"
                                    >
                                        {intl.formatMessage(Gmassage.review)}
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>

        </PapperBlock>

    </PayRollLoader>


    )
}

SurveyResultReport.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyResultReport);

