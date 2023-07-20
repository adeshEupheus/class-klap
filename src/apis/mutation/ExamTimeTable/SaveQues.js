import Cookies from "js-cookie";
import instance from "../../../instance";

export const SaveQues = async (examId, gradeId, subjectId, data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/qpMetadata/examType/${examId}/grade/${gradeId}/subject/${subjectId}`,
    method: "PUT",
    data,
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  return res;
};
