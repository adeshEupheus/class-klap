// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const AddExamData = async (token) => {
  const res = await instance({
    url: `schoolApp/configuration/configuredCustomExamsList`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data.schoolConfiguredExamsData;
};
