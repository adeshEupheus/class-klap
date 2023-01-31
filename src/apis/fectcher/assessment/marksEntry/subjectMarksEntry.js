// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetSubjectMarksEntry = async (
  examId,
  sectionId,
  subjectId,
  token
) => {
  const res = await instance({
    url: `schoolApp/configuration/questionPaperAttempts/${examId}/${sectionId}/${subjectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
