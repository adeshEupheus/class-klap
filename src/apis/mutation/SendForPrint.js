import Cookies from "js-cookie";
import instance from "../../instance";

export const SendForPrint = async (examId, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/printedExam/${examId}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  return res;
};
