import axios from "axios";

export const setSchoolId = async (id) => {
  const res = await axios
    .post(
      `https://schoolsbcontent.imaxprogram.com/app/schoolApp/login/otp/validate`
    )
    .catch((err) => console.log(err));
};
