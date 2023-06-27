import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    placement="top-start"
    disableFocusListener
    disableTouchListener
    classes={{ popper: className }}
    TransitionComponent={Zoom}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function CustomizeTooltip(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
    >
      <LightTooltip
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-xs">
              Step 1: Enter Attendance - 25%
            </p>
            <p className="font-semibold text-xs">
              Step 2: Complete Marks Entry - 50%
            </p>
            <p className="font-semibold text-xs">
              Step 3: Lock Marks Entry - 75%
            </p>
            <p className="font-semibold text-xs">
              Step 4: Generate Feedback - 100%
            </p>
          </div>
        }
      >
        {props.children}
      </LightTooltip>
    </div>
  );
}
