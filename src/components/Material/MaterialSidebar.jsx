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
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const SwipeableTemporaryDrawer = React.forwardRef((props, ref) => {
  const [eLearning, setELearning] = useState(false);
  const [setUp, setSetUp] = useState(false);
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

      <Link to="/">
        <aside
          className={`px-6 mt-[2rem] py-2  hover:bg-gray-500 flex ${
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

      <Link to="/manageSchool">
        <aside
          className={`px-6 py-2 flex gap-4  cursor-pointer ${
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
      <Link to="/order_processing">
        <aside
          className={`px-6 py-2  flex gap-4 ${
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
      <Link to="/manage_order">
        <aside
          className={`px-6 py-2 flex gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Assessment
            className={`${
              highLight === "manageOrder" ? "!text-gray-100" : "!text-gray-400"
            } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear font-semibold`}
          >
            Assessment
          </span>
        </aside>
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
              eLearning ? "h-[12vh] opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/school/tagging">
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
              setUp ? "h-[18vh] mb-4 opacity-100 visible" : null
            } transition-all ease-linear duration-200`}
          >
            <Link to="/school/tagging">
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
      <Link to="/manage_order">
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
      </Link>
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
