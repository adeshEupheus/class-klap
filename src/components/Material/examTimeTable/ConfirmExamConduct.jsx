import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import BasicButton from "../Button";
import CheckBox from "@mui/material/Checkbox";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmExamConduct = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = useState(false);

  React.useImperativeHandle(ref, () => ({
    OpenConfirmConductExam() {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    setConfirm(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={false}
        fullWidth={false}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="flex flex-col gap-2 justify-start px-4 font-semibold py-4">
          <p>Kindly confirm the Roll-list before conducting the Exam.</p>
          <p>
            Click{" "}
            <p
              onClick={props.downloadRollList}
              className="text-blue-500 cursor-pointer inline"
            >
              here
            </p>{" "}
            to check
          </p>
          <p>
            <CheckBox
              size="small"
              checked={confirm}
              onClick={() => {
                setConfirm((prev) => !prev);
              }}
            />{" "}
            I have checked.
          </p>
          <div className="w-full gap-2 flex px-4 justify-end">
            <BasicButton
              size={"small"}
              text={"Cancle"}
              handleButtonAction={handleClose}
            />
            <BasicButton
              size={"small"}
              text={"Continue"}
              disable={!confirm}
              handleButtonAction={() => {
                props.ConductExam();
                handleClose();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
});

export default ConfirmExamConduct;
