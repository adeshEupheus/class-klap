import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";

import { Menu } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import FeedbackCard from "../../components/MarksEntry/MarksEntryCard";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

import { DownloadReportData } from "../../apis/fectcher/assessment/reportDownload/reportdownload";
import { Skeleton } from "@mui/material";
import { GetSchoolDetailsWithoutHeader } from "../../apis/fectcher/assessment/GetSchoolDetails";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";

const ReportDownload = () => {
  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  const {
    data: ReportDownloadData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["Report_Download_Data"],
    queryFn: () => DownloadReportData(returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const show = null;

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
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
          <SchoolInfo
            SchoolInfoLoading={SchoolInfoLoading}
            schoolInfo={schoolInfo}
          />

          <div className="relative flex py-2 flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs crumbs={["Home", "Report Downloads(144)"]} />
              <h1 className="font-bold sm:text-2xl text-base">
                REPORT DOWNLOADS
              </h1>
            </div>

            <div className="w-full">
              <Timeline
                className="!p-0 sm:px-6"
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.1,
                  },
                }}
              >
                {isLoading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton
                      // sx={{ bgcolor: "grey.400" }}
                      animation="wave"
                      variant="rectangular"
                      height={150}
                    />
                    <Skeleton
                      // sx={{ bgcolor: "grey.400" }}
                      animation="wave"
                      variant="rectangular"
                      height={150}
                    />
                    <Skeleton
                      // sx={{ bgcolor: "grey.400" }}
                      animation="wave"
                      variant="rectangular"
                      height={150}
                    />
                  </div>
                ) : (
                  ReportDownloadData.map((item, index) => {
                    return (
                      <TimelineItem key={index}>
                        <TimelineOppositeContent>
                          <div className=" !text-xs sm:!text-base ">
                            {item.triggeredAtDate}
                          </div>
                          <div className="text-xs sm:text-base">
                            {item.triggeredAtTime}
                          </div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className=" sm:!ml-5">
                          <FeedbackCard data={item} />
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })
                )}
              </Timeline>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDownload;
