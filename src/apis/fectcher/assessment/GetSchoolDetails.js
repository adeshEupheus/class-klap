import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import instance from "../../../instance";
// import { authActions } from "../../../Store/auth";

export const GetSchoolDetails = async (id) => {
  const res = await instance({
    url: `schoolApp/schoolDetails?schoolAcademicYearId=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      // BEAMAPP: true,
    },
  }).catch((err) => console.log(err));
  return res.data;
};

export const GetSchoolDetailsWithoutHeader = async (token) => {
  const res = await instance({
    url: `schoolApp/schoolDetail`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
      // BEAMAPP: true,
    },
  }).catch((err) => {
    console.log(err);
  });
  return res.data;
};
