import React from "react";
import { Graph } from "../../components/Graph";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Button, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import Snackbars from "../../components/Material/Snackbar";
import Loader from "../../components/Material/Loader";
// import BasicButton from "../../Components/Material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  DownloadFeedback,
  DownloadPerformance,
  GetScoreBoardData,
} from "../../apis/fectcher/assessment/scoreBoard/scoreBoard";
import DialogSlide from "../../components/Material/scoreboard/Dialog";
import { GetSchoolDetailsWithoutHeader } from "../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScoreBoard = () => {
  // const [id, setId] = useState("RSA1");

  const [loading, setLoading] = useState(true);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);

  const snackbarRef = useRef();
  const switchRefs = useRef([]);
  switchRefs.current = [];

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

  const addToRef = (el) => {
    // console.count(el);
    if (el && !switchRefs.current.includes(el)) {
      switchRefs.current.push(el);
    }
  };

  const {
    data: ScoreBoardData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["Score_Board_Data"],
    queryFn: () => GetScoreBoardData(returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      // console.log(data);
      //   let mainData = [];
      // Object.entries(data.Primary).map((item) => {
      //   mainData.push({className: item[0], data: item[1]})
      // })
      // console.log(mainData);
      // console.log( );
      setFilter(Object.keys(data?.Primary)[0]);
      setLoading(false);
      // setFilter();
    },
    refetchOnWindowFocus: false,
  });
  const [filter, setFilter] = useState();

  const returnArray = () => {
    let mainData = [];
    Object.entries(ScoreBoardData.Primary).map((item) => {
      mainData.push({ className: item[0], data: item[1] });
    });
    return mainData;
  };

  const handleDropDown = (value, type, item) => {
    setFilter(value.value);
  };

  const returnClass = (data) => {
    let mainData = [];
    Object.entries(data).map((item) => {
      mainData.push({ className: item[0], data: item[1] });
    });
    return mainData;
  };

  const returnData = () => {
    const newArray = returnArray().filter((item) => item.className === filter);
    return newArray;
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const show = null;

  const sidebarRef = useRef();
  const dialogRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const openDialog = async (type) => {
    if (type === "feedback") {
      await DownloadFeedback(filter, returnToken());
    } else {
      await DownloadPerformance(filter, returnToken());
    }
    dialogRef.current.openDialog();
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
          highLight={"revision_and_exam"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        {/* <Loader loading={loading} /> */}
        <DialogSlide ref={dialogRef} />

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

          <div className="relative flex flex-col w-full justify-center py-2 items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4 ">
              <Breadcrumbs crumbs={["Home", "Assessment", "4.ScoreBoard"]} />
              <h1 className="font-semibold sm:text-2xl text-xl">
                4.SCOREBOARD
              </h1>

              {isLoading || loading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "5rem" }}
                />
              ) : (
                <div className="flex  flex-col p-3 md:flex-row  justify-between md:p-3 ">
                  <div className="w-[10rem] ">
                    <SearchDropDown
                      handleDropDown={handleDropDown}
                      data={returnArray().map((item) => {
                        return { value: item.className };
                      })}
                      variant={"outlined"}
                      Name={"scoreboard"}
                      defaultValue={{ value: filter }}
                      size={"small"}
                    />
                  </div>
                  <div className="flex sm:flex-row flex-col gap-3 mt-3 md:mt-0 ">
                    <Button
                      variant="contained"
                      className="!font-semibold"
                      size="small"
                    >
                      <FileDownloadIcon />
                      Exam Attendance
                    </Button>

                    <Button
                      variant="contained"
                      className="!font-semibold"
                      onClick={() => openDialog("feedback")}
                      size="small"
                    >
                      {" "}
                      <FileDownloadIcon />
                      Feedback Report
                    </Button>
                    <Button
                      variant="contained"
                      className="!font-semibold"
                      onClick={() => openDialog("performance")}
                      size="small"
                    >
                      {" "}
                      <FileDownloadIcon />
                      Performance
                    </Button>
                  </div>
                </div>
              )}
              {isLoading || loading ? (
                <Skeleton animation="wave" variant="rectangular" height={300} />
              ) : (
                <>
                  {returnClass(returnData()[0].data).map((item, i) => {
                    return (
                      <div className="sm:w-full" key={i}>
                        <Graph data={item} key={item.className} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
