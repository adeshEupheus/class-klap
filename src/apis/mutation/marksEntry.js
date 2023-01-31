import Cookies from "js-cookie";
import instance from "../../instance";

export const ToggleMarksEntry = async (type, data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${type}MarksEntry`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  // console.log(res);
  return res;
};

export const UpdateAttendance = async (data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/updateAttendance`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  // console.log(res);
  return res.data;
};

export const EditMarks = async (data, token) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/editMarks`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data,
  });
  return res;
};
