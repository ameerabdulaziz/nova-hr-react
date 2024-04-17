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
                                index <= 30 ? 
                                <TableRow key={index}>
                                        <TableCell align='center' >
                                            <pre>{data.dayName}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{format(new Date(data.shiftDate), "yyyy-MM-dd")}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{format(new Date(data.timeIn), "HH:mm:ss")}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{format(new Date(data.timeOut), "HH:mm:ss")}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{data.worktime}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{data.lateMin}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{data.extraTime}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <pre>{data.lessTime}</pre>
                                        </TableCell>
                                        <TableCell align='center' >
                                            {data.vac ? (
                                                    // <CheckIcon style={{ color: "#3f51b5" }} />
                                                <div className={style.tableCellSty}>
                                                    {/* <CheckIcon style={{ color: "#3f51b5" }} /> */}
                                                    <pre>{data.jobName}</pre>
                                                </div>
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
                                                    // <CheckIcon style={{ color: "#3f51b5" }} />
                                                <div className={style.tableCellSty}>
                                                    {/* <CheckIcon style={{ color: "#3f51b5" }} /> */}
                                                    <pre>{data.jobName}</pre>
                                                </div>
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
                                            <pre>{data.Manual}</pre>
                        
                                        </TableCell>
                                </TableRow>
                                : null
                        ))
                        : 
                            //  print by Date 
                        Data.map((data,index)=>(
                            <TableRow key={index}>
                                    <TableCell align='center' >
                                        <pre>{data.employeeCode}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.employeeName}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.timeIn}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.timeOut}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.worktime}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.lateMin}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.extraTime}</pre>
                                    </TableCell>
                                    <TableCell align='center' >
                                        <pre>{data.lessTime}</pre>
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
  