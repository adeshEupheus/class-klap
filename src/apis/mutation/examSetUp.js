import Cookies from "js-cookie";
import instance from "../../instance";

export const LockExamSetup = async (examTypeId, GradeId, data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${examTypeId}/${GradeId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  console.log(res.data);
  return res.data;
};

export const UnLockExamSetup = async (examTypeId, GradeId, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${examTypeId}/${GradeId}/unlockGradeConfig`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  console.log(res.data);
  return res.data;
};
