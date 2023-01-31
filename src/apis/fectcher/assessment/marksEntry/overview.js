// import axios from "axios";
import Cookies from "js-cookie";
import instance from "../../../../instance";

export const GetMarksEntryOverviewData = async (examId, sectionId, token) => {
  const res = await instance({
    url: `schoolApp/configuration/marksEntryOverviewData?examType=${examId}&sectionId=${sectionId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
