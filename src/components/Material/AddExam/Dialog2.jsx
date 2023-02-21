import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useSearchParams } from "react-router-dom";

import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide2 = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = useState([]);

  React.useImperativeHandle(ref, () => ({
    openDialog(data) {
      setRowData(data);
      setOpen(true);
    },
    closeDialog() {
      setOpen(false);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton(rowData);
  };
  const [queryParameters] = useSearchParams();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth
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
            <h1 className="text-sm font-semibold">ADD EXAM CONFIRMATION</h1>
            <hr />
            <h1 className="text-xs font-semibold py-4">
              The following grade and exam will be added to your exam setup
            </h1>

            <TableContainer
              className="sm:!w-full !overflow-auto max-h-[70vh] "
              component={Paper}
            >
              <Table
                className="!w-full"
                //   sx={{ width: 1000 }}
                aria-label="simple table"
              >
                <TableHead className="w-full">
                  <TableRow className="w-full">
                    <TableCell align="right" className="w-[25%]">
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="font-bold">Exam Name</h1>
                      </div>
                    </TableCell>
                    <TableCell align="right" className="w-[25%]">
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="font-bold">Marks</h1>
                      </div>
                    </TableCell>
                    <TableCell align="right" className="w-[25%]">
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="font-bold">Class Applicable</h1>
                      </div>
                    </TableCell>
                    <TableCell align="right" className="w-[25%]">
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="font-semibold">Subjects Applicable</h1>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {[1, 2]?.map((item, index) => ( */}
                  <TableRow
                    // key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <h1 className="font-bold">
                        {rowData?.examName?.value[1]}
                      </h1>
                    </TableCell>
                    <TableCell align="center">
                      <h1 className="font-bold">{rowData?.marks}</h1>
                    </TableCell>
                    <TableCell align="center">
                      <h1 className="font-bold">
                        {rowData?.appClass?.map((item) => {
                          return item.value[1] + ", ";
                        })}
                      </h1>
                    </TableCell>
                    <TableCell align="center">
                      <h1 className="font-bold">
                        {rowData?.subject?.map((item) => {
                          return item.value[1] + ", ";
                        })}
                      </h1>
                    </TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={() => handleButtonClick()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide2;
