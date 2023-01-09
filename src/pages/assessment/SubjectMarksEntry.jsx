import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Button, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
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
import { GetOverviewData } from "../../apis/fectcher/assessment/overview/overviewData";
import Loader from "../../components/Material/Loader";
import TextField from "../../components/Material/TextField";


const SubjectMarksEntry = () => {
  const [id, setId] = useState("FA1");
  const [filter, setFilter] = useState("All");

  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["overview_data", id],
    queryFn: () => GetOverviewData(id),
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
          {/* <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
            <div className="flex flex-col px-4 cursor-pointer py-4 items-end gap-[1px]">
              <span>Vidyanidhi Public School</span>
              <span>KA2015 [2022-2023]</span>
            </div>
          </div> */}

          {/* <div className="w-full flex text-sm items-center font-semibold px-4 py-2 bg-gray-200 text-gray-600 justify-end">
            Enable Student Mode <Switch />
          </div> */}

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4 mt-2">
              <Breadcrumbs crumbs={["Home", "Assessment", "3.Marks Entry"]} />
              <h1 className="font-bold text-2xl">3. MARKS ENTRY - SUBJECT MARKS ENTRY</h1>
              <div className="flex gap-3">
              <div className="w-[5rem] bg-blue-500 rounded-md">
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
              <div className="w-[8rem]  bg-blue-500 rounded-md">
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "Nursery-A" },
                    { value: "Nursery-B" },
                    { value: "LKG-A" },
                    { value: "LKG-A" },
                    { value: "UKG-A" },
                    { value: "UKG-B" },
                    { value: "UKG-C" },
                    { value: "1-A" },
                    { value: "1-B" },
                    { value: "2-A" },
                    { value: "2-B" }, 
                    { value: "3-A" },
                    { value: "3-B" },
                    { value: "3-C" },
                    { value: "4-A" },
                    { value: "4-B" },
                    { value: "4-C" },
                    { value: "5-A" },
                    { value: "5-B" },
                    { value: "5-C" },
                  ]}
                  variant={"outlined"}
                  Name={"Overview"}
                  defaultValue={{ value: "Nursery-A" }}
                  size={"small"}
                />
              </div>
              <div className="w-[5rem]  bg-blue-500 rounded-md">
                <SearchDropDown
                  handleDropDown={handleDropDown}
                  data={[
                    { value: "EVS" },
                    { value: "Maths" },
                    { value: "English" },
                    { value: "All" },
                    
                  ]}
                  variant={"outlined"}
                  Name={"Overview"}
                  defaultValue={{ value: "EVS" }}
                  size={"small"}
                />
              </div>
</div>
<div className="w-full flex text-sm items-center font-semibold px-4 py-2 bg-gray-200 text-gray-600 justify-end">
Lock Marks Entry for this Subject? <Switch/> Yes/No
          </div>
          <div className="flex gap-3 ">
          <Button variant="contained" className="!w-[12rem]">View Answer Key</Button>
          <div className="!flex !gap-3 !justify-end  !w-full">
          <Button variant="contained" className="!w-[10rem]">Edit Attendance</Button>
          <Button variant="contained" className="!w-[8rem]">Edit Marks</Button>
</div>
          </div>
          
              {isLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={300}
                />
              ) : (<TableContainer className="sm:!w-full !overflow-auto max-h-[70vh]" component={Paper}>
                <Table className="!w-full" aria-label="simple_table">
                <TableHead className="w-full">
                    {/* <TableRow className="w-full bg-pink-400 ">Total</TableRow> */}
                      <TableRow className="w-full">
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Roll No</h1>
                            <div className="w-[5rem]">
                              
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[25%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Students</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">UUID</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">Attendance</h1>
                          </div>
                        </TableCell>
                       
                        <TableCell align="right" className="w-[15%]">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold">0</h1>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow align="right">
                        <TableCell><TextField/>
                        </TableCell>
                        <TableCell><TextField/></TableCell>
                        <TableCell><TextField/></TableCell>
                        <TableCell>dropbox</TableCell>
                       
                      </TableRow>
                    </TableHead>
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

export default SubjectMarksEntry;
