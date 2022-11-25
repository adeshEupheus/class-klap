import axios from "axios";

export const GetExamSetUpData = async (id) => {
  const res = await axios
    .get(`https://schoolsbel.xamcheck.com/app/schoolApp/configuration/${id}`)
    .catch((err) => console.log(err));
  // console.log(res.data);
  const result = res.data;
  return result;
};
