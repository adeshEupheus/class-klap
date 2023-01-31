// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetExamTimetableData = async (examId, gradeId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/timeTable/${examId}/${gradeId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};
