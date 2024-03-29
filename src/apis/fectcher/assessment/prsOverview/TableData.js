import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetPrsTableData = async (id, token) => {
  const res = await instance({
    url: `schoolApp/prs/overviewData/dashboard/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  const result = res.data.examOverviewData;
  return result;
};
