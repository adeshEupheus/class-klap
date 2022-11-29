import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Skeleton, Switch } from "@mui/material";
import { Download, Menu, Visibility } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import BasicTextFields from "../../components/Material/TextField";
import SwitchLabels from "../../components/Material/Switch";
import { GetExamSetUpData } from "../../apis/fectcher/assessment/examSetUp/examSetUp";
import { GetExamTimetableData } from "../../apis/fectcher/assessment/examTimetable/examTimetable";
import BasicButton from "../../components/Material/Button";
import ResponsiveTimePickers from "../../components/Material/TimePicker";
const ExamTimeTable = () => {
  const [examId, setExamId] = useState("FA1");
  const [gradeId, setGradeId] = useState("NUR");

  const {
    data: ExamTimetableData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["exam_timetable_data", examId, gradeId],
    queryFn: () => GetExamTimetableData(examId, gradeId),
    onSuccess: (data) => {
      console.log(data);
    },
    // enabled: false,
    refetchOnWindowFocus: false,
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  // const queryClient = useQueryClient();

  // const updateData = (class_name) => {
  //   if (class_name != "All") {
  //     const newArray = Exam_setUpData.filter(
  //       (item) => item.grade.displayName === class_name
  //     );
  //     setMainData(newArray);
  //   } else {
  //     setMainData(Exam_setUpData);
  //   }
  // };

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    // if (type === "class") {
    //   updateData(value.value);
    // } else if ((type = "exam_setup")) {
    //   setId(value.value);
    // }
    // switch (type) {
    //   case "Overview":
    //     setId(value.value);
    //     break;

    //   default:
    //     break;
    // }
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Exam Timetable - ClassKlap";
    // setMainData(Exam_setUpData);
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
          highLight={"dashboard"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"dashboard"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] bg-gray-200 relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
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
              <Breadcrumbs crumbs={["Home", "Assessment", "Exam Timetable"]} />
              <h1 className="font-bold sm:text-2xl text-xl">Exam Set Up</h1>
              <div className="w-[15rem] flex gap-2">
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "FA1" },
                    { value: "FA2" },
                    { value: "FA3" },
                    { value: "FA4" },
                    { value: "RSA1" },
                    { value: "RSA2" },
                    { value: "RSA3" },
                    { value: "SA1" },
                    { value: "SA2" },
                    { value: "SA3" },
                  ]}
                  variant={"outlined"}
                  Name={"exam_setup"}
                  defaultValue={{ value: "FA1" }}
                  size={"small"}
                />
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "Nursery" },
                    { value: "LKG" },
                    { value: "UKG" },
                    { value: "1" },
                    { value: "2" },
                    { value: "3" },
                    { value: "4" },
                    { value: "5" },
                  ]}
                  variant={"outlined"}
                  Name={"exam_setup"}
                  defaultValue={{ value: "Nursery" }}
                  size={"small"}
                />
              </div>
              <div className="w-full flex items-center flex-col gap-1">
                <h1 className="text-xl font-semibold text-gray-600">
                  Formative Assessment 1
                </h1>
                <div className="flex gap-2 items-center">
                  <h1 className="text-gray-600 text-sm">
                    Conduct Exam on Learning App?
                  </h1>
                  <SwitchLabels />
                </div>
                <BasicButton
                  text={"Conduct exam for Class Nursery"}
                  size={"small"}
                />
                <h1 className="text-gray-600 text-xs italic">
                  Click here to generate exam timetable for students.
                </h1>
                <div className="flex w-full md:flex-row flex-col mt-4 justify-center gap-8">
                  <div className="px-8 py-4 w-full flex justify-center gap-3 shadow-lg rounded-md items-center bg-slate-300">
                    <h1 className="text-gray-600 font-semibold text-sm">
                      Question papers for all subjects
                    </h1>
                    <BasicButton size={"small"} text={"Generate"} />
                    <Download className="!text-gray-600 !cursor-pointer" />
                  </div>
                  <div className="px-8 py-4 w-full justify-center flex gap-3 shadow-lg rounded-md items-center bg-slate-300">
                    <h1 className="text-gray-600 font-semibold text-sm">
                      Personalized question paper for each student
                    </h1>
                    <BasicButton size={"small"} text={"Generate"} />
                    <Download className="!text-gray-600 !cursor-pointer" />
                  </div>
                </div>
              </div>
              {isLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={300}
                />
              ) : (
                <TableContainer
                  className="sm:!w-full !overflow-auto max-h-[70vh] "
                  component={Paper}
                >
                  <Table
                    className="!w-full"
                    //   sx={{ width: 1000 }}
                    aria-label="simple table"
                  >
                    <TableHead className="w-full">
                      <TableRow className="w-full">
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col w-full items-center gap-2">
                            <h1 className="font-bold">Subjects</h1>
                            <div className="w-full">
                              <SearchDropDown
                                handleDropDown={handleDropDown}
                                data={[
                                  {
                                    value: "All",
                                  },
                                  ...ExamTimetableData.subjectLevelConfigurationResponses.map(
                                    (item) => {
                                      return {
                                        value: item.subject.displayName,
                                      };
                                    }
                                  ),
                                ]}
                                variant={"outlined"}
                                Name={"class"}
                                defaultValue={{
                                  value: "All",
                                }}
                                size={"small"}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Exam Date</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Exam Start Time</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">
                              Duration (In Mins)
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[20%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">
                              Exam Type - Delivery Format
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[20%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Marks - Syllabus</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">View/Edit QP</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Status</h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ExamTimetableData.subjectLevelConfigurationResponses.map(
                        (item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <h1 className="font-bold">
                                {item.subject.displayName}
                              </h1>
                            </TableCell>
                            <TableCell align="center">DatePicker</TableCell>
                            <TableCell align="center">
                              {/* <ResponsiveTimePickers /> */}
                              TimePicker
                            </TableCell>

                            <TableCell align="center">
                              <BasicTextFields
                                variant={"standard"}
                                defaultValue={item.duration}
                                disable={item.locked}
                                lable={"Time"}
                                type={"number"}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <SearchDropDown
                                handleDropDown={handleDropDown}
                                data={[
                                  ...item?.applicableQuestionPaperDeliveryModeType.map(
                                    (item) => {
                                      return { value: item.displayName };
                                    }
                                  ),
                                ]}
                                variant={"outlined"}
                                Name={"mark_syllabus_difficulty"}
                                defaultValue={{
                                  value:
                                    item.questionPaperDeliveryModeType
                                      .displayName,
                                }}
                                size={"small"}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {Object.keys(
                                item.qpSetTypeApplicableMarksMap
                              )[0] === "SUBJECTIVE" ? (
                                <SearchDropDown
                                  minWidth={"12rem"}
                                  handleDropDown={handleDropDown}
                                  disable={item.locked}
                                  data={[
                                    ...item?.qpSetTypeApplicableMarksMap?.SUBJECTIVE?.map(
                                      (item) => {
                                        return { value: item.displayName };
                                      }
                                    ),
                                  ]}
                                  variant={"outlined"}
                                  Name={"mark_syllabus_difficulty"}
                                  defaultValue={{
                                    value:
                                      item.qpSetTypeApplicableMarksMap
                                        .SUBJECTIVE[0].displayName,
                                  }}
                                  size={"small"}
                                />
                              ) : (
                                <SearchDropDown
                                  minWidth={"12rem"}
                                  handleDropDown={handleDropDown}
                                  disable={item.locked}
                                  data={[
                                    ...item?.applicableMarksSyllabus?.OBJECTIVE?.map(
                                      (item) => {
                                        return { value: item.displayName };
                                      }
                                    ),
                                  ]}
                                  variant={"outlined"}
                                  Name={"mark_syllabus_difficulty"}
                                  defaultValue={{
                                    value:
                                      item.selectedMarksSyllabus.displayName,
                                  }}
                                  size={"small"}
                                />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <Visibility className="!text-gray-600 !cursor-pointer" />
                            </TableCell>
                            <TableCell align="center">
                              <h1 className="text-red-600 text-xs font-semibold">
                                {item.examStatus.displayName}
                              </h1>
                            </TableCell>
                          </TableRow>
                        )
                      )}
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

export default ExamTimeTable;
