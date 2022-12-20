import * as React from "react";
import Box from "@mui/material/Box";
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
}) {
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
      onBlur={onBlur}
      // value={value}
      variant={variant}
    />
  );
}
