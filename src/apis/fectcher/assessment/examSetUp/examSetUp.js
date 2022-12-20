// import axios from "axios";
import instance from "../../../../instance";

export const GetExamSetUpData = async (id) => {
  const res = await instance({
    url: `schoolApp/configuration/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));

  // const res = await axios
  //   .get(
  //     `https://schoolsbcontent.imaxprogram.com/app/schoolApp/configuration/${id}`
  //   )
  //   .catch((err) => console.log(err));
  // console.log(res.data);
  const result = res.data.gradeLevelConfigurations;
  return result;
};
