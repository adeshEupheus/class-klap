// import axios from "axios";
import instance from "../../../../instance";

export const GetExamTimetableData = async (examId, gradeId) => {
  const res = await instance({
    url: `schoolApp/configuration/timeTable/${examId}/${gradeId}`,
    method: "GET",
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};
