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
import {
  Collapse,
  IconButton,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import {
  Download,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Menu,
  Visibility,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import BasicTextFields from "../../components/Material/TextField";
import SwitchLabels from "../../components/Material/Switch";
import { GetExamTimetableData } from "../../apis/fectcher/assessment/examTimetable/examTimetable";
import BasicButton from "../../components/Material/Button";
import ResponsiveTimePickers from "../../components/Material/TimePicker";
import ResponsiveDatePickers from "../../components/Material/DatePicker";
import { Box } from "@mui/system";
import {
  ConductExam,
  QpGenerate,
  ToggleExamRequired,
  ToggleNotification,
  UpdateTimeTable,
} from "../../apis/mutation/examTimeTable";
import DialogSlide from "../../components/Material/Dialog";
import Snackbars from "../../components/Material/Snackbar";
import Loader from "../../components/Material/Loader";
import { GetSchoolDetailsWithoutHeader } from "../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
const ExamTimeTable = () => {
  const [examId, setExamId] = useState("FA1");
  const [gradeId, setGradeId] = useState("NUR");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
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

  const examReqrefs = useRef([]);
  examReqrefs.current = [];
  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const addToExamReqRef = (el) => {
    if (el && !examReqrefs.current.includes(el)) {
      examReqrefs.current.push(el);
    }
  };

  const feedbackReqrefs = useRef([]);
  feedbackReqrefs.current = [];

  const addToFeedbackRef = (el) => {
    if (el && !feedbackReqrefs.current.includes(el)) {
      feedbackReqrefs.current.push(el);
    }
  };

  // table Data
  const {
    data: ExamTimetableData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["exam_timetable_data", examId, gradeId],
    queryFn: () => GetExamTimetableData(examId, gradeId, returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  // change notification lapp

  const mutation = useMutation({
    mutationFn: async (data) => {
      let res;
      let index;
      if (!data) {
        res = await ToggleNotification(
          ExamTimetableData.examNotificationEnabled ? "disable" : "enable",
          returnToken()
        );
        if (res.success) {
          refetch();
          switchRef.current.toggle();
          setSnackbarErr(false);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
        }
      }
      if (data.name === "exam_req_status") {
        setLoading(true);
        res = await ToggleExamRequired(
          examId,
          gradeId,
          data.item.subject.name,
          returnToken()
        );
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          index = ExamTimetableData.subjectLevelConfigurationResponses.indexOf(
            data.item
          );
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
          examReqrefs.current[index].toggle();
          // console.log(examReqrefs);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "feedback_status") {
        setLoading(true);
        const apiBodyData = {
          duration: data.item.duration,
          examDate: data.item.examDate,
          examTime: data.item.examTime,
          feedbackRequired: !data.item.feedbackRequired,
          // qpSetTypeDeliveryMode: data.item.questionPaperDeliveryModeType.name,
          // skuId: data.item.selectedSku,
        };
        res = await UpdateTimeTable(
          examId,
          gradeId,
          data.item.subject.name,
          apiBodyData,
          returnToken()
        );
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          index = ExamTimetableData.subjectLevelConfigurationResponses.indexOf(
            data.item
          );
          feedbackReqrefs.current[index].toggle();
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
          // console.log(examReqrefs);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "date") {
        setLoading(true);
        const apiBodyData = {
          duration: data.item.duration,
          examDate: `${data.item.newDate.$y}-${String(
            data.item.newDate.$M + 1
          ).padStart(2, "0")}-${String(data.item.newDate.$D).padStart(2, "0")}`,
          examTime: data.item.examTime,
          feedbackRequired: data.item.feedbackRequired,
          qpSetTypeDeliveryMode: data.item.questionPaperDeliveryModeType.name,
          skuId: data.item.selectedSku,
        };
        res = await UpdateTimeTable(
          examId,
          gradeId,
          data.item.subject.name,
          apiBodyData,
          returnToken()
        );
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "time") {
        console.log(data);
        setLoading(true);
        const apiBodyData = {
          duration: data.item.duration,
          examDate: data.item.examDate,
          examTime: data.item.newTime,
          feedbackRequired: data.item.feedbackRequired,
          qpSetTypeDeliveryMode: data.item.questionPaperDeliveryModeType.name,
          skuId: data.item.selectedSku,
        };
        res = await UpdateTimeTable(
          examId,
          gradeId,
          data.item.subject.name,
          apiBodyData,
          returnToken()
        );
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "duration") {
        console.log(data);
        setLoading(true);
        const apiBodyData = {
          duration: data.item.newDuration,
          examDate: data.item.examDate,
          examTime: data.item.examTime,
          feedbackRequired: data.item.feedbackRequired,
          qpSetTypeDeliveryMode: data.item.questionPaperDeliveryModeType.name,
          skuId: data.item.selectedSku,
        };
        res = await UpdateTimeTable(
          examId,
          gradeId,
          data.item.subject.name,
          apiBodyData,
          returnToken()
        );
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "conductExam") {
        setLoading(true);
        res = await ConductExam(gradeId, examId, returnToken()).catch((err) => {
          // console.log(err.response.data.message)
          setSnackbarErr(true);
          setSnackbarMsg(err.response.data.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        });
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          setSnackbarMsg("Conducted Successfully");
          snackbarRef.current.openSnackbar();
          setLoading(false);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
      if (data.name === "QpGenerate") {
        setLoading(true);
        res = await QpGenerate(gradeId, examId, returnToken()).catch((err) => {
          setSnackbarErr(true);
          setSnackbarMsg(err.response.data.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        });
        if (res.success) {
          refetch();
          setSnackbarErr(false);
          setSnackbarMsg(
            "QP generation initiated. please check back in some time"
          );
          snackbarRef.current.openSnackbar();
          setLoading(false);
        } else {
          setSnackbarErr(true);
          setSnackbarMsg(res.message);
          snackbarRef.current.openSnackbar();
          setLoading(false);
        }
      }
    },
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const dialogRef = useRef();
  const snackbarRef = useRef();
  const switchRef = useRef();

  const returnData = () => {
    if (filter === "All") {
      return ExamTimetableData.subjectLevelConfigurationResponses;
    }

    const newArray =
      ExamTimetableData.subjectLevelConfigurationResponses.filter(
        (item) => item.subject.displayName === filter
      );
    return newArray;
  };

  const handleSwitchChange = (name, status, item) => {
    if (name === "conduct_exam_status") {
      dialogRef.current.openDialog();
    }
    if (name === "exam_req_status") {
      mutation.mutate({ item: item, name });
    }
    if (name === "feedback_status") {
      mutation.mutate({ item: item, name });
    }
    console.log(name, status, item);
  };

  const handleDialogButton = async () => {
    refetch();
    mutation.mutate();
  };

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "exam":
        setFilter("All");
        setExamId(value.value);
        break;
      case "grade":
        setFilter("All");
        setGradeId(value.name);
        break;
      case "class":
        setFilter(value.value);
        break;

      default:
        break;
    }
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(true);

    const dateRef = useRef();

    const handleDateChange = (value) => {
      console.log(value);
      row.newDate = value;
      mutation.mutate({ item: row, name: "date" });
    };

    const handleTimeChange = (value) => {
      const newTime = `${value.$d.toString().split(" ")[4].split(":")[0]}:${
        value.$d.toString().split(" ")[4].split(":")[1]
      }`;
      row.newTime = newTime;
      mutation.mutate({ item: row, name: "time" });
    };

    const handleOnBlur = (value) => {
      row.newDuration = value;
      mutation.mutate({ item: row, name: "duration" });
    };

    const handleDropDown = (value, type) => {
      console.log(value, type);
    };

    return (
      <React.Fragment>
        <TableRow
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" align="center">
            <h1 className="font-bold">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
              {row.subject.displayName}
            </h1>
          </TableCell>
          <TableCell align="center">
            <ResponsiveDatePickers
              date={row.examDate}
              ref={dateRef}
              handleDateChange={handleDateChange}
            />
          </TableCell>
          <TableCell align="center">
            <ResponsiveTimePickers
              time={row.examTime}
              handleTimeChange={handleTimeChange}
            />
          </TableCell>
          <TableCell align="center">
            <BasicTextFields
              variant={"standard"}
              defaultValue={row.duration}
              handleOnBlur={handleOnBlur}
              disable={row.locked}
              lable={"Time"}
              type={"number"}
            />
          </TableCell>
          <TableCell align="center">
            <SearchDropDown
              handleDropDown={handleDropDown}
              data={[
                ...row?.applicableQuestionPaperDeliveryModeType.map((item) => {
                  return { value: item.displayName };
                }),
              ]}
              variant={"outlined"}
              minWidth={"12rem"}
              Name={"mark_syllabus_difficulty"}
              defaultValue={{
                value: row.questionPaperDeliveryModeType.displayName,
              }}
              size={"small"}
            />
          </TableCell>
          <TableCell align="center">
            {Object.keys(row.qpSetTypeApplicableMarksMap)[0] ===
            "SUBJECTIVE" ? (
              <SearchDropDown
                minWidth={"12rem"}
                handleDropDown={handleDropDown}
                disable={row.locked}
                data={[
                  ...row?.qpSetTypeApplicableMarksMap?.SUBJECTIVE?.map(
                    (item) => {
                      return { value: item.displayName };
                    }
                  ),
                ]}
                variant={"outlined"}
                Name={"mark_syllabus_difficulty"}
                defaultValue={{
                  value:
                    row.qpSetTypeApplicableMarksMap.SUBJECTIVE[0].displayName,
                }}
                size={"small"}
              />
            ) : (
              <SearchDropDown
                minWidth={"12rem"}
                handleDropDown={handleDropDown}
                disable={row.locked}
                data={[
                  ...row?.qpSetTypeApplicableMarksMap?.OBJECTIVE?.map(
                    (item) => {
                      return { value: item.displayName };
                    }
                  ),
                ]}
                variant={"outlined"}
                Name={"mark_syllabus_difficulty"}
                defaultValue={{
                  value: row?.selectedMarksSyllabus?.displayName,
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
              {row.examStatus.displayName}
            </h1>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-sm font-semibold text-gray-600">
                            Exam Attendance:
                          </h1>
                          {row.studentsPresent}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-sm font-semibold text-gray-600">
                            Exam Required:
                          </h1>
                          <SwitchLabels
                            checked={row.examRequired}
                            ref={addToExamReqRef}
                            item={row}
                            name={"exam_req_status"}
                            handleSwitchChange={handleSwitchChange}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex gap-2 items-center">
                          <h1 className="text-sm font-semibold text-gray-600">
                            Feedback Required:
                          </h1>

                          <SwitchLabels
                            checked={row.feedbackRequired}
                            ref={addToFeedbackRef}
                            item={row}
                            name={"feedback_status"}
                            handleSwitchChange={handleSwitchChange}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Exam Timetable - ClassKlap";
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
      <Snackbars
        ref={snackbarRef}
        message={snackbarMsg}
        snackbarErrStatus={snackbarErr}
      />
      <div className="flex w-[100%] min-h-[100vh]">
        <Sidebar
          highLight={"exam_timetable"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        <Loader loading={loading} />

        <DialogSlide
          ref={dialogRef}
          handleDialogButton={handleDialogButton}
          text={`Are you sure you want to ${
            ExamTimetableData?.examNotificationEnabled ? "disable" : "enable"
          } sending exam notification to the students ?`}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"exam_timetable"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] bg-gray-200 relative transition-all ease-linear duration-300 overflow-hidden lg:w-[83vw] lg:ml-[18vw] ${
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

          <div className="relative flex flex-col w-full justify-center py-2 items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs crumbs={["Home", "Assessment", "Exam Timetable"]} />
              <h1 className="font-bold sm:text-2xl text-xl">Exam Timetable</h1>
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
                  Name={"exam"}
                  defaultValue={{ value: "FA1" }}
                  size={"small"}
                />
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "Nursery", name: "NUR" },
                    { value: "LKG", name: "LKG" },
                    { value: "UKG", name: "UKG" },
                    { value: "1", name: "GRADE_1" },
                    { value: "2", name: "GRADE_2" },
                    { value: "3", name: "GRADE_3" },
                    { value: "4", name: "GRADE_4" },
                    { value: "5", name: "GRADE_5" },
                  ]}
                  variant={"outlined"}
                  Name={"grade"}
                  defaultValue={{ value: "Nursery" }}
                  size={"small"}
                />
              </div>
              <div className="w-full flex items-center flex-col gap-1">
                <h1 className="text-xl font-semibold text-gray-600">
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "1rem", width: "12rem" }}
                    />
                  ) : (
                    ExamTimetableData?.examinationName
                  )}
                </h1>
                <div className="flex gap-2 items-center">
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "1rem", width: "12rem" }}
                    />
                  ) : (
                    <>
                      <h1 className="text-gray-600 text-sm">
                        Conduct Exam on Learning App?
                      </h1>
                      <SwitchLabels
                        checked={ExamTimetableData.examNotificationEnabled}
                        ref={switchRef}
                        name={"conduct_exam_status"}
                        handleSwitchChange={handleSwitchChange}
                      />
                    </>
                  )}
                </div>
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "2rem", width: "12rem" }}
                  />
                ) : (
                  <div
                    onClick={() =>
                      mutation.mutate({ item: {}, name: "conductExam" })
                    }
                  >
                    <BasicButton
                      text={`${
                        ExamTimetableData.examConducted
                          ? "Re-Conduct"
                          : "Conduct"
                      } exam for Class Nursery`}
                      size={"small"}
                    />
                  </div>
                )}
                <h1 className="text-gray-600 text-xs italic">
                  Click here to generate exam timetable for students.
                </h1>
                <div className="flex w-full md:flex-row flex-col mt-4 justify-center gap-8">
                  <div className="px-8 py-4 w-full flex justify-center gap-3 shadow-lg rounded-md items-center bg-slate-300">
                    <h1 className="text-gray-600 font-semibold text-sm">
                      Question papers for all subjects
                    </h1>
                    <div
                      onClick={() =>
                        mutation.mutate({ item: {}, name: "QpGenerate" })
                      }
                    >
                      <BasicButton size={"small"} text={"Generate"} />
                    </div>
                    <a href={ExamTimetableData?.questionPaperLink}>
                      <Download className="!text-gray-600 !cursor-pointer" />
                    </a>
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
                            <h1 className="font-bold sm:text-sm text-xs">
                              Subjects
                            </h1>
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
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold sm:text-sm text-xs">
                              Exam Date
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold sm:text-sm text-xs">
                              Exam Start Time
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold sm:text-sm text-xs">
                              Duration (In Mins)
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[20%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold sm:text-sm text-xs">
                              Exam Type - Delivery Format
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[20%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold sm:text-sm text-xs">
                              Marks - Syllabus
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[5%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold sm:text-sm text-xs">
                              View/Edit QP
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[5%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold sm:text-sm text-xs">
                              Status
                            </h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ExamTimetableData.subjectLevelConfigurationResponses
                        .length < 1 && (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            <h1 className="sm:text-lg text-base font-semibold text-gray-600">
                              No Records Found
                            </h1>
                          </TableCell>
                        </TableRow>
                      )}
                      {returnData().map((item, index) => (
                        <Row row={item} key={index} />
                      ))}
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
