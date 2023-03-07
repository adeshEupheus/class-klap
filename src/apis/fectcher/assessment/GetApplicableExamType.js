// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../instance";

export const GetApplicableExamType = async (token) => {
  const res = await instance({
    url: "schoolApp/configuration/applicableExamTypesAndGrades",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
      // BEAMAPP: true,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
