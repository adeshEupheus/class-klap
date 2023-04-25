import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import BasicButton from "./Button";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const steps = [
  // "Update Roll List",
  "Conduct Revision",
  "Generate PRS",
  "Send For Print",
  "Download PRS Soft Copy",
  "Track Performance",
];

export default function HorizontalStepper({ data, GeneratePrs, SendPrint }) {
  const [genPRS, setGenPRS] = useState(
    data.sendForPRSDisabled
      ? false
      : data.sendForPrintStatus === "NOT_SENT"
      ? true
      : false
  );
  const [sendForPRS, setSendForPRS] = useState(
    data?.downloadPRSActive &&
      data?.prsDownloadLink &&
      data?.prsDeliveryDate === null
      ? true
      : false
  );

  // React.useLayoutEffect(() => {
  //   if(data.sendForPRSDisabled){
  //     setGenPRS(false)
  //     if(data.isDownloadPRSActive){
  //         data.downloadPRSActive = true;
  //     }
  // }else{
  //     if(data.sendForPrintStatus == 'NOT_SENT') {
  //         $('#generatePRSBtn').attr('disabled', false);
  //         $('#generatePRSCircle').removeClass('disable');
  //         $('#sendPrsBtn').attr('disabled', false);
  //         $('#sendPrsCircle').removeClass('disable');
  //     } else {
  //         $('#generatePRSBtn').attr('disabled', true);
  //         $('#generatePRSCircle').addClass('disable');
  //         $('#sendPrsBtn').attr('disabled', true);
  //         $('#sendPrsCircle').addClass('disable');
  //     }
  //     if(actionBtnData.sendForPrintStatus == 'SENT') {
  //         $('#prsDeliveryDate').html(actionBtnData.prsDeliveryDate);
  //         $('#prsDeliveryDate').show();
  //     } else {
  //         $('#prsDeliveryDate').empty();
  //         $('#prsDeliveryDate').hide();
  //     }
  // }

  // },[])

  const returnStep = (label, data) => {
    switch (label) {
      case "Generate PRS":
        return (
          <>
            <Chip
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={`${genPRS ? "info" : "default"}`}
            />
          </>
        );

        break;

      case "Send For Print":
        return (
          <>
            <Chip
              variant="filled"
              className="!cursor-pointer"
              label={label}
              size="small"
              color={`${sendForPRS ? "info" : "default"}`}
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

  const prsMutate = (label) => {
    if (label === "Generate PRS" && data.sendForPrintStatus === "NOT_SENT") {
      GeneratePrs.mutate();
      setGenPRS(false);
    }
    if (label === "Track Performance" && data?.trackPerformanceActive) {
      navigate("/assessment/scoreboard");
    }
    if (label === "Send For Print" && sendForPRS) {
      SendPrint.mutate();
      setSendForPRS(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={5} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              onClick={() => prsMutate(label)}
              className="!min-w-[6rem]"
            >
              {returnStep(label, data)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
