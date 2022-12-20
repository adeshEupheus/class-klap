import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker/MobileTimePicker";

export default function ResponsiveTimePickers(props) {
  const { time, handleTimeChange } = props;
  const [value, setValue] = React.useState(dayjs(`2020-01-01 ${time}`));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          // closeOnSelect
          onAccept={(e) => {
            handleTimeChange(e);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "6rem" }} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
