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
      display: 'none',
      pageBreakBefore: 'always',
      direction: 'ltr',
      '@media print': {
        display: 'block',
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
