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
import Snackbars from "../../../components/Material/Snackbar";
import BasicTextFields from "../../../components/Material/TextField";
import AttendanceFilter from "../../../components/Material/marksEntry/FilterAttendance";
import instance from "../../../instance";
import { GetAnswerKeyStatus } from "../../../apis/fectcher/assessment/marksEntry/overview";

const SubjectMarksEntry = () => {
  const [id, setId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [editButtons, setEditButtons] = useState({
    attendance: false,
    marks: false,
  });
  const [filter, setFilter] = useState({
    rollNo: "",
    students: "",
    attendance: "All",
  });
  const [total, setTotal] = useState(0);

  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);

  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

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
        setLoading(true);
        const res2 = await UpdateAttendance(
          AttendanceData,
          returnToken()
        ).catch((err) => {
          setSnackbarErr(true);
          setSnackbarMsg("something went wrong");
          snackbarRef.current.openSnackbar();
        });
        if (res2.success === true) {
          setSnackbarErr(false);
          setSnackbarMsg(res2.message);
          snackbarRef.current.openSnackbar();
        }
        refetch();
        setLoading(false);

        break;
      case "marks":
        let bodyFormData = new FormData();
        bodyFormData.append("examType", id);
        bodyFormData.append("sectionId", sectionId);
        bodyFormData.append("subject", subjectId);
        bodyFormData.append("marks", data.value);
        bodyFormData.append("questionAttemptId", data.questionAttemptId);
        setLoading(true);
        const res = await EditMarks(bodyFormData, returnToken()).catch(
          (err) => {
            setSnackbarErr(true);
            setSnackbarMsg("something went wrong");
            snackbarRef.current.openSnackbar();
          }
        );
        if (res.status === 200) {
          setSnackbarErr(false);
          setSnackbarMsg("Your changes have been savedly");
          snackbarRef.current.openSnackbar();
        }
        refetch();
        setLoading(false);

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
    enabled: !!id && !!sectionId && !!subjectId,
    queryFn: () =>
      GetSubjectMarksEntry(id, sectionId, subjectId, returnToken()),
    onSuccess: (data) => {
      console.log(data);
      let total = 0;
      data.questions.map((item) => {
        total += item.maxMarks;
      });
      setTotal(total);
      setDisableEdit(data.locked);
    },
    refetchOnWindowFocus: false,
  });
  const { data: AnswerKey, isLoading: AnswerKeyLoading } = useQuery({
    queryKey: ["subject_marks_entry_answer_key", id, sectionId, subjectId],
    enabled: !!id && !!sectionId && !!subjectId,
    queryFn: () => GetAnswerKeyStatus(id, sectionId, subjectId, returnToken()),
    onSuccess: (data) => {
      console.log(data);
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

  const returnData = () => {
    if (filter.attendance == "All" && !filter.rollNo && !filter.students) {
      return SubjectMarksEntryData?.studentQuestionPaperAttemptResponses;
    } else {
      const checkVal = (a, b) => {
        if (a == b) {
          return true;
        } else {
          return false;
        }
      };
      // console.log(filter);
      let newArr = SubjectMarksEntryData?.studentQuestionPaperAttemptResponses;
      if (filter.rollNo) {
        newArr = newArr.filter((item) => {
          if (checkVal(Number(filter.rollNo), Number(item.rollNo))) {
            return item;
          }
        });
      }
      if (filter.students) {
        newArr = newArr.filter((item) => {
          if (
            item.studentName
              .toLowerCase()
              .includes(filter.students.toLowerCase())
          ) {
            return item;
          }
        });
      }
      if (filter.attendance !== "All") {
        newArr = newArr.filter((item) => {
          if (item.studentPresent === filter.attendance) {
            return item;
          }
        });
      }
      return newArr;
    }
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
          setEditButtons({ attendance: false, marks: false });
        }
      }
    },
  });

  const { data: examConfigData, isLoading: examConfigDataLoading } = useQuery({
    queryKey: ["exam_config"],
    queryFn: () => GetExamConfig(returnToken()),
    onSuccess: (data) => {
      console.log(data);
      setId(data.exams[0].name);
      setSectionId(data.sections[0][0]);
      // let sub = "";
      Object.entries(data.sectionSubjectMap)
        .map((item) => {
          return { name: item[0], value: item[1] };
        })
        .map((item) => {
          if (item.name === data.sections[0][0]) {
            // console.log();
            // sub = item.value[0].name;
            setSubjectId(item.value[0].name);
          }
        });
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
          // console.log(item);
          newArray.push(item);
        }
      });
    // console.log(newArray);
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

  const snackbarRef = useRef();

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

  const handleChange = (data) => {
    switch (data.name) {
      case "rollNo":
        setFilter((prev) => {
          return {
            students: prev.students,
            rollNo: data.val,
            attendance: prev.attendance,
          };
        });
        break;
      case "students":
        setFilter((prev) => {
          return {
            students: data.val,
            rollNo: prev.rollNo,
            attendance: prev.attendance,
          };
        });
        break;
      case "attendanceFilter":
        setFilter((prev) => {
          return {
            students: prev.students,
            rollNo: prev.rollNo,
            attendance: data.val,
          };
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Snackbars
        ref={snackbarRef}
        message={snackbarMsg}
        snackbarErrStatus={snackbarErr}
      />
      <div className="flex w-[100%] min-h-[100vh]">
        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        <Loader loading={isRefetching || loading} />

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
                    {returnSubData().length > 0 ? (
                      <SearchDropDown
                        handleDropDown={handleDropDown}
                        data={returnSubData()[0]?.value?.map((item) => {
                          return { value: item?.displayName, name: item?.name };
                        })}
                        variant={"outlined"}
                        Name={"subject"}
                        defaultValue={{
                          value: returnSubData()[0]?.value[0]?.displayName,
                          name: returnSubData()[0]?.value[0]?.name,
                        }}
                        size={"small"}
                      />
                    ) : null}
                  </div>
                )}
              </div>

              <div className="w-full flex sm:flex-row flex-col-reverse gap-4 sm:gap-0 justify-between items-center">
                {/* {SubjectMarksEntryData?.studentQuestionPaperAttemptResponses
                  .length < 1 ? ( */}

                <BasicButton
                  disable={!AnswerKey?.success}
                  handleButtonAction={async () => {
                    const res = await instance({
                      url: `schoolApp/configuration/previewAnswerKeyForSM/${sectionId}/${id}/${subjectId}`,
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${
                          returnToken() ? returnToken() : Cookies.get("token")
                        }`,
                      },
                    }).catch((err) => console.log(err));
                    if (res.data.success) {
                      window.open(res.data.PdfUrl, "_blank");
                    }
                  }}
                  size={"small"}
                  text={"View Answer Key"}
                />
                {/* ) : (
                  <div
                    onClick={async () => {
                      const res = await instance({
                        url: `schoolApp/configuration/previewAnswerKey/${sectionId}/${id}/${subjectId}`,
                        method: "GET",
                        headers: {
                          Authorization: `Bearer ${
                            returnToken() ? returnToken() : Cookies.get("token")
                          }`,
                        },
                      }).catch((err) => console.log(err));
                      setPdfData(res.data);
                    }}
                  >
                    <BasicButton size={"small"} text={"View Answer Key"} />
                  </div>
                )} */}

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
                              <BasicTextFields
                                handleChange={handleChange}
                                name={"rollNo"}
                                size={"small"}
                                type={"number"}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="right" className="w-[20%]">
                            <div className="flex flex-col items-center gap-2">
                              <h1 className="font-bold">Students</h1>
                              <BasicTextFields
                                handleChange={handleChange}
                                name={"students"}
                                size={"small"}
                              />
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
                              <AttendanceFilter
                                handleChange={handleChange}
                                data={"All"}
                              />
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
                        {returnData()
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <MemoRow
                              total={total}
                              row={item}
                              key={item.uuid}
                              handleSelectAction={handleSelectAction}
                              editButtons={editButtons}
                              SubjectMarksEntryData={SubjectMarksEntryData}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    component={Paper}
                    rowsPerPageOptions={[10, 25, 100]}
                    count={returnData()?.length}
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

const Row = (props) => {
  const { row, handleSelectAction, SubjectMarksEntryData, editButtons, total } =
    props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log("re-render");
  });

  let obtainedMarks = 0;
  // let totalMarks = 0;
  // row.studentQuestionAttemptResponses.map((item) => {
  // if (typeof item.maxMarks === "number" && typeof item.marks === "number") {
  // obtainedMarks += Number(item.marks);
  // totalMarks += Number(item.maxMarks);
  // }
  for (let i = 0; i < row.studentQuestionAttemptResponses.length; i++) {
    const item = row.studentQuestionAttemptResponses[i];
    obtainedMarks += Number(item.marks);
    // totalMarks += Number(item.maxMarks);
  }
  // });
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
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
            {obtainedMarks}/{total}
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
                    <div className="flex sm:flex-row flex-col">
                      <p>Q.{item.qNo}</p>
                      <p>({item?.maxMarks})</p>
                    </div>
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
const MemoRow = React.memo(Row);

export default SubjectMarksEntry;
