import Cookies from "js-cookie";
import instance from "../../instance";

export const GeneratePRS = async (id, token) => {
  const res = await instance({
    url: `schoolApp/prs/actions/generatePRS/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  return res.data;
};

export const sendPrint = async (id, token) => {
  const res = await instance({
    url: `schoolApp/prs/actions/sendPRS/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  });
  return res.data;
};
