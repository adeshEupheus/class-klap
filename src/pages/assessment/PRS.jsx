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
import { Chip, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import HorizontalStepper from "../../components/Material/Stepper";
import { GetPrsTrackerData } from "../../apis/fectcher/assessment/prsOverview/TrackerData";
import { GetPrsTableData } from "../../apis/fectcher/assessment/prsOverview/TableData";
import {
  GetSchoolDetails,
  GetSchoolDetailsWithoutHeader,
} from "../../apis/fectcher/assessment/GetSchoolDetails";
import Cookies from "js-cookie";
import SchoolInfo from "../../components/SchoolInfo";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";

const PRSOverview = () => {
  const [id, setId] = useState("RSA1");
  // const [isUrlToken, setIsUrlToken] = useState(false);

  //   const [mainData, setMainData] = useState([]);
  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  const { data: schoolInfo, isLoading: SchoolInfoLoading } = useQuery({
    queryKey: ["school_info"],
    queryFn: () => GetSchoolDetailsWithoutHeader(returnToken()),
  });

  const {
    data: PRS_Tracker,
    isLoading: Tracker_Loading,
    refetch,
  } = useQuery({
    queryKey: ["prs_tracker", id],
    queryFn: () => GetPrsTrackerData(id, returnToken()),
    onSuccess: (data) => {
      console.log(data);
      //   setMainData(data);
    },
    // enabled: false,
    refetchOnWindowFocus: false,
  });

  const { data: PRS_Table, isLoading: PRS_Table_Loading } = useQuery({
    queryKey: ["prs_table", id],
    queryFn: () => GetPrsTableData(id, returnToken()),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  // useLayoutEffect(() => {
  //   if (queryParameters.get("auth")) {
  //     setIsUrlToken(queryParameters.get("auth"));
  //   }
  // }, []);

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
    document.title = "PRS Overview - ClassKlap";
    // setMainData(Exam_setUpData);

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
          highLight={"prs"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"prs"}
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

          <div className="relative flex flex-col w-full py-2 justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs
                crumbs={["Home", "Assessment", "Personal Revision Sheet"]}
              />
              <h1 className="font-bold sm:text-2xl text-xl">
                Personal Revision Sheet - Overview
              </h1>
              <div className="w-[9rem]">
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "Revision 1" },
                    { value: "Revision 2" },
                    { value: "Revision 3" },
                  ]}
                  variant={"outlined"}
                  Name={"prs"}
                  defaultValue={{ value: "Revision 1" }}
                  size={"small"}
                />
              </div>
              {Tracker_Loading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={100}
                />
              ) : (
                <div className="w-full flex justify-center bg-gray-100 shadow-2xl rounded-lg overflow-auto py-[2rem]">
                  <HorizontalStepper data={PRS_Tracker} />
                </div>
              )}
              {PRS_Table_Loading ? (
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
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Class</h1>
                            <div className="w-[5rem]">
                              <SearchDropDown
                                handleDropDown={handleDropDown}
                                data={[
                                  {
                                    value: "All",
                                  },
                                  ...PRS_Table.map((item) => {
                                    return { value: item.className };
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
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Roll List</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Exam Status</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Print Status</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Download Status</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Feedback status</h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {PRS_Table?.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            <h1 className="font-bold">{item.className}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-blue-500">
                              {item.rollListStatus}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-blue-500 text-sm">
                              {item.examStatus}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              variant="outlined"
                              label={item.printStatus}
                              color="success"
                              size="small"
                            />

                            {/* <h1 className="font-bold">{item.printStatus}</h1> */}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              variant="outlined"
                              label={item.downloadStatus}
                              color="warning"
                              size="small"
                            />
                            {/* <h1 className="font-bold ">
                              {item.downloadStatus}
                            </h1> */}
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-blue-500 text-sm">
                              {item.performanceStatus}
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

export default PRSOverview;
