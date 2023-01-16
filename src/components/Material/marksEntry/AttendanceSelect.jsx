import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AttendanceSelect({
  data,
  disable,
  handleSelectAction,
  QpaId,
}) {
  const [value, setValue] = React.useState(data);

  const handleChange = (event) => {
    handleSelectAction({
      name: "attendance",
      QpaId,
      value: event.target.value,
    });
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        size="small"
        disabled={disable}
        onChange={handleChange}
      >
        <MenuItem value={false}>A</MenuItem>;<MenuItem value={true}>P</MenuItem>
        ;
      </Select>
    </FormControl>
  );
}
