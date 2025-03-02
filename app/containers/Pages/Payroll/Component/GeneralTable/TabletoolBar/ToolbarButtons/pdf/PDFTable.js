import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import style from '../../../../../../../../styles/pagesStyle/GeneralTablePrintSty.scss'




function PDFTable({columns, pdfData}) {

  
  return (
    <Table size='small' sx={{ mt: 0 }}  className={style.tableSty}>
          <TableHead>
              <TableRow >
                <TableCell align='center'  >
                </TableCell>

                  {columns.map((col,index)=>(
                    col.print !== false && (
                      <TableCell align='center' key={index} >
                         <pre>  {col.label}  </pre>
                       </TableCell>
                  )))}
                  
              </TableRow>
          </TableHead>
    
          <TableBody>
            {pdfData.map((row,index)=>(

              <TableRow key={index}>
                  <TableCell key={index}  align='center' >
                    <pre>  {index + 1} </pre>
                    </TableCell>

                {columns.map((col,index)=>(
                  col.print !== false && (
                    <TableCell key={index}  align='center' >
                        {col.customBodyRender ? 
                          col.customBodyRender(row)
                        :
                        row[col.name]
                        }
                    </TableCell>
                )))}
              </TableRow>

            ))}
          </TableBody>
    </Table>
  );
}

export default PDFTable;
