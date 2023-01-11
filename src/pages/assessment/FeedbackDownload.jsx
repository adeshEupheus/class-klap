import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Chip, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import { GetMarksEntryOverviewData } from "../../apis/fectcher/assessment/marksEntry/overview";
import CircularProgressWithLabel from "../../components/Material/CircleProgress";
import BasicButton from "../../components/Material/Button";
import { GetApplicableExamType } from "../../apis/fectcher/assessment/GetApplicableExamType";
import  Timeline  from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import FeedbackCard from "../../components/MarksEntry/MarksEntryCard";
import {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';
import {SearchBar} from "../../components/Material/SearchBar";
 

const FeedbackDownload = () => {
  const [id, setId] = useState("SA1");
  const [sectionId, setSectionId] = useState("117145");

  const {
    data: Overview_TableData,
    isLoading: OverviewData_Loading,
    refetch,
  } = useQuery({
    queryKey: ["prs_tracker", id],
    queryFn: () => GetMarksEntryOverviewData(id, sectionId),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const { data: Exam_Types, isLoading: Exam_Type_Loading } = useQuery({
    queryKey: ["exam_types"],
    queryFn: () => GetApplicableExamType(),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    if (type === "class") {
      //   updateData(value.value);
    } else if ((type = "prs")) {
      //   console.log(value.value.split(" ")[1]);
      setId(`RSA ${value.value.split(" ")[1]}`);
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
          <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
            <div className="flex flex-col px-4 cursor-pointer py-4 items-end gap-[1px]">
              <span>Vidyanidhi Public School</span>
              <span>KA2015 [2022-2023]</span>
            </div>
          </div>

          

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs
                crumbs={["Home", "Feedback Downloads"]}
              />
              <h1 className="font-bold sm:text-2xl text-base">
                FEEDBACK DOWNLOADS
              </h1>
              </div>
              <div className="flex justify-end  w-full ">
              <div className=" rounded-sm w-[30%] ">
               <SearchBar/></div>
               </div>
             
              <div className="w-full ">
                
              <Timeline sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}>
        
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:43 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:20 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:19 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:17 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:17 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:17 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:17 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent><div className='text-sm sm:text-lg'>10 Jan,2023</div><div className="text-sm sm:text-lg">03:17 PM</div></TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="!mt-4 !ml-5"><FeedbackCard/></TimelineContent>
        </TimelineItem>
    </Timeline>
    
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackDownload;
