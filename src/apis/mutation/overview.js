import Cookies from "js-cookie";
import instance from "../../instance";

export const GenerateFeedback = async (data, token) => {
  const res = await instance({
    url: `schoolApp/configuration/generateFeedback`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  return res;
};

export const AnnounceResult = async (data, token) => {
  const res = await instance({
    url: `schoolApp/configuration/announceResult`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  return res;
};
