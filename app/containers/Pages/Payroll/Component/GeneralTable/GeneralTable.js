import React, { useState, useMemo, memo } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import style from '../../../../../styles/styles.scss';
// import { FixedSizeList } from "react-window";




const GeneralTable = ({
  columns, 
  dataTable, 
  count, 
  page, 
  setPage, 
  rowsPerPage ,
  setRowsPerPage,
  select,
  disableSelectRowFun,
  selectedRowsIds,
  setSelectedRowsIds,
  selectedRowsData,
  setSelectedRowsData,
}) => {


  const [selected, setSelected] = useState([]);



function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
      style={{minHeight:"auto"}}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Nutrition */}
        </Typography>
      )}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )} */}
    </Toolbar>
  );
}











function EnhancedTableHead(props) {
  const { onSelectAllClick,  numSelected, rowCount, headCells, select

    } = props;


  return (
    <TableHead>
      <TableRow>
        {select && (
        <TableCell padding="checkbox" style={{whiteSpace:"nowrap"}}>
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        )}

        {headCells.map((headCell,index) => (
          <TableCell
            key={index}
            style={{whiteSpace:"nowrap"}}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}









  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = dataTable.map((n) => n.id);
  //     const newSelectedData = dataTable.map((n) => n);
  //     // const newSelected = rows.map((n) => n.id);
  //     setSelected(newSelected);
  //     setSelectedRowsIds(newSelected)
  //     setSelectedRowsData(newSelectedData)
  //     return;
  //   }
  //   setSelected([]);
  //   setSelectedRowsIds([])
  //   setSelectedRowsData([])
  // };

  const handleClick =  (event, id, row) => {
    const selectedIndex = selectedRowsIds.indexOf(id);
    // const dataIndex = selectedRowsData.findIndex(item => item.id === id);
    const rowExists = selectedRowsData.some(item => item.id === id);
    let newSelected = [];
    let newSelectedData = [];


    

    if (selectedIndex === -1 ) {
      newSelected = newSelected.concat(selectedRowsIds, id);
    } else if (selectedIndex === 0 ) {
      newSelected = newSelected.concat(selectedRowsIds.slice(1));
    } else if (selectedIndex === selectedRowsIds.length - 1  ) {
     
      newSelected = newSelected.concat(selectedRowsIds.slice(0, -1));
    } else if (selectedIndex > 0  ) {
     

      
      newSelected = newSelected.concat(
        selectedRowsIds.slice(0, selectedIndex),
        selectedRowsIds.slice(selectedIndex + 1),
      );

    }


    if(!rowExists)
      {
        newSelectedData =  newSelectedData.concat(selectedRowsData,row);
      }
      else
      {
        newSelectedData = selectedRowsData.filter(item => item.id !== id);
      }


    setSelected(newSelected);
    setSelectedRowsIds(newSelected)
    setSelectedRowsData(newSelectedData)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



const visibleRows = useMemo(
  () => {return dataTable},
  [dataTable],
);



  // const rowHeight = 50; // Adjust based on your row height
  // const tableHeight = 400;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} style={{borderTopLeftRadius:"0",borderTopRightRadius:"0"}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer  >
        {/* <TableContainer  style={{ height: tableHeight, overflow: "hidden" }}> */}
          <Table
            sx={{ minWidth: 750, }}
            aria-labelledby="tableTitle"
            className={style.generalTableSty}
          >
            <EnhancedTableHead
              numSelected={selectedRowsIds.length}
              // onSelectAllClick={handleSelectAllClick}
              rowCount={dataTable.length}
              headCells={columns}
              select={select}
            />
            <TableBody>
              {/* {visibleRows.map((row, index) => { */}
              {/* {rows.map((row, index) => { */}

              {/* <FixedSizeList
                height={tableHeight}
                itemCount={3}
                itemSize={rowHeight}
                width="100%"
              >
                  {({ index, style }) =>
                 <TableRow
                    // hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    // key={index}
                    // selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    
                      <TableCell align="left" >
                         id
                        </TableCell>

                        <TableCell align="left" >
                         name
                        </TableCell>
                  </TableRow>
}
              </FixedSizeList> */}



            {/* <TableBody> */}

              


  {visibleRows.map((row, index) => {
  // {dataTable.map((row, index) => {
                const isItemSelected = selectedRowsIds.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                // console.log("row =", row);
                disableSelectRowFun &&  !disableSelectRowFun(row)

                return (
                  <TableRow
                    // hover
                    onClick={(event) => { (disableSelectRowFun &&  !disableSelectRowFun(row)) || select ? handleClick(event, row.id,row) : null}}
                    // onClick={(event) => {select ? handleClick(event, row.id,row) : null}}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {select && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        disabled={disableSelectRowFun ? disableSelectRowFun(row) : false}
                      />
                    </TableCell>
                    )}


                    {columns.map((colName,index2)=>(

                        <TableCell align="left" key={index2}>
                          <pre>
                            {
                              // customBodyRender => used to send custom ui from the parent component the show it in the cell in the table row
                              colName.customBodyRender ?
                                colName.customBodyRender(row)
                              : row[colName.name]

                            // row[colName.name]
                            }
                          </pre>
                        </TableCell>
                    ))}
                  </TableRow>
                );
              })}

              
            


{/* <TableBody> */}


              {/* <FixedSizeList
          height={tableHeight - 56} // Adjust for header height
          itemCount={dataTable.length}
          itemSize={rowHeight}
          width="100%"
          outerElementType={TableBody} 
          // innerElementType={"tbody"} 
        >
          {({ index, style }) => {
            const row = dataTable[index];
            const isItemSelected = selected.includes(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;


            console.log("row22 =", row);
            

            return (
            
              <TableRow
                style={style}
                key={row.id}
                selected={isItemSelected}
                onClick={(event) => handleClick(event, row.id)}
                // onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>

                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} align="left" style={{ width: col.width }}>
                    {row[col.name]}
                  </TableCell>
                ))}
              </TableRow>
           
            );
          }}
        </FixedSizeList> */}

        {/* </TableBody> */}


{/* </Table> */}


            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </Box>
  );
}


export default memo(GeneralTable);