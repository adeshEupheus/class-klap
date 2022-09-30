import { Stack } from "@mui/material";
import React, { useState } from "react";
import ckLogo from "../assets/classklap_logo.png";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-[100vh] bg-gray-100 flex flex-col gap-4">
      <div className="flex justify-around items-center py-2 bg-gray-100">
        <img src={ckLogo} className="w-[8rem] h-auto" alt="" />
        <span className="font-extrabold text-3xl gradient-text">
          FUTURE-READY SCHOOLS. FUTURE-READY STUDENTS.
        </span>
      </div>
      <div className="w-[100vw] flex gap-8 px-4">
        <div className="bg-red-300 w-[65%]">left</div>
        <div className="bg-white w-[35%] shadow-xl rounded-md items-start pl-8 py-8 flex flex-col gap-4">
          <span className="font-medium text-3xl">Welcome Back :)</span>
          <span className="font-bold text-slate-500 text-xl">Sign in</span>
          {/* <form onSubmit={handleLogin}> */}
          <form className="w-[80%]">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                <span className="text-sm font-semibold">
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
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                <span className="text-sm font-semibold">Password</span>
              </label>
              <input
                type="password"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Stack direction="row" spacing={2}>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
