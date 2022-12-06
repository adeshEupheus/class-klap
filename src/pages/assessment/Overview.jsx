import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SwipeableTemporaryDrawer from "../../components/Material/MaterialSidebar";
import { Skeleton, Switch } from "@mui/material";
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
const OverView = () => {
  const [id, setId] = useState("FA1");

  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["overview_data", id],
    queryFn: () => GetOverviewData(id),
  });

  // const [mainData, setMainData] = useState(overviewData);

  // console.log(mainData);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDropDown = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "Overview":
        setId(value.value);
        break;

      default:
        break;
    }
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
                            <SearchDropDown
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
                            />
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Exam Set Up</h1>
                            <SearchDropDown
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
                            />
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Exam Schedule</h1>
                            <SearchDropDown
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
                            />
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1>Marks Entry</h1>
                            <SearchDropDown
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
                            />
                          </div>
                        </TableCell>
                        <TableCell align="right">Feedback</TableCell>
                        <TableCell align="right">Announce Results</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {overviewData?.map((item, index) => (
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
                            <div className="w-full flex justify-end">
                              <BasicButton
                                text={"Generate"}
                                size={"small"}
                                disable={
                                  item.feedbackStatus === "CANNOT_GENERATE"
                                    ? true
                                    : false
                                }
                              />
                              {/* <h1>{item.feedbackStatus}</h1> */}
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <div className="w-full flex justify-end">
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
                              {/* <h1>{item.resultAnnouncementStatus}</h1> */}
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
