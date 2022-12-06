import axios from "axios";

export const GetPrsTableData = async (id) => {
  const res = await axios
    .get(
      `https://schoolsbcontent.imaxprogram.com/app/schoolApp/prs/overviewData/dashboard/${id}`
    )
    .catch((err) => console.log(err));
  const result = res.data.examOverviewData;
  return result;
};
