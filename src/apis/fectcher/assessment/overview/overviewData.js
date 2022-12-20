// import axios from "axios";
import instance from "../../../../instance";

export const GetOverviewData = async (id) => {
  const res = await instance({
    url: `schoolApp/configuration/overviewData/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));
  // const res = await axios
  //   .get(
  //     `https://schoolsbcontent.imaxprogram.com/app/schoolApp/configuration/overviewData/${id}`
  //   )
  //   .catch((err) => console.log(err));
  // console.log(res.data);
  const result = res.data.examOverviewData;
  return result;
};
