import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function LeftPositionedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="w-full">
            <span className="font-semibold text-gray-700 text-xs">
              Download SA1 exam personalized question papers for CLASS 1
            </span>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="w-full">
            <span className="font-semibold text-gray-700 text-xs">
              Download SA1 exam personalized question papers for CLASS 2
            </span>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="w-full">
            <span className="font-semibold text-gray-700 text-xs">
              Download RSA1 exam performance report excel
            </span>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
        </TimelineSeparator>
        <TimelineContent>
          <div className="w-full">
            <span className="font-semibold text-gray-700 text-xs">
              Download RSA1 exam feedback report
            </span>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
