import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import BasicButton from "../Button";
import { OpenInFull } from "@mui/icons-material";
import BasicTable from "./BasicTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetQpData } from "../../../apis/fectcher/assessment/examTimetable/qpData";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
} from "@mui/material";
import BasicTextFields from "../TextField";
import { useState } from "react";
import BasicTableForSub from "./BasicTableForSub";
import instance from "../../../instance";
import { SaveQues } from "../../../apis/mutation/ExamTimeTable/SaveQues";
import Cookies from "js-cookie";
import { LockAddExam } from "../../../apis/mutation/ExamTimeTable/LockAddExam";
import { GetAddExamQuestions } from "../../../apis/fectcher/assessment/examTimetable/examTimetable";
import { useEffect } from "react";
import { useRef } from "react";
import { useTransition } from "react";
import Loader from "../Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewQpAddExamSub = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = useState({ marks: 0, ques: 0 });
  const [isPending, startTransition] = useTransition();
  const [lockQues, setLockQues] = useState(true);
  const [qpData, setQpData] = useState({
    totalQuestions: 0,
    totalMarks: 0,
    questionMetadata: [],
  });
  React.useImperativeHandle(ref, () => ({
    OpenViewQpSub() {
      setOpen(true);
      if (QpData) {
        refetch();
      }
    },
  }));
  const [totalMarks, setTotalMarks] = useState(0);

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

  const {
    data: ObjExamQuesData,
    quesLoading,
    quesRefetching,
  } = useQuery({
    queryKey: ["objExamQues", props.examId, props.gradeId, props.subjectId],
    enabled:
      !!props.examId &&
      !!props.gradeId &&
      !!props.subjectId &&
      QpData?.questionMetaDataList?.length > 0,
    queryFn: () =>
      GetAddExamQuestions(
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

  const returnMCQData = (item) => {
    let data = {
      answer: "",
      mcqContent: "",
      mcqQuestionChoiceGroupResponses: [
        { content: "", position: "1" },
        { content: "", position: "2" },
        { content: "", position: "3" },
        { content: "", position: "4" },
      ],
      questionNo: item.questionNo,
      conceptName: item.conceptName,
    };
    if (ObjExamQuesData?.length > 0) {
      ObjExamQuesData.map((que) => {
        if (que.questionNo === item.questionNo) {
          data.answer = que.answer;
          data.mcqQuestionChoiceGroupResponses =
            que.mcqQuestionChoiceGroupResponses;
          data.mcqContent = que.mcqContent;
        }
      });
    }
    return data;
  };
  const returnFIBData = (item) => {
    let data = {
      answer: "",
      fibQuestionContent: "",
      fibQuestionChoiceGroupResponses: [{ content: "" }, { content: "" }],
      questionNo: item.questionNo,
      conceptName: item.conceptName,
    };
    if (ObjExamQuesData?.length > 0) {
      ObjExamQuesData.map((que) => {
        if (que.questionNo === item.questionNo) {
          data.answer = que.answer;
          data.fibQuestionChoiceGroupResponses =
            que.fibQuestionChoiceGroupResponses;
          data.fibQuestionContent = que.fibQuestionContent;
        }
      });
    }
    return data;
  };

  const handleClose = async () => {
    setOpen(false);
    props.setResetQpDialog((prev) => !prev);
  };
  console.log(qpData);

  const handleQueChange = (val, item) => {
    // console.log(val, item);
    startTransition(() => {
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

  const updateQuestion = async (data, type) => {
    if (type === "mcq") {
      const res = await instance({
        url: `schoolApp/configuration/addMCQQuestion/examType/${props.examId}/grade/${props.gradeId}/subject/${props.subjectId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            props.returnToken() ? props.returnToken() : Cookies.get("token")
          }`,
        },
        data: {
          answer: data.answer,
          mcqContent: data.mcqContent,
          mcqQuestionChoiceGroupResponses: data.mcqQuestionChoiceGroupResponses,
          questionNo: data.questionNo,
          questionText: data.mcqContent,
        },
      });
    } else {
      console.log(data);
      const res = await instance({
        url: `schoolApp/configuration/addFIBQuestion/examType/${props.examId}/grade/${props.gradeId}/subject/${props.subjectId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            props.returnToken() ? props.returnToken() : Cookies.get("token")
          }`,
        },
        data: {
          answer: data.answer,
          fibQuestionContent: data.fibQuestionContent,
          fibQuestionChoiceGroupResponses: data.fibQuestionChoiceGroupResponses,
          questionNo: data.questionNo,
          questionText: data.fibQuestionContent,
        },
      });
    }
  };
  const confirmRef = useRef();

  //   const handleMutation

  return (
    <div>
      <Dialog
        maxWidth={false}
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <ConfirmBack ref={confirmRef} handleClose={handleClose} />
        {isLoading || isRefetching || quesLoading ? (
          <Skeleton animation="wave" variant="rectangular" height={800} />
        ) : (
          <div className="flex md:flex-row flex-col-reverse w-full">
            <div className="md:w-1/2 w-full min-h-[70vh] flex flex-col gap-4 py-4 px-4">
              <BasicButton
                text={"Go Back"}
                handleButtonAction={() => {
                  if (!QpData?.qpMetaDataLocked) {
                    confirmRef.current.openConfirm();
                  } else {
                    handleClose();
                  }
                }}
              />
              <p className="font-semibold px-4 italic md:text-base text-xs">
                {props.gradeId.split("_")[1]}-{props.subjectId} QUESTION PAPER
                DETAILS
              </p>
              <div className="flex w-full justify-around">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  {/* Total Marks: {QpData.totalMarks} */}
                  Total Marks:{" "}
                  {/* <BasicTextFields
                    handleOnBlur={handleMarksChange}
                    defaultValue={QpData?.totalMarks ? QpData?.totalMarks : 0}
                    disable={
                      QpData?.qpMetaDataLocked ||
                      QpData.questionMetaDataList.length > 0
                    }
                    size={"small"}
                    type={"number"}
                  /> */}
                  <TextField
                    size="small"
                    value={
                      QpData?.totalMarks ? QpData?.totalMarks : total.marks
                    }
                    onChange={(e) => handleMarksChange(e.target.value)}
                    type="number"
                    disabled={
                      QpData?.qpMetaDataLocked ||
                      QpData.questionMetaDataList.length > 0
                    }
                  />
                </p>
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  {/* Number of Questions: {QpData?.questionMetaDataList?.length} */}
                  Number of Questions:{" "}
                  {/* <BasicTextFields
                    key={total}
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
                  /> */}
                  <TextField
                    size="small"
                    value={
                      QpData?.questionMetaDataList.length > 0
                        ? QpData?.questionMetaDataList.length
                        : total.ques
                    }
                    onChange={(e) => handleQueChange(e.target.value)}
                    type="number"
                    disabled={
                      QpData?.qpMetaDataLocked ||
                      QpData.questionMetaDataList.length > 0
                    }
                  />
                </p>
              </div>
              {isPending ? (
                <div className="text-lg font-semibold italic flex justify-center">
                  <Loader loading={true} />
                </div>
              ) : (
                <BasicTableForSub
                  setTotalMarks={setTotalMarks}
                  key={total.ques}
                  data={props?.dropDownData}
                  tableData={QpData.questionMetaDataList}
                  que={Number(total.ques)}
                  setQpData={setQpData}
                />
              )}
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
                    handleButtonAction={() => {
                      setTotal({ marks: 0, ques: 0 });
                      setTotalMarks(0);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 min-h-[70vh] flex flex-col py-4 gap-2">
              <div className="flex justify-between px-4 w-full">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  QUESTION PAPER PREVIEW
                </p>
                {props.subjective ? (
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
                ) : (
                  <BasicButton
                    size={"small"}
                    text={`${QpData?.qpMetaDataLocked ? "Locked" : "Lock"}`}
                    name={"lockAddExam"}
                    handleButtonAction={(a) => {
                      setLockQues(true);
                      mutation.mutate(a);
                    }}
                    disable={
                      QpData?.qpMetaDataLocked ||
                      QpData?.questionMetaDataList.length < 1
                    }
                  />
                )}
              </div>
              <div className="flex justify-around w-full">
                {props.subjective ? (
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
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setLockQues((prev) => !prev);
                    }}
                    component="label"
                    size="small"
                    disabled={
                      QpData.qpMetaDataLocked
                        ? true
                        : QpData?.questionMetaDataList.length > 0
                        ? false
                        : true
                    }
                  >
                    {lockQues ? "Edit QP" : "Save QP"}
                  </Button>
                )}

                <div onClick={() => window.open(QpData.qpUrl, "_blank")}>
                  <BasicButton
                    text={<OpenInFull />}
                    disable={!QpData?.qpUrl}
                    size={"small"}
                  />
                </div>
              </div>
              <p className="font-semibold px-4 italic md:text-base text-xs">
                {props.subjective
                  ? "Make sure to leave blank space on the top for the header"
                  : ""}
              </p>

              {props.subjective ? (
                QpData?.qpUrl ? (
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
                )
              ) : (
                QpData?.questionMetaDataList?.map((item) => {
                  return item.questionType.name === "MCQ" ? (
                    <ObjQuestionMCQ
                      item={returnMCQData(item)}
                      lockQues={lockQues}
                      updateQuestion={updateQuestion}
                    />
                  ) : (
                    <ObjQuestionFIB
                      item={returnFIBData(item)}
                      lockQues={lockQues}
                      updateQuestion={updateQuestion}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
});

const ConfirmBack = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  React.useImperativeHandle(ref, () => ({
    openConfirm() {
      setOpen(true);
    },
    closeConfirm() {
      setOpen(false);
    },
  }));
  return (
    <Dialog
      maxWidth={false}
      fullWidth={false}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="flex flex-col gap-4 p-4 italic text-lg">
        <p>Please Lock Question Paper</p>
        <div className="flex gap-2">
          <BasicButton
            text={"Ok"}
            size={"small"}
            handleButtonAction={() => {
              setOpen(false);
            }}
          />
          <BasicButton
            text={"Later"}
            size={"small"}
            handleButtonAction={() => {
              props.handleClose();
            }}
          />
        </div>
      </div>
    </Dialog>
  );
});

const ObjQuestionMCQ = ({ item, lockQues, updateQuestion }) => {
  const [data, setData] = useState(item);

  const updateData = (val, data2) => {
    let newVal = {};
    if (data2.field === "mcqContent") {
      setData((prev) => {
        newVal = { ...prev, mcqContent: val };
        return { ...prev, mcqContent: val };
      });
    }
    if (data2.field === "options") {
      const newOptions = data.mcqQuestionChoiceGroupResponses.map(
        (i, index) => {
          if (data2.index - 1 === index) {
            console.log(i);
            return { content: val, position: data2.index };
          } else {
            return i;
          }
        }
      );
      setData((prev) => {
        newVal = { ...prev, mcqQuestionChoiceGroupResponses: newOptions };
        return { ...prev, mcqQuestionChoiceGroupResponses: newOptions };
      });
    }
    if (data2.field === "radio") {
      setData((prev) => {
        newVal = { ...prev, answer: (option.indexOf(val) + 1).toString() };
        return { ...prev, answer: (option.indexOf(val) + 1).toString() };
      });
    }
    if (checkData(newVal)) {
      updateQuestion(newVal, "mcq");
    }
  };

  console.log(data);
  const checkData = (newVal) => {
    let update = false;
    if (newVal.answer && newVal.conceptName && newVal.mcqContent) {
      for (let i = 0; i < newVal?.mcqQuestionChoiceGroupResponses.length; i++) {
        const item = newVal?.mcqQuestionChoiceGroupResponses[i];
        if (item?.content) {
          update = true;
        } else {
          update = false;
          break;
        }
      }
    }
    return update;
  };

  const option = ["A", "B", "C", "D"];

  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <div className="flex w-full justify-between">
        <p className="font-medium text-lg italic">
          Question {item?.questionNo}
        </p>
        <p className="font-medium text-lg italic">{item?.conceptName}</p>
      </div>
      <BasicTextFields
        size={"small"}
        disable={lockQues}
        defaultValue={item?.mcqContent}
        item={{ field: "mcqContent" }}
        handleOnBlur={updateData}
      />
      <div className="flex gap-4">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue={item?.answer ? option[Number(item.answer) - 1] : null}
          onChange={(e) => {
            updateData(e.target._wrapperState.initialValue, {
              field: "radio",
            });
          }}
        >
          {item?.mcqQuestionChoiceGroupResponses?.map((item2, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <FormControlLabel
                  value={option[index]}
                  disabled={lockQues}
                  control={<Radio />}
                  label={option[index]}
                />
                <BasicTextFields
                  size={"small"}
                  disable={lockQues}
                  defaultValue={item2?.content}
                  item={{ field: "options", index: index + 1 }}
                  handleOnBlur={updateData}
                />
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
const ObjQuestionFIB = ({ item, lockQues, updateQuestion }) => {
  const [data, setData] = useState(item);
  const updateData = (val, data2) => {
    let newVal = {};
    if (data2.field === "fibContent") {
      setData((prev) => {
        newVal = { ...prev, fibQuestionContent: val };
        return { ...prev, fibQuestionContent: val };
      });
    }
    if (data2.field === "answer") {
      setData((prev) => {
        newVal = { ...prev, answer: val };
        return { ...prev, answer: val };
      });
    }
    if (data2.field === "options") {
      const newOptions = data?.fibQuestionChoiceGroupResponses.map(
        (i, index) => {
          if (data2.index - 1 === index) {
            return { content: val };
          } else {
            return i;
          }
        }
      );
      setData((prev) => {
        newVal = { ...prev, fibQuestionChoiceGroupResponses: newOptions };
        return { ...prev, fibQuestionChoiceGroupResponses: newOptions };
      });
    }

    if (checkData(newVal)) {
      updateQuestion(newVal, "fib");
    }
  };
  console.log(data);

  const checkData = (newVal) => {
    let update = false;
    if (newVal?.answer && newVal?.fibQuestionContent) {
      for (let i = 0; i < newVal?.fibQuestionChoiceGroupResponses.length; i++) {
        const item = newVal?.fibQuestionChoiceGroupResponses[i];
        if (item?.content) {
          update = true;
        } else {
          update = false;
          break;
        }
      }
    }
    return update;
  };
  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <div className="flex w-full justify-between">
        <p className="font-medium text-lg italic">
          Question {item?.questionNo}
        </p>
        <p className="font-medium text-lg italic">{item?.conceptName}</p>
      </div>

      <BasicTextFields
        size={"small"}
        disable={lockQues}
        defaultValue={item?.fibQuestionContent}
        item={{ field: "fibContent" }}
        handleOnBlur={updateData}
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <p>Correct Answer:</p>
          <BasicTextFields
            size={"small"}
            disable={lockQues}
            defaultValue={item?.answer}
            item={{ field: "answer" }}
            handleOnBlur={updateData}
          />
        </div>
        {item?.fibQuestionChoiceGroupResponses.map((item, index) => {
          return (
            <div className="flex gap-2">
              <p>Option {index + 1}:</p>
              <BasicTextFields
                size={"small"}
                disable={lockQues}
                defaultValue={item?.content}
                item={{ field: "options", index: index + 1 }}
                handleOnBlur={updateData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewQpAddExamSub;
