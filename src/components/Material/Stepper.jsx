import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import BasicButton from "./Button";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = [
  "Update Roll List",
  "Conduct Revision",
  "Send For Print",
  "Download PRS Soft Copy",
  "Track Performance",
];

export default function HorizontalStepper({ data }) {
  const returnStep = (label, data) => {
    switch (label) {
      case "Send For Print":
        return (
          <>
            <Chip
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={"default"}
            />
            <h1 className="text-xs font-semibold italic">
              {data?.prsDeliveryDate}
            </h1>
          </>
        );

        break;

      case "Download PRS Soft Copy":
        return (
          <a href={data?.prsDownloadLink ? data?.prsDownloadLink : null}>
            <Chip
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={data?.downloadPRSActive ? "info" : "default"}
            />
          </a>
        );
        break;
      case "Track Performance":
        return (
          <Chip
            variant="filled"
            className="!cursor-pointer"
            label={label}
            size="small"
            color={data?.trackPerformanceActive ? "info" : "default"}
          />
        );
        break;
      case "Conduct Revision":
        return (
          <Chip
            onClick={() => navigate("/assessment/exam_set_up")}
            variant="filled"
            className="!cursor-pointer"
            label={label}
            size="small"
            color="info"
          />
        );
        break;
      default:
        return (
          <Chip
            variant="filled"
            className="!cursor-pointer"
            label={label}
            size="small"
            color="default"
          />
        );
        break;
    }
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={5} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="!min-w-[6rem]">
              {returnStep(label, data)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
