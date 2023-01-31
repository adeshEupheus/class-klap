import Cookies from "js-cookie";
import instance from "../../instance";

export const ToggleNotification = async (type, token) => {
  console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${type}ExamNotification`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const UpdateTimeTable = async (
  examId,
  gradeId,
  subjectId,
  data,
  token
) => {
  // console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/updateTimetable/${examId}/${gradeId}/${subjectId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  console.log(res.data);
  return res.data;
};

export const ToggleExamRequired = async (examId, gradeId, subjectId, token) => {
  // console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${examId}/${gradeId}/${subjectId}/toggleExamRequired`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const ConductExam = async (gradeId, examId, token) => {
  console.log(gradeId, examId);
  // let error;
  const res = await instance({
    url: `schoolApp/configuration/${gradeId}/${examId}/lockAssessmentConfiguration`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });

  console.log(res.data);
  return res.data;
};

export const QpGenerate = async (gradeId, examId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/${gradeId}/${examId}/triggerQuestionPaperGeneration`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });

  console.log(res.data);
  return res.data;
};
