import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../Dashboard/api";
import Payrollmessages from "../messages";
import { useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import PayRollLoader from "../Component/PayRollLoader";
import bgImg from "../../../../../public/images/bg.jpg";
import { ServerURL } from '../api/ServerConfig';
import style from '../../../../styles/styles.scss';

function NewsDetails(props) {

  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { dataKey, id, newsData } = location.state ;
  const [data, setdata] = useState();
  const [isLoading, setIsLoading] = useState(true);



  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response
      
      if(id)
        {
        response = newsData
        }
        else
        {
          response = await ApiData(locale).getAllNews();
        }

        setdata(response);
        setIsLoading(false);
    } catch (err) {      
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(dataKey)
    {
        fetchData();
    }
  }, [dataKey,id]);


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={intl.formatMessage(Payrollmessages.News)}
        desc={""}
      >
        <>
          {data && (
              data.map((item,index)=>{
                  return <div key={index}>
                        <Grid
                          container
                          item
                          direction="row"
                        >
                          <Grid item xs={12}>
                          <div className={style.NewsDetailsContainer} style={{ backgroundImage:`url('${item.photo ? `data:image/jpeg;base64,${item.photo}`: bgImg}')`}}>
                              <div>
                                  <div>
                                      <p>{item.newsTypeName}</p>
                                      <p>
                                          {item.header}
                                      </p>
                                      <p>{dateFormatFun(item.fromDate)} - {dateFormatFun(item.toDate)}</p>
                                      <p>{item.details}</p>
                                  </div>
                              </div>
                              <div></div>
                          </div>
                          </Grid>
                        {item.video && (
                          <Grid item xs={12}>
                              <div>
                                  <video width="100%" height="500" controls>
                                      <source src={`${ServerURL}${item.video}`} type="video/mp4" />
                                      Your browser does not support the video tag.
                                  </video>
                              </div>
                          </Grid>
                        )}
                      </Grid>
                  <br/>
                  <br/>
                  <br/>
                </div>
              })
          )}
        </>
      </PapperBlock>
    </PayRollLoader>
  );
}
NewsDetails.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewsDetails);
