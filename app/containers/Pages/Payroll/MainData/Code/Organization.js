import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';


const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function Organization() {
  const title = brand.name + ' - Organization';
  const description = brand.desc;
  const { classes } = useStyles();


  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock whiteBg icon="border_color" title="" desc="">
        <div className={classes.root}>
          
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Organization);
