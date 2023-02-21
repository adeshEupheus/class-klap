import Cookies from "js-cookie";
import instance from "../../instance";

export const AddExamInAdditionalExam = async (data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/customExamSetUp`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  return res.data;
};
