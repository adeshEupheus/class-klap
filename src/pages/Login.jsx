import { Stack } from "@mui/material";
import React, { useState } from "react";
import ckLogo from "../assets/classklap_logo.png";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton.js";
import OtpInput from "react-otp-input";
import { Google } from "@mui/icons-material";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e);
  };

  useLayoutEffect(() => {
    const setAcademic = async () => {
      await axios.get(
        "https://schoolsbcontent.imaxprogram.com/app/schoolApp/selectedSchool/?schoolAcademicYearId=8188"
      );
    };
    const ValidateOtp = async () => {
      await axios.post(
        "https://schoolsbcontent.imaxprogram.com/app/schoolApp/login/otp/validate"
      );
    };
    setAcademic();
    ValidateOtp();
  }, []);

  return (
    <div className="min-h-[100vh] bg-gray-200 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-around md:gap-0 gap-4 items-center py-2 bg-gray-100">
        <img src={ckLogo} className="w-[8rem] h-auto" alt="" />
        <span className="font-extrabold md:text-3xl text-xs gradient-text">
          FUTURE-READY SCHOOLS. FUTURE-READY STUDENTS.
        </span>
      </div>
      <div className="w-[100vw] flex gap-8 px-4">
        <div className="bg-white hidden md:block w-[70%] h-fit rounded-md shadow-xl">
          <Slider />
        </div>
        <div className="bg-white md:w-[32%] w-full shadow-xl rounded-md items-start pl-8 py-8 flex flex-col gap-4">
          <span className=" text-3xl font-semibold text-cyan-800">
            Welcome Back :)
          </span>
          <span className="font-bold text-slate-500 text-xl">Sign in</span>
          {/* <form onSubmit={handleLogin}> */}
          <form className="w-[80%]">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                <span className="text-sm font-semibold text-cyan-800">
                  Email / Mobile Number:
                </span>
              </label>
              <input
                type="email"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email or Phone No."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="w-full flex justify-end mt-2">
                <Tooltip title="Send OTP">
                  <span className="text-sm font-semibold mr-2 cursor-pointer text-cyan-800">
                    Send OTP
                  </span>
                </Tooltip>
              </div>
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                <span className="text-sm font-semibold text-cyan-800">OTP</span>
              </label>
              <OtpInput
                inputStyle={{
                  width: "2rem",
                  borderRadius: "4px",
                  border: "#155e75 1px solid",
                  marginLeft: "4px",
                  marginRight: "4px",
                  padding: "4px",
                }}
                value={otp}
                onChange={(e) => handleChange(e)}
                numInputs={6}
                separator={<span>-</span>}
              />
            </div>
            <Link to="/assessment/overview">
              <Stack className="!shadow-xl" direction="row" spacing={2}>
                <LoadingButton
                  loading={loading}
                  // onClick={handleLogin}
                  type="submit"
                  style={{
                    backgroundColor: "rgb(31 41 55)",
                    width: "100%",
                    height: "2.5rem",
                    color: "white",
                    fontWeight: "600",
                    marginTop: "1.5rem",
                  }}
                  variant="outlined"
                >
                  {loading ? "" : "SIGN IN"}
                </LoadingButton>
              </Stack>
            </Link>
          </form>
          <span className="text-sm text-gray-400 font-medium">
            Or login with following options.
          </span>
          <Tooltip title="Login with Google">
            <div className="p-2 rounded-md cursor-pointer shadow-2xl border-cyan-800 border">
              <Google className="!text-cyan-800" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Login;
