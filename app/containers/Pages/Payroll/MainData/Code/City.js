import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';

import { EditTable } from '../../../../Tables/demos';
import CityApis from '../api/CityData';
//import messages from '../messages';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function City(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');
  const description = brand.desc;
  const { classes } = useStyles();

  const anchorTable = [
    {
      name: 'id',
      label: 'id',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
    {
      name: 'name',
      label: 'name',
      type: 'text',
      width: 'auto',
      hidden: false,
      initialValue: '',
    },
    {
      name: 'EnName',
      label: 'enname',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'govName',
      label: 'govname',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'governmentId',
      label: 'id',
      type: 'text',
      width: 'auto',
      hidden: true,
    },
    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

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
      <PapperBlock whiteBg icon="border_color" title={title ?? ''} desc="">
        <div className={classes.root}>
          {
            <EditTable
              anchorTable={anchorTable}
              title={title}
              API={CityApis(locale)}
            />
          }
        </div>
      </PapperBlock>
    </div>
  );
}
City.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(City);

// import React from 'react';
// import { makeStyles } from 'tss-react/mui';
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import brand from 'enl-api/dummy/brand';
// import { SourceReader, PapperBlock } from 'enl-components';
// import { injectIntl, FormattedMessage } from 'react-intl';
// import messages from '../../../../Tables/messages';
// import { EditableCellDemo } from '../../../../Tables/demos';

// const useStyles = makeStyles()(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

// function City(props) {
//   //   const x =
//   //     intl.formatMessage({ id: 'inRowEditTitle' }) +
//   //     ' ' +
//   //     intl.formatMessage({ id: 'inRowEditTitle' });
//   const title = brand.name + ' - Table';
//   const description = brand.desc;
//   const docSrc = 'containers/Tables/demos/';
//   const { intl } = props;
//   

//   const { classes } = useStyles();

//   return (
//     <div>
//       <Helmet>
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="twitter:title" content={title} />
//         <meta property="twitter:description" content={description} />
//       </Helmet>
//       <FormattedMessage {...messages.inRowEditDesc} />
//       <PapperBlock
//         whiteBg
//         icon="border_color"
//         title={intl.formatMessage(messages.inRowEditTitle)}
//         desc={intl.formatMessage(messages.inRowEditDesc)}
//       >
//         <div className={classes.root}>
//           <EditableCellDemo />
//           <SourceReader componentName={docSrc + 'EditableCellDemo.js'} />
//         </div>
//       </PapperBlock>
//     </div>
//   );
// }

// City.propTypes = {
//   intl: PropTypes.object.isRequired,
// };

// export default injectIntl(City);
