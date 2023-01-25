import instance from "../../../instance";

export const ValidateOtp = async (data) => {
  const res = await instance({
    url: `v1/external/login/otp/validate`,
    method: "POST",
    data,
    // withCredentials: true
  });
  console.log(res);
  return res.data;
};
