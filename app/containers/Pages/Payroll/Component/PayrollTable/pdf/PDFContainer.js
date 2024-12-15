import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import PDFHeader from './PDFHeader';
import PDFHighlights from './PDFHighlights';
import PDFTable from './PDFTable';
import PDFTimeStamp from './PDFTimeStamp';

const PdfContainer = forwardRef((_props, containerRef) => (
  <Box
    ref={containerRef}
    sx={{
      height:"0px",
      visibility:"hidden",
      pageBreakBefore: 'always',
      direction: 'ltr',
      '@media print': {
        height:"100%",
        visibility:"visible",
      },
      'p.MuiTypography-root, .MuiTableCell-root': {
        fontSize: '7px',
        color: '#000',
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
    <PDFHighlights />

    {/* Table pdf */}
    <PDFTable />
  </Box>
));

export default PdfContainer;
