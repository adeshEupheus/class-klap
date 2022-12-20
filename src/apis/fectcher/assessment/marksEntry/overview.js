// import axios from "axios";
import instance from "../../../../instance";

export const GetMarksEntryOverviewData = async (examId, sectionId) => {
  const res = await instance({
    url: `schoolApp/configuration/marksEntryOverviewData?examType=${examId}&sectionId=${sectionId}`,
    method: "GET",
  }).catch((err) => console.log(err));
  // const res = await axios
  //   .get(
  //     `https://schoolsbcontent.imaxprogram.com/app/schoolApp/configuration/marksEntryOverviewData?examType=${examId}&sectionId=${sectionId}`
  //   )
  //   .catch((err) => console.log(err));

  return res.data;
};
