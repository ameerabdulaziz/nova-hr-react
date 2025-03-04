import React, { useState, useRef, useEffect, useCallback } from "react";
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { formateDate } from '../../../../helpers';
import  PdfContainer  from '../ToolbarButtons/pdf/PDFContainer';
import { 
    Button, 
  } from '@mui/material';



const PrintBtn = ({
    title,
    columns,
    printData,
    setPrintData,
    printFun,
    filterHighlights,
    customPrintCallFun,
}) => {


      const [isPrintLoading, setIsPrintLoading] = useState(false);
      const [printBtnLock, setPrintBtnLock] = useState(false);
      const menuName = localStorage.getItem('MenuName');
      const printContainerRef = useRef(null);
          // Today's formatted date
      const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss') ?? '';
      const documentTitle = `${title || menuName || 'Report'} ${today}`;
      
    
      const printJS = useReactToPrint({
        documentTitle,
        content: () => printContainerRef?.current,
        onBeforeGetContent: () => {
          setIsPrintLoading(true);
        },
        onAfterPrint: () => {
          setIsPrintLoading(false);
          setPrintData([]);
          setPrintBtnLock(false)
        },
        onPrintError: () => {
          setIsPrintLoading(false);
          setPrintData([]);
          setPrintBtnLock(false)
        },
      });
    
      useEffect(() => {
        if (printData.length > 0 && printBtnLock) {
          printJS();
        }
      }, [printData,printBtnLock]);
    

      const onPrintClick = () => {
        printFun()
        setPrintBtnLock(true)
      }


    return(
        <div>
             <Button 
             // customPrintCallFun used to call specific print function comes from another component
              onClick={customPrintCallFun ? 
                  customPrintCallFun 
                : 
                  onPrintClick
                } 
              >
                 <PrintIcon />
            </Button>


            <PdfContainer 
                printContainerRef={printContainerRef} 
                filterHighlights={filterHighlights} 
                columns={columns}
                pdfData={printData}
                />
        </div>
    )
}



export default PrintBtn;