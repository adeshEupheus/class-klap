import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

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
            Reports can be downloaded in few minutes from{" "}
            <span
              onClick={() => navigate("/report_download")}
              className="font-semibold cursor-pointer text-blue-500"
            >
              here.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => handleButtonClick()}>Ok</Button> */}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide;
