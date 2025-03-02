import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import PDFHeader from './PDFHeader';
import PDFHighlights from './PDFHighlights';
import PDFTable from './PDFTable';
import PDFTimeStamp from './PDFTimeStamp';

const PdfContainer = ({
  printContainerRef,
  filterHighlights,
  columns,
  pdfData,
}) => (


  <Box
    ref={printContainerRef}
    sx={{
      height:"0px",
      width:"0px",
      visibility:"hidden",
      pageBreakBefore: 'always',
      direction: 'ltr',
      '@media print': {
        height:"100%",
        width:"100%",
        visibility:"visible",
      },
      'p.MuiTypography-root, .MuiTableCell-root': {
        fontSize: '7px',
        color: '#000',
      },
      '.mui-style-ltr-daeyzu-MuiButtonBase-root-MuiButton-root':{
        fontSize: '6px',
      },
      '@page': {
        margin: 4,
      },
      svg: {
        fontSize: '0.7rem',
      },
    }}
  >
    {/* Pdf Header with print date and sign-in user */}
    <PDFTimeStamp />

    {/* Pdf Header with company logo */}
    <PDFHeader />

    {/* Pdf Highlights with filter data */}
    <PDFHighlights  filterHighlights={filterHighlights}/>

    {/* Table pdf */}
    <PDFTable columns={columns} pdfData={pdfData}/>
  </Box>
);

export default PdfContainer;
