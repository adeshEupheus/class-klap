import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AttendanceFilter({ data, handleChange }) {
  const [value, setValue] = React.useState(data);

  const handleChangee = (event) => {
    handleChange({
      name: "attendanceFilter",
      val: event.target.value,
    });
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        size="small"
        // disabled={disable}
        onChange={handleChangee}
      >
        <MenuItem value={"All"}>All</MenuItem>;
        <MenuItem value={false}>A</MenuItem>;<MenuItem value={true}>P</MenuItem>
      </Select>
    </FormControl>
  );
}
