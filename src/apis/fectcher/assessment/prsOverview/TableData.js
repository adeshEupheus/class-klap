import axios from "axios";
import instance from "../../../../instance";

export const GetPrsTableData = async (id) => {
  const res = await instance({
    url: `schoolApp/prs/overviewData/dashboard/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));

  // const res = await axios
  //   .get(
  //     `https://schoolsbcontent.imaxprogram.com/app/schoolApp/prs/overviewData/dashboard/${id}`
  //   )
  //   .catch((err) => console.log(err));
  const result = res.data.examOverviewData;
  return result;
};
