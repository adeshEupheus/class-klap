import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetQpData = async (examId, gradeId, subjectId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/qpMetaData/${examId}/${gradeId}/${subjectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};
