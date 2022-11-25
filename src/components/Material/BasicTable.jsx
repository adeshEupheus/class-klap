// import React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import BasicButton from "./Button";
// import SearchDropDown from "./SearchDropDown";

// const BasicTable = ({ rows }) => {
//   return (
//     <TableContainer className="!w-full max-h-[70vh]" component={Paper}>
//       <Table
//         className="!w-full"
//         //   sx={{ width: 1000 }}
//         aria-label="simple table"
//       >
//         <TableHead>
//           <TableRow>
//             <TableCell align="right">
//               <div className="flex flex-col items-center gap-2">
//                 <h1>Class</h1>
//                 <div className="w-[5rem]">
//                   <SearchDropDown
//                     data={[
//                       { value: "FA1" },
//                       { value: "FA2" },
//                       { value: "FA3" },
//                       { value: "FA4" },
//                     ]}
//                     variant={"outlined"}
//                     Name={"Overview"}
//                     value={{ value: "FA1" }}
//                     size={"small"}
//                   />
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell align="right">
//               <div className="flex flex-col items-center gap-2">
//                 <h1>Exam Name</h1>
//                 <div className="w-[5rem]">
//                   <SearchDropDown
//                     data={[
//                       { value: "FA1" },
//                       { value: "FA2" },
//                       { value: "FA3" },
//                       { value: "FA4" },
//                     ]}
//                     variant={"outlined"}
//                     Name={"Overview"}
//                     value={{ value: "FA1" }}
//                     size={"small"}
//                   />
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell align="right">
//               <div className="flex flex-col items-center gap-2">
//                 <h1>Exam Set Up</h1>
//                 <div className="w-[5rem]">
//                   <SearchDropDown
//                     data={[
//                       { value: "FA1" },
//                       { value: "FA2" },
//                       { value: "FA3" },
//                       { value: "FA4" },
//                     ]}
//                     variant={"outlined"}
//                     Name={"Overview"}
//                     value={{ value: "FA1" }}
//                     size={"small"}
//                   />
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell align="right">
//               <div className="flex flex-col items-center gap-2">
//                 <h1>Exam Schedule</h1>
//                 <div className="w-[5rem]">
//                   <SearchDropDown
//                     data={[
//                       { value: "FA1" },
//                       { value: "FA2" },
//                       { value: "FA3" },
//                       { value: "FA4" },
//                     ]}
//                     variant={"outlined"}
//                     Name={"Overview"}
//                     value={{ value: "FA1" }}
//                     size={"small"}
//                   />
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell align="right">
//               <div className="flex flex-col items-center gap-2">
//                 <h1>Marks Entry</h1>
//                 <div className="w-[5rem]">
//                   <SearchDropDown
//                     data={[
//                       { value: "FA1" },
//                       { value: "FA2" },
//                       { value: "FA3" },
//                       { value: "FA4" },
//                     ]}
//                     variant={"outlined"}
//                     Name={"Overview"}
//                     value={{ value: "FA1" }}
//                     size={"small"}
//                   />
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell align="right">Feedback</TableCell>
//             <TableCell align="right">Announce Results</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <TableRow
//               key={index}
//               sx={{
//                 "&:last-child td, &:last-child th": { border: 0 },
//               }}
//             >
//               <TableCell component="th" scope="row" align="center">
//                 {row.Class}
//               </TableCell>
//               <TableCell align="center">{row.exam_name}</TableCell>
//               <TableCell align="center">{row.exams_set_up}</TableCell>
//               <TableCell align="center">
//                 <h1 className="text-red-600 font-semibold">
//                   {row.exam_schedule}
//                 </h1>
//               </TableCell>
//               <TableCell align="center">
//                 <h1 className="text-red-600 font-semibold">{row.exam_entry}</h1>
//               </TableCell>
//               <TableCell align="center">
//                 <div className="w-full flex justify-end">
//                   <BasicButton text={"Generate"} size={"small"} />
//                 </div>
//               </TableCell>
//               <TableCell align="right">
//                 <div className="w-full flex justify-end">
//                   <BasicButton text={"Announce"} size={"small"} />
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default BasicTable;
