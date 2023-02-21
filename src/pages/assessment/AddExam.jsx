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
import { Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
// import BasicTextFields from "../../components/Material/TextField";
// import SwitchLabels from "../../components/Material/Switch";
// import { GetExamSetUpData } from "../../apis/fectcher/assessment/examSetUp/examSetUp";
// import { LockExamSetup, UnLockExamSetup } from "../../apis/mutation/examSetUp";
import Snackbars from "../../components/Material/Snackbar";
import Loader from "../../components/Material/Loader";
import { GetSchoolDetailsWithoutHeader } from "../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { AddExamData } from "../../apis/fectcher/assessment/addExam/AddExamData";
import BasicButton from "../../components/Material/Button";
import DialogSlide from "../../components/Material/AddExam/Dialog";
import DialogSlide2 from "../../components/Material/AddExam/Dialog2";
import { AddExamInAdditionalExam } from "../../apis/mutation/AddExamSetUp";
const AddExam = () => {
  //   const [id, setId] = useState("FA1");
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

  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const snackbarRef = useRef();
  const switchRefs = useRef([]);
  switchRefs.current = [];

  const {
    data: AddExamInfo,
    isLoading: AddExamLoading,
    refetch,
    // isRefetching,
  } = useQuery({
    queryKey: ["add_exam_setup_data"],
    queryFn: () => AddExamData(returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const addExamMutate = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      const res = await AddExamInAdditionalExam(data).catch((err) => {
        setLoading(false);
        dialogRef2.current.closeDialog();
        setSnackbarErr(true);
        setSnackbarMsg("Something went wrong");
        snackbarRef.current.openSnackbar();
      });
      setSnackbarErr(!res.success);
      setSnackbarMsg(res.message);
      snackbarRef.current.openSnackbar();
      dialogRef2.current.closeDialog();
      if (res.success) {
        refetch();
      }
      setLoading(false);
    },
  });

  const show = null;

  //     // console.log(!item.locked);
  //     const apiDataBody = {
  //       grade: item.grade.name,
  //       exam: id,
  //       examName: item.examName.name,
  //       duration: item.duration,
  //       locked: !item.locked,
  //       marksSyllabus: item.selectedMarksSyllabus.name,
  //       questionPaperTypeDeliveryFormat: item.questionPaperDeliveryModeType.name,
  //     };
  //     lockMutation.mutate({
  //       examType: id,
  //       gradeId: apiDataBody.grade,
  //       data: apiDataBody,
  //       item,
  //     });
  //   };

  const returnData = () => {
    if (filter === "All") {
      return AddExamInfo;
    }

    const newArray = AddExamInfo.filter((item) => item.examName === filter);
    return newArray;
  };

  const sidebarRef = useRef();

  const handleDropDown = (value, type, item) => {
    switch (type) {
      case "examName":
        setFilter(value.value);
        break;
      default:
        break;
    }
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const dialogRef = useRef();
  const dialogRef2 = useRef();

  const handleButtonAction = (name) => {
    if (name === "AddExamButton") {
      dialogRef.current.openDialog();
    }
  };

  const handleDialogButton1 = (data) => {
    console.log(data);
    if (
      data.appClass.length < 1 ||
      !data.examName ||
      !data.marks ||
      data.subject.length < 1
    ) {
      setSnackbarErr(true);
      setSnackbarMsg("Please provide valid data.");
      snackbarRef.current.openSnackbar();
    } else {
      dialogRef2.current.openDialog(data);
    }
  };

  const handleDialogButton2 = async (data) => {
    console.log(data);
    let bodyFormData = new URLSearchParams();
    bodyFormData.append("examType", data.examName.value[0]);
    bodyFormData.append("marks", data.marks);
    data.appClass.map((item) => {
      bodyFormData.append("classesApplicable", item.value[0]);
    });
    data.subject.map((item) => {
      bodyFormData.append("subjectsApplicable", item.value[0]);
    });

    addExamMutate.mutate(bodyFormData);
  };

  useEffect(() => {
    document.title = "Additional Exam Set Up - ClassKlap";
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
      <DialogSlide ref={dialogRef} handleDialogButton={handleDialogButton1} />
      <DialogSlide2 ref={dialogRef2} handleDialogButton={handleDialogButton2} />
      <div className="flex w-[100%] min-h-[100vh]">
        <Sidebar
          highLight={"add_exam"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        <Loader loading={loading} />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"exam_setup"}
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

          <div className="relative flex flex-col w-full justify-center items-start py-2 gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs
                crumbs={["Home", "Assessment", "Additional Exam Set Up"]}
              />
              <h1 className="font-bold sm:text-2xl text-xl">
                Additional Exam Set Up
              </h1>
              <div className="w-full flex justify-end">
                <BasicButton
                  text={`+ Exam`}
                  size={"small"}
                  name={"AddExamButton"}
                  handleButtonAction={handleButtonAction}
                />
              </div>
              {AddExamLoading ? (
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
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Exam Name</h1>
                            <div className="w-full">
                              <SearchDropDown
                                handleDropDown={handleDropDown}
                                data={[
                                  {
                                    value: "All",
                                  },
                                  ...AddExamInfo.map((item) => {
                                    return { value: item.examName };
                                  }),
                                ]}
                                variant={"outlined"}
                                Name={"examName"}
                                defaultValue={{
                                  value: "All",
                                }}
                                size={"small"}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Marks</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Class Applicable</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">
                              Subjects Applicable
                            </h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {returnData()?.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            <h1 className="font-bold">{item.examName}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold">{item.marks}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold">
                              {item.classesApplicable}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold">
                              {item.subjectsApplicable}
                            </h1>
                          </TableCell>
                        </TableRow>
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

export default AddExam;
