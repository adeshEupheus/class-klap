import * as React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({
  variant,
  value,
  lable,
  item,
  type,
  defaultValue,
  handleOnBlur,
  disable,
  size,
  handleChange,
  name,
}) {
  const onBlur = (e) => {
    if (handleOnBlur) {
      handleOnBlur(e.target.value, item);
    }
    // console.log(e.target.value);
  };

  const onChange = (e) => {
    if (handleChange) {
      handleChange({ val: e.target.value, name });
    }
  };

  return (
    <TextField
      id="standard-basic"
      label={lable}
      disabled={disable}
      type={type}
      defaultValue={defaultValue}
      size={size ? size : "medium"}
      onBlur={onBlur}
      onChange={onChange}
      // value={value}
      variant={variant}
    />
  );
}
