import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import Navbar from "../components/Navbar";
import Sidebar from "../../components/Sidebar";
// import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";

import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Switch } from "@mui/material";
import {
  //   Grading,
  //   Laptop,
  Menu,
  //   SupervisorAccount,
  //   Visibility,
} from "@mui/icons-material";
// import Stepper from "../../components/Material/Stepper";
// import LeftPositionedTimeline from "../../components/Material/TimeLine";
import { useQuery } from "@tanstack/react-query";
import { setSchoolId } from "../../apis/fectcher/SetSchoolId";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import BasicTable from "../../components/Material/BasicTable";
import BasicButton from "../../components/Material/Button";
import BasicTextFields from "../../components/Material/TextField";
import SwitchLabels from "../../components/Material/Switch";
const ExamSetUp = () => {
  const {
    data: schoolRes,
    isError,
    isLoading,
    refetch,
  } = useQuery(["setSchoolId"], setSchoolId(8188));
  console.log(schoolRes);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const rows = ["Nursery", "LKG", "UKG", "1", "2", "3", "4", "5"];

  const navigate = useNavigate();
  const show = null;

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    // switch (type) {
    //   case "Overview":
    //     setId(value.value);
    //     break;

    //   default:
    //     break;
    // }
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
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
                  Name={"Overview"}
                  defaultValue={{ value: "FA1" }}
                  size={"small"}
                />
              </div>

              <TableContainer
                className="sm:!w-full !overflow-auto max-h-[70vh] "
                component={Paper}
              >
                <Table
                  className="!w-full"
                  //   sx={{ width: 1000 }}
                  aria-label="simple table"
                  // className="!overflow-auto"
                >
                  <TableHead className="w-full">
                    <TableRow className="w-full">
                      <TableCell align="right" className="w-[10%]">
                        <div className="flex flex-col items-center gap-2">
                          <h1 className="font-bold">Class</h1>
                          <div className="w-[5rem]">
                            <SearchDropDown
                              data={[
                                { value: "FA1" },
                                { value: "FA2" },
                                { value: "FA3" },
                                { value: "FA4" },
                              ]}
                              variant={"outlined"}
                              Name={"Overview"}
                              value={{ value: "FA1" }}
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
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          <h1 className="font-bold">{row}</h1>
                        </TableCell>
                        <TableCell align="center">
                          <SearchDropDown
                            minWidth={"14rem"}
                            data={[
                              { value: "Formative Assessment 1" },
                              { value: "Unit Test 1" },
                            ]}
                            variant={"outlined"}
                            Name={"exam_name"}
                            value={{ value: "Formative Assessment 1" }}
                            size={"small"}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <SearchDropDown
                            minWidth={"12rem"}
                            data={[
                              { value: "Subjective-Pdf Copy" },
                              { value: "Objective-Pdf Copy" },
                              { value: "Objective Learning App" },
                            ]}
                            variant={"outlined"}
                            Name={"exam_type"}
                            value={{ value: "Subjective-Pdf Copy" }}
                            size={"small"}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <SearchDropDown
                            minWidth={"12rem"}
                            data={[
                              { value: "30M Full Beginner" },
                              { value: "30M Reduced Beginner" },
                              { value: "20M Full Beginner" },
                              { value: "20M Reduced Beginner" },
                            ]}
                            variant={"outlined"}
                            Name={"mark_syllabus_difficulty"}
                            value={{ value: "30M Full Beginner" }}
                            size={"small"}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <BasicTextFields
                            variant={"standard"}
                            value={45}
                            lable={"Time"}
                            type={"number"}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <SwitchLabels />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamSetUp;
