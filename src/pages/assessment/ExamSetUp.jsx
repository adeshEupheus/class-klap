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
import BasicTextFields from "../../components/Material/TextField";
import SwitchLabels from "../../components/Material/Switch";
import { GetExamSetUpData } from "../../apis/fectcher/assessment/examSetUp/examSetUp";
import { LockExamSetup, UnLockExamSetup } from "../../apis/mutation/examSetUp";
import Snackbars from "../../components/Material/Snackbar";
import Loader from "../../components/Material/Loader";
const ExamSetUp = () => {
  const [id, setId] = useState("FA1");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);

  const snackbarRef = useRef();
  const switchRefs = useRef([]);
  switchRefs.current = [];

  const addToRef = (el) => {
    // console.count(el);
    if (el && !switchRefs.current.includes(el)) {
      switchRefs.current.push(el);
    }
  };

  const {
    data: Exam_setUpData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["exam_setup_data", id],
    queryFn: () => GetExamSetUpData(id),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const lockMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      setLoading(true);
      let res;
      let index;
      if (data.item) {
        if (!data.item.locked) {
          res = await LockExamSetup(data.examType, data.gradeId, data.data);
        } else {
          res = await UnLockExamSetup(data.examType, data.gradeId);
        }
      } else {
        res = await LockExamSetup(data.examType, data.gradeId, data.data);
      }
      if (res.success) {
        refetch();
        setSnackbarErr(false);
        if (data.item) {
          index = Exam_setUpData.indexOf(data.item);
        }
        setSnackbarMsg(res.message.replace(/<b>/g, " ").replace("</b>", " "));
        snackbarRef.current.openSnackbar();
        setLoading(false);
        if (data.item) {
          switchRefs.current[index].toggle();
        }
      } else {
        setSnackbarErr(true);
        setSnackbarMsg(res.message.replace(/<b>/g, " ").replace("</b>", " "));
        snackbarRef.current.openSnackbar();
        setLoading(false);
      }
    },
  });

  const show = null;

  const handleSwitchChange = (name, status, item) => {
    // console.log(!item.locked);
    const apiDataBody = {
      grade: item.grade.name,
      exam: id,
      examName: item.examName.name,
      duration: item.duration,
      locked: !item.locked,
      marksSyllabus: item.selectedMarksSyllabus.name,
      questionPaperTypeDeliveryFormat: item.questionPaperDeliveryModeType.name,
    };
    lockMutation.mutate({
      examType: id,
      gradeId: apiDataBody.grade,
      data: apiDataBody,
      item,
    });
  };

  const returnData = () => {
    if (filter === "All") {
      return Exam_setUpData;
    }

    const newArray = Exam_setUpData.filter(
      (item) => item.grade.displayName === filter
    );
    return newArray;
  };

  const sidebarRef = useRef();

  const handleDropDown = (value, type, item) => {
    console.log(value, type, item);
    let test;
    let apiDataBody;
    switch (type) {
      case "class":
        setFilter(value.value);
        break;
      case "exam_setup":
        setFilter("All");
        setId(value.value);
        break;
      case "exam_name":
        test = item.applicableExamNames.filter(
          (item) => item.displayName === value.value
        );
        // console.log(test[0].name);
        apiDataBody = {
          grade: item.grade.name,
          exam: id,
          examName: test[0].name,
          duration: item.duration,
          locked: false,
          marksSyllabus: item.selectedMarksSyllabus.name,
          questionPaperTypeDeliveryFormat:
            item.questionPaperDeliveryModeType.name,
        };

        lockMutation.mutate({
          examType: id,
          gradeId: apiDataBody.grade,
          data: apiDataBody,
        });
        break;

      case "exam_type":
        test = item.applicableQuestionPaperDeliveryModeTypes.filter(
          (item) => item.displayName === value.value
        );
        // console.log(test[0].name);
        apiDataBody = {
          grade: item.grade.name,
          exam: id,
          examName: item.examName.name,
          duration: item.duration,
          locked: false,
          marksSyllabus: item.selectedMarksSyllabus.name,
          questionPaperTypeDeliveryFormat: test[0].name,
        };
        lockMutation.mutate({
          examType: id,
          gradeId: apiDataBody.grade,
          data: apiDataBody,
        });
        break;
      case "mark_syllabus_difficulty":
        test = item.applicableMarksSyllabus.SUBJECTIVE.filter(
          (item) => item.displayName === value.value
        );
        // console.log(test[0].name);
        apiDataBody = {
          grade: item.grade.name,
          exam: id,
          examName: item.examName.name,
          duration: item.duration,
          locked: false,
          marksSyllabus: test[0].name,
          questionPaperTypeDeliveryFormat:
            item.questionPaperDeliveryModeType.name,
        };
        // console.log(apiDataBody);

        lockMutation.mutate({
          examType: id,
          gradeId: apiDataBody.grade,
          data: apiDataBody,
        });
        break;

      default:
        break;
    }
  };

  const handleOnBlur = (value, item) => {
    const apiDataBody = {
      grade: item.grade.name,
      exam: id,
      examName: item.examName.name,
      duration: Number(value),
      locked: false,
      marksSyllabus: item.selectedMarksSyllabus.name,
      questionPaperTypeDeliveryFormat: item.questionPaperDeliveryModeType.name,
    };
    // console.log(apiDataBody);

    lockMutation.mutate({
      examType: id,
      gradeId: apiDataBody.grade,
      data: apiDataBody,
    });
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Exam Set Up - ClassKlap";
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
          highLight={"exam_setup"}
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
              <Breadcrumbs crumbs={["Home", "Assessment", "Exam Set Up"]} />
              <h1 className="font-bold sm:text-2xl text-xl">Exam Set Up</h1>
              <div className="w-[5rem]">
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
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Class</h1>
                            <div className="w-[5rem]">
                              <SearchDropDown
                                handleDropDown={handleDropDown}
                                data={[
                                  {
                                    value: "All",
                                  },
                                  ...Exam_setUpData.map((item) => {
                                    return { value: item.grade.displayName };
                                  }),
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
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Exam Name</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">
                              Exam Type - Delivery Format
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">
                              Marks - Syllabus - Difficulty
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[10%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Duration (in Min)</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[5%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Lock</h1>
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
                            <h1 className="font-bold">
                              {item.grade.displayName}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <SearchDropDown
                              minWidth={"14rem"}
                              handleDropDown={handleDropDown}
                              item={item}
                              data={[
                                ...item.applicableExamNames.map((item) => {
                                  return { value: item.displayName };
                                }),
                              ]}
                              variant={"outlined"}
                              Name={"exam_name"}
                              defaultValue={{
                                value: item.examName.displayName,
                              }}
                              size={"small"}
                              disable={item.locked}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <SearchDropDown
                              minWidth={"12rem"}
                              disable={item.locked}
                              handleDropDown={handleDropDown}
                              item={item}
                              data={[
                                ...item.applicableQuestionPaperDeliveryModeTypes.map(
                                  (item) => {
                                    return { value: item.displayName };
                                  }
                                ),
                              ]}
                              variant={"outlined"}
                              Name={"exam_type"}
                              defaultValue={{
                                value:
                                  item.questionPaperDeliveryModeType
                                    .displayName,
                              }}
                              size={"small"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {Object.keys(item.applicableMarksSyllabus)[0] ===
                            "SUBJECTIVE" ? (
                              <SearchDropDown
                                minWidth={"12rem"}
                                handleDropDown={handleDropDown}
                                disable={item.locked}
                                item={item}
                                data={[
                                  ...item?.applicableMarksSyllabus?.SUBJECTIVE?.map(
                                    (item) => {
                                      return { value: item.displayName };
                                    }
                                  ),
                                ]}
                                variant={"outlined"}
                                Name={"mark_syllabus_difficulty"}
                                defaultValue={{
                                  value: item.selectedMarksSyllabus.displayName,
                                }}
                                size={"small"}
                              />
                            ) : (
                              <SearchDropDown
                                minWidth={"12rem"}
                                handleDropDown={handleDropDown}
                                disable={item.locked}
                                item={item}
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
                                  value: item.selectedMarksSyllabus.displayName,
                                }}
                                size={"small"}
                              />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <BasicTextFields
                              variant={"standard"}
                              item={item}
                              defaultValue={item.duration}
                              disable={item.locked}
                              handleOnBlur={handleOnBlur}
                              lable={"Time"}
                              type={"number"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <SwitchLabels
                              checked={item.locked}
                              item={item}
                              ref={addToRef}
                              name={"exam_setup"}
                              handleSwitchChange={handleSwitchChange}
                            />
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

export default ExamSetUp;
