import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetExamConfig = async (token) => {
  const res = await instance({
    url: `https://schoolsbel.xamcheck.com/app/schoolApp/configuration/getExamConfigs`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
