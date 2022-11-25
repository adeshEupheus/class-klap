import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ variant, value, lable, type }) {
  return (
    <TextField
      id="standard-basic"
      label={lable}
      type={type}
      value={value}
      variant={variant}
    />
  );
}
