import axios from "axios";

export const setSchoolId = async (id) => {
  const res = await axios
    .get(
      `https://schoolsbcontent.imaxprogram.com/app/schoolApp/selectedSchool/?schoolAcademicYearId=8247`
    )
    .catch((err) => console.log(err));
};
