import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MainTable from './tableParts/MainTable';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchAction} from '../../containers/Tables/reducers/crudTbActions';
function CrudTable(props) {
  const {
    title,
    dataTable,
    anchor,
    anchorTable,    
    dataInit,
    API,
    IsNotSave,isNotAdd
  } = props;
  
 console.log("CrudTable");
 const branch = 'crudTableDemo' ;
 const fetchData = useDispatch();
  const getdata =  async () => {
    debugger ;
    if(API)
    {
      const data =  await API.GetList(anchorTable);
      
      fetchData(fetchAction(data.finaldata?data.finaldata:data,
        data.anchorTable?data.anchorTable:anchorTable ,
        branch));
      
    }
    else
      fetchData(fetchAction(dataInit,anchorTable?anchorTable:anchor, branch));
  };
  
  useEffect(() => {
    
    getdata();
  }, [title]);

  return (
    <MainTable
      title={title}
      items={dataTable}      
      anchor={anchor}      
      API={API}
      IsNotSave={IsNotSave}
      isNotAdd={isNotAdd}
    />
  );
}

CrudTable.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataInit: PropTypes.array.isRequired,
  dataTable: PropTypes.array.isRequired
};

export default CrudTable;
