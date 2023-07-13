import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ tableData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Q. No</TableCell>
            <TableCell align="right">Max. Marks</TableCell>
            <TableCell align="right">Question Type</TableCell>
            <TableCell align="right">Concept Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              className={`${index % 2 === 0 ? "!bg-gray-100" : "bg-white"}`}
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                // background: "gray",
              }}
            >
              <TableCell component="th" scope="row">
                {row.questionNo}
              </TableCell>
              <TableCell align="right">{row.maxMarks}</TableCell>
              <TableCell align="right">
                {row?.questionType?.displayName}
              </TableCell>
              <TableCell align="right">{row.conceptName}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
