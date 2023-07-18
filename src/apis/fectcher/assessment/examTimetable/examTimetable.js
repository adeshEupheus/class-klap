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

export const DownloadPersonalizedQP = async (examId, gradeId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/downloadPersonalizedQP/${examId}/${gradeId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};

export const QPGenerationStatus = async (examId, gradeId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/${gradeId}/${examId}/qpGenerationStatus`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};

export const GetAddExamQuestions = async (
  examId,
  gradeId,
  subjectId,
  token
) => {
  const res = await instance({
    url: `schoolApp/configuration/getQuestions/examType/${examId}/grade/${gradeId}/subject/${subjectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};
