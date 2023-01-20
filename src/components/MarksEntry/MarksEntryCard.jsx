import React from "react";
import { Card } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import { Download } from "@mui/icons-material";

const FeedbackCard = ({ data }) => {
  return (
    <div className=" !w-full bg-slate-50 drop-shadow-xl rounded-sm">
      <div className="flex sm:flex-row flex-col bg-slate-300 justify-between  w-full py-3 px-1 ">
        <div className="font-bold text-slate-700 flex sm:gap-2 mx-1 sm:mx-3  text-xs">
          <div className="!w-[30px]">
            <img
              className="!object-cover h-5 w-5 sm:!h-7 sm:!w-7"
              src={data.iconUrl}
            />
          </div>
          <div className="sm:!text-lg mt-[1px] text-xs">{data.title}</div>
        </div>

        {/* <div className='!flex !flex-row!w-full ml-2'> */}
        <h1 className="text-slate-700 font-bold ml-2 flex sm:ml-0 sm:!text-lg mt-[1px] text-xs">
          Triggered by : {data.triggeredBy}
        </h1>
        {/* </div> */}
      </div>
      <div className="flex flex-row justify-between w-full p-2">
        <div
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
          className="flex flex-row  mx-0  text-xs sm:text-lg sm:mx-3 font-semibold text-slate-500 "
        ></div>
        <div className="!flex !flex-row  !justify-end  ">
          <a href={data.documentUrl}>
            <div className="px-1 py-1 rounded-md bg-blue-500 my-5 ">
              <Download className="text-white sm:m-1 sm:!text-lg !text-base" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
