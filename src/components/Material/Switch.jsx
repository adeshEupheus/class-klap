import * as React from "react";
import Switch from "@mui/material/Switch";
import { useState } from "react";

const SwitchLabels = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.checked);

  React.useImperativeHandle(ref, () => ({
    setTrue() {
      setValue(true);
    },
    setFalse() {
      setValue(false);
    },
    toggle() {
      setValue((prev) => !prev);
    },
  }));

  const change = (e) => {
    // console.log(props.key);
    props.handleSwitchChange(props.name, e.target.checked, props.item);
  };
  return <Switch size="small" checked={value} onChange={change} />;
});

export default SwitchLabels;
