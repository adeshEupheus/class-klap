import instance from "../../../../instance";

export const DownloadReportData = async (id) => {
  const res = await instance({
    url: `/schoolApp/api/v1/document/notifications`,
    method: "GET",
  }).catch((err) => console.log(err));

  
  const result = res.data;
  return result;
  
};