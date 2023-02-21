import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
// import SearchDropDown from "../SearchDropDown";
import { AddExamDropDownData } from "../../../apis/fectcher/assessment/addExam/AddExamDropdown";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import BasicTextFields from "../TextField";
import {
  Autocomplete,
  Stack,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogSlide = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [examName, setExamName] = useState(null);
  const [appClass, setAppClass] = useState([]);
  const [subject, setSubject] = useState([]);
  const [marks, setMarks] = useState(null);

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
    closeDialog() {
      handleClose();
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton({ examName, appClass, subject, marks });
    // console.log(examName, appClass, subject, marks);
    //   setOpen(false);
  };
  const [queryParameters] = useSearchParams();

  const returnToken = () => {
    return queryParameters.get("auth");
  };
  const {
    data: DropDownData,
    isLoading,
    // refetch,
    // isRefetching,
  } = useQuery({
    queryKey: ["add_exam_dropdown_data"],
    queryFn: () => AddExamDropDownData(returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    setAppClass([]);
    setExamName(null);
    setSubject([]);
    setMarks("");
    setOpen(false);
  };

  const handleDropDown = (value, type, item) => {
    console.log(value, type, item);

    switch (type) {
      case "examName":
        setExamName({ value: value.value });
        break;
      case "subject":
        setSubject(value);
        break;
      case "class":
        setAppClass(value);
        break;
      default:
        break;
    }
  };

  const handleOnBlur = (value) => {
    setMarks(value);
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
          {isLoading ? null : (
            <DialogContentText
              id="alert-dialog-slide-description"
              className="!text-gray-600 !font-semibold !sm:text-base !text-sm"
            >
              <h1 className="text-sm font-semibold">Exam Details</h1>
              <hr />
              <div className="w-full flex flex-wrap py-4 gap-4">
                <div className="sm:w-[45%] w-full flex flex-col gap-3">
                  <h1 className="font-semibold">Exam Name</h1>
                  <SearchDropDownControlled
                    handleDropDown={handleDropDown}
                    data={[
                      ...Object.entries(DropDownData?.examListDropdown).map(
                        (item) => {
                          return { value: item };
                        }
                      ),
                    ]}
                    variant={"outlined"}
                    value={examName}
                    Name={"examName"}
                    label={"Select"}
                    size={"small"}
                  />
                </div>
                <div className="sm:w-[45%] w-full flex flex-col gap-3">
                  <h1 className="font-semibold">Marks</h1>
                  <TextFieldWithValue
                    size={"small"}
                    value={marks}
                    variant={"outlined"}
                    type={"number"}
                    lable={"Enter Marks"}
                    handleOnBlur={handleOnBlur}
                  />
                </div>
                <div className="sm:w-[45%] w-full flex flex-col gap-3">
                  <h1 className="font-semibold">Classes Applicable</h1>
                  <SearchDropDownControlled
                    handleDropDown={handleDropDown}
                    multiline={true}
                    data={[
                      ...Object.entries(DropDownData?.classListDropdown).map(
                        (item) => {
                          return { value: item };
                        }
                      ),
                    ]}
                    label={"Select"}
                    value={appClass}
                    variant={"outlined"}
                    Name={"class"}
                    size={"small"}
                  />
                </div>
                <div className="sm:w-[45%] w-full flex flex-col gap-3">
                  <h1 className="font-semibold">Subjects Applicable</h1>
                  <SearchDropDownControlled
                    multiline={true}
                    handleDropDown={handleDropDown}
                    data={[
                      ...Object.entries(DropDownData?.subjectListDropdown).map(
                        (item) => {
                          return { value: item };
                        }
                      ),
                    ]}
                    variant={"outlined"}
                    value={subject}
                    Name={"subject"}
                    label={"Select"}
                    size={"small"}
                  />
                </div>
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => handleButtonClick()}>Add Exam</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const TextFieldWithValue = ({
  variant,
  value,
  lable,
  item,
  type,
  defaultValue,
  handleOnBlur,
  disable,
  size,
}) => {
  const onBlur = (e) => {
    handleOnBlur(e.target.value, item);
    // console.log(e.target.value);
  };

  return (
    <TextField
      id="standard-basic"
      label={lable}
      disabled={disable}
      type={type}
      defaultValue={defaultValue}
      size={size ? size : "medium"}
      onChange={onBlur}
      value={value}
      variant={variant}
    />
  );
};
const SearchDropDownControlled = ({
  variant,
  label,
  color,
  data,
  Name,
  disable,
  value,
  size,
  minWidth,
  handleDropDown,
  defaultValue,
  item,
  multiline,
}) => {
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "examName":
          return option.value[1];
          break;

        // case "exam_name":
        //   return option.value;
        //   break;
        // case "exam_type":
        //   return option.value;
        //   break;
        // case "mark_syllabus_difficulty":
        //   return option.value;
        //   break;
        // case "scoreboard":
        //   return option.value;
        //   break;
        default:
          return option.value[1];
          break;
      }
    },
  };

  const handleOnChange = (value, type) => {
    handleDropDown(value, type, item);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Stack
        spacing={1}
        className={`!w-full ${minWidth && `!min-w-[${minWidth}] sm:!min-w-0`}`}
      >
        <Autocomplete
          {...defaultProps}
          size={size}
          multiple={multiline}
          disabled={disable}
          disableClearable
          // sx={{ width: "fit-content" }}
          value={value}
          defaultValue={defaultValue}
          onChange={(event, newValue) => handleOnChange(newValue, Name)}
          id="disable-close-on-select"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              sx={{ width: `${minWidth ? minWidth : "100%"}` }}
              variant={variant}
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

export default DialogSlide;
