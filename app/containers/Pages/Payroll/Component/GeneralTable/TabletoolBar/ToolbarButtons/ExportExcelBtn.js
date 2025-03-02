import React, { useState, useRef, useEffect, useCallback } from "react";
import { formateDate } from '../../../../helpers';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import XLSX from 'xlsx-js-style';
import { 
    Button, 
  } from '@mui/material';



const ExportExcelBtn = ({
    title,
    exportFun,
    exportdata,
    setExportData,
    columns,
}) => {


      const [exportBtnLock, setExportBtnLock] = useState(false);
      const menuName = localStorage.getItem('MenuName');
      // Today's formatted date
      const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss') ?? '';
      const documentTitle = `${title || menuName || 'Report'} ${today}`;
      


      function exportExcel(cols, data, title = 'Report') {
        // Table data base on visible columns
        const sheetData = data.map((row) => {
          const rowData = {};
      
          cols.forEach((col) => {
            if (col?.export !== false && col.label) {
              rowData[col.label] = row[col.name];
            }
          });
      
          return rowData;
        });
      
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });
      
        const downloadURI = window.URL.createObjectURL(blob);
      
        // Create dummy "a" link to download the file
        const link = document.createElement('a');
        link.setAttribute('href', downloadURI);
        link.setAttribute('download', title);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadURI);

        setExportData([])
      }
    
   
      const exportExcelFun = () => {
        exportExcel(columns, exportdata, documentTitle);
      };

  
    const onExportClick = () => {
        exportFun()
        setExportBtnLock(true)
    }


    useEffect(()=>{
        if(exportdata.length !== 0 && exportBtnLock)
        {
            exportExcelFun()
            setExportBtnLock(false)
        }
    },[exportdata])


    return(
        <div>
             <Button 
              onClick={onExportClick} 
              >
                 <BackupTableIcon />
            </Button>


           
        </div>
    )
}



export default ExportExcelBtn;