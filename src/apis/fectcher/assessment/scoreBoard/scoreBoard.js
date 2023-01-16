import instance from "../../../../instance";

export const GetScoreBoardData = async (id) => {
  const res = await instance({
    url: "schoolApp/api/v1/performance?classGroup=Primary",
    method: "GET",
  }).catch((err) => console.log(err));

  const result = res.data;
  return result;
};

export const DownloadFeedback = async (id) => {
  const res = await instance({
    url: `schoolApp/api/v1/exportStudentFeedbackData/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));
};

export const DownloadPerformance = async (id) => {
  const res = await instance({
    url: `schoolApp/api/v1/exportStudentPerformanceDetails/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));
};
