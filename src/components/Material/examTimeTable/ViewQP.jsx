import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import BasicButton from "../Button";
import { OpenInFull } from "@mui/icons-material";
import BasicTable from "./BasicTable";
import { useQuery } from "@tanstack/react-query";
import { GetQpData } from "../../../apis/fectcher/assessment/examTimetable/qpData";
import { Skeleton } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewQP = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    OpenViewQp() {
      setOpen(true);
    },
  }));
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
  };

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
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" height={800} />
        ) : (
          <div className="flex md:flex-row flex-col-reverse w-full">
            <div className="md:w-1/2 w-full min-h-[70vh] flex flex-col gap-4 py-4 px-4">
              <p className="font-semibold px-4 italic md:text-base text-xs">
                1-{props.subjectId} QUESTION PAPER DETAILS
              </p>
              <div className="flex w-full justify-around">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  Total Marks: {QpData.totalMarks}
                </p>
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  Number of Questions: {QpData?.questionMetaDataList?.length}
                </p>
              </div>
              <BasicTable tableData={QpData.questionMetaDataList} />
            </div>
            <div className="w-full md:w-1/2 min-h-[70vh] flex flex-col py-4 gap-2">
              <div className="flex justify-between px-4 w-full">
                <p className="font-semibold px-4 italic md:text-base text-xs">
                  QUESTION PAPER PREVIEW
                </p>
                <BasicButton size={"small"} text={"Locked"} disable={true} />
              </div>
              <div className="flex justify-around w-full">
                <BasicButton
                  disable={true}
                  text={"Reupload QP"}
                  size={"small"}
                />
                <div onClick={() => window.open(QpData.qpUrl, "_blank")}>
                  <BasicButton text={<OpenInFull />} size={"small"} />
                </div>
              </div>
              <p className="font-semibold px-4 italic md:text-base text-xs">
                Make sure to leave blank space on the top for the header
              </p>
              <iframe
                className="w-full h-full min-h-[70vh]"
                src={QpData.qpUrl}
                frameborder="0"
              ></iframe>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
});

export default ViewQP;
