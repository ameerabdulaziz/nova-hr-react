import React from 'react';
  import style from "../../../../../styles/pagesStyle/DetailedAttendanceReportTemplateSty.scss";
  import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
  
  function DetailedAttendanceTable({header,Data,headerType}) {

    return (
        <TableContainer className={style.tableContainerSty}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        {header.map((ele,index)=>(
                            <TableCell align='center' key={index}>
                                {ele}
                            </TableCell>
                        ))}
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* print by employee */}
                    { headerType === "employee" ?
                            Data.map((data,index)=>(
                                <TableRow key={index}>
                                        <TableCell align='center' >
                                            {data.dayName}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {format(new Date(data.shiftDate), "yyyy-MM-dd")}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.timeIn}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.timeOut}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.worktime}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.lateMin}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.extraTime}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.lessTime}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.vac ? (
                                                    <CheckIcon style={{ color: "#3f51b5" }} />
                                                ) : (
                                                    <CloseIcon style={{ color: "#717171" }} />
                                                )}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.mission ? (
                                                    <CheckIcon style={{ color: "#3f51b5" }} />
                                                ) : (
                                                    <CloseIcon style={{ color: "#717171" }} />
                                                )}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.per ? (
                                                    <CheckIcon style={{ color: "#3f51b5" }} />
                                                ) : (
                                                    <CloseIcon style={{ color: "#717171" }} />
                                                )}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.shiftVacancy ? (
                                                    <CheckIcon style={{ color: "#3f51b5" }} />
                                                ) : (
                                                    <CloseIcon style={{ color: "#717171" }} />
                                                )}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.absence ? (
                                                    <CheckIcon style={{ color: "#3f51b5" }} />
                                                ) : (
                                                    <CloseIcon style={{ color: "#717171" }} />
                                                )}
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.Manual}
                        
                                        </TableCell>
                                </TableRow>
                        ))
                        : 
                            //  print by Date 
                        Data.map((data,index)=>(
                            <TableRow key={index}>
                                    <TableCell align='center' >
                                        {data.employeeCode}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.employeeName}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.timeIn}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.timeOut}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.worktime}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.lateMin}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.extraTime}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.lessTime}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.vac ? (
                                                <CheckIcon style={{ color: "#3f51b5" }} />
                                            ) : (
                                                <CloseIcon style={{ color: "#717171" }} />
                                            )}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.mission ? (
                                                <CheckIcon style={{ color: "#3f51b5" }} />
                                            ) : (
                                                <CloseIcon style={{ color: "#717171" }} />
                                            )}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.per ? (
                                                <CheckIcon style={{ color: "#3f51b5" }} />
                                            ) : (
                                                <CloseIcon style={{ color: "#717171" }} />
                                            )}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.shiftVacancy ? (
                                                <CheckIcon style={{ color: "#3f51b5" }} />
                                            ) : (
                                                <CloseIcon style={{ color: "#717171" }} />
                                            )}
                                    </TableCell>
                                    <TableCell align='center' >
                                        {data.absence ? (
                                                <CheckIcon style={{ color: "#3f51b5" }} />
                                            ) : (
                                                <CloseIcon style={{ color: "#717171" }} />
                                            )}
                                    </TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
  }
  

  
  export default DetailedAttendanceTable;
  