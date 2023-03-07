// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetOverviewData = async (id, Token) => {
  const res = await instance({
    url: `schoolApp/configuration/overviewData/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token ? Token : Cookies.get("token")}`,
      // BEAMAPP: true,
    },
  }).catch((err) => console.log(err));

  const result = res.data.examOverviewData;
  return result;
};

export const GetOverViewTrackerData = async (id, Token) => {
  const res = await instance({
    url: `schoolApp/configuration/printedExam/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token ? Token : Cookies.get("token")}`,
      // BEAMAPP: true,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
