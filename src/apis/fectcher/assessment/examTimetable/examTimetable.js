import axios from "axios";

export const GetExamTimetableData = async (examId, gradeId) => {
  const res = await axios
    .get(
      `https://schoolsbcontent.imaxprogram.com/app/schoolApp/configuration/timeTable/${examId}/${gradeId}`
    )
    .catch((err) => console.log(err));
  // console.log(res.data);
  const result = res.data;
  return result;
};
