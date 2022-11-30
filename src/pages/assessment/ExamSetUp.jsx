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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "../../components/Material/BreadCrumbs";
import SearchDropDown from "../../components/Material/SearchDropDown";
import BasicTextFields from "../../components/Material/TextField";
import SwitchLabels from "../../components/Material/Switch";
import { GetExamSetUpData } from "../../apis/fectcher/assessment/examSetUp/examSetUp";
const ExamSetUp = () => {
  const [id, setId] = useState("FA1");

  const [mainData, setMainData] = useState([]);
  const {
    data: Exam_setUpData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["exam_setup_data", id],
    queryFn: () => GetExamSetUpData(id),
    onSuccess: (data) => {
      console.log(data);
      setMainData(data);
    },
    // enabled: false,
    refetchOnWindowFocus: false,
  });
  console.log(mainData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  // const queryClient = useQueryClient();

  const updateData = (class_name) => {
    if (class_name != "All") {
      const newArray = Exam_setUpData.filter(
        (item) => item.grade.displayName === class_name
      );
      setMainData(newArray);
    } else {
      setMainData(Exam_setUpData);
    }
  };

  const sidebarRef = useRef();

  const handleDropDown = (value, type) => {
    console.log(value, type);
    if (type === "class") {
      updateData(value.value);
    } else if ((type = "exam_setup")) {
      setId(value.value);
    }
    // switch (type) {
    //   case "Overview":
    //     setId(value.value);
    //     break;

    //   default:
    //     break;
    // }
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Exam Set Up - ClassKlap";
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
                      {mainData?.map((item, index) => (
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
                              defaultValue={item.duration}
                              disable={item.locked}
                              lable={"Time"}
                              type={"number"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <SwitchLabels checked={item.locked} />
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
