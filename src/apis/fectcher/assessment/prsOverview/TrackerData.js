import axios from "axios";

export const GetPrsTrackerData = async (id) => {
  const res = await axios
    .get(
      `https://schoolsbcontent.imaxprogram.com/app/schoolApp/prs/overview/${id}`
    )
    .catch((err) => console.log(err));
  const result = res.data;
  return result;
};
