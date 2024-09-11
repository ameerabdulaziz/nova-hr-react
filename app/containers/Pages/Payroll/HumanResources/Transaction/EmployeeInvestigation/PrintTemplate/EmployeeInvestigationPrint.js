import { Box, Stack, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import payrollMessages from '../../../messages';
  import messages from '../../../messages';
  import { FormattedMessage, injectIntl } from 'react-intl';
import style from "../../../../../../../styles/styles.scss";
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

function EmployeeInvestigationPrint(props) {

  const { 
    intl,
    data
 } = props;

const locale = useSelector((state) => state.language.locale);
const company = useSelector((state) => state.authReducer.companyInfo);

const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  return (
    <>
      <Box
        ref={props.printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
            direction: "ltr",
            'p.MuiTypography-root, .MuiTableCell-root': {
              color: '#000',
            },
          },
          padding:"20px",
          fontFamily:"Cairo"
        }}
      >
        <div style={locale === "en" ? {textAlign: "right"} : {textAlign: "left"}}>
            <img src={company?.logo} alt='' height={35}  />
          </div>

        <h1 className={style.investigationPrintTitle} ><FormattedMessage {...messages.employeeInvestigation} /></h1>

        <p className={style.investigationPrintDate}><FormattedMessage {...messages.date} /> : {dateFormatFun(data?.formInfo?.date)}</p>
        <div className={style.investigationPrintNames} >
            <p>
                <span><FormattedMessage {...messages.investigatorName} /> :</span> &nbsp;
                <span>{data?.formInfo?.investigator?.name}</span>
            </p>
            <p>
                <span><FormattedMessage {...messages.employeeName} /> :</span> &nbsp;
                <span>{data?.formInfo?.employee?.name}</span>
            </p>
        </div>
        <p className={style.investigationPrintSection}><FormattedMessage {...messages.incident} /></p>
        <p>{dateFormatFun(data?.formInfo?.incidentDate)}</p>
        <p>{data?.formInfo?.incident} </p>


        <div  className={style.printContainers}>
          <p className={style.investigationPrintSection}><FormattedMessage {...messages.Questions} /></p>
          <p> <span><FormattedMessage {...messages.q} /> )  </span>{`${data?.formInfo?.Question}`}&nbsp; {data?.formInfo?.Question ? "?" : ""}</p>
          <p> <span><FormattedMessage {...messages.a} /> )  </span> {data?.formInfo?.Answer}</p>
          <br/>
        </div>

        { data && data.queAndAns && (
        Object.keys(data?.queAndAns).map((que,index)=>{
           return <div className={style.printContainers} key={index}>
                <p> <span><FormattedMessage {...messages.q} /> )  </span>{data.queAndAns[que][Object.keys(data.queAndAns[que])[0]]} &nbsp; {data?.formInfo?.Question ? "?" : ""}</p>
                <p> <span><FormattedMessage {...messages.a} /> )  </span> {data.queAndAns[que][Object.keys(data.queAndAns[que])[1]]}</p>
                <br/>
            </div>
            
        }))}


        <div className={style.printContainers}>
          <p className={style.investigationPrintSection}><FormattedMessage {...messages.investigationResult} /></p>
          <p>{data?.formInfo?.InvestigationResult}</p>
        </div>
        <div className={style.investigationPrintSignaturesSection}  >
            <p>
                <span><FormattedMessage {...messages.investigatorSignature} /></span>
                <br/>
                <br/>
                <span>..................................</span>
            </p>
            <p>
                <span><FormattedMessage {...messages.EmployeeSignature} /></span>
                <br/>
                <br/>
                <span>..................................</span>
            </p>
        </div>
      </Box>
    </>
  );
}

EmployeeInvestigationPrint.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeInvestigationPrint);
