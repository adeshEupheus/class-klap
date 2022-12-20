// import axios from "axios";
import instance from "../../../instance";

export const GetApplicableExamType = async () => {
  const res = await instance({
    url: "schoolApp/configuration/applicableExamTypes",
    method: "GET",
  }).catch((err) => console.log(err));

  // const res = await axios
  //   .get(
  //     "https://schoolsbcontent.imaxprogram.com/app/schoolApp/configuration/applicableExamTypes"
  //   )
  //   .catch((err) => console.log(err));
  return res.data.exams;
};
