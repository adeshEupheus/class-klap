import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectMUI({ size, data, disable, handleSelectAction }) {
  const [value, setValue] = React.useState(data.marks);

  const handleChange = (event) => {
    // console.log(data);
    handleSelectAction({
      name: "marks",
      questionAttemptId: data.questionAttemptId,
      value: event.target.value,
    });
    setValue(event.target.value);
  };

  const marksArray = [];
  for (let i = 0; i <= data.maxMarks; i += 0.5) {
    marksArray.push(i);
  }

  return (
    <FormControl sx={{ m: 1, width: "100%" }} size={size}>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        disabled={disable}
        size="small"
        onChange={handleChange}
      >
        {marksArray.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
