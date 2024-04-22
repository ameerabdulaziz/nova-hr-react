/* eslint-disable no-unused-vars */
import React from 'react';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { EditTable } from '../../../../Tables/demos';
import generalData from '../api/GeneralData';

function Gender(props1) {
  const title = localStorage.getItem('MenuName');

  
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
      initialValue: '',
      hidden: false,
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
      <PapperBlock whiteBg icon="border_color" title={title} desc="">        
          <EditTable
            anchorTable={anchorTable}
            title={title}
            API={generalData("MdGender")}
          />
      </PapperBlock>
    </div>
  );
}

export default injectIntl(Gender);
