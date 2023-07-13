import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import BasicButton from "../Button";
import { OpenInFull } from "@mui/icons-material";
import BasicTable from "./BasicTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetQpData } from "../../../apis/fectcher/assessment/examTimetable/qpData";
import { Button, Skeleton } from "@mui/material";
import BasicTextFields from "../TextField";
import { useState } from "react";
import BasicTableForSub from "./BasicTableForSub";
import instance from "../../../instance";
import { SaveQues } from "../../../apis/mutation/ExamTimeTable/SaveQues";
import Cookies from "js-cookie";
import { LockAddExam } from "../../../apis/mutation/ExamTimeTable/LockAddExam";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewQpAddExamSub = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = useState({ marks: 0, ques: 0 });
  const [qpData, setQpData] = useState({
    totalQuestions: 0,
    totalMarks: 0,
    questionMetadata: [],
  });
  React.useImperativeHandle(ref, () => ({
    OpenViewQpSub() {
      setOpen(true);
    },
  }));
  const [totalMarks, setTotalMarks] = useState(0);

  //   console.log(totalMarks);

  const {
    data: QpData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["qp_data", props.examId, props.gradeId, props.subjectId],
    enabled: !!props.examId && !!props.gradeId && !!props.subjectId,
    queryFn: () =>
      GetQpData(
        props.examId,
        props.gradeId,
        props.subjectId,
        props.returnToken()
      ),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      //   setError(true);
    },
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    setOpen(false);
    props.setResetQpDialog((prev) => !prev);
  };
  console.log(qpData);

  const handleQueChange = (val, item) => {
    // console.log(val, item);
    const returnQPmetaData = () => {
      const qpArr = [];

      for (let i = 1; i <= val; i++) {
        const item = {
          questionNo: i,
          maxMarks: 0,
          questionType: props.dropDownData[0].name,
          conceptName: "",
        };
        qpArr.push(item);
      }
      return qpArr;
    };
    setQpData({
      totalQuestions: val,
      totalMarks: total.marks,
      questionMetadata: returnQPmetaData(),
    });
    setTotal((prev) => {
      return { marks: prev.marks, ques: val };
    });
  };
  const handleMarksChange = (val, item) => {
    setQpData((prev) => {
      return {
        questionMetadata: prev.questionMetadata,
        totalQuestions: prev.totalQuestions,
        totalMarks: val,
      };
    });
    setTotal((prev) => {
      return { marks: val, ques: prev.ques };
    });
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (data === "saveMarks") {
        const res = await SaveQues(
          props.examId,
          props.gradeId,
          props.subjectId,
          qpData,
          props.returnToken()
        );
        if (res.status === 200) {
          refetch();
        }
      } else if (data === "lockAddExam") {
        const res = await LockAddExam(
          props.examId,
          props.gradeId,
          props.subjectId,
          props.returnToken()
        );
        if (res.status === 200) {
          refetch();
        }
      }
    },
  });

  //   const handleMutation

  return (
    <div>
      <Dialog
        maxWidth={false}
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {isLoading || isRefetching ? (
          <Skeleton animation="wave" variant="rectangular" height={800} />
        ) : (
          <div className="flex md:flex-row flex-col-reverse w-full">
            <div className="md:w-1/2 w-full min-h-[70vh] flex flex-col gap-4 py-4 px-4">
              <p className="font-semibold px-4 italic md:text-base text-xs">
                {props.gradeId.split("_")[1]}-{props.subjectId} QUESTION PAPER
                DETAILS
              </p>
              <div className="flex w-full justify-around">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  {/* Total Marks: {QpData.totalMarks} */}
                  Total Marks:{" "}
                  <BasicTextFields
                    handleOnBlur={handleMarksChange}
                    defaultValue={QpData?.totalMarks ? QpData?.totalMarks : 0}
                    disable={
                      QpData?.qpMetaDataLocked ||
                      QpData.questionMetaDataList.length > 0
                    }
                    size={"small"}
                    type={"number"}
                  />
                </p>
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  {/* Number of Questions: {QpData?.questionMetaDataList?.length} */}
                  Number of Questions:{" "}
                  <BasicTextFields
                    handleOnBlur={handleQueChange}
                    disable={
                      QpData?.qpMetaDataLocked ||
                      QpData.questionMetaDataList.length > 0
                    }
                    defaultValue={
                      QpData?.questionMetaDataList.length > 0
                        ? QpData?.questionMetaDataList.length
                        : 0
                    }
                    size={"small"}
                    type={"number"}
                  />
                </p>
              </div>
              <BasicTableForSub
                setTotalMarks={setTotalMarks}
                key={total.ques}
                data={props?.dropDownData}
                tableData={QpData.questionMetaDataList}
                que={Number(total.ques)}
                setQpData={setQpData}
              />
              <div className="flex gap-4 w-full">
                <p className="sm:text-lg text-sm font-semibold">
                  total: {QpData?.totalMarks ? QpData?.totalMarks : totalMarks}
                </p>
                <p className="sm:text-lg text-sm font-semibold">
                  total:{" "}
                  {QpData?.questionMetaDataList.length > 0
                    ? QpData?.questionMetaDataList.length
                    : total.ques}
                </p>
              </div>
              <p className="text-red-600 italic font-semibold">
                {Number(total.marks) > Number(totalMarks)
                  ? `${total.marks - totalMarks} more marks needed`
                  : Number(total.marks) < Number(totalMarks)
                  ? `Total marks exceeded by ${totalMarks - total.marks}`
                  : ""}
              </p>
              {QpData?.qpMetaDataLocked ? null : (
                <div className="w-full flex flex-col gap-2 justify-center items-center">
                  <h1 className="sm:text-lg text-sm font-semibold w-fit italic">
                    Enter Total Marks and Number of Questions to get started.
                  </h1>
                  <BasicButton
                    text={"Save"}
                    disable={
                      Number(total.marks) !== Number(totalMarks) ||
                      QpData.questionMetaDataList.length > 0
                    }
                    name={"saveMarks"}
                    handleButtonAction={(a) => mutation.mutate(a)}
                  />

                  <BasicButton
                    text={"Reset"}
                    disable={QpData.questionMetaDataList.length > 0}
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 min-h-[70vh] flex flex-col py-4 gap-2">
              <div className="flex justify-between px-4 w-full">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  QUESTION PAPER PREVIEW
                </p>
                <BasicButton
                  size={"small"}
                  text={`${QpData?.qpMetaDataLocked ? "Locked" : "Lock"}`}
                  name={"lockAddExam"}
                  handleButtonAction={(a) => {
                    mutation.mutate(a);
                  }}
                  disable={
                    QpData?.qpMetaDataLocked ||
                    QpData?.questionMetaDataList.length < 1 ||
                    !QpData?.qpUrl
                  }
                />
              </div>
              <div className="flex justify-around w-full">
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  disabled={QpData?.qpMetaDataLocked || !QpData?.qpUrl}
                >
                  Reupload QP
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={async (e) => {
                      const formData = new FormData();
                      formData.append("pdfFile", e.target.files[0]);

                      const res = await instance({
                        url: `schoolApp/configuration/uploadPdf/examType/${props.examId}/grade/${props.gradeId}/subject/${props.subjectId}`,
                        method: "POST",
                        data: formData,
                        headers: {
                          Authorization: `Bearer ${
                            props.returnToken()
                              ? props.returnToken()
                              : Cookies.get("token")
                          }`,
                        },
                      });
                      if (res.status === 200) {
                        refetch();
                      }
                    }}
                  />
                </Button>

                {/* <label htmlFor="uploadQp">
                  <BasicButton

                    disable={QpData?.qpMetaDataLocked || !QpData?.qpUrl}
                    text={"Reupload QP"}
                    size={"small"}
                  />
                </label> */}

                <div onClick={() => window.open(QpData.qpUrl, "_blank")}>
                  <BasicButton
                    text={<OpenInFull />}
                    disable={!QpData?.qpUrl}
                    size={"small"}
                  />
                </div>
              </div>
              <p className="font-semibold px-4 italic md:text-base text-xs">
                Make sure to leave blank space on the top for the header
              </p>
              {QpData?.qpUrl ? (
                <iframe
                  className="w-full h-full min-h-[70vh]"
                  src={QpData.qpUrl}
                  frameborder="0"
                ></iframe>
              ) : (
                <div className="w-full h-full min-h-[70vh] bg-gray-200 rounded-md flex flex-col gap-2 justify-center items-center">
                  <p className="font-semibold px-4 italic md:text-base text-xs">
                    Please attach a PDF file of size less than 20 MB
                  </p>
                  {/* <form action="">
                    <input type="file" />
                    <BasicButton
                      disable={QpData?.questionMetaDataList.length < 1}
                      text={"Upload"}
                    />
                  </form> */}
                  <Button
                    variant="contained"
                    component="label"
                    size="small"
                    disabled={QpData?.questionMetaDataList.length < 1}
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={async (e) => {
                        const formData = new FormData();
                        formData.append("pdfFile", e.target.files[0]);

                        const res = await instance({
                          url: `schoolApp/configuration/uploadPdf/examType/${props.examId}/grade/${props.gradeId}/subject/${props.subjectId}`,
                          method: "POST",
                          data: formData,
                          headers: {
                            Authorization: `Bearer ${
                              props.returnToken()
                                ? props.returnToken()
                                : Cookies.get("token")
                            }`,
                          },
                        });
                        if (res.status === 200) {
                          refetch();
                        }
                      }}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
});

export default ViewQpAddExamSub;
