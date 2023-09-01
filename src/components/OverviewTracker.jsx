import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
// import BasicButton from "./Button";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Loader from "./Material/Loader";
import { useState } from "react";
import { SendForPrint } from "../apis/mutation/SendForPrint";
import Snackbars from "./Material/Snackbar";

const steps = [
  "Step Up Exam",
  "Conduct",
  "Download QP Soft Copy",
  "Send QP For print",
];

export default function OverviewStepper({ data, examId }) {
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  const [enableSendQp, setEnableSendQp] = useState(null);
  const returnStatus = () => {
    switch (data.status) {
      case "PENDING FOR SETUP":
        return {
          stepUpExam: "info",
          conduct: "default",
          qp: "default",
          print: "default",
        };
        break;
      case "PENDING FOR CONDUCT":
        return {
          stepUpExam: "default",
          conduct: "info",
          qp: "default",
          print: "default",
        };
        break;
      case "PENDING FOR PRINT":
        return {
          stepUpExam: "default",
          conduct: "default",
          qp: "info",
          print: "info",
        };
        break;
      case "TRIGGER BUT PENDING FOR PRINT":
        return {
          stepUpExam: "default",
          conduct: "default",
          qp: "info",
          print: "default",
        };
        break;
      case "TRIGGER":
        return {
          stepUpExam: "default",
          conduct: "default",
          qp: "default",
          print: "default",
        };
        break;
      case "PRINTED":
        return {
          stepUpExam: "default",
          conduct: "default",
          qp: "default",
          print: "default",
        };
        break;

      default:
        break;
    }
    if (data?.personalizedQpGenerated) {
      setEnableSendQp(data.personalizedQpGenerated);
    }
  };

  // const returnStatusOfqpPrint = () => {
  //   if (enableSendQp !== null) {
  //     if (enableSendQp) {
  //       return "info";
  //     } else {
  //       return "default";
  //     }
  //   } else {
  //     return DialogRef.current.openDialog();
  //   }
  // };

  const returnStep = (label, data) => {
    switch (label) {
      case "Step Up Exam":
        return (
          <>
            <Chip
              onClick={
                returnStatus().stepUpExam === "info"
                  ? () => navigate("/assessment/exam_set_up")
                  : null
              }
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={returnStatus().stepUpExam}
            />
            {/* <h1 className="text-xs font-semibold italic">abc</h1> */}
          </>
        );

        break;

      case "Download QP Soft Copy":
        return (
          <a>
            <Chip
              onClick={
                returnStatus().qp === "info"
                  ? () => navigate("/assessment/exam_timetable")
                  : null
              }
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={returnStatus().qp}
            />
          </a>
        );
        break;
      case "Send QP For print":
        return (
          <>
            <Chip
              onClick={
                enableSendQp !== null
                  ? enableSendQp
                    ? () => DialogRef.current.openDialog()
                    : null
                  : returnStatus().print === "info"
                  ? () => DialogRef.current.openDialog()
                  : null
              }
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={
                enableSendQp !== null
                  ? enableSendQp
                    ? "info"
                    : "default"
                  : returnStatus().print
              }
            />
            <h1 className="text-xs font-semibold italic">{data.trigerDate}</h1>
          </>
        );
        break;
      case "Conduct":
        return (
          <Chip
            onClick={
              returnStatus().conduct === "info"
                ? () => navigate("/assessment/exam_timetable")
                : null
            }
            variant="filled"
            className="!cursor-pointer"
            label={label}
            size="small"
            color={returnStatus().conduct}
          />
        );
        break;
      default:
        return (
          <Chip
            variant="filled"
            className="!cursor-pointer"
            label={label}
            size="small"
            color="info"
          />
        );
        break;
    }
  };

  const navigate = useNavigate();
  const DialogRef = useRef();
  const snackbarRef = useRef();

  const handleDialogButton = async () => {
    setLoading(false);
    const res = await SendForPrint(examId);
    console.log(res);
    if (res.status === 200) {
      setSnackbarErr(false);
      setSnackbarMsg(res.data.message);
      snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbars
        ref={snackbarRef}
        message={snackbarMsg}
        snackbarErrStatus={snackbarErr}
      />
      <DialogSlide
        ref={DialogRef}
        // estDate={Object.values(data)[0].split("+")[0]}
        estDate={data["estimated-date"].split("+")[0]}
        handleDialogButton={handleDialogButton}
      />
      <Loader loading={loading} />
      <Stepper nonLinear activeStep={4} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="!min-w-[6rem]">
              {returnStep(label, data)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !font-semibold !sm:text-base !text-sm"
          >
            <h1 className="py-4 px-2 font-semibold">Confirm Send For Print</h1>
            <hr />
            <h1 className="py-4 px-2 font-semibold">
              ClassKlap would receive your files for print
            </h1>
            <h1 className="py-4 px-2 font-semibold">
              The question paper delivery will reach you on {props?.estDate}
            </h1>
            <h1 className="py-4 px-2 font-semibold">
              After confirmation, you cannot make any changes to the exam set up
              details.
            </h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={() => handleButtonClick()}>Send For Print</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
