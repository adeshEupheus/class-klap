import axios from "axios";
import instance from "../../../../instance";

export const GetPrsTrackerData = async (id) => {
  const res = await instance({
    url: `schoolApp/prs/overview/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));

  // const res = await axios
  //   .get(
  //     `https://schoolsbcontent.imaxprogram.com/app/schoolApp/prs/overview/${id}`
  //   )
  //   .catch((err) => console.log(err));
  const result = res.data;
  return result;
};
