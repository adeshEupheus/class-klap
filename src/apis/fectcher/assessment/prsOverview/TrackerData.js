import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetPrsTrackerData = async (id) => {
  const res = await instance({
    url: `schoolApp/prs/overview/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).catch((err) => console.log(err));

 
  const result = res.data;
  return result;
};
