import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import axios from "axios";

import { useNavigate } from "react-router-dom";

import SwipeableTemporaryDrawer from "../components/Material/MaterialSidebar";
import BasicButton from "../components/Material/Button";
import { Switch } from "@mui/material";
import {
  Grading,
  Laptop,
  Menu,
  SupervisorAccount,
  Visibility,
} from "@mui/icons-material";
import Stepper from "../components/Material/Stepper";
import LeftPositionedTimeline from "../components/Material/TimeLine";
import { useQuery } from "@tanstack/react-query";
import { setSchoolId } from "../apis/fectcher/SetSchoolId";
const Home = () => {
  const {
    data: schoolRes,
    isError,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["setSchoolId"], queryFn: setSchoolId(8188) });
  console.log(schoolRes);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = useNavigate();
  const show = null;

  const sidebarRef = useRef();

  const navInfo = {
    title: "",
    details: ["", ""],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Home - ClassKlap";
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
          {/* <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          /> */}
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
            <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 w-full justify-items-stretch sm:px-12 px-2 gap-4">
              <div className="flex flex-col px-4 py-8 shadow-2xl mx-4 bg-gray-50 rounded-lg justify-center cursor-pointer items-center gap-3">
                <span className="sm:text-xl text-sm font-semibold">
                  <Laptop className="!text-[2rem] mr-3" /> Live Classes
                  Completed
                </span>
                <span className="sm:text-2xl text-sm font-bold">0 Classes</span>
                <span className="text-sm font-semibold text-gray-400">
                  No Changes Since Last Week
                </span>
              </div>
              <div className="flex flex-col px-4 py-4 shadow-2xl mx-4 rounded-lg bg-gray-50 justify-center cursor-pointer items-center gap-3">
                <span className="sm:text-xl text-sm font-semibold">
                  <Visibility className="!text-[2rem] mr-3" />
                  DIGITAL CONTENT VIEWED
                </span>
                <span className="sm:text-2xl text-sm font-bold">196 / 510</span>
                <span className="text-sm font-semibold text-gray-400">
                  No Changes Since Last Week
                </span>
              </div>
              <div className="flex flex-col px-4 py-4 shadow-2xl mx-4 rounded-lg bg-gray-50 justify-center cursor-pointer items-center gap-3">
                <span className="sm:text-xl text-sm font-semibold">
                  <SupervisorAccount className="!text-[2rem] mr-3" />
                  PARENTS INSTALLED
                </span>
                <span className="sm:text-2xl text-sm font-bold">510 / 802</span>
                <span className="text-sm font-semibold text-gray-400">
                  No Changes Since Last Week
                </span>
              </div>
              <div className="flex flex-col px-4 py-4 shadow-2xl mx-4 rounded-lg bg-gray-50 justify-center cursor-pointer items-center gap-3">
                <span className="sm:text-xl text-sm font-semibold">
                  <Grading className="!text-[2rem] mr-3" /> PERIODS COMPLETED
                </span>
                <span className="sm:text-2xl text-sm font-bold">0 / 452</span>
                <span className="text-sm font-semibold text-gray-400">
                  No Changes Since Last Week
                </span>
              </div>
            </div>
            <div className="w-full hidden md:block px-8 my-[3rem]">
              <div className="w-full relative flex bg-gray-50 flex-col rounded-lg pt-[3rem] pb-10 px-8 gap-8 items-center shadow-2xl justify-center">
                <div className="flex w-full items-center flex-col gap-2">
                  <span className="text-gray-600 font-semibold">
                    PRS - Revision SA1
                  </span>
                  <Stepper />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-gray-600 font-semibold">
                    PRS - Revision SA2
                  </span>
                  <Stepper />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-gray-600 font-semibold">
                    PRS - Revision SA3
                  </span>
                  <Stepper />
                </div>
                <div className="absolute top-4 right-4">
                  <BasicButton text={"View All"} size={"small"} />
                </div>
              </div>
            </div>
            <div className="w-full px-8 my-[3rem]">
              <div className="w-full justify-start flex md:flex-row flex-col gap-4">
                <div className="md:w-[40%] w-full rounded-lg py-4 px-4 bg-gray-50 flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Report Downloads
                    </span>
                    <BasicButton text={"View All"} size={"small"} />
                  </div>
                  <LeftPositionedTimeline />
                </div>
                <div className="md:w-[60%] w-full flex flex-col justify-between rounded-lg py-4 bg-gray-50">
                  <div className="w-full flex items-center px-4 justify-between">
                    <span className="font-semibold text-gray-700">
                      CTTP PROGRESS TRACKER
                    </span>
                    <BasicButton text={"View All"} size={"small"} />
                  </div>
                  <div className="w-full flex justify-center">
                    <span className="font-semibold text-gray-400">
                      No CTTP data found.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-full px-8 my-[3rem]">
            <div className="grid grid-cols-2 grid-rows-2 w-full justify-items-stretch px-4 gap-4">

            </div>
            </div> */}
            {/* <div>test</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
