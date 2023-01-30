import Cookies from "js-cookie";
import instance from "../../../../instance";

export const DownloadReportData = async (id) => {
  const res = await instance({
    url: `/schoolApp/api/v1/document/notifications`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).catch((err) => console.log(err));

  
  const result = res.data;
  return result;
  
};