import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ResponsiveDatePickers = React.forwardRef((props, ref) => {
  const { date, handleDateChange } = props;
  const [value, setValue] = React.useState(dayjs(date));
  // console.log(date);
  React.useImperativeHandle(ref, () => ({
    changeValue(newValue) {
      setValue(newValue);
    },
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          // disableFuture
          disablePast
          value={value}
          label={date ? null : "dd-mm-yyyy"}
          onChange={(newValue) => {
            // console.log(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
            // setValue(newValue);
            handleDateChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "10rem" }} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
});

export default ResponsiveDatePickers;
