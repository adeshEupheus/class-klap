// import axios from "axios";
import instance from "../../../../instance";

export const GetSubjectMarksEntry = async (examId, sectionId, subjectId) => {
  const res = await instance({
    url: `schoolApp/configuration/questionPaperAttempts/${examId}/${sectionId}/${subjectId}`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
