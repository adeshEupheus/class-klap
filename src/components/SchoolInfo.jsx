import { Logout } from "@mui/icons-material";
import { Collapse, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSchoolDetails } from "../apis/fectcher/assessment/GetSchoolDetails";
import { GetSchoolList } from "../apis/fectcher/GetSchoolList";
import { setSchoolId } from "../apis/fectcher/SetSchoolId";
import { authActions } from "../Store/auth";
import Loader from "./Material/Loader";

const SchoolInfo = ({ SchoolInfoLoading, schoolInfo }) => {
  const [schoolList, setSchoolList] = useState({});
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSchoolClicked = async (data) => {
    setLoading(true);
    const token = await setSchoolId(data.schoolAcademicYearId);
    Cookies.set("token", token.token);
    setLoading(false);
    window.location.reload();
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const { data: SchoolListData, isLoading } = useQuery({
    queryKey: ["school_list"],
    queryFn: () => GetSchoolList(),
    refetchOnWindowFocus: false,
    onSuccess: async (data) => {
      const list = await Promise.all(
        data.map(async (id) => {
          return await GetSchoolDetails(id);
        })
      );
      let newArr = list.reduce((group, school) => {
        const { academicYearDisplayName } = school;
        group[academicYearDisplayName] = group[academicYearDisplayName] ?? [];
        group[academicYearDisplayName].push(school);
        return group;
      }, {});
      let newArr2 = {};
      Object.keys(newArr)
        .sort()
        .reverse()
        .map((item) => {
          newArr2[item] = newArr[item];
        });
      setSchoolList(newArr2);
    },
  });
  return (
    <>
      {SchoolInfoLoading || isLoading ? (
        <div className="w-full flex flex-col gap-1 items-end">
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      ) : (
        <div className="w-full flex flex-col text-sm font-semibold bg-gray-200 text-gray-600 justify-end items-end">
          <Loader loading={loading} />
          <div
            className="flex flex-col px-4 cursor-pointer pt-4 pb-2 items-end gap-[1px]"
            onClick={() => setClicked(!clicked)}
          >
            <span>{schoolInfo.schoolName}</span>
            <span>
              {schoolInfo.schoolCode} [{schoolInfo.academicYearDisplayName}]
            </span>
          </div>
          <div className="flex flex-col w-fit mr-3">
            <Collapse in={clicked}>
              <div className="h-[10rem] overflow-auto bg-slate-100 shadow-lg">
                {Object.keys(schoolList).map((key) => {
                  return (
                    <div className="bg-slate-100 rounded-t-md py-4 flex w-full flex-col px-4 gap-2">
                      <h1 className="font-semibold text-blue-500 shadow-lg rounded-md flex justify-center items-center">
                        {key}
                      </h1>
                      {schoolList[key].map((item) => {
                        return (
                          <div
                            className="flex flex-col gap-1 cursor-pointer"
                            onClick={() => handleSchoolClicked(item)}
                          >
                            <span>{item.schoolName}</span>
                            <span>
                              {item.schoolCode} [{item.academicYearDisplayName}]
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <button
                className="bg-slate-100 rounded-b-md shadow-lg py-4 flex w-full px-4 mr-8 gap-2"
                onClick={handleLogout}
              >
                Log Out <Logout />
              </button>
            </Collapse>
          </div>
        </div>
      )}
    </>
  );
};

export default SchoolInfo;
