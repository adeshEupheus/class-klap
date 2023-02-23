import instance from "../../../instance";

export const TriggerOtp = async (data) => {
  const res = await instance({
    url: `v1/external/login/otp/trigger`,
    method: "POST",
    data,
  });
  // console.log(res.data);
  return res.status;
};
