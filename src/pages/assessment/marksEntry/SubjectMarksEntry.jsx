import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwipeableTemporaryDrawer from "../../../components/Material/MaterialSidebar";
import { Chip, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../../components/Material/BreadCrumbs";
import SearchDropDown from "../../../components/Material/SearchDropDown";
import { GetMarksEntryOverviewData } from "../../../apis/fectcher/assessment/marksEntry/overview";
import CircularProgressWithLabel from "../../../components/Material/CircleProgress";
import BasicButton from "../../../components/Material/Button";
// import { GetApplicableExamType } from "../../apis/fectcher/assessment/GetApplicableExamType";
import { GetExamConfig } from "../../../apis/fectcher/assessment/marksEntry/examConfig";
import SwitchLabels from "../../../components/Material/Switch";
import { GetSubjectMarksEntry } from "../../../apis/fectcher/assessment/marksEntry/subjectMarksEntry";

const SubjectMarksEntry = () => {
  const [id, setId] = useState("FA1");
  const [sectionId, setSectionId] = useState("112424");
  const [subjectId, setSubjectId] = useState("EVS");

  const {
    data: SubjectMarksEntryData,
    isLoading: SubjectMarksEntryDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["subject_marks_entry", id, sectionId, subjectId],
    queryFn: () => GetSubjectMarksEntry(id, sectionId, subjectId),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const { data: examConfigData, isLoading: examConfigDataLoading } = useQuery({
    queryKey: ["exam_config"],
    queryFn: () => GetExamConfig(),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const returnSubData = () => {
    let newArray = [];
    Object.entries(examConfigData.sectionSubjectMap)
      .map((item) => {
        return { name: item[0], value: item[1] };
      })
      .map((item) => {
        if (item.name === sectionId) {
          console.log(item);
          newArray.push(item);
        }
      });
    return newArray;
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "grade":
        console.log(value, type);
        setSectionId(value.sectionId);
        break;
      case "exam":
        setId(value.value);
        break;

      default:
        break;
    }
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Marks Entry Overview - ClassKlap";
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] bg-gray-200 relative transition-all overflow-hidden ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <div
            className="lg:hidden absolute cursor-pointer top-4 left-4"
            onClick={handleSidebarCollapsed}
          >
            <Menu className={"text-[#67748e]"} />
          </div>
          <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
            <div className="flex flex-col px-4 cursor-pointer py-4 items-end gap-[1px]">
              <span>Vidyanidhi Public School</span>
              <span>KA2015 [2022-2023]</span>
            </div>
          </div>

          <div className="w-full flex text-sm items-center font-semibold px-4 py-2 bg-gray-200 text-gray-600 justify-end">
            Enable Student Mode <Switch />
          </div>

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs
                crumbs={[
                  "Home",
                  "Assessment",
                  "Marks Entry - Subject Marks Entry",
                ]}
              />
              <h1 className="font-bold sm:text-2xl text-base">
                Marks Entry - Subject Marks Entry
              </h1>

              <div className="w-full flex sm:flex-row flex-col gap-2 justify-between">
                {examConfigDataLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "2rem", width: "12rem" }}
                  />
                ) : (
                  <div className="sm:w-[25rem] w-[90vw] flex gap-2">
                    <SearchDropDown
                      handleDropDown={handleDropDown}
                      data={examConfigData.exams.map((item) => {
                        return { value: item.name, name: item.displayName };
                      })}
                      variant={"outlined"}
                      Name={"exam"}
                      defaultValue={{
                        value: examConfigData.exams[0].name,
                        name: examConfigData.exams[0].displayName,
                      }}
                      size={"small"}
                    />
                    <SearchDropDown
                      handleDropDown={handleDropDown}
                      data={examConfigData.sections.map((item) => {
                        return { sectionId: item[0], value: item[1] };
                      })}
                      variant={"outlined"}
                      Name={"grade"}
                      defaultValue={{ value: examConfigData.sections[0][1] }}
                      size={"small"}
                    />
                    <SearchDropDown
                      handleDropDown={handleDropDown}
                      data={returnSubData()[0].value.map((item) => {
                        return { value: item.displayName, name: item.name };
                      })}
                      variant={"outlined"}
                      Name={"grade"}
                      defaultValue={{
                        value: returnSubData()[0].value[0].displayName,
                      }}
                      size={"small"}
                    />
                  </div>
                )}
              </div>

              <div className="w-full flex justify-between items-center">
                <div>
                  <BasicButton
                    size={"small"}
                    disable={true}
                    text={"View Answer Key"}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <div className="text-gray-600 text-sm font-semibold">
                    Lock Marks Entry for this Subject? {<SwitchLabels />}
                  </div>
                  <div className="flex gap-1">
                    <BasicButton size={"small"} text={"Edit Attendance"} />
                    <BasicButton size={"small"} text={"Edit Marks"} />
                  </div>
                </div>
              </div>

              {SubjectMarksEntryDataLoading ? (
                <Skeleton animation="wave" variant="rectangular" height={300} />
              ) : (
                <TableContainer
                  className="sm:!w-full !overflow-auto max-h-[70vh] "
                  component={Paper}
                >
                  <Table className="!w-full" aria-label="simple table">
                    <TableHead className="w-full">
                      <TableRow className="w-full">
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Roll No</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[20%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Students</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">UUID</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Attendance</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Total</h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {Overview_TableData.length < 1 && (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            <h1 className="sm:text-lg text-base font-semibold text-gray-600">
                              Exam is not conducted
                            </h1>
                          </TableCell>
                        </TableRow>
                      )} */}
                      {/* {Overview_TableData?.map((itemm, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            <h1 className="font-bold">
                              {item.subject.displayName}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-blue-500">
                              {item.marksEntryStatus}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              variant="outlined"
                              label={item.lockStatus.displayName}
                              color="error"
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-semibold">{item.lockedBy}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-semibold">
                              {item.lockedByUserRole.displayName}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <CircularProgressWithLabel
                              value={item.completionPercentage}
                            />
                          </TableCell>
                        </TableRow>
                      ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectMarksEntry;
