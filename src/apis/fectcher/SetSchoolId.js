import axios from "axios";

export const setSchoolId = async (id) => {
  const res = await axios
    .get(
      `https://schoolsbel.xamcheck.com/app/schoolApp/selectedSchool/?schoolAcademicYearId=8237`
    )
    .catch((err) => console.log(err));
};
