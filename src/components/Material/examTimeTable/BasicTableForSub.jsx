import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicTextFields from "../TextField";
import SearchDropDown from "../SearchDropDown";
import { useEffect } from "react";

export default function BasicTableForSub({
  tableData,
  que,
  data,
  setQpData,
  setTotalMarks,
}) {
  console.log(tableData, que, data);
  const returnArr = () => {
    const arr = Array(que).fill(que);
    // console.log(arr);
    return arr;
  };

  useEffect(() => {
    console.log("re-render");
  });

  const handleChangeMarks = (val, item) => {
    console.log(val, item);
    const changeMarks = (arr, newMark, qNo) => {
      const newMarksArr = [];
      let total = 0;
      arr.map((item) => {
        if (item.questionNo === qNo) {
          total += Number(newMark);

          const updatedMark = {
            questionNo: item.questionNo,
            maxMarks: newMark ? newMark : "0",
            questionType: item.questionType,
            conceptName: item.conceptName,
          };
          newMarksArr.push(updatedMark);
        } else {
          total += Number(item.maxMarks);

          newMarksArr.push(item);
        }
      });
      console.log(total);
      setTotalMarks(total);
      return newMarksArr;
    };
    setQpData((prev) => {
      return {
        totalQuestions: prev.totalQuestions,
        totalMarks: prev.totalMarks,
        questionMetadata: changeMarks(prev.questionMetadata, val, item),
      };
    });
  };

  const handleChangeConcept = (val, qNo) => {
    console.log(val, qNo);
    const changeConcept = (arr, newConcept, qNo) => {
      const newMarksArr = [];
      arr.map((item) => {
        if (item.questionNo === qNo) {
          const updatedMark = {
            questionNo: item.questionNo,
            maxMarks: item.maxMarks,
            questionType: item.questionType,
            conceptName: newConcept,
          };
          newMarksArr.push(updatedMark);
        } else {
          newMarksArr.push(item);
        }
      });
      return newMarksArr;
    };
    setQpData((prev) => {
      return {
        totalQuestions: prev.totalQuestions,
        totalMarks: prev.totalMarks,
        questionMetadata: changeConcept(prev.questionMetadata, val, qNo),
      };
    });
  };

  const handleDeliveryChange = (val, name, qNo) => {
    console.log(val, name, qNo);
    const changeDelivery = (arr, newDelivery, qNo) => {
      const newMarksArr = [];
      arr.map((item) => {
        if (item.questionNo === qNo) {
          const updatedMark = {
            questionNo: item.questionNo,
            maxMarks: item.maxMarks,
            questionType: newDelivery,
            conceptName: item.conceptName,
          };
          newMarksArr.push(updatedMark);
        } else {
          newMarksArr.push(item);
        }
      });
      return newMarksArr;
    };
    setQpData((prev) => {
      return {
        totalQuestions: prev.totalQuestions,
        totalMarks: prev.totalMarks,
        questionMetadata: changeDelivery(prev.questionMetadata, val.name, qNo),
      };
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Q. No</TableCell>
            <TableCell align="center">Max. Marks</TableCell>
            <TableCell align="right">Question Type</TableCell>
            <TableCell align="right">Concept Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length < 1 && que != null && que > 0
            ? returnArr().map((item, index) => (
                <TableRow
                  className={`${index % 2 === 0 ? "!bg-gray-100" : "bg-white"}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    // background: "gray",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    <div className="w-[5rem]">
                      <BasicTextFields
                        type={"number"}
                        handleOnBlur={handleChangeMarks}
                        item={index + 1}
                        size={"small"}
                        defaultValue={0}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <SearchDropDown
                      data={data}
                      handleDropDown={handleDeliveryChange}
                      item={index + 1}
                      defaultValue={data[0]}
                      Name={"AddExamTable"}
                    />
                  </TableCell>
                  <TableCell align="right" className="!flex !justify-start">
                    <div className="w-[8rem]">
                      <BasicTextFields
                        item={index + 1}
                        handleOnBlur={handleChangeConcept}
                        size={"small"}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : tableData.map((row, index) => (
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
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
