import Cookies from "js-cookie";
import instance from "../../../instance";

export const LockAddExam = async (examId, gradeId, subjectId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/lockQpMetadata/examType/${examId}/grade/${gradeId}/subject/${subjectId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  return res;
};
