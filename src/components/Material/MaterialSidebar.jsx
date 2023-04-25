import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logoLight from "../../assets/classklap_logo.png";

import { useState } from "react";
import {
  Monitor,
  Home,
  Laptop,
  Hail,
  Assessment,
  Devices,
  Settings,
  Message,
  Circle,
  KeyboardArrowDown,
  Scoreboard,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const SwipeableTemporaryDrawer = React.forwardRef((props, ref) => {
  // const [eLearning, setELearning] = useState(false);
  // const [setUp, setSetUp] = useState(false);
  // const [assessment, setAssessment] = useState(false);
  const [marsksEntry, setMarksEntry] = useState(false);

  const [isSchoolClicked, setIsSchoolClicked] = useState(
    props.show === 2 ? false : true
  );
  const [user, setUser] = useState({});
  let highLight = props.highLight;
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    props.show === 2 ? true : false
  );

  React.useEffect(() => {
    if (props.show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);
  const [state, setState] = React.useState({
    left: false,
  });
  const sidebarRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      setState({ left: true });
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className="!flex !flex-col !gap-4"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center gap-3 justify-center py-4">
        <img
          src={logoLight}
          className=" w-[10rem] md:w-[10rem] h-auto object-cover"
          alt=""
        />
      </div>

      <Link to="/assessment/overview">
        <aside
          className={`px-6 mt-[2rem] py-2 hover:bg-gray-500 flex ${
            props.highLight === "overview" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Home
              className={`${
                props.highLight === "overview"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                props.highLight === "overview"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Overview
            </span>
          </div>
        </aside>
      </Link>
      <Link to="/assessment/exam_set_up">
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            props.highLight === "exam_setup" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Settings
              className={`${
                props.highLight === "exam_setup"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                props.highLight === "exam_setup"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Exam Setup
            </span>
          </div>
        </aside>
      </Link>
      <Link to="/assessment/exam_timetable">
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            props.highLight === "exam_timetable" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Assessment
              className={`${
                props.highLight === "exam_timetable"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                props.highLight === "exam_timetable"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Exam Timetable
            </span>
          </div>
        </aside>
      </Link>
      <Link>
        <aside
          onClick={() => setMarksEntry(!marsksEntry)}
          className={`px-6 py-2 flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <Devices
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
              Marks Entry
            </span>
          </div>
          <div
            className={`transition-all duration-200  ease-linear ${
              marsksEntry ? null : "-rotate-90"
            }`}
          >
            <KeyboardArrowDown className={`text-gray-600 `} />
          </div>
        </aside>
        <Collapse in={marsksEntry}>
          {" "}
          <div
            className={`${
              marsksEntry ? "h-[10vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/marks_entry_overview">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600 "
                  } transition-all ease-linear text-sm font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Overview
                </h1>
              </div>
            </Link>
            <Link to="/marks_entry_subject_marks_entry">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear text-sm font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Subject Marks Entry
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </Link>
      <Link to="/assessment/scoreboard">
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            props.highLight === "scoreboard" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Scoreboard
              className={`${
                props.highLight === "scoreboard"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                props.highLight === "scoreboard"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Scoreboard
            </span>
          </div>
        </aside>
      </Link>
      {/* <Link > */}
      <Link to={"/additional_exam_setUp"}>
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            props.highLight === "dashboard" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Monitor
              className={`${
                props.highLight === "dashboard"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                props.highLight === "dashboard"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Add Exam Setup
            </span>
          </div>
        </aside>
      </Link>
      <Link to="/assessment/prs_overview">
        <aside
          className={`px-6 py-2 hover:bg-gray-500 flex ${
            highLight === "prs" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Monitor
              className={`${
                highLight === "prs" ? "!text-gray-100" : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "prs" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              PRS
            </span>
          </div>
        </aside>
      </Link>

      {/* <Link to="/dashboard">
        <aside
          className={`px-6 mt-[2rem] py-2 hover:bg-gray-500 flex ${
            highLight === "dashboard" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Home
              className={`${
                highLight === "dashboard" ? "!text-gray-100" : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "dashboard" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Home
            </span>
          </div>
        </aside>
      </Link>

      <Link>
        <aside
          className={`px-6 py-2 flex gap-4 cursor-pointer ${
            highLight === "manageSchool" ? "bg-gray-500" : ""
          } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Monitor
            className={`${
              highLight === "manageSchool" ? "!text-gray-100" : "!text-gray-400"
            } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "manageSchool" ? "text-gray-200" : "text-gray-600"
            } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
          >
            Live Class
          </span>
        </aside>
      </Link>
      <aside className="px-6 py-2 flex gap-4 cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear">
        <Laptop className="!text-gray-400 group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear" />
        <span className="text-gray-600 font-semibold group-hover:!text-gray-100 transition-all duration-150 ease-linear">
          Teacher Progress
        </span>
      </aside>
      <Link>
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "order_pro" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Hail
            className={`${
              highLight === "order_pro" ? "!text-gray-100" : "!text-gray-400"
            } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "order_pro" ? "text-gray-200" : "text-gray-600"
            } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
          >
            Students
          </span>
        </aside>
      </Link>
      <Link>
        <aside
          onClick={() => setAssessment(!assessment)}
          className={`px-6 py-2 flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <Devices
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
              Assessment
            </span>
          </div>
          <div
            className={`transition-all duration-200  ease-linear ${
              assessment ? null : "-rotate-90"
            }`}
          >
            <KeyboardArrowDown className={`text-gray-600 `} />
          </div>
        </aside>
        <Collapse in={assessment}>
          {" "}
          <div
            className={`${
              eLearning ? "h-[40vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/assessment/overview">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600 "
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Overview
                </h1>
              </div>
            </Link>
            <Link to="/assessment/exam_set_up">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Exam Step Up
                </h1>
              </div>
            </Link>
            <Link to="/assessment/exam_timetable">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Exam Timetable
                </h1>
              </div>
            </Link>
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Marks Entry
                </h1>
              </div>
            </Link>
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Scoreboard
                </h1>
              </div>
            </Link>
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Add Exam Set Up
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </Link>
      <Link>
        <aside
          onClick={() => setELearning(!eLearning)}
          className={`px-6 py-2 flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <Devices
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
              E-Learning
            </span>
          </div>
          <div
            className={`transition-all duration-200  ease-linear ${
              eLearning ? null : "-rotate-90"
            }`}
          >
            <KeyboardArrowDown className={`text-gray-600 `} />
          </div>
        </aside>
        <Collapse in={eLearning}>
          {" "}
          <div
            className={`${
              eLearning ? "h-[10vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600 "
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Digital Content
                </h1>
              </div>
            </Link>
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  Downloads
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </Link>

      <Link>
        <aside
          onClick={() => setSetUp(!setUp)}
          className={`px-6 py-2 flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <Settings
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
              Set-Up
            </span>
          </div>
          <div
            className={`transition-all duration-200  ease-linear ${
              setUp ? null : "-rotate-90"
            }`}
          >
            <KeyboardArrowDown className={`text-gray-600 `} />
          </div>
        </aside>
        <Collapse in={setUp}>
          {" "}
          <div
            className={`${
              eLearning ? "h-[16vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-600"
                  } transition-all ease-linear font-semibold duration-200  py-2 cursor-pointer`}
                >
                  School Calender
                </h1>
              </div>
            </Link>
            <Link>
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear duration-200  py-2 font-semibold cursor-pointer`}
                >
                  Class Sections
                </h1>
              </div>
            </Link>
            <Link to="/school/schools">
              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "schools" ? "text-white" : "text-gray-600"
                  } transition-all ease-linear duration-200  py-2 font-semibold cursor-pointer`}
                >
                  Manage Users
                </h1>
              </div>
            </Link>
          </div>
        </Collapse>
      </Link>
      <Link>
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Message
            className={`${
              highLight === "manageOrder" ? "!text-gray-100" : "!text-gray-400"
            } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
            } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
          >
            Messenger
          </span>
        </aside>
      </Link> */}
    </Box>
  );

  return (
    <div ref={sidebarRef}>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
});

export default SwipeableTemporaryDrawer;
