import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../instance";
import { GetSchoolDetails } from "./assessment/GetSchoolDetails";

export const GetSchoolList = async () => {
  const res = await instance({
    url: "schoolApp/schoolList",
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => {
    if (err.response.status === 401) {
      console.log(401);
      Cookies.remove("token");
      Cookies.remove("id");
      window.location.reload();
    }
  });

  // console.log(res.headers)

  return res.data.SchoolAcademicYearId;
};
