import React, { useEffect, useRef, memo } from "react";
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
import {
  Chip,
  Collapse,
  IconButton,
  Skeleton,
  Switch,
  TablePagination,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../../components/Material/BreadCrumbs";
import SearchDropDown from "../../../components/Material/SearchDropDown";
import BasicButton from "../../../components/Material/Button";
import { GetExamConfig } from "../../../apis/fectcher/assessment/marksEntry/examConfig";
import SwitchLabels from "../../../components/Material/Switch";
import { GetSubjectMarksEntry } from "../../../apis/fectcher/assessment/marksEntry/subjectMarksEntry";
import {
  EditMarks,
  ToggleMarksEntry,
  UpdateAttendance,
} from "../../../apis/mutation/marksEntry";
import SelectMUI from "../../../components/Material/marksEntry/Select";
import AttendanceSelect from "../../../components/Material/marksEntry/AttendanceSelect";
import Loader from "../../../components/Material/Loader";
import { GetSchoolDetailsWithoutHeader } from "../../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
// import { data, data } from "autoprefixer";

const SubjectMarksEntry = () => {
  const [id, setId] = useState("FA1");
  const [sectionId, setSectionId] = useState("112476");
  const [subjectId, setSubjectId] = useState("EVS");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editButtons, setEditButtons] = useState({
    attendance: false,
    marks: false,
  });

  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  // console.log("parent called");
  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAction = async (data) => {
    // console.log(data);
    switch (data.name) {
      case "attendance":
        let AttendanceData = {
          examinationType: id,
          sectionId,
          studentAttendanceDataList: [
            { studentPresent: data.value, questionPaperAttemptId: data.QpaId },
          ],
          subject: subjectId,
        };
        await UpdateAttendance(AttendanceData, returnToken());
        // refetch();
        break;
      case "marks":
        let bodyFormData = new FormData();
        bodyFormData.append("examType", id);
        bodyFormData.append("sectionId", sectionId);
        bodyFormData.append("subject", subjectId);
        bodyFormData.append("marks", data.value);
        bodyFormData.append("questionAttemptId", data.questionAttemptId);
        await EditMarks(bodyFormData, returnToken());
        // refetch();
        break;

      default:
        break;
    }
  };

  const {
    data: SubjectMarksEntryData,
    isLoading: SubjectMarksEntryDataLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["subject_marks_entry", id, sectionId, subjectId],
    queryFn: () =>
      GetSubjectMarksEntry(id, sectionId, subjectId, returnToken()),
    onSuccess: (data) => {
      console.log(data);
      setDisableEdit(data.locked);
    },
    refetchOnWindowFocus: false,
  });
  const [disableEdit, setDisableEdit] = useState(true);

  const handleButtonAction = (type) => {
    switch (type) {
      case "attendance":
        if (editButtons.attendance) {
          refetch();
        }
        setEditButtons((prev) => {
          return { ...editButtons, attendance: !prev.attendance };
        });
        break;
      case "marks":
        if (editButtons.marks) {
          refetch();
        }
        setEditButtons((prev) => {
          return { ...editButtons, marks: !prev.marks };
        });
        break;

      default:
        break;
    }
  };

  const Row = (props) => {
    const { row, key } = props;
    //   console.log(props.no);
    const [open, setOpen] = React.useState(false);
    let obtainedMarks = 0;
    let totalMarks = 0;
    row.studentQuestionAttemptResponses.map((item) => {
      obtainedMarks += item.marks;
      totalMarks += item.maxMarks;
    });
    return (
      <React.Fragment>
        <TableRow
          key={key}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            {row.rollNo}
          </TableCell>
          <TableCell align="center">
            <h1 className="font-bold">{row.studentName}</h1>
          </TableCell>
          <TableCell align="center">
            <h1 className="font-bold">{row.uuid}</h1>
          </TableCell>
          <TableCell align="center">
            <AttendanceSelect
              handleSelectAction={handleSelectAction}
              disable={!editButtons.attendance}
              data={row.studentPresent}
              QpaId={row.questionPaperAttemptId}
            />
          </TableCell>
          <TableCell align="center">
            <h1 className="font-semibold">
              {obtainedMarks}/{totalMarks}
            </h1>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <Box sx={{ margin: 1, flexDirection: "row", flex: "none" }}> */}
              <div className="w-full grid grid-cols-4 gap-4 place-content-center place-items-center py-4">
                {row.studentQuestionAttemptResponses.map((item, index) => {
                  let data = {};
                  SubjectMarksEntryData.questions.map((item2) => {
                    if (item2.questionId === item.questionId) {
                      data = item2;
                    }
                  });
                  item.qNo = data.questionNo;
                  item.maxMarks = data.maxMarks;
                  return (
                    <h1
                      key={item.qNo}
                      className="font-semibold text-sm flex items-center sm:w-auto w-full"
                    >
                      Q.{item.qNo}
                      <SelectMUI
                        disable={!editButtons.marks}
                        handleSelectAction={handleSelectAction}
                        size={"small"}
                        data={item}
                      />
                    </h1>
                  );
                })}
              </div>
              {/* </Box> */}
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (data.name === "toggleLock_marksEntry") {
        let bodyFormData = new FormData();
        bodyFormData.append("examType", id);
        bodyFormData.append("classSection", sectionId);
        bodyFormData.append("subject", subjectId);

        const res = await ToggleMarksEntry(
          !data.status ? "unLock" : "lock",
          bodyFormData,
          returnToken()
        );
        // console.log(res);
        if (res.status === 200) {
          switchRef.current.toggle();
          setDisableEdit((prev) => !prev);
        }
      }
    },
  });

  const { data: examConfigData, isLoading: examConfigDataLoading } = useQuery({
    queryKey: ["exam_config"],
    queryFn: () => GetExamConfig(returnToken()),
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
    console.log(newArray);
    return newArray;
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();
  const switchRef = useRef();
  const handleDropDown = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "grade":
        setSectionId(value.sectionId);
        break;
      case "subject":
        setSubjectId(value.name);
        break;
      case "exam":
        setId(value.value);
        break;

      default:
        break;
    }
  };

  const handleSwitchChange = (name, status, item) => {
    if (name === "toggleLock_marksEntry") {
      mutation.mutate({ name, status });
      //   console.log(name, status, item);
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
        <Loader loading={isRefetching} />

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
          <SchoolInfo
            SchoolInfoLoading={SchoolInfoLoading}
            schoolInfo={schoolInfo}
          />

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
                    {returnSubData.length > 0 ? (
                      <SearchDropDown
                        handleDropDown={handleDropDown}
                        data={returnSubData()[0]?.value?.map((item) => {
                          return { value: item?.displayName, name: item?.name };
                        })}
                        variant={"outlined"}
                        Name={"subject"}
                        defaultValue={{
                          value: returnSubData()[0]?.value[0]?.displayName,
                        }}
                        size={"small"}
                      />
                    ) : null}
                  </div>
                )}
              </div>

              <div className="w-full flex sm:flex-row flex-col-reverse gap-4 sm:gap-0 justify-between items-center">
                {SubjectMarksEntryData?.studentQuestionPaperAttemptResponses
                  .length < 1 ? (
                  <BasicButton
                    disable={true}
                    size={"small"}
                    text={"View Answer Key"}
                  />
                ) : (
                  <a
                    href={`https://schoolsbel.xamcheck.com/app/schoolApp/configuration/previewAnswerKey/${sectionId}/${id}/${subjectId}`}
                    target="_blank"
                  >
                    <BasicButton size={"small"} text={"View Answer Key"} />
                  </a>
                )}

                <div className="flex gap-2 flex-col">
                  {SubjectMarksEntryDataLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "1rem", width: "15rem" }}
                    />
                  ) : (
                    <div className="text-gray-600 text-xs sm:text-sm font-semibold">
                      Lock Marks Entry for this Subject?{" "}
                      {
                        <SwitchLabels
                          checked={SubjectMarksEntryData?.locked}
                          ref={switchRef}
                          handleSwitchChange={handleSwitchChange}
                          name={"toggleLock_marksEntry"}
                        />
                      }
                    </div>
                  )}
                  <div className="flex gap-1">
                    <BasicButton
                      size={"small"}
                      name={"attendance"}
                      disable={disableEdit}
                      handleButtonAction={handleButtonAction}
                      text={`${
                        editButtons.attendance ? "Done" : "Edit Attendance"
                      }`}
                    />
                    <BasicButton
                      size={"small"}
                      disable={disableEdit}
                      handleButtonAction={handleButtonAction}
                      name={"marks"}
                      text={`${editButtons.marks ? "Done" : "Edit Marks"}`}
                    />
                  </div>
                </div>
              </div>

              {SubjectMarksEntryDataLoading ? (
                <Skeleton animation="wave" variant="rectangular" height={300} />
              ) : (
                <div>
                  <TableContainer
                    className="sm:!w-full !overflow-auto max-h-[70vh] "
                    component={Paper}
                  >
                    <Table
                      stickyHeader
                      className="!w-full"
                      aria-label="simple table"
                    >
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
                        {SubjectMarksEntryData
                          .studentQuestionPaperAttemptResponses.length < 1 && (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              <h1 className="sm:text-lg text-base font-semibold text-gray-600">
                                Exam is not conducted
                              </h1>
                            </TableCell>
                          </TableRow>
                        )}
                        {SubjectMarksEntryData?.studentQuestionPaperAttemptResponses
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <Row row={item} key={index} />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    component={Paper}
                    rowsPerPageOptions={[10, 25, 100]}
                    count={
                      SubjectMarksEntryData
                        ?.studentQuestionPaperAttemptResponses.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectMarksEntry;
