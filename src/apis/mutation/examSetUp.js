import instance from "../../instance";

export const LockExamSetup = async (examTypeId, GradeId, data) => {
  //   console.log(type);
  const res = await instance({
    url: `https://schoolsbel.xamcheck.com/app/schoolApp/configuration/${examTypeId}/${GradeId}`,
    method: "PUT",
    data,
  });
  console.log(res.data);
  return res.data;
};

export const UnLockExamSetup = async (examTypeId, GradeId) => {
  //   console.log(type);
  const res = await instance({
    url: `https://schoolsbel.xamcheck.com/app/schoolApp/configuration/${examTypeId}/${GradeId}/unlockGradeConfig`,
    method: "PUT",
  });
  console.log(res.data);
  return res.data;
};
