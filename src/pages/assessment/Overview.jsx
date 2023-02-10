import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicButton from "../../components/Material/Button";
import {
  GetOverviewData,
  GetOverViewTrackerData,
} from "../../apis/fectcher/assessment/overview/overviewData";
import Loader from "../../components/Material/Loader";
import { GetSchoolDetailsWithoutHeader } from "../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { GenerateFeedback, AnnounceResult } from "../../apis/mutation/overview";
import Snackbars from "../../components/Material/Snackbar";
import OverviewStepper from "../../components/OverviewTracker";
const OverView = () => {
  const [id, setId] = useState("FA1");
  const [filter, setFilter] = useState("All");
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  const snackbarRef = useRef();

  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };
  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["overview_data", id],
    queryFn: () => GetOverviewData(id, returnToken()),
  });
  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const { data: TrackerData, isLoading: TrackerLoading } = useQuery({
    queryKey: ["tracker_data", id],
    queryFn: () => GetOverViewTrackerData(id, returnToken()),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (
        data.type === "feedback" &&
        data.data.feedbackStatus !== "CANNOT_GENERATE"
      ) {
        let bodyFormData = new FormData();
        bodyFormData.append("grade", data.data.grade);
        bodyFormData.append("examType", id);
        setLoading(true);
        const res = await GenerateFeedback(bodyFormData, returnToken());
        setLoading(false);
        console.log(res);
        if (res.data.success === true) {
          setSnackbarErr(false);
          setSnackbarMsg(res.data.message);
          snackbarRef.current.openSnackbar();
        }
      } else if (
        data.type === "result" &&
        data.data.resultAnnouncementStatus !== "CANNOT_ANNOUNCE"
      ) {
        let bodyFormData = new FormData();
        bodyFormData.append("grade", data.data.grade);
        bodyFormData.append("examType", id);
        setLoading(true);
        const res = await AnnounceResult(bodyFormData, returnToken());
        setLoading(false);
        console.log(res);
        if (res.data.success === true) {
          setSnackbarErr(false);
          setSnackbarMsg(res.data.message);
          snackbarRef.current.openSnackbar();
        }
      }
    },
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDropDown = (value, type) => {
    console.log(value, type);

    switch (type) {
      case "Overview":
        setFilter("All");
        setId(value.value);
        break;
      case "class":
        setFilter(value.value);
        // setId(value.value);
        break;

      default:
        break;
    }
  };

  const returnData = () => {
    if (filter === "All") {
      return overviewData;
    }

    const newArray = overviewData.filter((item) => item.schoolClass === filter);
    return newArray;
  };

  const show = null;

  function removeDuplicates(arr, key) {
    let array;
    switch (key) {
      case "class":
        array = arr.map((item) => item.schoolClass);
        // console.log([...new Set(array)]);
        return [...new Set(array)];
        break;

      case "examName":
        array = arr.map((item) => item.examName);
        // console.log([...new Set(array)]);
        return [...new Set(array)];
        break;

      case "examSetup":
        array = arr.map((item) => item.examSetup);
        // console.log([...new Set(array)]);
        return [...new Set(array)];
        break;

      case "examSchedule":
        array = arr.map((item) => item.examSchedule);
        // console.log([...new Set(array)]);
        return [...new Set(array)];
        break;

      case "marksEntryStatus":
        array = arr.map((item) => item.marksEntryStatus);
        // console.log([...new Set(array)]);
        return [...new Set(array)];
        break;

      default:
        break;
    }
  }

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Overview - ClassKlap";

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
        <Loader loading={loading} />
        <Sidebar
          highLight={"overview"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"overview"}
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

          <SchoolInfo
            SchoolInfoLoading={SchoolInfoLoading}
            schoolInfo={schoolInfo}
          />

          <div className="relative flex flex-col w-full justify-center items-start py-2 gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs crumbs={["Home", "Assessment", "Overview"]} />
              <h1 className="font-bold text-2xl">Overview</h1>
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
                  Name={"Overview"}
                  defaultValue={{ value: "FA1" }}
                  size={"small"}
                />
              </div>
              {TrackerLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={100}
                />
              ) : TrackerData.status === "NOT APPLICABLE" ? null : (
                <div className="w-full flex justify-center bg-gray-100 shadow-2xl rounded-lg overflow-auto py-[2rem]">
                  <OverviewStepper data={TrackerData} examId={id} />
                </div>
              )}

              {isLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={300}
                />
              ) : (
                <TableContainer
                  className="sm:!w-full !overflow-auto max-h-[70vh]"
                  component={Paper}
                >
                  <Table
                    className="!w-full"
                    //   sx={{ width: 1000 }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Class</h1>
                            <SearchDropDown
                              handleDropDown={handleDropDown}
                              // minWidth={"50rem"}
                              data={[
                                {
                                  value: "All",
                                },

                                ...removeDuplicates(overviewData, "class").map(
                                  (item) => {
                                    return { value: item };
                                  }
                                ),
                              ]}
                              variant={"outlined"}
                              Name={"class"}
                              defaultValue={{
                                value: "All",
                              }}
                              // value={{ value: "FA1" }}
                              size={"small"}
                            />
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Exam Name</h1>
                            {/* <SearchDropDown
                              handleDropDown={handleDropDown}
                              data={[
                                {
                                  value: "All",
                                },

                                ...removeDuplicates(
                                  overviewData,
                                  "examName"
                                ).map((item) => {
                                  return { value: item };
                                }),
                              ]}
                              variant={"outlined"}
                              Name={"examName"}
                              defaultValue={{
                                value: overviewData[0].examName,
                              }}
                              size={"small"}
                            /> */}
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Exam Set Up</h1>
                            {/* <SearchDropDown
                              handleDropDown={handleDropDown}
                              data={[
                                {
                                  value: "All",
                                },

                                ...removeDuplicates(
                                  overviewData,
                                  "examSetup"
                                ).map((item) => {
                                  return { value: item };
                                }),
                              ]}
                              variant={"outlined"}
                              Name={"examSetUp"}
                              defaultValue={{
                                value: overviewData[0].examSetup,
                              }}
                              size={"small"}
                            /> */}
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Exam Schedule</h1>
                            {/* <SearchDropDown
                              handleDropDown={handleDropDown}
                              data={[
                                {
                                  value: "All",
                                },

                                ...removeDuplicates(
                                  overviewData,
                                  "examSchedule"
                                ).map((item) => {
                                  return { value: item };
                                }),
                              ]}
                              variant={"outlined"}
                              Name={"examSchedule"}
                              defaultValue={{
                                value: overviewData[0].examSchedule,
                              }}
                              size={"small"}
                            /> */}
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Marks Entry</h1>
                            {/* <SearchDropDown
                              handleDropDown={handleDropDown}
                              data={[
                                {
                                  value: "All",
                                },

                                ...removeDuplicates(
                                  overviewData,
                                  "marksEntryStatus"
                                ).map((item) => {
                                  return { value: item };
                                }),
                                // ...removeDuplicates(overviewData, "examName"),
                              ]}
                              variant={"outlined"}
                              Name={"marksEntry"}
                              defaultValue={{
                                value: overviewData[0].marksEntryStatus,
                              }}
                              size={"small"}
                            /> */}
                          </div>
                        </TableCell>
                        <TableCell align="right">Feedback</TableCell>
                        <TableCell align="right">Announce Results</TableCell>
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
                            {item.schoolClass}
                          </TableCell>
                          <TableCell align="center">{item.examName}</TableCell>
                          <TableCell align="center">{item.examSetup}</TableCell>
                          <TableCell align="center">
                            <h1 className="text-red-600 font-semibold">
                              {item.examSchedule}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="text-red-600 font-semibold">
                              {item.marksEntryStatus}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <div className="w-full flex flex-col items-end justify-center">
                              <button
                                onClick={() =>
                                  mutation.mutate({
                                    type: "feedback",
                                    data: item,
                                  })
                                }
                              >
                                <BasicButton
                                  text={`${
                                    item.feedbackStatus === "CANNOT_GENERATE"
                                      ? "Generate"
                                      : "Regenerate"
                                  }`}
                                  size={"small"}
                                  disable={
                                    item.feedbackStatus === "CANNOT_GENERATE"
                                      ? true
                                      : false
                                  }
                                />
                              </button>

                              <h1 className="font-semibold italic text-xs">
                                {item?.feedbackGenerationDate?.replace(
                                  "&nbsp;",
                                  ""
                                )}
                              </h1>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="w-full flex flex-col items-end justify-center">
                              <button
                                onClick={() =>
                                  mutation.mutate({
                                    type: "result",
                                    data: item,
                                  })
                                }
                              >
                                <BasicButton
                                  text={"Announce"}
                                  size={"small"}
                                  disable={
                                    item.resultAnnouncementStatus ===
                                    "CANNOT_ANNOUNCE"
                                      ? true
                                      : false
                                  }
                                />
                              </button>
                              <h1 className="font-semibold italic text-xs">
                                {item?.resultAnnouncementDate?.replace(
                                  "&nbsp;",
                                  ""
                                )}
                              </h1>
                            </div>
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

export default OverView;
