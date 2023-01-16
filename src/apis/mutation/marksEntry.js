import instance from "../../instance";

export const ToggleMarksEntry = async (type, data) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/${type}MarksEntry`,
    method: "POST",
    data,
  });
  // console.log(res);
  return res;
};

export const UpdateAttendance = async (data) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/updateAttendance`,
    method: "PUT",
    data,
  });
  // console.log(res);
  return res.data;
};

export const EditMarks = async (data) => {
  //   console.log(type);
  const res = await instance({
    url: `schoolApp/configuration/editMarks`,
    method: "POST",
    data,
  });
  return res;
};
