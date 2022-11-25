import axios from "axios";

export const GetOverviewData = async (id) => {
  const res = await axios
    .get(
      `https://schoolsbel.xamcheck.com/app/schoolApp/configuration/overviewData/${id}`
    )
    .catch((err) => console.log(err));
  // console.log(res.data);
  const result = res.data.examOverviewData;
  return result;
};
