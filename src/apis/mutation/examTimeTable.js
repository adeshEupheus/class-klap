import instance from "../../instance";

export const ToggleNotification = async (type) => {
  console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${type}ExamNotification`,
    method: "PUT",
  });
  console.log(res.data);
  return res.data;
};

export const UpdateTimeTable = async (examId, gradeId, subjectId, data) => {
  // console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/updateTimetable/${examId}/${gradeId}/${subjectId}`,
    method: "PUT",
    data,
  });
  console.log(res.data);
  return res.data;
};

export const ToggleExamRequired = async (examId, gradeId, subjectId) => {
  // console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${examId}/${gradeId}/${subjectId}/toggleExamRequired`,
    method: "PUT",
  });
  console.log(res.data);
  return res.data;
};

export const ConductExam = async (gradeId, examId) => {
  console.log(gradeId, examId);
  // let error;
  const res = await instance({
    url: `schoolApp/configuration/${gradeId}/${examId}/lockAssessmentConfiguration`,
    method: "PUT",
  });

  console.log(res.data);
  return res.data;
};

export const QpGenerate = async (gradeId, examId) => {
  const res = await instance({
    url: `schoolApp/configuration/${gradeId}/${examId}/triggerQuestionPaperGeneration`,
    method: "PUT",
  });

  console.log(res.data);
  return res.data;
};
