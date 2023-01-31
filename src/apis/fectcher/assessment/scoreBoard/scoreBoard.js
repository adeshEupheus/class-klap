import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetScoreBoardData = async (token) => {
  const res = await instance({
    url: "schoolApp/api/v1/performance?classGroup=Primary",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};

export const DownloadFeedback = async (id, token) => {
  const res = await instance({
    url: `schoolApp/api/v1/exportStudentFeedbackData/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
};

export const DownloadPerformance = async (id, token) => {
  const res = await instance({
    url: `schoolApp/api/v1/exportStudentPerformanceDetails/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
};
