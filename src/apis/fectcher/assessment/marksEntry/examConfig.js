import instance from "../../../../instance";

export const GetExamConfig = async () => {
  const res = await instance({
    url: `https://schoolsbel.xamcheck.com/app/schoolApp/configuration/getExamConfigs`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
